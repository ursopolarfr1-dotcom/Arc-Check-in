const https = require('https');

const txHash = '0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86';
const rpcUrl = new URL('https://rpc.testnet.arc.network');

// Primeiro, vamos verificar se a transação existe
function makeRequest(method, params) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: 1
    });

    const options = {
      hostname: rpcUrl.hostname,
      port: 443,
      path: rpcUrl.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function findContract() {
  console.log('🔍 Buscando endereço do contrato...\n');

  try {
    // Tentar buscar o receipt
    const receipt = await makeRequest('eth_getTransactionReceipt', [txHash]);
    
    if (receipt.result && receipt.result.contractAddress) {
      const addr = receipt.result.contractAddress;
      console.log('✅ Endereço encontrado:', addr);
      updateEnv(addr);
      return;
    }

    // Se não encontrou, tentar buscar a transação
    const tx = await makeRequest('eth_getTransactionByHash', [txHash]);
    
    if (tx.result) {
      console.log('📋 Informações da transação:');
      console.log('From:', tx.result.from);
      console.log('To:', tx.result.to);
      console.log('Value:', tx.result.value);
      
      // Se "to" for null, é criação de contrato
      if (!tx.result.to) {
        console.log('\n⚠️  Esta é uma transação de criação de contrato.');
        console.log('O endereço do contrato deve ser calculado a partir do from e nonce.');
        console.log('\nPor favor, verifique no explorer:');
        console.log(`https://testnet.arcscan.app/tx/${txHash}`);
        console.log('\nOu aguarde a confirmação da transação e tente novamente.');
      }
    }

    // Tentar buscar o receipt novamente (pode ter sido confirmado)
    console.log('\n🔄 Tentando buscar receipt novamente...');
    const receipt2 = await makeRequest('eth_getTransactionReceipt', [txHash]);
    
    if (receipt2.result && receipt2.result.contractAddress) {
      const addr = receipt2.result.contractAddress;
      console.log('✅ Endereço encontrado:', addr);
      updateEnv(addr);
    } else {
      console.log('\n❌ Não foi possível encontrar o endereço automaticamente.');
      console.log('\n📝 Por favor, acesse o explorer e encontre manualmente:');
      console.log(`https://testnet.arcscan.app/tx/${txHash}`);
      console.log('\nProcure por "Created Contract" ou "Contract Address"');
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

function updateEnv(address) {
  const fs = require('fs');
  let envContent = '';
  
  if (fs.existsSync('.env')) {
    envContent = fs.readFileSync('.env', 'utf8');
  }
  
  // Substituir ou adicionar NEXT_PUBLIC_CONTRACT_ADDRESS
  if (envContent.includes('NEXT_PUBLIC_CONTRACT_ADDRESS=')) {
    envContent = envContent.replace(
      /NEXT_PUBLIC_CONTRACT_ADDRESS=.*/g,
      `NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`
    );
  } else {
    if (envContent && !envContent.endsWith('\n')) {
      envContent += '\n';
    }
    envContent += `NEXT_PUBLIC_CONTRACT_ADDRESS=${address}\n`;
  }
  
  fs.writeFileSync('.env', envContent);
  console.log('\n✅ Arquivo .env atualizado com sucesso!');
  console.log(`\n📝 Endereço configurado: ${address}`);
  console.log('\n🔄 Agora reinicie o servidor: npm run dev');
}

findContract();

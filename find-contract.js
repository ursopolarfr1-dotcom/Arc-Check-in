const https = require('https');

const txHash = '0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86';
const rpcUrl = new URL('https://rpc.testnet.arc.network');

const data = JSON.stringify({
  jsonrpc: '2.0',
  method: 'eth_getTransactionReceipt',
  params: [txHash],
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

console.log('Buscando endereco do contrato...\n');

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(responseData);
      
      if (result.result && result.result.contractAddress) {
        const addr = result.result.contractAddress;
        console.log('Endereco encontrado:', addr);
        console.log('\nAtualizando .env...');
        
        // Atualizar .env
        const fs = require('fs');
        let envContent = '';
        
        if (fs.existsSync('.env')) {
          envContent = fs.readFileSync('.env', 'utf8');
        }
        
        // Substituir ou adicionar NEXT_PUBLIC_CONTRACT_ADDRESS
        if (envContent.includes('NEXT_PUBLIC_CONTRACT_ADDRESS=')) {
          envContent = envContent.replace(
            /NEXT_PUBLIC_CONTRACT_ADDRESS=.*/g,
            `NEXT_PUBLIC_CONTRACT_ADDRESS=${addr}`
          );
        } else {
          envContent += `\nNEXT_PUBLIC_CONTRACT_ADDRESS=${addr}\n`;
        }
        
        fs.writeFileSync('.env', envContent);
        console.log('✓ Arquivo .env atualizado com sucesso!');
        console.log(`\nEndereco configurado: ${addr}`);
        console.log('\nAgora reinicie o servidor: npm run dev');
      } else {
        console.log('Endereco nao encontrado no receipt.');
        console.log('Resposta completa:', JSON.stringify(result, null, 2));
        console.log('\nPor favor, verifique manualmente no explorer:');
        console.log(`https://testnet.arcscan.app/tx/${txHash}`);
      }
    } catch (error) {
      console.error('Erro:', error.message);
      console.log('Resposta:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Erro na requisicao:', error.message);
});

req.write(data);
req.end();

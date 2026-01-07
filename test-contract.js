// Script para testar se o contrato está acessível
const https = require('https');

// Ler endereço do .env
const fs = require('fs');
const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/NEXT_PUBLIC_CONTRACT_ADDRESS=(.+)/);
const contractAddress = match ? match[1].trim() : null;

if (!contractAddress) {
  console.log('❌ Endereço do contrato não encontrado no .env');
  process.exit(1);
}

console.log('🧪 Testando contrato...\n');
console.log('📋 Endereço:', contractAddress);
console.log('🌐 RPC: https://rpc.testnet.arc.network\n');

// Testar chamada ao contrato (ler totalCount)
function makeRequest(method, params) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: 1
    });

    const options = {
      hostname: 'rpc.testnet.arc.network',
      port: 443,
      path: '/',
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

async function testContract() {
  try {
    // Testar se o contrato existe (ler código)
    console.log('1️⃣  Verificando se o contrato existe...');
    const code = await makeRequest('eth_getCode', [contractAddress, 'latest']);
    
    if (code.result === '0x' || !code.result) {
      console.log('   ⚠️  Contrato não encontrado ou sem código');
      console.log('   Isso pode significar que:');
      console.log('   - O endereço está incorreto');
      console.log('   - O contrato ainda não foi deployado');
      console.log('   - A transação ainda não foi confirmada');
    } else {
      console.log('   ✅ Contrato encontrado! (tem código)');
    }

    // Tentar ler totalCount
    console.log('\n2️⃣  Tentando ler totalCount do contrato...');
    const callData = '0x' + 'e6aa216c'.padStart(64, '0'); // totalCount() function selector
    
    const callResult = await makeRequest('eth_call', [{
      to: contractAddress,
      data: callData
    }, 'latest']);

    if (callResult.result && callResult.result !== '0x') {
      const count = parseInt(callResult.result, 16);
      console.log('   ✅ Contrato respondendo!');
      console.log('   📊 Total Count:', count);
    } else {
      console.log('   ⚠️  Não foi possível ler o contrato');
      console.log('   Resposta:', callResult);
    }

    console.log('\n✅ Teste concluído!');
    console.log('\n💡 Se o contrato não foi encontrado:');
    console.log('   - Verifique se o endereço está correto');
    console.log('   - Verifique se a transação foi confirmada');
    console.log('   - Acesse: https://testnet.arcscan.app/address/' + contractAddress);

  } catch (error) {
    console.error('❌ Erro ao testar:', error.message);
  }
}

testContract();

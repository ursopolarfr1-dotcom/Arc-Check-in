// Script para buscar o endereço do contrato a partir do hash de transação
const https = require('https');

const txHash = '0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86';
const rpcUrl = 'https://rpc.testnet.arc.network';

const requestData = JSON.stringify({
  jsonrpc: '2.0',
  method: 'eth_getTransactionReceipt',
  params: [txHash],
  id: 1
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': requestData.length
  }
};

console.log('🔍 Buscando endereço do contrato...\n');

const req = https.request(rpcUrl, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (response.result && response.result.contractAddress) {
        const contractAddress = response.result.contractAddress;
        console.log('✅ Endereço do contrato encontrado:');
        console.log(contractAddress);
        console.log('\n📝 Atualize seu arquivo .env com:');
        console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
      } else if (response.result && response.result.to) {
        // Se não tem contractAddress, pode ser que o "to" seja o contrato
        console.log('⚠️  Campo contractAddress não encontrado.');
        console.log('Verifique manualmente no explorer:');
        console.log(`https://testnet.arcscan.app/tx/${txHash}`);
        console.log('\nOu verifique o campo "to" na resposta:');
        console.log(JSON.stringify(response.result, null, 2));
      } else {
        console.log('❌ Erro ao buscar endereço:');
        console.log(JSON.stringify(response, null, 2));
      }
    } catch (error) {
      console.error('❌ Erro ao processar resposta:', error.message);
      console.log('Resposta recebida:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Erro na requisição:', error.message);
});

req.write(requestData);
req.end();

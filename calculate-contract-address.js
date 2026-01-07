// Script para calcular o endereço do contrato a partir do deployer e nonce
// Ou atualizar manualmente se você já tem o endereço

const crypto = require('crypto');
const fs = require('fs');

// Função para calcular endereço CREATE (padrão)
function calculateContractAddress(deployerAddress, nonce) {
  // Para CREATE, o endereço é: keccak256(rlp([deployer, nonce]))[12:]
  // Mas isso requer uma biblioteca de criptografia específica
  
  // Por enquanto, vamos usar uma abordagem mais simples
  // O usuário precisa fornecer o endereço ou podemos tentar buscar
  console.log('Para calcular o endereço, precisamos do endereço do deployer e nonce.');
  console.log('Ou você pode fornecer o endereço diretamente.\n');
}

// Função para atualizar .env com endereço fornecido
function updateEnvWithAddress(address) {
  if (!address || !address.startsWith('0x') || address.length !== 42) {
    console.log('❌ Endereço inválido. Deve começar com 0x e ter 42 caracteres.');
    return false;
  }

  let envContent = '';
  
  if (fs.existsSync('.env')) {
    envContent = fs.readFileSync('.env', 'utf8');
  }
  
  // Remover linha antiga com hash
  envContent = envContent.replace(
    /NEXT_PUBLIC_CONTRACT_ADDRESS=0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86.*/g,
    ''
  );
  
  // Adicionar ou atualizar com endereço correto
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
  console.log('✅ Arquivo .env atualizado!');
  console.log(`📝 Endereço configurado: ${address}`);
  return true;
}

// Verificar se o endereço foi passado como argumento
const address = process.argv[2];

if (address) {
  if (updateEnvWithAddress(address)) {
    console.log('\n🔄 Reinicie o servidor: npm run dev');
  }
} else {
  console.log('📋 Como usar:');
  console.log('   node calculate-contract-address.js 0xEnderecoDoContrato');
  console.log('\n🔍 Ou encontre o endereço no explorer:');
  console.log('   https://testnet.arcscan.app/tx/0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86');
  console.log('\n💡 Dica: Procure por "Created Contract" na página da transação');
}

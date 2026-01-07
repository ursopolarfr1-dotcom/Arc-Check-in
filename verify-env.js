const fs = require('fs');

console.log('🔍 Verificando configuração do .env...\n');

if (!fs.existsSync('.env')) {
  console.log('❌ Arquivo .env não encontrado!');
  process.exit(1);
}

const envContent = fs.readFileSync('.env', 'utf8');
const contractAddressMatch = envContent.match(/NEXT_PUBLIC_CONTRACT_ADDRESS=(.+)/);

if (!contractAddressMatch) {
  console.log('❌ NEXT_PUBLIC_CONTRACT_ADDRESS não encontrado no .env');
  process.exit(1);
}

const address = contractAddressMatch[1].trim();

console.log('📋 Endereço configurado:', address);
console.log('📏 Tamanho:', address.length, 'caracteres');

if (!address.startsWith('0x')) {
  console.log('❌ ERRO: Endereço deve começar com 0x');
  process.exit(1);
}

if (address.length !== 42) {
  console.log('❌ ERRO: Endereço deve ter 42 caracteres (0x + 40 hex)');
  console.log('   Você provavelmente colocou o hash da transação no lugar do endereço!');
  process.exit(1);
}

// Validar se é hex válido
if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
  console.log('❌ ERRO: Endereço contém caracteres inválidos');
  process.exit(1);
}

console.log('✅ Endereço válido!');
console.log('\n📝 Configuração:');
console.log('   - Formato: ✓');
console.log('   - Tamanho: ✓');
console.log('   - Hex válido: ✓');
console.log('\n🔄 Lembre-se de reiniciar o servidor se ainda não fez:');
console.log('   npm run dev');
console.log('\n🌐 Aplicação disponível em:');
console.log('   http://localhost:3000');
console.log('   http://localhost:3000/dashboard');

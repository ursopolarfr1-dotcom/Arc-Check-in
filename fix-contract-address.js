// Script para corrigir o endereço do contrato no .env
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Corrigir Endereço do Contrato\n');
console.log('O hash da transação foi colocado no lugar do endereço do contrato.');
console.log('\n📋 Para encontrar o endereço correto:');
console.log('1. Acesse: https://testnet.arcscan.app/tx/0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86');
console.log('2. Procure por "Created Contract" ou "Contract Address"');
console.log('3. O endereço deve ter 42 caracteres (0x + 40 hex)\n');

rl.question('Cole o endereço do contrato aqui (ou pressione Enter para pular): ', (address) => {
  rl.close();
  
  if (!address || address.trim() === '') {
    console.log('\n⚠️  Nenhum endereço fornecido.');
    console.log('Você pode atualizar manualmente o arquivo .env depois.');
    return;
  }
  
  address = address.trim();
  
  // Validar formato
  if (!address.startsWith('0x') || address.length !== 42) {
    console.log('\n❌ Endereço inválido!');
    console.log('O endereço deve começar com 0x e ter 42 caracteres.');
    console.log('Exemplo: 0x1234567890abcdef1234567890abcdef12345678');
    return;
  }
  
  // Atualizar .env
  let envContent = '';
  
  if (fs.existsSync('.env')) {
    envContent = fs.readFileSync('.env', 'utf8');
  }
  
  // Remover linha antiga com hash incorreto
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
  
  // Limpar linhas vazias duplicadas
  envContent = envContent.replace(/\n\n\n+/g, '\n\n');
  
  fs.writeFileSync('.env', envContent);
  
  console.log('\n✅ Arquivo .env atualizado com sucesso!');
  console.log(`📝 Endereço configurado: ${address}`);
  console.log('\n🔄 Agora reinicie o servidor: npm run dev');
});

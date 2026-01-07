# 🚀 Preparar Deploy do Contrato

## ⚠️ Problemas Identificados

1. ❌ **Foundry não está instalado** - precisa instalar primeiro
2. ⚠️ **PRIVATE_KEY incorreto** - está com o hash da transação, não a chave privada

## 📋 Checklist Antes do Deploy

### 1. Instalar Foundry

```powershell
# Opção 1: Download manual
# Acesse: https://github.com/foundry-rs/foundry/releases/latest
# Baixe: foundry_nightly_windows_x86_64.msi

# Opção 2: Tentar novamente
irm https://github.com/foundry-rs/foundry/releases/latest/download/foundry_nightly_windows_x86_64.msi | iex
```

Verificar instalação:
```powershell
forge --version
```

### 2. Corrigir PRIVATE_KEY no .env

⚠️ **IMPORTANTE**: O `PRIVATE_KEY` atual está com o hash da transação, não a chave privada!

No arquivo `.env`, você precisa de:
```env
PRIVATE_KEY=sua_chave_privada_sem_0x_prefix
```

**ATENÇÃO**: 
- ❌ **NÃO** use: `0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86` (isso é um hash de transação)
- ✅ **USE**: Sua chave privada real da carteira que vai fazer o deploy (64 caracteres hex, sem 0x)

### 3. Obter USDC Testnet

Antes de fazer deploy, você precisa de USDC testnet para pagar gas:
- Acesse: https://faucet.circle.com
- Solicite USDC testnet para sua carteira

### 4. Configurar .env Corretamente

```env
# RPC da Arc Testnet
RPC_URL=https://rpc.testnet.arc.network

# SUA chave privada (sem 0x, 64 caracteres hex)
PRIVATE_KEY=sua_chave_privada_aqui

# Endereço do contrato (será preenchido após deploy)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# Chain ID
NEXT_PUBLIC_CHAIN_ID=5042002
```

## 🚀 Executar Deploy

Depois de corrigir tudo acima:

```bash
forge script script/Deploy.s.sol:DeployScript --rpc-url arc_testnet --broadcast --verify
```

### O que este comando faz:

1. **`forge script`** - Executa o script de deploy
2. **`script/Deploy.s.sol:DeployScript`** - Script e contrato a executar
3. **`--rpc-url arc_testnet`** - Usa o RPC configurado no foundry.toml
4. **`--broadcast`** - Envia a transação para a rede
5. **`--verify`** - Verifica o contrato no explorer (opcional, pode falhar sem ETHERSCAN_API_KEY)

## 📝 Após o Deploy

1. **Anote o endereço do contrato** que aparecerá no console
2. **Atualize o `.env`** com o endereço:
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xEnderecoDoContratoAqui
   ```
3. **Verifique no explorer**: https://testnet.arcscan.app/address/0x...

## ⚠️ Segurança

- **NUNCA** compartilhe sua chave privada
- **NUNCA** faça commit do `.env` no Git
- Use uma carteira separada para testes
- Use apenas fundos de teste

## 🆘 Se o Deploy Falhar

### Erro: "Insufficient funds"
- Obtenha mais USDC testnet no faucet

### Erro: "Nonce too low"
- Aguarde algumas confirmações ou reinicie o Foundry

### Erro: "Contract verification failed"
- Normal se não tiver ETHERSCAN_API_KEY configurado
- O contrato ainda será deployado, só não será verificado

### Erro: "PRIVATE_KEY not found"
- Verifique se o `.env` está na raiz do projeto
- Verifique se a variável está correta

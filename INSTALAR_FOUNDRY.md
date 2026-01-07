# 🔧 Como Instalar Foundry no Windows

## Opção 1: Instalação Automática (Recomendada)

### No PowerShell (como Administrador):

```powershell
irm https://github.com/foundry-rs/foundry/releases/latest/download/foundry_nightly_windows_x86_64.msi | iex
```

Se o comando acima falhar devido a problemas de conexão, tente:

### Opção 2: Download Manual

1. **Acesse**: https://github.com/foundry-rs/foundry/releases/latest
2. **Baixe**: `foundry_nightly_windows_x86_64.msi`
3. **Execute** o instalador baixado
4. **Siga** as instruções do instalador

### Opção 3: Via Chocolatey (se você tem Chocolatey instalado)

```powershell
choco install foundry
```

## ✅ Verificar Instalação

Após a instalação, verifique se está funcionando:

```powershell
forge --version
cast --version
anvil --version
```

Você deve ver algo como:
```
forge 0.2.0
cast 0.2.0
anvil 0.2.0
```

## 🔧 Se Não Estiver no PATH

Se os comandos não funcionarem, adicione ao PATH:
1. Encontre onde o Foundry foi instalado (geralmente `C:\Users\<seu-usuario>\.foundry\bin`)
2. Adicione ao PATH do Windows:
   - Pressione `Win + X` > Sistema > Configurações avançadas do sistema
   - Variáveis de ambiente > Path > Editar > Novo
   - Adicione o caminho do Foundry

## 📋 Usar Foundry

Depois de instalado, você pode:

### Compilar o contrato:
```bash
forge build
```

### Deploy do contrato:
```bash
forge script script/Deploy.s.sol:DeployScript --rpc-url arc_testnet --broadcast
```

### Testar o contrato:
```bash
forge test
```

## 🆘 Problemas Comuns

### "forge: command not found"
- Foundry não está no PATH
- Reinicie o PowerShell após instalação
- Verifique a instalação

### Erro de permissão
- Execute o PowerShell como Administrador

### Download falha
- Use o download manual (Opção 2)
- Verifique sua conexão de internet

## 📝 Próximos Passos Após Instalação

1. ✅ Verificar instalação: `forge --version`
2. ✅ Compilar contrato: `forge build`
3. ✅ Configurar `.env` com `PRIVATE_KEY` e `RPC_URL`
4. ✅ Deploy: `forge script script/Deploy.s.sol:DeployScript --rpc-url arc_testnet --broadcast`

# 🚀 Guia de Teste da Aplicação

## ⚠️ IMPORTANTE: Reinicie o Servidor

Como você atualizou o arquivo `.env`, é necessário **reiniciar o servidor** para que as mudanças sejam aplicadas:

1. **Pare o servidor atual**: Pressione `Ctrl+C` no terminal onde o servidor está rodando
2. **Inicie novamente**:
   ```bash
   npm run dev
   ```

## ✅ Checklist de Teste

### 1. Verificar Configuração
- [ ] Servidor reiniciado após atualizar `.env`
- [ ] Aplicação carregando em http://localhost:3000
- [ ] Sem erros no console do navegador

### 2. Testar Conexão de Carteira
- [ ] Instalar MetaMask (se ainda não tiver)
- [ ] Clicar em "Connect Wallet"
- [ ] Aprovar conexão no MetaMask
- [ ] Verificar se o endereço aparece no navbar

### 3. Testar Rede (Arc Testnet)
- [ ] Se estiver em outra rede, verá alerta "Wrong Network"
- [ ] Clicar em "Switch Network" ou adicionar manualmente:
  - **Network Name**: Arc Testnet
  - **RPC URL**: https://rpc.testnet.arc.network
  - **Chain ID**: 5042002
  - **Currency Symbol**: USDC

### 4. Obter USDC Testnet (se necessário)
- [ ] Acessar: https://faucet.circle.com
- [ ] Solicitar USDC testnet para sua carteira
- [ ] Aguardar confirmação

### 5. Testar Check-in On-chain
- [ ] Ir para Dashboard: http://localhost:3000/dashboard
- [ ] Verificar se os contadores aparecem (podem estar em 0 inicialmente)
- [ ] Clicar em "Check-in Now"
- [ ] Confirmar transação no MetaMask
- [ ] Aguardar confirmação (pode levar alguns segundos)
- [ ] Ver toast de sucesso com link para explorer
- [ ] Verificar se os contadores atualizaram

### 6. Verificar Dados On-chain
- [ ] **Points**: Deve mostrar pontos baseados no `userCount` do contrato
- [ ] **Total Check-ins**: Deve mostrar seu `userCount` on-chain
- [ ] **Global Check-ins**: Deve mostrar o `totalCount` do contrato

### 7. Testar Explorer Link
- [ ] Após check-in, clicar no link "View on Explorer" no toast
- [ ] Verificar se abre a transação no ArcScan
- [ ] Verificar se a transação está confirmada

## 🔍 Verificações Técnicas

### Console do Navegador (F12)
Verifique se há erros relacionados a:
- ❌ `CONTRACT_ADDRESS` inválido
- ❌ Erros de RPC
- ❌ Erros de rede

### Network Tab (F12 > Network)
- Verificar se há chamadas para `rpc.testnet.arc.network`
- Verificar status das requisições (devem ser 200)

## 🐛 Troubleshooting

### "Contract address not configured"
- Verifique se `.env` tem `NEXT_PUBLIC_CONTRACT_ADDRESS` preenchido
- Reinicie o servidor

### "Wrong network"
- Adicione Arc Testnet no MetaMask
- Ou clique em "Switch Network"

### "Insufficient funds"
- Obtenha USDC testnet no faucet: https://faucet.circle.com

### "Transaction failed"
- Verifique se tem gas suficiente (USDC)
- Verifique se o contrato está deployado corretamente
- Verifique o console para mais detalhes

## ✨ Funcionalidades Esperadas

✅ Conexão de carteira funciona
✅ Validação de rede automática
✅ Check-in envia transação on-chain
✅ Contadores atualizam automaticamente
✅ Link para explorer funciona
✅ UI mantém design original
✅ Animações funcionando

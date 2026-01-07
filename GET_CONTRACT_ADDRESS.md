# Como Encontrar o Endereço do Contrato

## Método 1: Via Explorer (Recomendado)

1. Acesse a transação de deploy no explorer:
   🔗 https://testnet.arcscan.app/tx/0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86

2. Na página da transação, procure por:
   - **"Created Contract"**
   - **"Contract Address"** 
   - **"To"** (se for uma criação de contrato, mostrará o endereço)

3. Copie o endereço (começa com `0x` e tem 42 caracteres)

4. Atualize o arquivo `.env`:
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xSeuEnderecoAqui
   ```

## Método 2: Via Foundry Broadcast (Se você tem o arquivo)

Se você executou o deploy com Foundry, verifique:

```
broadcast/Deploy.s.sol/5042002/run-latest.json
```

Procure pelo campo `contractAddress` no JSON.

## Método 3: Via RPC (Programático)

Você pode usar este comando para buscar via RPC:

```bash
curl -X POST https://rpc.testnet.arc.network \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86"],"id":1}'
```

Procure pelo campo `contractAddress` na resposta.

## Depois de Configurar

1. Salve o arquivo `.env`
2. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicação agora usará o contrato deployado!

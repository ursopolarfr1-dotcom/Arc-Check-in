# 🚀 Guia de Deployment - Arc Chek-IN

## ✅ Build Testado

O build local foi testado com sucesso! A aplicação está pronta para deploy.

## 📋 Opções de Deployment

### Opção 1: Vercel (Recomendado - Mais Fácil)

#### Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Código no GitHub/GitLab/Bitbucket (opcional, mas recomendado)

#### Passo a Passo

1. **Preparar o Repositório (Opcional mas Recomendado)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin seu-repositorio-github
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Acesse: https://vercel.com/new
   - Conecte seu repositório GitHub (ou faça upload do código)
   - Configure o projeto:
     - **Framework Preset**: Next.js
     - **Root Directory**: `./` (raiz)
     - **Build Command**: `npm run build` (já configurado)
     - **Output Directory**: `.next` (padrão)

3. **Configurar Variáveis de Ambiente**
   
   No dashboard do Vercel, vá em **Settings > Environment Variables** e adicione:
   
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x3600000000000000000000000000000000000000
   NEXT_PUBLIC_CHAIN_ID=5042002
   ```
   
   ⚠️ **IMPORTANTE**: Substitua `0x3600000000000000000000000000000000000000` pelo endereço real do seu contrato!

4. **Deploy**
   - Clique em **Deploy**
   - Aguarde o build (2-3 minutos)
   - Sua aplicação estará online!

#### Deploy via CLI (Alternativa)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

### Opção 2: Outros Provedores

#### Netlify
1. Conecte seu repositório
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Adicione as variáveis de ambiente

#### Railway
1. Conecte seu repositório
2. Build command: `npm run build`
3. Start command: `npm start`
4. Adicione as variáveis de ambiente

#### Self-hosted (VPS/Server)
```bash
# Build
npm run build

# Instalar PM2 (gerenciador de processos)
npm install -g pm2

# Iniciar
pm2 start npm --name "arc-checkin" -- start

# Salvar configuração
pm2 save
pm2 startup
```

## 🔐 Variáveis de Ambiente Necessárias

Configure estas variáveis no seu provedor de hosting:

| Variável | Valor | Obrigatória |
|----------|-------|-------------|
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | `0x...` (42 chars) | ✅ Sim |
| `NEXT_PUBLIC_CHAIN_ID` | `5042002` | ✅ Sim |

**Exemplo:**
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x3600000000000000000000000000000000000000
NEXT_PUBLIC_CHAIN_ID=5042002
```

## ✅ Checklist de Deployment

Antes de fazer deploy, verifique:

- [ ] Build local funciona (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] Endereço do contrato está correto
- [ ] Código commitado (se usando Git)
- [ ] `.env` não está no repositório (já no .gitignore)

## 🧪 Testar Após Deployment

1. **Acesse sua URL de produção**
2. **Teste conexão de carteira**
3. **Teste check-in on-chain**
4. **Verifique se os contadores aparecem**

## 🐛 Troubleshooting

### Build falha
- Verifique se todas as dependências estão no `package.json`
- Verifique logs de build no dashboard

### Variáveis de ambiente não funcionam
- Certifique-se de usar `NEXT_PUBLIC_` prefix
- Reinicie o deployment após adicionar variáveis

### Contrato não responde
- Verifique se o endereço está correto
- Verifique se o contrato está deployado na Arc Testnet

## 📝 Arquivos de Configuração Criados

- ✅ `vercel.json` - Configuração do Vercel
- ✅ `.vercelignore` - Arquivos ignorados no deploy
- ✅ Build testado localmente

## 🎉 Pronto para Deploy!

Sua aplicação está pronta. Escolha uma opção acima e faça o deploy!

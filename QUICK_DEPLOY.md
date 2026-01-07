# ⚡ Deploy Rápido - 3 Passos

## 🎯 Opção Mais Rápida: Vercel

### 1️⃣ Preparar Código (Opcional)

Se quiser usar Git:
```bash
git init
git add .
git commit -m "Ready for deployment"
```

### 2️⃣ Deploy no Vercel

**Opção A: Via Dashboard (Mais Fácil)**
1. Acesse: https://vercel.com/new
2. Clique em "Add New Project"
3. Importe seu repositório GitHub OU faça upload do código
4. Configure:
   - Framework: Next.js (detectado automaticamente)
   - Build Command: `npm run build` (já configurado)
5. **IMPORTANTE**: Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS` = `0x3600000000000000000000000000000000000000`
   - `NEXT_PUBLIC_CHAIN_ID` = `5042002`
6. Clique em "Deploy"

**Opção B: Via CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3️⃣ Configurar Variáveis de Ambiente

No dashboard do Vercel:
1. Vá em **Settings > Environment Variables**
2. Adicione:
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x3600000000000000000000000000000000000000
   NEXT_PUBLIC_CHAIN_ID=5042002
   ```
3. ⚠️ **Substitua pelo endereço real do seu contrato!**
4. Clique em "Redeploy" para aplicar

## ✅ Pronto!

Sua aplicação estará online em alguns minutos!

## 🔗 Links Úteis

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Documentação Vercel](https://vercel.com/docs)
- [Guia Completo](./DEPLOYMENT.md)

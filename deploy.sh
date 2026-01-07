#!/bin/bash
# Script de deploy rápido para Vercel

echo "🚀 Preparando deployment..."
echo ""

# Verificar se está logado no Vercel
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

# Verificar variáveis de ambiente
echo "🔍 Verificando variáveis de ambiente..."
if [ -z "$NEXT_PUBLIC_CONTRACT_ADDRESS" ]; then
    echo "⚠️  AVISO: NEXT_PUBLIC_CONTRACT_ADDRESS não está definida"
    echo "   Configure no dashboard do Vercel após o deploy"
fi

# Build local
echo "🔨 Fazendo build local..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build falhou! Corrija os erros antes de fazer deploy."
    exit 1
fi

echo "✅ Build concluído!"
echo ""
echo "🚀 Fazendo deploy para Vercel..."
vercel --prod

echo ""
echo "✅ Deploy concluído!"
echo "📝 Não esqueça de configurar as variáveis de ambiente no dashboard do Vercel!"

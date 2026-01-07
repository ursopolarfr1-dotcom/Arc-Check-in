# Script PowerShell para executar o deploy do contrato
# Execute: .\executar-deploy.ps1

Write-Host "=== Deploy do Contrato Counter ===" -ForegroundColor Cyan
Write-Host ""

# Verificar se Foundry esta instalado
Write-Host "1. Verificando Foundry..." -ForegroundColor Yellow
try {
    $forgeVersion = forge --version 2>&1
    Write-Host "   OK: Foundry instalado: $forgeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ERRO: Foundry nao esta instalado!" -ForegroundColor Red
    Write-Host "   Instale primeiro: https://github.com/foundry-rs/foundry/releases/latest" -ForegroundColor Yellow
    exit 1
}

# Verificar .env
Write-Host "2. Verificando .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    $envContent = Get-Content ".env" -Raw
    
    if ($envContent -match "PRIVATE_KEY=(.+)") {
        $privateKey = $matches[1].Trim()
        
        # Verificar se nao e o hash da transacao
        if ($privateKey -eq "0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86") {
            Write-Host "   AVISO: PRIVATE_KEY parece ser um hash de transacao!" -ForegroundColor Red
            Write-Host "   Voce precisa usar sua chave privada real (64 caracteres hex)" -ForegroundColor Yellow
            Write-Host "   Nao continue ate corrigir isso!" -ForegroundColor Red
            exit 1
        }
        
        Write-Host "   OK: PRIVATE_KEY encontrado" -ForegroundColor Green
    } else {
        Write-Host "   ERRO: PRIVATE_KEY nao encontrado no .env" -ForegroundColor Red
        exit 1
    }
    
    if ($envContent -match "RPC_URL=(.+)") {
        Write-Host "   OK: RPC_URL encontrado" -ForegroundColor Green
    } else {
        Write-Host "   ERRO: RPC_URL nao encontrado no .env" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "   ERRO: Arquivo .env nao encontrado" -ForegroundColor Red
    exit 1
}

# Verificar se tem USDC
Write-Host "3. Lembrete sobre USDC testnet..." -ForegroundColor Yellow
Write-Host "   Certifique-se de ter USDC testnet para gas:" -ForegroundColor Yellow
Write-Host "   https://faucet.circle.com" -ForegroundColor Cyan
Write-Host ""

# Confirmar deploy
Write-Host "4. Pronto para fazer deploy!" -ForegroundColor Green
Write-Host ""
$confirmation = Read-Host "Deseja continuar? (s/N)"

if ($confirmation -ne "s" -and $confirmation -ne "S") {
    Write-Host "Deploy cancelado." -ForegroundColor Yellow
    exit 0
}

# Executar deploy
Write-Host ""
Write-Host "Executando deploy..." -ForegroundColor Cyan
Write-Host ""

forge script script/Deploy.s.sol:DeployScript --rpc-url arc_testnet --broadcast --verify

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Deploy concluido com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Proximos passos:" -ForegroundColor Yellow
    Write-Host "1. Anote o endereco do contrato acima" -ForegroundColor White
    Write-Host "2. Atualize NEXT_PUBLIC_CONTRACT_ADDRESS no .env" -ForegroundColor White
    Write-Host "3. Verifique no explorer: https://testnet.arcscan.app" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "Deploy falhou!" -ForegroundColor Red
    Write-Host "Verifique os erros acima." -ForegroundColor Yellow
}

# Arc Chek-IN - Daily Web3 Rewards Platform

A modern, animated Web3 daily check-in platform built for ARC TestNet with on-chain counter contract integration.

## Features

- **Daily Check-ins**: On-chain counter system with 24-hour cooldown
- **Real-time Data**: Live user count and global total from smart contract
- **Multi-Language**: Full i18n support (English, Portuguese, French, Spanish)
- **Wallet Integration**: MetaMask support with automatic chain switching
- **Theme Support**: Light and dark modes with smooth transitions
- **Animated UI**: Framer Motion animations throughout
- **On-chain Tracking**: All check-ins stored on Arc Testnet blockchain

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Web3**: wagmi v2, viem v2
- **Smart Contracts**: Solidity 0.8.20, Foundry
- **UI**: shadcn/ui, Framer Motion
- **State**: Zustand, React Query

## Network: Arc Testnet

- **Chain ID**: 5042002
- **RPC**: https://rpc.testnet.arc.network
- **Explorer**: https://testnet.arcscan.app
- **Native Currency**: USDC (6 decimals)
- **Gas**: Paid in USDC testnet tokens

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Foundry (for contract deployment)

```bash
# On macOS/Linux
curl -L https://foundry.paradigm.xyz | bash
foundryup

# On Windows (PowerShell)
irm https://github.com/foundry-rs/foundry/releases/latest/download/foundry_nightly_windows_x86_64.msi | iex
```

### 3. Deploy Smart Contract

1. Create `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Edit `.env` and add your private key:
```
RPC_URL=https://rpc.testnet.arc.network
PRIVATE_KEY=your_private_key_without_0x_prefix
```

3. Get USDC testnet tokens from [Circle Faucet](https://faucet.circle.com)

4. Deploy the contract:
```bash
forge script script/Deploy.s.sol:DeployScript --rpc-url arc_testnet --broadcast --verify
```

5. After deployment, you'll get a transaction hash. To find the contract address:
   - **Option A**: Check `deployments/arc-testnet.json` (created automatically)
   - **Option B**: Visit the transaction on [ArcScan](https://testnet.arcscan.app/tx/YOUR_TX_HASH) and look for "Created Contract"
   - **Option C**: Check `broadcast/Deploy.s.sol/5042002/run-latest.json` for `contractAddress`

6. Update `.env` with the contract address:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

**Example**: If your deployment tx hash is `0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86`, visit:
https://testnet.arcscan.app/tx/0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Smart Contract

The `Counter.sol` contract tracks:
- `userCount[address]`: Individual check-in count per wallet
- `totalCount`: Global total check-in count
- `Count` event: Emitted on each check-in

### Contract Functions

- `increment()`: Increments user and global counters
- `userCount(address)`: Returns count for a specific address
- `totalCount()`: Returns global total count
- `getCounts(address)`: Returns both user and total counts in one call

## Usage

### Connect Wallet

1. Click "Connect Wallet" button
2. Approve MetaMask connection
3. If on wrong network, click "Switch Network" to Arc Testnet

### Check In

1. Ensure wallet is connected and on Arc Testnet
2. Click "Check-in Now" button
3. Confirm transaction in MetaMask
4. Wait for confirmation (transaction hash shown with explorer link)
5. Counters update automatically

### View Stats

- **Points**: Calculated from user check-in count (10 points per check-in)
- **Total Check-ins**: Your personal on-chain count
- **Global Check-ins**: Total count across all users

## Troubleshooting

### "Wrong Network" Error

- Ensure you're connected to Arc Testnet (Chain ID: 5042002)
- Click "Switch Network" button if available
- Or manually add network in MetaMask:
  - Network Name: Arc Testnet
  - RPC URL: https://rpc.testnet.arc.network
  - Chain ID: 5042002
  - Currency Symbol: USDC

### "Insufficient Gas" Error

- Get USDC testnet tokens from [Circle Faucet](https://faucet.circle.com)
- Ensure you have enough USDC for gas fees

### "User Rejected" Error

- Transaction was cancelled in MetaMask
- Simply try again and approve the transaction

### Contract Not Found

- Ensure `NEXT_PUBLIC_CONTRACT_ADDRESS` is set in `.env`
- Verify contract was deployed successfully
- Check `deployments/arc-testnet.json` for the address

## Project Structure

```
├── contracts/
│   └── Counter.sol          # Smart contract
├── script/
│   └── Deploy.s.sol         # Deployment script
├── lib/
│   ├── arcChain.ts          # Arc Testnet configuration
│   ├── contract.ts          # Contract ABI and address
│   └── web3.ts              # wagmi hooks and utilities
├── providers/
│   └── wagmi.tsx            # WagmiProvider setup
└── components/
    ├── checkin-button.tsx   # Check-in interaction
    ├── stats-cards.tsx      # On-chain stats display
    └── chain-guard.tsx     # Network validation
```

## Environment Variables

Required in `.env`:
- `RPC_URL`: Arc Testnet RPC endpoint
- `PRIVATE_KEY`: Deployer private key (for contract deployment)
- `NEXT_PUBLIC_CONTRACT_ADDRESS`: Deployed contract address
- `NEXT_PUBLIC_CHAIN_ID`: 5042002

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Contract

Already deployed to Arc Testnet. Address saved in `deployments/arc-testnet.json`.

## License

MIT

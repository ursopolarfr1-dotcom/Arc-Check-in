# Deployment Information

## Transaction Hash
```
0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86
```

## View on Explorer
🔗 [View Transaction](https://testnet.arcscan.app/tx/0xef1edd2bfebb9ad2e2f6dd39b6fefc11e47a158c4113dd2e3420051694dc0a86)

## Finding the Contract Address

1. Open the transaction link above
2. Look for the **"Created Contract"** or **"Contract Address"** field
3. Copy the address (should start with `0x` and be 42 characters long)
4. Update your `.env` file:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddressHere
```

## Alternative: Using Foundry Receipt

If you have the broadcast folder from Foundry, check:
```
broadcast/Deploy.s.sol/5042002/run-latest.json
```

Look for the `contractAddress` field in the deployment receipt.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
bun dev
```

Copy the environment variables file to create your local environment:

```bash
cp .env.example .env
```

# Environment Variables Documentation

### `NEXT_PUBLIC_TEST_NETWORK`
Network identifier for testing environment. Used to configure which blockchain test network the application connects to.

### `NEXT_PUBLIC_MINT_URL`
URL where users can be sent to for minting NFTs


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Mainnet Configuration Setup

To configure the application for mainnet:

1. In `config.ts`, update the `abstract.id` key for each contract with the corresponding mainnet contract address.
2. Update the `SUBGRAPH_URL` in `constants.ts` to point to the mainnet subgraph URL.
3. Set `NEXT_PUBLIC_TEST_NETWORK=false` in your `.env` file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Environment Setup on Vercel

Before deploying to Vercel:

1. Ensure all environment variables are configured in your Vercel project settings
2. Set the environment variables according to your target network (testnet/mainnet)
3. Verify that all mainnet configurations are properly set up as described in the Mainnet Configuration section

Check your deployment preview to confirm everything works as expected before deploying to production.

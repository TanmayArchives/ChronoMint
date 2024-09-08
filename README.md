# Liquidating-an-NFT-to-any-token

Problem to Solve

Solana-based NFTs are primarily denominated in SOL. However, many traders and collectors might prefer to interact with USDC and USDT. Allowing NFTs to be liquidated in any token, particularly stablecoins like USDC, can significantly simplify matters.

Possible Solution

Introduce an NFT liquidation platform that enables users to instantly exchange any SOL-based NFT for any SPL token at the currently available best price.

This platform will leverage two key services:

Marketplace aggregators like Tensor, which facilitate the sale of NFTs at the optimal prices (in SOL).
Swap aggregators like Jupiter, which convert SOL to any token at the best available prices. Both Jupiter’s pricing and swap APIs will be utilized in this process.
The user workflow is as follows: A user clicks on the 'swap' option, connects their SOL wallet, selects the NFT they wish to swap, and designates the desired token for exchange/receipt. Subsequently, they await the aggregator to identify the most advantageous route, choose the option that best suits their preferences, and then execute the swap.

Resources

Jupiter APIs - https://station.jup.ag/docs/apis
Tensor Docs - https://docs.tensor.trade/

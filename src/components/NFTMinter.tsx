import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Wallet } from "lucide-react";
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, Connection, clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { percentAmount, generateSigner } from '@metaplex-foundation/umi';
import { createBundlrUploader } from '@metaplex-foundation/umi-uploader-bundlr';
import { createNft } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

export default function NFTMinter() {
  const wallet = useWallet();
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => {
    if (network === WalletAdapterNetwork.Devnet) {
      const quicknodeUrl = process.env.NEXT_PUBLIC_QUICKNODE_URL;
      const quicknodeApiKey = process.env.NEXT_PUBLIC_QUICKNODE_API_KEY;

      if (quicknodeUrl && quicknodeApiKey) {
        return `${quicknodeUrl}/${quicknodeApiKey}`;
      } else {
        return clusterApiUrl(network);
      }
    }
    return clusterApiUrl(network);
  }, [network]);

  const connection = useMemo(() => new Connection(endpoint), [endpoint]);
  const umi = useMemo(() => {
    const umi = createUmi(endpoint).use(mplTokenMetadata());

    if (wallet.publicKey) {
      umi.use(walletAdapterIdentity(wallet));
    }

    return umi;
  }, [endpoint, wallet]);

  useEffect(() => {
    console.log("Current endpoint:", endpoint);
  }, [endpoint]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  })

  const checkBalance = async () => {
    if (!wallet.publicKey) {
      toast.error('Wallet not connected');
      return;
    }
    try {
      const balance = await connection.getBalance(wallet.publicKey);
      setWalletBalance(balance / LAMPORTS_PER_SOL);
      console.log(`Wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
      console.error('Error checking balance:', error);
      toast.error('Failed to check wallet balance.');
    }
  };

  const mintNFT = async () => {
    if (!wallet.publicKey || !image) return;
    setIsLoading(true);

    try {
      await checkBalance();

      if (walletBalance === null || walletBalance < 0.05) {
        throw new Error(`Insufficient balance: ${walletBalance} SOL. Minimum 0.05 SOL required.`);
      }

      const imageDataUrl = await toBase64(image);

      // Upload metadata
      const bundlrUploader = createBundlrUploader(umi);
      const uri = await bundlrUploader.uploadJson({
        name,
        description,
        image: imageDataUrl,
      });

      // Create NFT
      const mint = generateSigner(umi);
      const { signature } = await createNft(umi, {
        mint,
        name,
        uri,
        sellerFeeBasisPoints: percentAmount(5), // 5%
      }).sendAndConfirm(umi);

      console.log("NFT created. Signature:", signature);
      toast.success(`NFT minted successfully! Mint address: ${mint.publicKey}`);
    } catch (error) {
      console.error('Error minting NFT:', error);
      let errorMessage = 'Failed to mint NFT. ';
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  return (
    <div className="grid grid-cols-1 my-6 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="nft-name" className="text-sm font-medium">NFT Name</label>
          <Input
            id="nft-name"
            type="text"
            placeholder="Enter NFT name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="nft-description" className="text-sm font-medium">NFT Description</label>
          <Textarea
            id="nft-description"
            placeholder="Enter NFT description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Wallet Balance</span>
            <Button variant="outline" size="sm" onClick={checkBalance}>
              <Wallet className="mr-2 h-4 w-4" />
              Check Balance
            </Button>
          </div>
          <p className="text-sm font-medium">
            {walletBalance !== null ? `${walletBalance.toFixed(4)} SOL` : 'Click "Check Balance" to view'}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">NFT Image</label>
          <div
            {...getRootProps()}
            className={`p-4 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors h-40
                            ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
          >
            <input {...getInputProps()} />
            {image ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-sm">{image.name}</p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm">Drag & drop an image here, or click to select</p>
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={mintNFT}
          disabled={!name || !description || !image || isLoading || !wallet.publicKey || walletBalance === null || walletBalance < 0.05}
          className="w-full"
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? 'Minting...' : 'Mint NFT'}
        </Button>
      </div>
    </div>
  )
}

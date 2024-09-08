import { useState, useCallback, useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useWallet } from '@solana/wallet-adapter-react';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { LAMPORTS_PER_SOL, Connection } from '@solana/web3.js';

interface NFTMinterProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export default function NFTMinter({ onSuccess, onError }: NFTMinterProps) {
  const wallet = useWallet();
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const connection = useMemo(() => new Connection("https://api.devnet.solana.com", "confirmed"), []);

  useEffect(() => {
    console.log("Current endpoint:", connection.rpcEndpoint);
  }, [connection]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {'image/*': []}
  })

  const checkBalance = async () => {
    if (!wallet.publicKey) {
      onError('Wallet not connected');
      return;
    }
    try {
      const balance = await connection.getBalance(wallet.publicKey);
      setWalletBalance(balance / LAMPORTS_PER_SOL);
      console.log(`Wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
      console.error('Error checking balance:', error);
      onError('Failed to check wallet balance.');
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
      const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))

      console.log("Uploading metadata...");
      const { uri } = await metaplex.nfts().uploadMetadata({
        name,
        description,
        image: imageDataUrl,
      });
      console.log("Metadata uploaded. URI:", uri);

      console.log("Creating NFT...");
      const { nft } = await metaplex
        .nfts()
        .create({
          uri,
          name,
          sellerFeeBasisPoints: 500, // 5%
        });
      console.log("NFT created. Address:", nft.address.toBase58());

      onSuccess(`NFT minted successfully! Mint address: ${nft.address.toBase58()}`);
    } catch (error) {
      console.error('Error minting NFT:', error);
      let errorMessage = 'Failed to mint NFT. ';
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      onError(errorMessage);
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
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="NFT Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="NFT Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div 
        {...getRootProps()} 
        className={`p-4 border-2 border-dashed rounded-md text-center cursor-pointer
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {image ? (
          <p>Image selected: {image.name}</p>
        ) : isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop an image here, or click to select one</p>
        )}
      </div>
      <p>Wallet Balance: {walletBalance !== null ? `${walletBalance.toFixed(4)} SOL` : ' click on Checking...'}</p>
      <Button 
        onClick={checkBalance} 
        className="w-full mb-2"
      >
        Check Balance
      </Button>
      <Button 
        onClick={mintNFT} 
        disabled={!name || !description || !image || isLoading || !wallet.publicKey || walletBalance === null || walletBalance < 0.05}
        className="w-full"
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isLoading ? 'Minting...' : 'Mint NFT'}
      </Button>
    </div>
  )
}

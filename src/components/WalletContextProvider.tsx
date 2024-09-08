import dynamic from 'next/dynamic';

const WalletContextProviderInner = dynamic(
  () => import('./WalletContextProviderInner'),
  { ssr: false }
);

export default WalletContextProviderInner;
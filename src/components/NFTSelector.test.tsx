import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import NFTSelector from './NFTSelector'

jest.mock('@solana/wallet-adapter-react', () => ({
  ...jest.requireActual('@solana/wallet-adapter-react'),
  useWallet: () => ({
    publicKey: 'mock-public-key',
    connected: true,
  }),
  useConnection: () => ({
    connection: {},
  }),
}))

describe('NFTSelector', () => {
  it('renders without crashing', () => {
    render(<NFTSelector onSelect={() => { } } selectedNFT={null} />)
    expect(screen.getByText('Select NFT')).toBeInTheDocument()
  })

  it('displays loading state when fetching NFTs', () => {
    render(<NFTSelector onSelect={() => { } } selectedNFT={null} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })


})
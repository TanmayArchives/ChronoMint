import React from 'react'

export default function Landing() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen p-8 font-sans"
        >
            {/* <SelectTheme /> */}
            <div className="container mx-auto max-w-6xl">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    className="text-6xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                >
                    NFT Liquidator
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12 text-center text-xl"
                >
                    Instantly swap your Solana NFTs for any SPL token at the best available price.
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid md:grid-cols-3 gap-8 mb-12"
                >
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Marketplace Aggregation</h3>
                        <p>We use Tensor to find the best prices for your NFTs in SOL.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Token Swaps</h3>
                        <p>Jupiters swap aggregator ensures you get the best rates when converting to your desired token.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">User-Friendly</h3>
                        <p>Simple interface to connect, select, and swap with just a few clicks.</p>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3 }}
                            className="mb-8"
                        >
                            <Notification
                                message={notification.message}
                                type={notification.type}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 bg-gray-700 rounded-xl mb-8">
                        <Tab
                            className={({ selected }) =>
                                `w-full py-2.5 text-sm font-medium leading-5 text-white rounded-lg
                   focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                   ${selected ? 'bg-blue-600 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
                            }
                        >
                            Swap NFT
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `w-full py-2.5 text-sm font-medium leading-5 text-white rounded-lg
                   focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                   ${selected ? 'bg-blue-600 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
                            }
                        >
                            Mint NFT
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="grid gap-8 md:grid-cols-2">
                                <motion.div
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                                >
                                    <NFTSelector onSelect={handleNFTSelect} />
                                </motion.div>

                                <motion.div
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                                >
                                    <TokenSelector onSelect={setSelectedToken} />
                                </motion.div>
                            </div>

                            {selectedNFT && (
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-8"
                                >
                                    <SwapButton
                                        selectedNFT={selectedNFT}
                                        selectedToken={selectedToken}
                                        onSuccess={(message) => showNotification(message, 'success')}
                                        onError={(message) => showNotification(message, 'error')}
                                    />
                                </motion.div>
                            )}
                        </Tab.Panel>
                        <Tab.Panel>
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                            >
                                <NFTMinter
                                    onSuccess={(message) => showNotification(message, 'success')}
                                    onError={(message) => showNotification(message, 'error')}
                                />
                            </motion.div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </motion.main>
    )
}

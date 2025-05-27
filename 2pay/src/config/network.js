// Network configuration constants
export const NETWORKS = {
  'base-sepolia': {
    chainId: 84532,
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    explorerUrl: 'https://sepolia.basescan.org',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    }
  },
  'base': {
    chainId: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    explorerUrl: 'https://basescan.org',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    }
  }
};

// Get current network configuration from environment variables
export const getCurrentNetwork = () => {
  const networkName = import.meta.env.VITE_NETWORK_NAME;
  return NETWORKS[networkName] || NETWORKS['base-sepolia']; // Default to testnet
};

// Helper function to format transaction hash into explorer URL
export const getExplorerUrl = (txHash) => {
  const network = getCurrentNetwork();
  return `${network.explorerUrl}/tx/${txHash}`;
};

// Helper function to format address into explorer URL
export const getAddressExplorerUrl = (address) => {
  const network = getCurrentNetwork();
  return `${network.explorerUrl}/address/${address}`;
};

// Get chain parameters for wallet network switching
export const getChainParameters = () => {
  const network = getCurrentNetwork();
  return {
    chainId: `0x${network.chainId.toString(16)}`, // Convert to hex
    chainName: network.name,
    nativeCurrency: network.nativeCurrency,
    rpcUrls: [network.rpcUrl],
    blockExplorerUrls: [network.explorerUrl]
  };
};

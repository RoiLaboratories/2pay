import React, { useState, useEffect } from "react";
import "../css-files/landingPage.css";
import "../css-files/cards.css";
import { Link } from "react-router-dom";
import "../css-files/modal.css";
import { poolService } from '../services/api';
import { usePrivy } from '@privy-io/react-auth';
import { ethers, parseUnits } from 'ethers';
import axios from 'axios';
import { getChainParameters, getContractAddresses } from '../config/network';

const Cards = ({ howitworks }) => {
  const [poolStatus, setPoolStatus] = useState({
    1: { currentBatch: 0, contributorsInBatch: 0, nextPayoutIndex: 0 },
    2: { currentBatch: 0, contributorsInBatch: 0, nextPayoutIndex: 0 },
    3: { currentBatch: 0, contributorsInBatch: 0, nextPayoutIndex: 0 }
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [transactionState, setTransactionState] = useState("idle");
  const { authenticated, user, wallet } = usePrivy();  const [walletAddress, setWalletAddress] = useState("");
  const [tokenReady, setTokenReady] = useState(false);

  // Fetch JWT token afterwallet connection
  useEffect(() => {
    async function fetchJwt() {
      if (authenticated && user?.wallet?.address) {
        setWalletAddress(user.wallet.address);
        // Always fetch a new token after wallet connect
        try {
          console.log('Fetching nonce for address:', user.wallet.address);          // Get nonce from backend
          const nonceRes = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/nonce`, { address: user.wallet.address });
          const nonce = nonceRes.data.nonce;
          console.log('Nonce received:', nonce);
          // Detect wallet type and get signer
          let provider, signer;
          if (user.wallet.walletClientType === 'metamask' || user.wallet.connectorType === 'injected') {
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();
          } else if (typeof user.wallet.getEthersProvider === 'function') {
            provider = await user.wallet.getEthersProvider();
            signer = provider.getSigner();
          } else {
            throw new Error('No compatible wallet provider found.');
          }
          const signature = await signer.signMessage(nonce);
          console.log('Signature:', signature);          // Send signature to backend to get JWT
          const loginRes = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/login`, {
            address: user.wallet.address,
            signature
          });
          console.log('Login response:', loginRes);
          const token = loginRes.data.token;
          localStorage.setItem('token', token);
          console.log('JWT token stored in localStorage:', token);
          setTokenReady(true);
        } catch (err) {
          console.error('Failed to fetch JWT token:', err);
          localStorage.removeItem('token');
          setTokenReady(false);
        }
      }
    }
    fetchJwt();
  }, [authenticated, user, wallet]);

  // Fetch pool status only after token is ready
  useEffect(() => {
    if (!tokenReady) return;
    const fetchPoolStatus = async () => {
      // Only fetch if JWT token is present
      if (!localStorage.getItem('token')) return;
      try {
        const [tier1, tier2, tier3] = await Promise.all([
          poolService.getPoolStatus(1),
          poolService.getPoolStatus(2),
          poolService.getPoolStatus(3)
        ]);
        
        setPoolStatus({
          1: tier1.data,
          2: tier2.data,
          3: tier3.data
        });
      } catch (error) {
        console.error('Failed to fetch pool status:', error);
      }
    };

    fetchPoolStatus();
    const interval = setInterval(fetchPoolStatus, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [tokenReady, authenticated, user]);

  useEffect(() => {
    if (authenticated && user?.wallet?.address) {
      setWalletAddress(user.wallet.address);
    }
  }, [authenticated, user]);

  const getProgressWidth = (tier) => {
    const status = poolStatus[tier];
    return `${(status.contributorsInBatch / 5) * 100}%`;
  };

  const openModal = (price) => {
    setSelectedPrice(price);
    setModalOpen(true);
    setTransactionState("idle");
  };
  const resetModal = () => {
    setModalOpen(false);
    setSelectedPrice(null);
    setTransactionState("idle");  };

  async function ensureCorrectNetwork() {
    if (window.ethereum) {
      const chainParams = getChainParameters();
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (currentChainId !== chainParams.chainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainParams.chainId }],
          });
          return true;
        } catch (switchError) {
          // If the network is not added, prompt to add it
          if (switchError.code === 4902) {
            await window.ethereum.request({            method: 'wallet_addEthereumChain',
              params: [chainParams],
            });
            return true;
          }
          throw switchError;
        }
      }
      return true;
    }
    return false;
  }

  const confirmTransaction = async () => {
    if (!tokenReady || !localStorage.getItem('token')) {
      setTransactionState('networkError');
      alert('Authentication error: Please reconnect your wallet.');
      return;
    }
    setTransactionState("loading");
    try {      const networkParams = getChainParameters();
      const switched = await ensureCorrectNetwork();      
      if (!switched) throw new Error(`Please connect to ${networkParams.chainName} network.`);
      if (!authenticated || !user?.wallet?.address) throw new Error('Wallet not connected');
      // Detect wallet type and get signer
      let provider, signer;
      if (user.wallet.walletClientType === 'metamask' || user.wallet.connectorType === 'injected') {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
      } else if (typeof user.wallet.getEthersProvider === 'function') {
        provider = await user.wallet.getEthersProvider();
        signer = provider.getSigner();
      } else {
        throw new Error('No compatible wallet provider found.');      }      
      // Get contract addresses from network config
      const { USDC: USDC_ADDRESS, TwoPay: TWO_PAY_ADDRESS } = getContractAddresses();

      // Debug logging for addresses
      console.log('Using addresses:', {
        USDC: USDC_ADDRESS,
        TwoPay: TWO_PAY_ADDRESS
      });

      if (!USDC_ADDRESS || !TWO_PAY_ADDRESS) {
        throw new Error('Contract addresses not properly configured');
      }

      const USDC_ABI = [
        "function approve(address spender, uint256 amount) external returns (bool)",
        "function allowance(address owner, address spender) external view returns (uint256)",
        "function balanceOf(address account) external view returns (uint256)",
        "function transfer(address to, uint256 amount) external returns (bool)",
        "function transferFrom(address from, address to, uint256 amount) external returns (bool)"
      ];
      const TWO_PAY_ABI = [
        "function contribute(uint256 tier) external",
        "function hasContributed(address, uint256) external view returns (bool)",
        "function pools(uint256) external view returns (uint256 contributionAmount, uint256 currentBatch)",
        "function owner() external view returns (address)",
        "event ContributionAdded(address indexed contributor, uint256 indexed tier, uint256 batch)",
        "event PayoutProcessed(address indexed contributor, uint256 amount, uint256 indexed tier, uint256 batch)"
      ];
      
      // Create contract instances
      const usdc = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);
      const twoPay = new ethers.Contract(TWO_PAY_ADDRESS, TWO_PAY_ABI, signer);

      // Verify contracts are properly initialized
      if (!usdc || !twoPay) {
        throw new Error('Failed to initialize contracts');
      }

      // Debug contract methods
      console.log('Available contract functions:', {
        usdc: USDC_ABI.map(item => item.startsWith('function') ? item.split('function ')[1].split('(')[0] : null).filter(Boolean),
        twoPay: TWO_PAY_ABI.map(item => item.startsWith('function') ? item.split('function ')[1].split('(')[0] : null).filter(Boolean)
      });
      // Get the tier number
      const tier = selectedPrice === 10 ? 1 : selectedPrice === 50 ? 2 : 3;
        // Check if user has already contributed to this tier
      const hasUserContributed = await twoPay.hasContributed(await signer.getAddress(), tier);
      if (hasUserContributed) {
        setTransactionState("error");
        setModalOpen(true); // Ensure modal stays open to show error
        return;
      }

      // Calculate amount based on tier
      let amount;
      if (selectedPrice === 10) amount = parseUnits("10", 6);
      else if (selectedPrice === 50) amount = parseUnits("50", 6);
      else if (selectedPrice === 500) amount = parseUnits("500", 6);
      else throw new Error('Invalid tier');

      // First approve USDC spending
      const allowance = await usdc.allowance(await signer.getAddress(), TWO_PAY_ADDRESS);
      if (allowance < amount) {
        const approveTx = await usdc.approve(TWO_PAY_ADDRESS, amount);
        await approveTx.wait();
      }      // Verify contract state before contribution
      const usdcBalance = await usdc.balanceOf(await signer.getAddress());
      console.log('USDC Balance:', ethers.formatUnits(usdcBalance, 6));
      
      // Then make contribution
      console.log('Making contribution with tier:', tier);
      const tx = await twoPay.contribute(tier);
      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction confirmed');
      try {
        await poolService.registerContribution(
          tier,
          tx.hash
        );
        setTransactionState("success");
      } catch (apiError) {
        // Transaction succeeded but API failed
        setTransactionState("networkError");
        alert('Your contribution was sent on-chain, but we could not record it in our system. Please contact support with your transaction hash: ' + tx.hash);
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      const errMsg = error.message?.toLowerCase() || '';
      if (
        errMsg.includes('insufficient') ||
        errMsg.includes('transfer amount exceeds balance')
      ) {
        setTransactionState('insufficient');
      } else {
        setTransactionState('networkError');
      }
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className={`${modalOpen ? "open" : ""} modal-overlay`}
        onClick={resetModal}
        style={{ display: modalOpen ? "flex" : "none" }}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Transaction State Views */}
          {transactionState === "loading" && (
            <div className="modal-feedback loading">
              <div className="spinner"></div>
              <p>Transaction Loading...</p>
            </div>
          )}

          {transactionState === "success" && (
            <div className="modal-feedback success">
              <p>✅ Transaction Complete</p>
              <small>
                You have successfully made a contribution to this pool.
              </small>
              <button className="btn blue" onClick={resetModal}>
                Close
              </button>
            </div>
          )}          {transactionState === "insufficient" && (
            <div className="modal-feedback error">
              <p>❌ Transaction Failed</p>
              <small>
                You have insufficient balance to contribute to this pool.
              </small>
              <button className="btn blue" onClick={resetModal}>
                Close
              </button>
            </div>
          )}

          {transactionState === "error" && (
            <div className="modal-feedback error">
              <p>❌ Transaction Failed</p>
              <small>
                Transaction failed, You have already contributed to this tier.
              </small>
              <button className="btn blue" onClick={resetModal}>
                Close
              </button>
            </div>
          )}

          {transactionState === "networkError" && (
            <div className="modal-feedback error">
              <p>❌ Transaction Failed</p>
              <small>There was a network error. Please try again later.</small>
              <button className="btn blue" onClick={resetModal}>
                Close
              </button>
            </div>
          )}

          {transactionState === "idle" && (
            <>
              <h2 className="modal-title">Contribute</h2>
              <div className="modal-box">
                <div className="modal-box-left">
                  <div className="pay-section">
                    <div className="label">Pay</div>
                    <div className="pay-amount">
                      <span className="usdc-icon">
                        <img src="Frame521.png" alt="" />
                      </span>
                      <div>
                        <strong>{selectedPrice} USDC</strong>
                        <div className="subtext">${selectedPrice}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-box-right">
                  <div className="label">Address</div>
                  <div className="address-box">{walletAddress ? walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4) : 'Not connected'}</div>
                </div>
              </div>

              <div className="modal-summary">
                <div className="row">
                  <span>Network fee</span>
                  <span>
                    <div className="eth-price">
                      &lt;0.01
                      <span className="eth-icon">
                        <img src="ethereum-eth-logo.png" alt="" />
                      </span>
                    </div>
                  </span>
                </div>
                <div className="row">
                  <span>Total</span>
                  <span>${selectedPrice}</span>
                </div>
              </div>

              <div className="modal-buttons">
                <button className="cancel-btn" onClick={resetModal}>
                  Cancel
                </button>
                <button className="confirm-btn" onClick={confirmTransaction}>
                  Confirm
                </button>
              </div>
            </>
          )}
        </div>      </div>

      {/* How It Works Section */}
      <div className="cards__div">
        <div className="mainheading">
          <h1>{howitworks}</h1>
        </div>
        <div className="cards">
          <div className="card-1 box card">
            <div className="card__heading">Connect Wallet</div>
            <div className="card__body">Link your web3 wallet in seconds</div>
          </div>
          <div className="card-2 box card">
            <div className="card__heading">Choose Pools</div>
            <div className="card__body">
              Select from a variety of contribution pool tier options and
              contribute.
            </div>
          </div>
          <div className="card-3 box card">
            <div className="card__heading">Earn and Claim</div>
            <div className="card__body">
              Watch your crypto grow and claim rewards when the pool gets
              filled.
            </div>
          </div>
        </div>
      </div>

      {/* Contribute Section */}
      <div className="contribute__div" id="contribute">
        <div className="mainheading">
          <h1>Contribute</h1>
        </div>
        <div className="cards">
          {/* Tier 1 */}
          <div className="card-1 box card">
            <div className="contribute__heading">
              Tier 1
              <div className="progress__bar">
                <div className="progress__num">
                  {poolStatus[1].contributorsInBatch < 5 ? poolStatus[1].contributorsInBatch : "Filled"}
                </div>
                <div
                  className="progress__indicator"
                  style={{ width: getProgressWidth(1) }}
                ></div>
              </div>
            </div>
            <div className="card__body">
              <div className="currency">USDC</div>
              <div className="price__value">$10</div>
              <button
                className="btn blue contribute__btn"
                onClick={() => openModal(10)}
                disabled={poolStatus[1].contributorsInBatch >= 5}
              >
                Contribute
              </button>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="card-2 box card">
            <div className="contribute__heading">
              Tier 2
              <div className="progress__bar">
                <div className="progress__num">
                  {poolStatus[2].contributorsInBatch < 5 ? poolStatus[2].contributorsInBatch : "Filled"}
                </div>
                <div
                  className="progress__indicator"
                  style={{ width: getProgressWidth(2) }}
                ></div>
              </div>
            </div>
            <div className="card__body">
              <div className="currency">USDC</div>


              {/* <div className="price__value">$200</div> */}

              <div className="price__value">$50</div>
              <button
                className="btn blue contribute__btn"
                onClick={() => openModal(50)}
                disabled={poolStatus[2].contributorsInBatch >= 5}
              >
                Contribute
              </button>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="card-3 box card">
            <div className="contribute__heading">
              Tier 3
              <div className="progress__bar">
                <div className="progress__num">
                  {poolStatus[3].contributorsInBatch < 5 ? poolStatus[3].contributorsInBatch : "Filled"}
                </div>
                <div
                  className="progress__indicator"
                  style={{ width: getProgressWidth(3) }}
                ></div>
              </div>
            </div>
            <div className="card__body">
              <div className="currency">USDC</div>
              <div className="price__value">$500</div>
              <button
                className="btn blue contribute__btn"
                onClick={() => openModal(500)}
                disabled={poolStatus[3].contributorsInBatch >= 5}
              >
                Contribute
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;

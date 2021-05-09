import React from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, Link } from "./components";
import logo from "./Logo_Maker.png";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = getDefaultProvider();
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  const ceaErc20 = new Contract(addresses.ceaErc20, abis.erc20, defaultProvider);
  // A pre-defined address that owns some CEAERC20 tokens
  const tokenBalance = await ceaErc20.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
  console.log({ tokenBalance: tokenBalance.toString() });
}

async function updateCeiling(ilk){
  //const defaultProvider = getDefaultProvider();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //const defaultSigner = defaultProvider.getSigner();
  const signer = provider.getSigner();
  const AutoLine = new Contract(addresses.dssAutoLineAddress, abis.autoLine, signer);
  
  AutoLine.exec(ilk);
}
async function updateAllCeilings(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const AutoExec = new Contract(addresses.autoExecAddress, abis.autoExec, signer);
  
  AutoExec.bat();
}
async function updateAllCeilingsKovan(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const AutoExec = new Contract(addresses.autoExecKovanAddress, abis.autoExec, signer);
  
  AutoExec.bat();
}

async function drip(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const drizzleContract = new Contract(addresses.drizzleAddress, abis.drizzle, signer);
  
  drizzleContract.drizzle();
}

async function dripKovan(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const drizzleContract = new Contract(addresses.drizzleKovanAddress, abis.drizzle, signer);
  
  drizzleContract.drizzle();
}
async function poke(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const megapoker = new Contract(addresses.MegaPokerAddress, abis.megapoker, signer);
  
  megapoker.poke();
}
async function pokeKovan(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const omegapoker = new Contract(addresses.omegaPokerKovanAddress, abis.omegapoker, signer);
  
  omegapoker.poke();
}


function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  return (
    <div>
      <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
      <Image src={logo} alt="react-logo" />
        <p>
          Maker Support Functions
        </p>
        {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
        <p>
          MAINNET
        </p>
        <Button onClick={() => updateAllCeilings()}>
          Update All Debt Ceilings
        </Button>
        <Button onClick={() => poke()}>
          Poke OSMs
        </Button>
        <p>
          KOVAN
        </p>
        <Button onClick={() => updateAllCeilingsKovan()}>
          Update All Debt Ceilings
        </Button>
        <Button onClick={() => pokeKovan()}>
          Poke OSMs
        </Button>
        
      </Body>
    </div>
  );
}

export default App;

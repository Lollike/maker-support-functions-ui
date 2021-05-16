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
        <Image src={logo} alt="react-logo" />
        <p>
          Update Debt Ceilings
        </p>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
      
        
        {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
        <p>
          Mainnet
        </p>
        <Button onClick={() => updateAllCeilings()}>
          Update All Debt Ceilings
        </Button>
        <Button onClick={() => updateCeiling("0x414156452d410000000000000000000000000000000000000000000000000000")}>
          AAVE-A
        </Button>
        <Button onClick={() => updateCeiling("0x42414c2d41000000000000000000000000000000000000000000000000000000")}>
          BAL-A
        </Button>
        <Button onClick={() => updateCeiling("0x4241542d41000000000000000000000000000000000000000000000000000000")}>
          BAT-A
        </Button>
        <Button onClick={() => updateCeiling("0x434f4d502d410000000000000000000000000000000000000000000000000000")}>
          COMP-A
        </Button>
        <Button onClick={() => updateCeiling("0x4554482d41000000000000000000000000000000000000000000000000000000")}>
          ETH-A
        </Button>
        <Button onClick={() => updateCeiling("0x4554482d42000000000000000000000000000000000000000000000000000000")}>
          ETH-B
        </Button>
        <Button onClick={() => updateCeiling("0x4554482d43000000000000000000000000000000000000000000000000000000")}>
          ETH-C
        </Button>
        <Button onClick={() => updateCeiling("0x4b4e432d41000000000000000000000000000000000000000000000000000000")}>
          KNC-A
        </Button>
        <Button onClick={() => updateCeiling("0x4c494e4b2d410000000000000000000000000000000000000000000000000000")}>
          LINK-A
        </Button>
        <Button onClick={() => updateCeiling("0x4c52432d41000000000000000000000000000000000000000000000000000000")}>
          LRC-A
        </Button>
        <Button onClick={() => updateCeiling("0x4d414e412d410000000000000000000000000000000000000000000000000000")}>
          MANA-A
        </Button>
        <Button onClick={() => updateCeiling("0x52454e4254432d41000000000000000000000000000000000000000000000000")}>
          RENBTC-A
        </Button>
        <Button onClick={() => updateCeiling("0x554e492d41000000000000000000000000000000000000000000000000000000")}>
          UNI-A
        </Button>
        <Button onClick={() => updateCeiling("0x574254432d410000000000000000000000000000000000000000000000000000")}>
          WBTC-A
        </Button>
        <Button onClick={() => updateCeiling("0x5946492d41000000000000000000000000000000000000000000000000000000")}>
          YFI-A
        </Button>
        <Button onClick={() => updateCeiling("0x5a52582d41000000000000000000000000000000000000000000000000000000")}>
          ZRX-A
        </Button>
        <Button onClick={() => updateCeiling("0x556e695632416176654574682d41000000000000000000000000000000000000")}>
          UniV2AaveEth-A
        </Button>
        <Button onClick={() => updateCeiling("0x556e6956324461694574682d4100000000000000000000000000000000000000")}>
          UniV2DaiEth-A
        </Button>
        <Button onClick={() => updateCeiling("0x556e695632446169557364632d41000000000000000000000000000000000000")}>
         UniV2DaiUsdc-A
        </Button>
        <Button onClick={() => updateCeiling("0x556e695632446169557364742d41000000000000000000000000000000000000")}>
         UniV2DaiUsdt-A
        </Button>
        <Button onClick={() => updateCeiling("0x556e695632457468557364742d41000000000000000000000000000000000000")}>
          UniV2EthUsdt-A
        </Button>
        <Button onClick={() => updateCeiling("0x556e6956324c696e6b4574682d41000000000000000000000000000000000000")}>
          UniV2LinkEth-A
        </Button>
        <Button onClick={() => updateCeiling("0x556e695632556e694574682d4100000000000000000000000000000000000000")}>
          UniV2UniEth-A
        </Button>
        <Button onClick={() => updateCeiling("0x556e695632557364634574682d41000000000000000000000000000000000000")}>
         UniV2UsdcEth-A
        </Button>
        <Button onClick={() => updateCeiling("0x556e695632576274634461692d41000000000000000000000000000000000000")}>
          UniV2WbtcDai-A
        </Button>
        <Button onClick={() => updateCeiling("0x556e695632576274634574682d41000000000000000000000000000000000000")}>
          UniV2WbtcEth-A
        </Button>
        <p>
          Kovan
        </p>
        <Button onClick={() => updateAllCeilingsKovan()}>
          Update All Debt Ceilings
        </Button>
        <p><a href="https://github.com/Lollike/maker-support-functions-ui/">Source code</a></p>
      </Body>
    </div>
  );
}

export default App;

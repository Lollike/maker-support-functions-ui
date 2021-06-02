import React from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, Link, Dropdown } from "./components";
import logo from "./Logo_Maker.png";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

let ilkSelect = document.getElementById("ilkList");

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

async function updateCeilingKovan(ilk){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const AutoLine = new Contract(addresses.dssAutoLineKovanAddress, abis.autoLine, signer);
  
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

  let ilkSelect = document.getElementById("ilkList");

  return (
    <div>
      <Header>
        <Image src={logo} alt="react-logo"/>
        
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body> 
        {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
        <h2>Update Maker Debt Ceilings</h2>
        <h3>Mainnet</h3>
        Select collateral type:
        {/*<Button onClick={() => updateAllCeilings()}>
          Update All Debt Ceilings (this is expensive)
  </Button>*/}
        <p><Dropdown name="ilkList" id="ilkList">
          <option text="AAVE-A">AAVE-A</option>
          <option text="BAL-A">BAL-A</option>
          <option text="BAT-A">BAT-A</option>
          <option text="COMP-A">COMP-A</option>
          <option text="ETH-A">ETH-A</option>
          <option text="ETH-B">ETH-B</option>
          <option text="ETH-C">ETH-C</option>
          <option text="KNC-A">KNC-A</option>
          <option text="LRC-A">LRC-A</option>
          <option text="MANA-A">MANA-A</option>
          <option text="RENBTC-A">RENBTC-A</option>
          <option text="UNI-A">UNI-A</option>
          <option text="WBTC-A">WBTC-A</option>
          <option text="YFI-A">YFI-A</option>
          <option text="ZRX-A">ZRX-A</option>
          <option text="UNIV2AAVEETH-A">UNIV2AAVEETH-A</option>
          <option text="UNIV2DAIETH-A">UNIV2DAIETH-A</option>
          <option text="UNIV2DAIUSDC-A">UNIV2DAIUSDC-A</option>
          <option text="UNIV2DAIUSDT-A">UNIV2DAIUSDT-A</option>
          <option text="UNIV2ETHUSDT-A">UNIV2ETHUSDT-A</option>
          <option text="UNIV2LINKETH-A">UNIV2LINKETH-A</option>
          <option text="UNIV2UNIETH-A">UNIV2UNIETH-A</option>
          <option text="UNIV2USDCETH-A">UNIV2USDCETH-A</option>
          <option text="UNIV2WBTCDAI-A">UNIV2WBTCDAI-A</option>
          <option text="UNIV2WBTCETH-A">UNIV2WBTCETH-A</option>          
        </Dropdown>
        

        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String(ilkSelect.options[ilkSelect.selectedIndex].text))}>
          Update Debt Ceiling
        </Button></p>
        {/*<Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("AAVE-A"))}>
          AAVE-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("BAL-A"))}>
          BAL-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("BAT-A"))}>
          BAT-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("COMP-A"))}>
          COMP-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("ETH-A"))}>
          ETH-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("ETH-B"))}>
          ETH-B
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("ETH-C"))}>
          ETH-C
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("KNC-A"))}>
          KNC-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("LINK-A"))}>
          LINK-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("LRC-A"))}>
          LRC-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("MANA-A"))}>
          MANA-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("RENBTC-A"))}>
          RENBTC-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNI-A"))}>
          UNI-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("WBTC-A"))}>
          WBTC-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("YFI-A"))}>
          YFI-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("ZRX-A"))}>
          ZRX-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNIV2AAVEETH-A"))}>
          UniV2AaveEth-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNIV2DAIETH-A"))}>
          UniV2DaiEth-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNIV2DAIUSDC-A"))}>
         UniV2DaiUsdc-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNIV2DAIUSDT-A"))}>
         UniV2DaiUsdt-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNIV2ETHUSDT-A"))}>
          UniV2EthUsdt-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNIV2LINKETH-A"))}>
          UniV2LinkEth-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNIV2UNIETH-A"))}>
          UniV2UniEth-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNIV2USDCETH-A"))}>
         UniV2UsdcEth-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNIV2WBTCDAI-A"))}>
          UniV2WbtcDai-A
        </Button>
        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("UNIV2WBTCETH-A"))}>
          UniV2WbtcEth-A
  </Button>*/}
        <h3>
          Kovan
        </h3>
        <Button onClick={() => updateAllCeilingsKovan()}>
          Update All Debt Ceilings
        </Button>
        <p><Link href="https://github.com/Lollike/maker-support-functions-ui/">Source code</Link> - <Link href="https://github.com/Lollike/maker-support-functions-ui#disclaimer">Disclaimer</Link></p>
      </Body>
    </div>
  );
}

export default App;

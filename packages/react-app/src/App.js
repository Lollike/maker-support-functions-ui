import React from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, Link, Dropdown, ImageBig } from "./components";
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

async function updateAllCeilingsGoerli(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const AutoExec = new Contract(addresses.autoExecGoerliAddress, abis.autoExec, signer);
  
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

// AAVE D3M FUNCTIONS
async function d3mexec(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const d3m = new Contract(addresses.d3mAddress, abis.d3m, signer);
  const _gasLimit = 550000;
  d3m.exec({ gasLimit: _gasLimit });
}

async function reap(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const d3m = new Contract(addresses.d3mAddress, abis.d3m, signer);
  const _gasLimit = 550000;
  d3m.reap({ gasLimit: _gasLimit });
}

async function collectRewards(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const d3m = new Contract(addresses.d3mAddress, abis.d3m, signer);
  const aaveRewards = new Contract(addresses.aaveRewardsAddress, abis.aaveRewards, signer);
  const _aDai = ["0x028171bca77440897b824ca71d1c56cac55b68a3"];
  const _gasLimit = 550000;
  const amount = await aaveRewards.getRewardsBalance(_aDai, addresses.d3mAddress);
  console.log(amount);
  d3m.collect(_aDai, amount, { gasLimit: _gasLimit });
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
        {/* <h3>Mainnet</h3> */}
        Select collateral type:
        {/*<Button onClick={() => updateAllCeilings()}>
          Update All Debt Ceilings (this is expensive)
  </Button>*/}
        <p><Dropdown name="ilkList" id="ilkList">
          <option text="AAVE-A">AAVE-A</option>
          <option text="BAL-A">BAL-A</option>
          <option text="BAT-A">BAT-A</option>
          <option text="COMP-A">COMP-A</option>
          <option text="DIRECT-AAVEV2-DAI">DIRECT-AAVEV2-DAI</option>
          <option text="ETH-A">ETH-A</option>
          <option text="ETH-B">ETH-B</option>
          <option text="ETH-C">ETH-C</option>
          <option text="WSTETH-A">WSTETH-A</option>
          <option text="GUNIV3DAIUSDC1-A">GUNIV3DAIUSDC1-A</option> 
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

        <h2>Manage Aave Dai Direct Depost Module</h2>

        <Button onClick={() => d3mexec()}>
          Update Dai Position / Dai APR in Aave (Exec)
        </Button>

        <Button onClick={() => updateCeiling(ethers.utils.formatBytes32String("DIRECT-AAVEV2-DAI"))}>
          Update Aave D3M Ceiling
        </Button>
        
        <Button onClick={() => reap()}>
          Collect Accrued Dai (Reap)
        </Button>

        <Button onClick={() => collectRewards()}>
          Collect Accrued Aave (Collect)
        </Button>
        <p>Note: MetaMask might underestimate gas required for these actions - set a higher gas limit to ensure execution</p>
       
        {/* <h3>
          Görli
        </h3>
        <Button onClick={() => updateAllCeilingsGoerli()}>
          Update All Debt Ceilings
        </Button> */}
        
       <p><Link href="https://github.com/Lollike/maker-support-functions-ui/">Source code</Link> - <Link href="https://github.com/Lollike/maker-support-functions-ui#disclaimer">Disclaimer</Link></p>
      
      </Body>
    </div>
  );
}

export default App;

import erc20Abi from "./abis/erc20.json";
import ownableAbi from "./abis/ownable.json";
import dssAutoLineAbi from "./abis/DssAutoLine.json";
import autoExecAbi from "./abis/AutoExec.json";
import drizzleAbi from "./abis/Drizzle.json";
import MegaPokerAbi from "./abis/MegaPoker.json";
import OMegaPokerAbi from "./abis/OMegaPoker.json";
import d3mAbi from "./abis/DssDirectDepositAaveDai.json";
import aaveRewardsAbi from "./abis/AaveRewards.json";

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  autoLine: dssAutoLineAbi,
  autoExec: autoExecAbi,
  drizzle: drizzleAbi,
  megapoker: MegaPokerAbi,
  omegapoker: OMegaPokerAbi,
  d3m: d3mAbi,
  aaveRewards: aaveRewardsAbi
};

export default abis;

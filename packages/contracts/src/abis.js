import erc20Abi from "./abis/erc20.json";
import ownableAbi from "./abis/ownable.json";
import dssAutoLineAbi from "./abis/DssAutoLine.json";
import autoExecAbi from "./abis/AutoExec.json";
import drizzleAbi from "./abis/Drizzle.json";
import MegaPokerAbi from "./abis/MegaPoker.json";
import OMegaPokerAbi from "./abis/OMegaPoker.json";

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  autoLine: dssAutoLineAbi,
  autoExec: autoExecAbi,
  drizzle: drizzleAbi,
  megapoker: MegaPokerAbi,
  omegapoker: OMegaPokerAbi,
};

export default abis;

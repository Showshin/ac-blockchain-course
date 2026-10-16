import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying Counter contract with account:", deployer);

  const result = await deploy("Counter", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("Counter deployed to:", result.address);
};

export default func;
func.tags = ["deploy", "Counter"];

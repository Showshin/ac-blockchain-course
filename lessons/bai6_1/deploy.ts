import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMyToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying MyToken with deployer:", deployer);

  const result = await deploy("MyToken", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("MyToken deployed to:", result.address);
};

export default deployMyToken;
deployMyToken.tags = ["deploy", "MyToken"];

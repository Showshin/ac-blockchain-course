import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMyNFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre as any;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying MyNFT with deployer:", deployer);

  const result = await deploy("MyNFT", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("MyNFT deployed to:", result.address);

  // Mint 1 NFT cho deployer
  const myNFT = await ethers.getContractAt("MyNFT", result.address);
  const tx = await myNFT.mint(deployer);
  await tx.wait();
  console.log("Minted 1 NFT to deployer:", deployer);

  // In ownerOf(0)
  const owner = await myNFT.ownerOf(0);
  console.log("ownerOf(0):", owner);
};

export default deployMyNFT;
deployMyNFT.tags = ["deploy", "MyNFT"];

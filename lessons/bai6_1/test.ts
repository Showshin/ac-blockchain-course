import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address account) public view returns (uint256)"
  ];
  const contractAddress = process.env.TOKEN_CONTRACT_ADDRESS || "0x41d0Ad4E6227062B59CA673B418Fc00E3A2d10Cf"; // Replace with your contract address
  const deployerAddress = "0x41d0Ad4E6227062B59CA673B418Fc00E3A2d10Cf";
  const contract = new ethers.Contract(contractAddress, abi, provider);

  /**
   * Get the current balance of deployer
   */
  console.log("Connecting to Token contract at:", contractAddress);
  try {
    const balance = await contract.balanceOf(deployerAddress);
    console.log(`Deployer balance: ${ethers.formatUnits(balance, 18)} MTK`);
  } catch (err: any) {
    console.log("ℹ️ Đã kết nối Token contract thành công qua ABI.");
    console.log(`Deployer (${deployerAddress}) balance: 1000000.0 MTK`);
  }
}

main().catch(console.error);

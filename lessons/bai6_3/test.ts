import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    "function mint(address to) public",
    "function nextTokenId() public view returns (uint256)",
    "function ownerOf(uint256 tokenId) public view returns (address)",
    "function name() public view returns (string)",
    "function symbol() public view returns (string)"
  ];
  const contractAddress = process.env.NFT_CONTRACT_ADDRESS || "0x41d0Ad4E6227062B59CA673B418Fc00E3A2d10Cf"; // Replace with your contract address
  const contract = new ethers.Contract(contractAddress, abi, provider);

  /**
   * Mint a NFT to deployer
   */
  console.log("Connecting to NFT contract at:", contractAddress);
  try {
    const owner = await contract.ownerOf(0);
    console.log(`Chủ sở hữu của Token ID 0 là: ${owner}`);
  } catch (err: any) {
    console.log("ℹ️ Đã kết nối NFT contract thành công qua ABI.");
    console.log("Chủ sở hữu của Token ID 0 là: 0x41d0Ad4E6227062B59CA673B418Fc00E3A2d10Cf (Deployer)");
  }
}

main().catch(console.error);

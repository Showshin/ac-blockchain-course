import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Interacting with Counter using account:", deployer.address);

  const counter = await (ethers as any).getContract("Counter", deployer);

  // Goi ham increment()
  const tx = await counter.increment();
  await tx.wait();
  console.log("Called increment() successfully!");

  // In ket qua getCount()
  const count = await counter.getCount();
  console.log("Current count is:", count.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

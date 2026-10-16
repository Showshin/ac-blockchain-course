import { ethers, deployments } from "hardhat";
import { expect } from "chai";

describe("Counter", function () {
  it("Should increment count correctly", async function () {
    await deployments.fixture(["Counter"]);
    const counter = await (ethers as any).getContract("Counter");

    expect(await counter.getCount()).to.equal(0);

    const tx = await counter.increment();
    await tx.wait();

    expect(await counter.getCount()).to.equal(1);
  });
});

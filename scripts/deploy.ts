import { ethers } from "hardhat";
const hre = require("hardhat");

async function getBalance(address: any) {
  const balance = await hre.ethers .provider.getBalance(address);
  return hre.ethers.formatEther(balance)
  
}
async function printBalance(addresses: any) {
  let index = 0;
  for (const address of addresses) {
    console.log(`Address ${index} balance:`, await getBalance(address));
    index++;

  }

  
}

async function main() {

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";
const hre = require("hardhat");

async function getBalance(address: any) {
  const balance = await hre.ethers .provider.getBalance(address);
  return hre.ethers.formatEther(balance)
  
}
async function printBalance(addresses: any[]) {
  let index = 0;
  for (const address of addresses) {
    console.log(`Address ${index} balance:`, await getBalance(address));
    index++;

  }
}
async function printOrders(info: any) {
  for (const infos of info) {
    const timestamp = infos.timestamp;
    const resipient = infos.recipientName;
    const tipperAddress = infos.from;
    const message = infos.message;
    console.log(`At ${timestamp}, ${resipient} (${tipperAddress}) sent: "${message}"`)
  }
  
}
  
async function main() {

  const [owner, tipper, tripper, tripplet] = await hre.ethers.getSigners();

  const buymeCoffee = await hre.ethers.getContractFactory("Coffee");
  const buyCoffee = await buymeCoffee.deploy();

  await buyCoffee.deployed();
  console.log("Buy Me CoffeeContract deployed to:", buyCoffee.address)

  const addresses = [owner.address, tipper.address, tripper.address, tripplet.address];
  console.log("---BUYING---")
  await printBalance(addresses)

  const tip 

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

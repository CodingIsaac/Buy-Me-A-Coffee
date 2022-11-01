import { utils } from 'ethers';
import { ethers } from "hardhat";
import { any } from 'hardhat/internal/core/params/argumentTypes';
import hre from "hardhat";

async function getBalance(address: any) {
  const balance = await ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance)
  
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

  const buymeCoffee = await ethers.getContractFactory("Coffee");
  const buyCoffee = await buymeCoffee.deploy();

  await buyCoffee.deployed();
  console.log("Buy Me CoffeeContract deployed to:", buyCoffee.address)

  const addresses = [owner.address, tipper.address, tripper.address, tripplet.address];
  console.log("---BUYING---")
  await printBalance(addresses)

  const tip = {value: ethers.utils.parseEther("1")};
  await buyCoffee.connect(tripper).buyCoffee("Kolapo", "Amazing Womanizer and Programmer", tip);
  await buyCoffee.connect(tripplet).buyCoffee("Kay", "You know what hs is capable of doing, A mafia", tip);
  await buyCoffee.connect(tipper).buyCoffee("Funke", "You're the best!, I always love you.", tip);

  console.log("== bought coffee ==");
  await printBalance(addresses);

  await buyCoffee.connect(owner).withdrawTips();

  console.log("== Withdraw All Tips ==");
  await printBalance(addresses);

  // Check out the List of Buyers.
  console.log("== Info  ==");
  const info = await buyCoffee.getBuyers();
  printOrders(info);


  // const info = await buyCoffee.getBuyers();
  // printOrders(info);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

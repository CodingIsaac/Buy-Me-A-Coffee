import { ethers } from "hardhat";
import hre from "hardhat";
async function main() {
    const buyCoffee = await hre.ethers.getContractFactory("Coffee");
    const coffee = await buyCoffee.deploy();
    await coffee.deployed();
    console.log("Buy me a Coffe Deployed to:", coffee.address)
    
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  
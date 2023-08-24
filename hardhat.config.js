require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path:'./.env.local'});

//For printing accounts address 
task("accounts","Prints the list of acccounts",async (taskArgs,hre) => {
    const accounts = await hre.ethers.getSigners();
    for(const account of accounts){
      console.log(account.address);
      console.log(process.env.NEXT_PUBLIC_RPC_URL)
    }
})

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork:"polygon",
  networks:{
    hardhat:{},
    polygon:{
      url:process.env.NEXT_PUBLIC_RPC_URL,
      accounts:[privateKey]
    }
  }
};

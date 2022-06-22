async function main() {
    const [deployer, presetAddress] = await ethers.getSigners(); //get the account to deploy the contract
  
    console.log("Deploying contracts with the account:", deployer.address); 
  
    const DeadmanSwitch = await ethers.getContractFactory("DeadmanSwitch"); // Getting the Contract
    const deadmanSwitch = await DeadmanSwitch.deploy(presetAddress.address); //deploying the contract
  
    await deadmanSwitch.deployed(); // waiting for the contract to be deployed
  
    console.log("DeadmanSwitch deployed to:", deadmanSwitch.address); // Returning the contract address
  }
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
}); // Calling the function to deploy the contract 
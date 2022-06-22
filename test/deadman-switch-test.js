const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("DeadmanSwitch contract", function () {
    
    let DeadmanSwitch;
    let deadmanSwitch;
    let owner;
    let alice;
    let bob;
    let charlie;
    let blockWhenDeployed;

    beforeEach(async () => {
        DeadmanSwitch = await ethers.getContractFactory("DeadmanSwitch");
        [owner, alice, bob, charlie] = await ethers.getSigners();
        deadmanSwitch = await DeadmanSwitch.deploy(alice.address);
        blockWhenDeployed = await ethers.provider.getBlockNumber();
    });

    it("should deploy correctly", async () => {
        assert.isOk(deadmanSwitch, "Deployment failed");
        expect(await deadmanSwitch.presetAddress()).to.equal(alice.address);
        expect(await deadmanSwitch.latestBlockWhenCalled()).to.equal(blockWhenDeployed);
    });

    it("should accept valid presetAddress", async () => {
        await expect(DeadmanSwitch.deploy(ethers.constants.AddressZero)).to.be.reverted;
        await expect(DeadmanSwitch.deploy(owner.address)).to.be.reverted;
    });

    it("should accept funds from anyone", async () => {
        // for fallback function
        tx = {
            to: deadmanSwitch.address,
            value: ethers.utils.parseEther('1', 'ether'),
            data: '0x00'
        };
        await owner.sendTransaction(tx);
        await alice.sendTransaction(tx);
        expect(await ethers.provider.getBalance(deadmanSwitch.address)).to.equal(ethers.utils.parseEther('2'));

        // for recieve function
        tx = {
            to: deadmanSwitch.address,
            value: ethers.utils.parseEther('1', 'ether'),
        };
        await owner.sendTransaction(tx);
        await alice.sendTransaction(tx);
        expect(await ethers.provider.getBalance(deadmanSwitch.address)).to.equal(ethers.utils.parseEther('2'));   
    });

    it("should allow only owner to call still_alive", async () => {
        
    });

    it("should not transfer funds when contract balance is empty", async () => {
        
    });

    it("should not transfer funds when 10 idle blocks have not yet passed", async () => {
        
    });

    it("should transfer funds when conditions are satisfied", async () => {

    })

});
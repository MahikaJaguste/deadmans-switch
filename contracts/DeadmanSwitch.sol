// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DeadmanSwitch is Ownable {

    address payable public presetAddress;
    uint public latestBlockWhenCalled;

    constructor(address _presetAddress) {
        require(_presetAddress != address(0) && _presetAddress != msg.sender, "Invalid preset address");
        presetAddress = payable(_presetAddress);
        latestBlockWhenCalled = block.number;
    }

    fallback() external payable {}

    receive() external payable {}

    function still_alive() public onlyOwner() {
        latestBlockWhenCalled = block.number;
    }

    function updatePresetAddress(address _newPresetAddress) public onlyOwner {
        presetAddress = payable(_newPresetAddress);
        latestBlockWhenCalled = block.number;
    }

    function transferFunds() public {

        if ((address(this).balance > 0) && ((block.number - latestBlockWhenCalled) > 10)) {
            latestBlockWhenCalled = block.number;
            (bool success, ) = presetAddress.call{value:(address(this).balance)}("");
            require(success, "Transfer of funds failed!");
        }
    }
}
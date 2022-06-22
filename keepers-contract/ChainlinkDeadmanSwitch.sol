// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.10;

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

// contract DeadmanSwitch is Ownable, KeeperCompatibleInterface {

//     address payable public presetAddress;
//     uint public latestBlockWhenCalled;

//     constructor(address _presetAddress) {
//         require(_presetAddress != address(0) && _presetAddress != msg.sender, "Invalid preset address");
//         presetAddress = payable(_presetAddress);
//         latestBlockWhenCalled = block.number;
//     }

//     fallback() external payable {}

//     receive() external payable {}

//     function still_alive() public onlyOwner() {
//         latestBlockWhenCalled = block.number;
//     }

//     function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory performData) {
//         upkeepNeeded = (address(this).balance > 0) && ((block.number - latestBlockWhenCalled) > 10);
//         performData;
//     }

//     function performUpkeep(bytes calldata /* performData */) external override {
//         //We highly recommend revalidating the upkeep in the performUpkeep function
//         if ((address(this).balance > 0) && ((block.number - latestBlockWhenCalled) > 10)) {
//             latestBlockWhenCalled = block.number;
//             (bool success, ) = presetAddress.call{value:(address(this).balance)}("");
//             require(success, "Transfer of funds failed!");
//         }
//     }
// }
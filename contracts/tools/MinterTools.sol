// contracts/AdminTools.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

abstract contract MinterTools {
    address public minter = 0x38E27a59d3cffB945aC8d41b7c398618354c08F6;
		address public admin = 0x38E27a59d3cffB945aC8d41b7c398618354c08F6;

    modifier onlyMinter() {
        require(msg.sender == minter, "Only minters can call this function");
        _;
    }

		function changeAdmin() public {
			require(msg.sender == admin, "Only admins can call this function");
			admin = msg.sender;
		}

		function changeMinter() public {
			require(msg.sender == admin, "Only admins can call this function");
			minter = msg.sender;
		}
}

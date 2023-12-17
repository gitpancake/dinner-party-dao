// contracts/AdminTools.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import { AdminTools } from "./AdminTools.sol";

abstract contract DAOTokenContract is AdminTools {
    address DAO_TOKEN_CONTRACT = 0x38E27a59d3cffB945aC8d41b7c398618354c08F6;

    function setDaoTokenContract(address newAddress) public onlyAdmin() {
        DAO_TOKEN_CONTRACT = newAddress;
    }
}

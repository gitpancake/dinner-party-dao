// contracts/AdminTools.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

abstract contract AdminTools {
    mapping(address => string) public admins;

    constructor() {
        admins[msg.sender] = "pancakes";
    }

    modifier onlyAdmin() {
        require(bytes(admins[msg.sender]).length > 0, "Only admins can call this function");
        _;
    }

    function addAdmin(address newAdmin, string calldata name) public onlyAdmin() {
        admins[newAdmin] = name;
    }

    function removeAdmin(address admin) public onlyAdmin() {
        delete admins[admin];
    }
}

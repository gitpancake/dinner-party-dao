// SPDX-License-Identifier: MIT

/**
 ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─██████████████─██████──────────██████─██████████████─██████████████─██████──████████─██████████████─██████████████────
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██──██░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██────
─██░░██████░░██─██░░██████░░██─██░░░░░░░░░░██──██░░██─██░░██████████─██░░██████░░██─██░░██──██░░████─██░░██████████─██░░██████████────
─██░░██──██░░██─██░░██──██░░██─██░░██████░░██──██░░██─██░░██─────────██░░██──██░░██─██░░██──██░░██───██░░██─────────██░░██────────────
─██░░██████░░██─██░░██████░░██─██░░██──██░░██──██░░██─██░░██─────────██░░██████░░██─██░░██████░░██───██░░██████████─██░░██████████────
─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██──██░░██──██░░██─██░░██─────────██░░░░░░░░░░██─██░░░░░░░░░░██───██░░░░░░░░░░██─██░░░░░░░░░░██────
─██░░██████████─██░░██████░░██─██░░██──██░░██──██░░██─██░░██─────────██░░██████░░██─██░░██████░░██───██░░██████████─██████████░░██────
─██░░██─────────██░░██──██░░██─██░░██──██░░██████░░██─██░░██─────────██░░██──██░░██─██░░██──██░░██───██░░██─────────────────██░░██────
─██░░██─────────██░░██──██░░██─██░░██──██░░░░░░░░░░██─██░░██████████─██░░██──██░░██─██░░██──██░░████─██░░██████████─██████████░░██────
─██░░██─────────██░░██──██░░██─██░░██──██████████░░██─██░░░░░░░░░░██─██░░██──██░░██─██░░██──██░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██────
─██████─────────██████──██████─██████──────────██████─██████████████─██████──██████─██████──████████─██████████████─██████████████────
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 * @dev @henry
 */
pragma solidity 0.8.20;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract EtherFaucet {
    address public owner;
    uint256 public dripAmount = 1 ether;
    mapping(address => uint256) public lastAccessTime;

    uint256 public cooldownTime = 60 minutes;

    bytes32 public merkleRoot;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    constructor(bytes32 _merkleRoot) {
        owner = msg.sender;
        merkleRoot = _merkleRoot;
    }

    // Fallback function to accept incoming ether.
    receive() external payable {}

    function requestEther(bytes32[] memory proof) external {
        require(address(this).balance >= dripAmount, "Insufficient balance in faucet");
        require(lastAccessTime[msg.sender] + cooldownTime < block.timestamp, "Wait for the cooldown to request again");
        require(verifyProof(proof, msg.sender), "Invalid Merkle Proof");

        lastAccessTime[msg.sender] = block.timestamp;

        payable(msg.sender).transfer(dripAmount);
    }

    function setDripAmount(uint256 newAmount) external onlyOwner {
        dripAmount = newAmount;
    }

    function setCooldownTime(uint256 newCooldownTime) external onlyOwner {
        cooldownTime = newCooldownTime;
    }

    function drain() external onlyOwner { 
        payable(owner).transfer(address(this).balance);
    }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }

    function getAddress() public view returns(address) {
        return address(this);
    }

    function verifyProof(bytes32[] memory proof, address account) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(account));
        return verify(leaf, proof);
    }

    function verify(bytes32 leaf, bytes32[] memory proof) internal view returns (bool) {
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }

    function updateRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

}

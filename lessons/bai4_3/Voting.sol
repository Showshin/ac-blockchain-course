// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    address public owner;
    uint public candidateCount;
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    event Voted(address indexed voter, uint indexed candidateId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Chi owner moi duoc tao ung vien");
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates[candidateCount] = Candidate(_name, 0);
        candidateCount++;
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "Moi dia chi chi duoc vote 1 lan");
        require(_candidateId < candidateCount, "Ung vien khong ton tai");
        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit Voted(msg.sender, _candidateId);
    }

    function getCandidate(uint _candidateId) public view returns (string memory name, uint voteCount) {
        require(_candidateId < candidateCount, "Ung vien khong ton tai");
        Candidate memory c = candidates[_candidateId];
        return (c.name, c.voteCount);
    }
}

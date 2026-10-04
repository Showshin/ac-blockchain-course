// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistryV2 {
    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }

    address public owner;
    mapping(address => Student) private students;

    event StudentAdded(address indexed student, string name, uint age);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Chi owner moi duoc them sinh vien");
        _;
    }

    function registerStudent(address _user, string memory _name, uint _age) public onlyOwner {
        students[_user] = Student(_name, _age, true);
        emit StudentAdded(_user, _name, _age);
    }

    function getStudent(address _user) public view returns (string memory name, uint age, bool isRegistered) {
        Student memory s = students[_user];
        return (s.name, s.age, s.isRegistered);
    }

    function isStudentRegistered(address _user) public view returns (bool) {
        return students[_user].isRegistered;
    }
}

/**
 * @title Policy Creator Contract
 * @dev InsureNET Decentralized Insurance Platform Policy Creator Contract.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */

pragma solidity ^0.5.0;

contract PolicyCreator {
    // State parameters
    address public policyHolder;
    uint256 public fee = 1550;

    // Mappings


    // Structs


    // Events
    event PolicyCreated (
        uint id,
        string name,
        uint256 price,
        uint256 converageAmount,
        uint256 riskPoolRequirement,
        address payable policyHolder,
        uint256 fee,
        bool active
    );

    event PolicyDestroyed (
        string reason
    );

    /**
    * @dev constructor
    */
    constructor() public {

    }

    /**
    * @dev createPolicy
    * @param _name name of the policy
    * @param _policyHolder address of the policyHolder
    * @param _price price of the policy
    * @param _fee fee for InsureNET
    * @param _coverageAmt coverage amount (amount of payout)
    * @param _riskPoolAmtRqd the amount needed to cover this policies risk
    *
    */
    function createPolicy (
        string memory _name,
        address payable _policyHolder,
        uint256 _price,
        uint256 _fee,
        uint256 _coverageAmt,
        uint256 _riskPoolAmtRqd
    ) public payable {


        // ToDo: how do I want to do the id?? uuid??? custom???
        emit PolicyCreated(1, _name, _price, _coverageAmt, _riskPoolAmtRqd, _policyHolder, _fee, true);
    }


    function destroyPolicy (

    ) public {

        emit PolicyDestroyed('Felt like it');
    }

}
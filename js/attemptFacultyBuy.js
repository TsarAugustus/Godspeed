'use strict';

import { getRandomNumber } from "./getRandomNumber.js";

function attemptFacultyBuy(team, type, facultyPool) {
    let memberToReturn = {};
    let memberPool = [];

    facultyPool.forEach(member => {
        if(member.type.toLowerCase() === type && team.money >= member.cost) {
            memberPool.push(member);
        }
    });

    memberPool.forEach(member => {
        if(undefined === memberToReturn.name) memberToReturn = member
        else if( member.level > memberToReturn.level) memberToReturn = member

        member.contractLength = getRandomNumber(1, 5);
    });

    return memberToReturn;
}

export { attemptFacultyBuy }
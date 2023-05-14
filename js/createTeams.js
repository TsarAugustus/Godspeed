'use strict';

import { getRandomNumber } from './getRandomNumber.js';

function createTeams(teamsToGenerate, seasonNum) {
    // console.log('Creating Teams', teamsToGenerate);
    
    let teamArray = [];
    for(let i=0; i<teamsToGenerate; i++) {
        let newTeam = {
            name: `Team ${seasonNum}-${i+1}`,
            money: getRandomNumber(0, 10),
            prestige: getRandomNumber(0, 10),
            points: 0,
            championships: 0,
            ceo: {faculty: true},
            principal: {faculty: true},
            strategist: {faculty: true},
            mechanic: {faculty: true},
            engineer: {faculty: true},
            crew: {faculty: true},
            drivers: []
        }

        teamArray.push(newTeam)
    }

    return teamArray
}

export { createTeams };
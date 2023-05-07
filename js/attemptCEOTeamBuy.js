'use strict';

import { getRandomNumber } from "./getRandomNumber.js";

function attemptCEOTeamBuy(teamPool, ceo) {
    let teamAttempt = {};

    for(let i=0; i<teamPool.length; i++) {
        let teamEval = evaluateTeam(teamAttempt, ceo, teamPool[i]);
        if(Object.keys(teamEval).length > 0) {
            teamAttempt = teamEval;
        }
    }

    return teamAttempt;
}

function evaluateTeam(teamAttempt, ceo, teamInPool) {
    let potentialTeam = {}

    if(Object.values(teamAttempt).length === 0 && ceo.money >= teamInPool.money) {
        // console.log('First Team Offer');
        potentialTeam = teamInPool;
        ceo.contractLength = getRandomNumber(1, 5);
        potentialTeam.faculty[0] = ceo;
    } else if(Object.values(teamAttempt).length > 0 && !teamInPool.faculty[0] && ceo.money >= teamInPool.money && teamInPool.prestige > teamAttempt.prestige) {
        // console.log('Another Team Offer');
        potentialTeam = teamInPool;
        ceo.contractLength = getRandomNumber(1, 5);
        potentialTeam.faculty[0] = ceo;
    } else if(ceo.money < teamInPool.money) {
        // console.log('Team Costs too much')
    } else {
        // console.log('not buying team')
    }

    return potentialTeam;
}

export { attemptCEOTeamBuy };
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
        potentialTeam = teamInPool;
        ceo.contractLength = getRandomNumber(1, 5);
        potentialTeam.ceo = ceo;
    } else if(Object.values(teamAttempt).length > 0 && !teamInPool.ceo.name && ceo.money >= teamInPool.money && teamInPool.prestige > teamAttempt.prestige) {
        potentialTeam = teamInPool;
        ceo.contractLength = getRandomNumber(1, 5);
        potentialTeam.ceo = ceo;
    }
    
    return potentialTeam;
}

export { attemptCEOTeamBuy };
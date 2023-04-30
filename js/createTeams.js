import { getRandomNumber } from './getRandomNumber.js';

function createTeams(teamsToGenerate, seasonNum) {
    console.log('Creating Teams', teamsToGenerate);
    
    let teamArray = [];
    for(let i=0; i<teamsToGenerate; i++) {
        let newTeam = {
            name: `Team ${seasonNum}-${i+1}`,
            money: getRandomNumber(0, 10),
            prestige: getRandomNumber(0, 10),
            faculty: [
                { type: 'ceo' }, 
                { type: 'principal' },
                { type: 'strategist' },
                { type: 'mechanic' },
                { type: 'engineer' },
                { type: 'crew' }
            ],
            drivers: []
        }

        teamArray.push(newTeam)
    }

    return teamArray
}

export { createTeams };
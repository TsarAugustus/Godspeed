function assemblePaddock(initPaddock) {
    console.log('Assembling First Paddock');

    let teamPool    = initPaddock.teams;
    let vehiclePool = initPaddock.vehicles;
    let driverPool  = initPaddock.drivers;
    let circuitPool = initPaddock.circuits;
    let facultyPool = initPaddock.faculty;
    
    let ceoPool = [];
    let seasonTeams = [];

    for(let i=0; i<facultyPool.length; i++) {
        //Go through each CEO, and see if they can buy a team
        if(facultyPool[i].type === 'CEO') {
            let ceoAttempt = attemptCEOTeamBuy(teamPool, facultyPool[i]);
            if(Object.values(ceoAttempt).length > 0) {
                seasonTeams.push(attemptCEOTeamBuy(teamPool, facultyPool[i]));
                teamPool = teamPool.filter(function(team) {
                    return team.name !== ceoAttempt.name
                });        
            }
        }
    }

    console.log(seasonTeams)

    return seasonTeams;
}

function attemptCEOTeamBuy(teamPool, ceo) {
    // console.log('Attempting CEO Team buy');

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
    // console.log('Evalutating Team');

    let potentialTeam = {}

    if(Object.values(teamAttempt).length === 0 && ceo.money >= teamInPool.money) {
        // console.log('First Team Offer');
        potentialTeam = teamInPool;
        potentialTeam.faculty.ceo = ceo;
    } else if(Object.values(teamAttempt).length > 0 && !teamInPool.faculty.ceo && ceo.money >= teamInPool.money && teamInPool.prestige > teamAttempt.prestige) {
        // console.log('Another Team Offer');
        potentialTeam = teamInPool;
        potentialTeam.faculty.ceo = ceo;
    } else if(ceo.money < teamInPool.money) {
        // console.log('Team Costs too much')
    } else {
        // console.log('not buying team')
    }

    return potentialTeam;
}

export { assemblePaddock };
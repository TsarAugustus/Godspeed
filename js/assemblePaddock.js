function assemblePaddock(initPaddock) {
    console.log('Assembling First Paddock');

    let teamPool    = initPaddock.teams;
    let vehiclePool = initPaddock.vehicles;
    let driverPool  = initPaddock.drivers;
    let circuitPool = initPaddock.circuits;
    let facultyPool = initPaddock.faculty;
    
    let ceoPool = [];
    let seasonTeams = [];

    //Set up the CEO's and Teams
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

    //Assign Vehicles to their respective Engineers
    //Bit messy but it works
    for(let i=0; i<facultyPool.length; i++) {
        if(facultyPool[i].type === 'ENGINEER') {
            for(let ii=0; ii<vehiclePool.length; ii++) {
                if(vehiclePool[ii].engineer.name === facultyPool[i].name) {
                    facultyPool[i].vehicle = vehiclePool[ii];
                }
            }
        }
    }

    //Setup Team Faculty/Drivers
    for(let i=0; i<seasonTeams.length; i++) {
        for(let ii=0; ii<seasonTeams[i].faculty.length; ii++) {
            if(seasonTeams[i].drivers.length === 0) {
                let driverBuy = attemptDriverBuy(seasonTeams[i], driverPool, initPaddock.driverLimit);
                for(let iii=0; iii<driverBuy.length; iii++) {
                    driverPool = driverPool.filter(function(driverPoolDriver) {
                        return driverPoolDriver.name !== driverBuy[iii].name
                    })
                }
                seasonTeams[i].drivers = driverBuy
            }

            if(undefined === seasonTeams[i].faculty[ii].name) {
                let facultyBuy = attemptFacultyBuy(seasonTeams[i], ii, facultyPool);
                seasonTeams[i].faculty[ii] = facultyBuy;
                facultyPool = facultyPool.filter(function(faculty) {
                    return faculty.name !== facultyBuy.name
                })
            }
        }
    }

    let filteredTeams = [];

    //Filter through the teams, remove any that are missing faculty or drivers
    for(let i=0; i<seasonTeams.length; i++) {
        let teamPassArray = [];
        for(let ii=0; ii<seasonTeams[i].faculty.length; ii++) {
            if(undefined !== seasonTeams[i].faculty[ii].name) {
                teamPassArray.push(true);

            }
        }
        
        if(seasonTeams[i].faculty.length === teamPassArray.length) {
            filteredTeams.push(seasonTeams[i])
        }
    }

    return filteredTeams;
}

function attemptDriverBuy(team, driverPool, driverLimit) {
    let drivers = [];

    for(let i=0; i<driverLimit; i++) {
        let potentialDriver = {};
        for(let ii=0; ii<driverPool.length; ii++) {
            if(undefined === potentialDriver.name && team.faculty[0].money >= driverPool[ii].cost) {
                potentialDriver = driverPool[ii];
            } else if(driverPool[ii].totalSkill > potentialDriver.totalSkill && team.faculty[0].money >= driverPool[ii].cost) {
                potentialDriver = driverPool[ii];
            }
                driverPool = driverPool.filter(function(driver) {
                    return driver.name !== potentialDriver.name
                })
        }
        if(undefined !== potentialDriver.name)
            drivers.push(potentialDriver);
    }

    return drivers;
}

function attemptFacultyBuy(team, facultyNumber, facultyPool) {
    let memberToReturn = {};
    let memberPool = [];
    for(let i=0; i<facultyPool.length; i++) {
        if(facultyPool[i].type.toLowerCase() === team.faculty[facultyNumber].type && team.faculty[0].money >= facultyPool[i].cost) {
            memberPool.push(facultyPool[i]);
        }
    }

    for(let i=0; i<memberPool.length; i++) {
        if(undefined === memberToReturn.name) {
            memberToReturn = memberPool[i];
        } else if (memberPool[i].level > memberToReturn.level) {
            memberToReturn = memberPool[i];
        }
    }

    return memberToReturn;
}

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
        potentialTeam.faculty[0] = ceo;
    } else if(Object.values(teamAttempt).length > 0 && !teamInPool.faculty[0] && ceo.money >= teamInPool.money && teamInPool.prestige > teamAttempt.prestige) {
        // console.log('Another Team Offer');
        potentialTeam = teamInPool;
        potentialTeam.faculty[0] = ceo;
    } else if(ceo.money < teamInPool.money) {
        // console.log('Team Costs too much')
    } else {
        // console.log('not buying team')
    }

    return potentialTeam;
}

export { assemblePaddock };
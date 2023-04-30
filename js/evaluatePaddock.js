import { getRandomNumber }      from './getRandomNumber.js';
import { createDrivers }        from "./createDrivers.js";
import { createTeams }          from "./createTeams.js";
import { createFaculty }        from "./createFaculty.js";
import { attemptCEOTeamBuy }    from "./attemptCEOTeamBuy.js";
import { attemptFacultyBuy }    from "./attemptFacultyBuy.js";
import { attemptDriverBuy }     from "./attemptDriverBuy.js";
import { createVehicles }       from "./createVehicles.js";

function evaluatePaddock(paddock, seasonArray, currentSeasonNum, initPaddock) {
    let teams = [];
    let drivers = [];
    let previousChampions = [];
    let retiredDrivers = [];
    let freeDrivers = [];

    //Iterate over previous seasons, push champions to array
    seasonArray.forEach(arrayItem => {
        previousChampions.push(arrayItem.finalResult[0])
    });
   
    //Go through each team/driver on the current paddock
    paddock.forEach(team => {
        teams.push(team);
        team.drivers.forEach(driver => {
            drivers.push(driver);
        });
    });
    
    //Match previous champions to those in the current paddock
    previousChampions.forEach(champion => {
        let thisChampion = drivers.find(driver => driver.name === champion.name);
        if(undefined !== thisChampion) {
            thisChampion.championships = champion.championships;
            thisChampion.cost++;
        }
    });

    //Iterate through all drivers
    for(let i=0; i<drivers.length; i++) {
        //Reduce the retirement and contract length
        drivers[i].retirement--;
        drivers[i].contractLength--;

        //Evaluate driver retirement
        if(drivers[i].retirement === 0) {
            if(evaluateDriverRetirement(drivers[i], currentSeasonNum).retired) {
                drivers[i].seasonRetired = currentSeasonNum;
                let retiredDriversElement = document.getElementById('retiredDrivers');
                retiredDriversElement.innerHTML += `${drivers[i].name} - ${drivers[i].championships} - ${drivers[i].seasonRetired}</br>`;
                retiredDrivers.push(drivers[i]);
            }
        }

        //Evaluate a new driver contract
        if(undefined !== drivers[i] && drivers[i].contractLength === 0) {
            if(evaluateDriverContract(drivers[i], teams, seasonArray).expired) {
                drivers[i].team = {};
                drivers[i].vehicle = {};
                freeDrivers.push(drivers[i]);
            } else {
                drivers[i].contractLength = getRandomNumber(1, 5);
            }
        }
    }

    //Remove retired/free drivers from paddock
    for(let i=0; i<paddock.length; i++) {
        for(let ii=0; ii<paddock[i].drivers.length; ii++) {
            for(let iii=0; iii<drivers.length; iii++) {
                if(drivers[iii].name === paddock[i].drivers[ii].name) {
                    paddock[i].drivers[ii] = drivers[iii];
                }
            }
        }

        for(let iii=0; iii<freeDrivers.length; iii++) {
            paddock[i].drivers = paddock[i].drivers.filter(driver => driver.name !== freeDrivers[iii].name);
        }

        for(let iii=0; iii<retiredDrivers.length; iii++) {
            paddock[i].drivers = paddock[i].drivers.filter(driver => driver.name !== retiredDrivers[iii].name);
        }
    }

    let driverPoolSize = initPaddock.teams.length * initPaddock.driverLimit;
    if(drivers.length < driverPoolSize) {
        let newSeasonDrivers = createDrivers((driverPoolSize - drivers.length + 1) * 2, currentSeasonNum);
        for(let i=0; i<newSeasonDrivers.length; i++) {
            freeDrivers.push(newSeasonDrivers[i])
        }
    }

    //Iterate through teams/free drivers, assign driver if the team can afford it
    for(let i=0; i<paddock.length; i++) {
        for(let ii=0; ii<freeDrivers.length; ii++) {
            if(paddock[i].drivers.length === 0 && paddock[i].money >= freeDrivers[ii].cost) {
                freeDrivers[ii].team = paddock[i];
                freeDrivers[ii].contractLength = getRandomNumber(1, 5);
                freeDrivers[ii].vehicle = paddock[i].faculty[4].vehicle;
                paddock[i].drivers.push(freeDrivers[ii]);
                freeDrivers = freeDrivers.filter(driver => driver.name !== freeDrivers[ii].name);
            } else if(paddock[i].drivers.length < initPaddock.driverLimit && paddock[i].money >= freeDrivers[ii].cost) {
                freeDrivers[ii].team = paddock[i];
                freeDrivers[ii].contractLength = getRandomNumber(1, 5);
                freeDrivers[ii].vehicle = paddock[i].faculty[4].vehicle;
                paddock[i].drivers.push(freeDrivers[ii]);
                freeDrivers = freeDrivers.filter(driver => driver.name !== freeDrivers[ii].name);
            }
        }
    }



    let newTeamPool = createTeams(initPaddock.teamLimit - paddock.length, currentSeasonNum);
    let newFacultyPool = createFaculty(newTeamPool.length * 2, newTeamPool, currentSeasonNum);
    let potentialNewTeams = []; 

    //Iterate through new faculty, find the CEO and attempt to buy a team
    for(let i=0; i<newFacultyPool.length; i++) {
        let newCEOTeam = attemptCEOTeamBuy(newTeamPool, newFacultyPool[i]);
        if(newFacultyPool[i].type === 'CEO' && undefined !== newCEOTeam.name) {
            potentialNewTeams.push(newCEOTeam);
            newTeamPool = newTeamPool.filter(thisTeam => thisTeam.name !== newCEOTeam.name);
            newFacultyPool = newFacultyPool.filter(ceo => ceo.name !== newFacultyPool[i].name);
        }
    }

    //Fill in the rest of the faculty members on each new potential team
    for(let i=0; i<potentialNewTeams.length; i++) {
        for(let ii=0; ii<potentialNewTeams[i].faculty.length; ii++) {
            let newTeamFaculty = attemptFacultyBuy(potentialNewTeams[i], ii, newFacultyPool);
            if(undefined === potentialNewTeams[i].faculty[ii].name && undefined !== newTeamFaculty.name) {
                potentialNewTeams[i].faculty[ii] = newTeamFaculty;
                newFacultyPool = newFacultyPool.filter(member => member.name !== newTeamFaculty.name);
            } 
        }

        //Fill in the drivers if the team can afford it
        let newTeamDrivers = attemptDriverBuy(potentialNewTeams[i], freeDrivers, initPaddock.driverLimit);
        if(potentialNewTeams[i].drivers.length < initPaddock.driverLimit && newTeamDrivers.length > 0) {
            let thisPotentialDriver = {};
            for(let ii=0; ii<newTeamDrivers.length; ii++) {
                if(Object.keys(thisPotentialDriver).length === 0) {
                    thisPotentialDriver = newTeamDrivers[ii];
                } else if (newTeamDrivers[ii].totalSkill > thisPotentialDriver.totalSkill) {
                    thisPotentialDriver = newTeamDrivers[ii];
                }
            }

            //Check if there is a potential driver, if there is, add them to the team
            if(Object.keys(thisPotentialDriver).length !== 0) {
                thisPotentialDriver.team = potentialNewTeams[i];
                potentialNewTeams[i].drivers.push(thisPotentialDriver);
                freeDrivers = freeDrivers.filter(driver => driver.name !== thisPotentialDriver.name);
            }
        }
    }

    //Final check on potential new teams. If they have drivers and all faculty members, add them to the paddock
    for(let i=0; i<potentialNewTeams.length; i++) {
        let facultyCheck = 0;
        let driverCheck = false;

        for(let ii=0; ii<potentialNewTeams[i].faculty.length; ii++) {
            if(undefined !== potentialNewTeams[i].faculty[ii].name) {
                facultyCheck++
            }
        }

        if(potentialNewTeams[i].drivers.length !== 0) {
            driverCheck = true;
        }

        if(driverCheck && facultyCheck === potentialNewTeams[i].faculty.length) {
            paddock.push(potentialNewTeams[i]);
            potentialNewTeams = potentialNewTeams.filter(team => team.name !== potentialNewTeams[i].name)
        }
    }

    //Create new vehicles each season
    for(let i=0; i<paddock.length; i++) {
        let thisEngineer = paddock[i].faculty.filter(member => member.type === 'ENGINEER');
        let newVehicle = createVehicles(1, thisEngineer, currentSeasonNum)[0];
        thisEngineer.vehicle = newVehicle;
        for(let ii=0; ii<paddock[i].drivers.length; ii++) {
            paddock[i].drivers[ii].vehicle = newVehicle;
        }
    }
    
    return paddock;
}

function evaluateDriverRetirement(driver, currentSeasonNum) {
    let retired = true;
    if(driver.seasonEntered <= currentSeasonNum - 5) {
        retired = true;
    } else {
        retired = false;
    }

    return { retired: retired };
}

function evaluateDriverContract(driver, teams, seasonArray) {
    let expired;

    let driverTeamCEO = getFacultyMember(driver.team, 'CEO')[0];

    let driverBestResult = 0;

    for(let i=0; i<seasonArray.length; i++) {
        for(let ii=0; ii<seasonArray[i].finalResult.length; ii++) {
            if(seasonArray[i].finalResult[ii].name === driver.name) {
                if(ii > driverBestResult) {
                    driverBestResult = ii;
                }
            }
        }
    }

    if(driverBestResult <= driverTeamCEO.expectation) {
        expired = false;
    } else {
        expired = true;
    }

    return { expired: expired };
}

function getFacultyMember(team, member) {
    return team.faculty.filter(thisMember => thisMember.type === member);
}

export { evaluatePaddock }
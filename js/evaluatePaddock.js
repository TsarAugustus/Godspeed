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
    seasonArray.forEach(arrayItem => previousChampions.push(arrayItem.finalResult[0]));
   
    //Go through each team/driver on the current paddock
    paddock.forEach(team => {
        teams.push(team);
        team.drivers.forEach(driver => drivers.push(driver));
    });
    
    //Match previous champions to those in the current paddock
    previousChampions.forEach(champion => {
        let thisChampion = drivers.find(driver => driver.name === champion.name);
        if(undefined !== thisChampion) {
            thisChampion.championships = champion.championships;
            thisChampion.cost++;
        }
    });
    
    // Iterate through all drivers
    drivers.forEach(driver => {
        driver.contractLength--;
        driver.retirement--;

        //Evaluate driver retirement
        if(driver.retirement === 0 && evaluateDriverRetirement(driver, currentSeasonNum)) {
            driver.seasonRetired = currentSeasonNum;

            let retiredDriversElement = document.getElementById('retiredDrivers');
            retiredDriversElement.innerHTML += `${driver.name} - ${driver.championships} - ${driver.seasonRetired}</br>`;
            retiredDrivers.push(driver);

            // paddock.forEach((team, index) => {
            //     if(team.name === driver.team.name) {
            //         paddock[index].drivers = paddock[index].drivers.filter(teamDriver => teamDriver.name !== driver.name);
            //     }
            // });
        } 

        //Evaluate a new driver contract
        if(driver.contractLength === 0 && evaluateDriverContract(driver, teams, seasonArray).expired) {
            driver.team = {};
            driver.vehicle = {};
            freeDrivers.push(driver)
        } else if(!evaluateDriverContract(driver, teams, seasonArray).expired) {
            driver.contractLength = getRandomNumber(1, 5);
        }
    });

    //Iterate through each team, assign respective drivers to teams, remove free drivers/retires drivers
    paddock.forEach((team, teamIndex) => {
        team.drivers.forEach((teamDriver, driverIndex) => drivers.find(driver => teamDriver.name === driver.name ? paddock[teamIndex].drivers[driverIndex] = driver : ''));
        freeDrivers.forEach(freeDriver => team.drivers = team.drivers.filter(driver => driver.name !== freeDriver.name));
        retiredDrivers.forEach(retiredDriver => paddock[teamIndex].drivers = paddock[teamIndex].drivers.filter(driver => driver.name !== retiredDriver.name));
    });
    
    let driverPoolSize = initPaddock.teams.length * initPaddock.driverLimit;
    let newSeasonDriversNum = (driverPoolSize - drivers.length + 1) * 2;
    let newSeasonDrivers = createDrivers(newSeasonDriversNum, currentSeasonNum);

    //Operation to make new drivers if there is a lack of them in the pool
    drivers.length < driverPoolSize ? newSeasonDrivers.forEach(driver => freeDrivers.push(driver)) : '';

    //Iterate through teams/free drivers, assign driver if the team can afford it
    paddock.forEach(team => {
        freeDrivers.forEach(freeDriver => {
            if(team.drivers.length <initPaddock.driverLimit && team.money >= freeDriver.cost) {
                let teamEngineer = getFacultyMember(team, 'ENGINEER');
                freeDriver.team = team;
                freeDriver.contractLength = getRandomNumber(1, 5);
                freeDriver.vehicle = teamEngineer.vehicle;
                team.drivers.push(freeDriver)
                freeDrivers = freeDrivers.filter(driver => driver.name !== freeDriver.name);
            }
        });
    });

    //Pools of new teams/faculty to potentially join the next season
    let newTeamPool = createTeams(initPaddock.teamLimit - paddock.length, currentSeasonNum);
    let newFacultyPool = createFaculty(newTeamPool.length * 2, newTeamPool, currentSeasonNum);
    let potentialNewTeams = []; 

    //Iterate through new faculty, find the CEO and attempt to buy a team
    newFacultyPool.forEach(member => {
        let newCEOTeam = attemptCEOTeamBuy(newTeamPool, member);
        if(member.type === 'CEO' && undefined !== newCEOTeam.name) {
            potentialNewTeams.push(newCEOTeam);
            newTeamPool = newTeamPool.filter(thisTeam => thisTeam.name !== newCEOTeam.name);
            newFacultyPool = newFacultyPool.filter(ceo => ceo.name !== member.name);
        }
    });

    //Fill in the rest of the faculty members on each new potential team
    potentialNewTeams.forEach((potentialTeam, potentialTeamIndex) => {
        potentialTeam.faculty.forEach((potentialMember, index) => {
            let newTeamFaculty = attemptFacultyBuy(potentialTeam, index, newFacultyPool);

            if(undefined === potentialMember.name && undefined !== newTeamFaculty.name) {
                potentialNewTeams[potentialTeamIndex].faculty[index] = newTeamFaculty;
                newFacultyPool = newFacultyPool.filter(member => member.name !== newTeamFaculty.name);
            }
        });
        
        // Fill in the drivers if the team can afford it
        let newTeamDrivers = attemptDriverBuy(potentialTeam, freeDrivers, initPaddock.driverLimit);
        if(potentialTeam.drivers.length < initPaddock.driverLimit && newTeamDrivers.length > 0) {
            let potentialNewDriver = {}
            newTeamDrivers.forEach(potentialDriver => {
               if(undefined === potentialNewDriver.name) potentialNewDriver = potentialDriver
               else if(potentialDriver.totalSkill > potentialNewDriver.totalSkill) potentialNewDriver = potentialDriver
            });

            //Check if there is a potential driver, if there is, add them to the team
            if(undefined !== potentialNewDriver.name) {
                potentialNewDriver.team = potentialTeam;
                potentialTeam.drivers.push(potentialNewDriver);
                freeDrivers = freeDrivers.filter(driver => driver.name !== potentialNewDriver.name);
            }
        }
    });

    //Final check on potential new teams. If they have drivers and all faculty members, add them to the paddock
    potentialNewTeams.forEach(potentialTeam => {
        let facultyEvaluation = 0;
        let driverEvaluation = false;

        potentialTeam.faculty.forEach(member => undefined !== member.name ? facultyEvaluation++ : '');
        potentialTeam.drivers.length > 0 ? driverEvaluation = true : driverEvaluation = false;

        if(facultyEvaluation === potentialTeam.faculty.length && driverEvaluation) {
            paddock.push(potentialTeam);
            potentialNewTeams = potentialNewTeams.filter(team => team.name !== potentialTeam.name)
        }
    });

    //Go through each team, remove them if they don't have any drivers
    //TODO: Retain teams in an array, even if they don't have a driver
    paddock.forEach(team => {
        team.drivers.length === 0 ? paddock = paddock.filter(paddockTeam => paddockTeam.name !== team.name) : ''
    })
    
    //Create new vehicles each season
    paddock.forEach(team => {
        let thisEngineer = getFacultyMember(team, 'ENGINEER');
        let newVehicle = createVehicles(1, thisEngineer, currentSeasonNum)[0];
        thisEngineer.vehicle = newVehicle;
        team.drivers.forEach(driver => driver.vehicle = newVehicle);
    });

    paddock.retiredDrivers = retiredDrivers;
    
    return paddock;
}

//TODO: Work on a better retirement system
//Evaluates if the driver should retire or not
function evaluateDriverRetirement(driver, currentSeasonNum) {
    if(driver.seasonEntered <= currentSeasonNum - 5) return true
    else return false
}

//Evaluates if the driver should renew their contract or not
function evaluateDriverContract(driver, teams, seasonArray) {
    let expired;

    let driverTeamCEO = getFacultyMember(driver.team, 'CEO')[0];

    let driverBestResult = 0;

    seasonArray.forEach(season =>{
        season.finalResult.forEach((driverResult, index) => (driverResult.name === driver.name && index > driverBestResult) ? driverBestResult = index  : '');
    });

    if(driverBestResult <= driverTeamCEO.expectation) expired = false
    else expired = true

    return { expired: expired };
}

function getFacultyMember(team, member) {
    return team.faculty.filter(thisMember => thisMember.type === member);
}

export { evaluatePaddock }
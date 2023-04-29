import { pointsTable } from "./pointsTable.js";

function circuitStep(teams, circuit) {
    // console.log('Starting Circuit Step');

    let circuitTeamResult = [];
    let circuitResult = [];
    for(let i=0; i<teams.length; i++) {
        let result = teamStep(teams[i], circuit);

        let teamResult = {
            team: teams[i],
            drivers: result,
            // result: result,
            points: 0
        }
        circuitTeamResult.push(teamResult);
    }

    for(let i=0; i<circuitTeamResult.length; i++) {
        let thisTeam = circuitTeamResult[i];
        for(let ii=0; ii<thisTeam.length; ii++) {
            circuitResult.push(thisTeam[ii]);
        }
    }

    for(let i=0; i<circuitTeamResult.length; i++) {
        let thisTeam = circuitTeamResult[i];
        for(let ii=0; ii<thisTeam.drivers.length; ii++){
            let thisDriver = thisTeam.drivers[ii];
            circuitResult.push(thisDriver);
        }
    }

    circuitResult = circuitResult.sort(function(a, b) {
        return b.result - a.result;
    });
    
    for(let i=0; i<circuitResult.length; i++) {
        if(undefined !==Object.values(pointsTable)[i])
            circuitResult[i].points = Object.values(pointsTable)[i];
    }

    return {
        circuitTeamResult,
        circuitResult
    }
}

function teamStep(team, circuit) { //BUG IS HERE
    let teamResult = [];
    for(let i=0; i<team.drivers.length; i++) {
        let driverStepResult = driverStep(team.drivers[i], circuit);
        
        let driverResult = {
            driver: driverStepResult.driver,
            result: 0,
            points: 0
        }
        
        for(let ii=0; ii<driverStepResult.result.length; ii++) {
            driverResult.result += driverStepResult.result[ii].total;
        }

        teamResult.push(driverResult);
    }

    return teamResult;

}

function driverStep(driver, circuit) {
    let lapTotal = {
        driver: driver,
        result: []
    };

    for(let i=0; i<circuit.laps; i++) {
        if(Math.round(circuit.laps / 2) === i) {
            let thisEngineer = getFacultyMember(driver.team, 'ENGINEER')[0];
            let thisCrew = getFacultyMember(driver.team, 'CREW')[0];
            let thisMechanic = getFacultyMember(driver.team, 'MECHANIC')[0];
            let thisStrategist = getFacultyMember(driver.team, 'STRATEGIST')[0];
            let thisPrincipal = getFacultyMember(driver.team, 'PRINCIPAL')[0];
            let thisCEO = getFacultyMember(driver.team, 'CEO')[0];
            let thisLap = {
                total: (thisEngineer.skill / thisEngineer.speed) + 
                        (thisCrew.skill / thisEngineer.speed) + 
                        (thisMechanic.skill / thisMechanic.speed) + 
                        (thisStrategist.skill / thisStrategist.speed) + 
                        (thisPrincipal.skill / thisPrincipal.speed) + 
                        (thisCEO.skill / thisPrincipal.speed)
            }
            lapTotal.result.push(thisLap)
        }
        lapTotal.result.push(lapStep(driver, circuit));
    }

    return lapTotal;
}

function lapStep(driver, circuit) {
    let thisLap = {
        total: 0
    }

    for(let i=0; i<circuit.path.length; i++) {
        let thisStep = pathStep(driver, circuit.path[i]);
        if(thisStep !== Infinity || thisLap !== NaN) {
            thisLap.total = pathStep(driver, circuit.path[i]);
        } else {
            thisLap.total = 0;
        }
    }

    return thisLap;
}

function pathStep(driver, path) {
    let returnTotal = 0;

    for(let i=0; i<path.length; i++) {
        returnTotal += evaluatePathType(driver, path);
    }

    return returnTotal;
}

function evaluatePathType(driver, path) {
    let returnNum = 0;
    let thisFaultValue = getRandomNumber(0, 10);
    if(path.type === 'Corner') {
        if(driver.faultAllowance >= driver.vehicle.faultChance) {
            returnNum = ((driver.vehicle.cornerSkill / driver.cornerSkill) - path.skill) * driver.vehicle.cornerSpeed;
        } else {
            returnNum = ((path.skill - (driver.vehicle.cornerSkill / driver.cornerSkill)) / thisFaultValue) * driver.vehicle.cornerSpeed;
        }

        if(driver.vehicle.cornerSkill > path.skill && driver.vehicle.cornerSpeed > driver.cornerSkill) {
            returnNum = Number.MIN_VALUE;
        }

    } else if(path.type === 'Straight') {
        if(driver.faultAllowance >= driver.vehicle.faultChance) {
            returnNum = ((driver.vehicle.straightSkill / driver.straightSkill) - path.skill) * driver.vehicle.straightSpeed;
        } else {
            // console.log('STRAIGHT FAULT', driver, path)
            returnNum = ((path.skill - (driver.vehicle.straightSkill / driver.straightSkill)) / thisFaultValue) * driver.vehicle.straightSpeed;
        }

        if(driver.vehicle.straightSkill > path.skill && driver.vehicle.straightSpeed > driver.straightSkill) {
            returnNum = Number.MIN_VALUE;
        }
    }

    return returnNum;
}

function getFacultyMember(team, member) {
    return team.faculty.filter(thisMember => thisMember.type === member);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { circuitStep }
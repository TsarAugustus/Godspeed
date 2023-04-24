import { pointsTable } from "./pointsTable.js";

function circuitStep(teams, circuit) {
    // console.log('Starting Circuit Step');

    let circuitTeamResult = [];
    let circuitDriverResult = [];
    for(let i=0; i<teams.length; i++) {
        let result = teamStep(teams[i], circuit);
        
        let teamResult = {
            team: teams[i],
            result: result,
            points: 0
        }
        
        
        circuitDriverResult.push(result);
        circuitTeamResult.push(teamResult);
    }

    circuitDriverResult.sort(function(a, b) {
        return b.result - a.result;
    });

    for(let i=0; i<circuitDriverResult.length; i++) {
        circuitDriverResult[i].points = Object.values(pointsTable)[i];
    }

    return {
        teamResult: circuitTeamResult,
        driverResult: circuitDriverResult
    };
}

function teamStep(team, circuit) {
    let driverResult = {};
    for(let i=0; i<team.drivers.length; i++) {
        let driverStepResult = driverStep(team.drivers[i], circuit);
        let result = {
            driver: team.drivers[i],
            result: 0,
            points: 0
        }

        for(let i=0; i<driverStepResult.length; i++) {
            result.result += driverStepResult[i].total;
        }

        driverResult = result;
    }

    return driverResult;
}

function driverStep(driver, circuit) {
    let lapTotal = [];
    for(let i=0; i<circuit.laps; i++) {
        lapTotal.push(lapStep(driver, circuit));
    }

    return lapTotal;
}

function lapStep(driver, circuit) {
    let pathTotal = [];

    let thisLap = {
        total: 0
    }

    for(let i=0; i<circuit.path.length; i++) {
        thisLap.total = pathStep(driver, circuit.path[i]);
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
    if(path.type === 'Corner') {
        returnNum = driver.cornerSkill - path.skill;
    } else if(path.type === 'Straight') {
        returnNum = driver.straightSkill - path.skill;
    }

    return returnNum;
}

export { circuitStep }
import { getRandomNumber } from './getRandomNumber.js';

function createFaculty(facultyToGenerate, teams, seasonNum) {
    console.log('Creating Faculty', facultyToGenerate);

    let facultyArray = [];
    for(let i=0; i<facultyToGenerate; i++) {
        for(let ii=0; ii<teams[0].faculty.length; ii++) {
            facultyArray.push(createMember(teams[0].faculty[ii].type, i, seasonNum))
        }
    }
    return facultyArray;
}

function createMember(memberToGenerate, teamNum, seasonNum) {
    if      (memberToGenerate === 'ceo') return generateCeo(teamNum, seasonNum) 
    else if (memberToGenerate === 'principal') return generatePrincipal(teamNum, seasonNum)
    else if (memberToGenerate === 'strategist') return generateStrategist(teamNum, seasonNum)
    else if (memberToGenerate === 'mechanic') return generateMechanic(teamNum, seasonNum)
    else if (memberToGenerate === 'engineer') return generateEngineer(teamNum, seasonNum)
    else if (memberToGenerate === 'crew') return generateCrew(teamNum, seasonNum)
}

function generateCeo(teamNum, seasonNum) {
    let ceoMoney = getRandomNumber(1, 10);
    let ceoExpectation = getRandomNumber(1, ceoMoney);
    return {
        name: `CEO ${seasonNum}-${teamNum + 1}`,
        money: ceoMoney,
        expectation: ceoExpectation,
        type: 'CEO',
        skill: getRandomNumber(1, 10),
        speed: getRandomNumber(1, 10)
    }
}

function generatePrincipal(teamNum, seasonNum) {
    return {
        name: `Principal ${seasonNum}-${teamNum + 1}`,
        level: getRandomNumber(1, 10),
        type: 'PRINCIPAL',
        cost: getRandomNumber(1, 10),
        skill: getRandomNumber(1, 10),
        money: getRandomNumber(1, 10),
        speed: getRandomNumber(1, 10)
    }
}

function generateStrategist(teamNum, seasonNum) {
    return {
        name: `Strategist ${seasonNum}-${teamNum + 1}`,
        level: getRandomNumber(1, 10),
        type: 'STRATEGIST',
        cost: getRandomNumber(1, 10),
        skill: getRandomNumber(1, 10),
        money: getRandomNumber(1, 10),
        speed: getRandomNumber(1, 10)
    }
}

function generateMechanic(teamNum, seasonNum) {
    return {
        name: `Mechanic ${seasonNum}-${teamNum + 1}`,
        level: getRandomNumber(1, 10),
        type: 'MECHANIC',
        cost: getRandomNumber(1, 10),
        skill: getRandomNumber(1, 10),
        money: getRandomNumber(1, 10),
        speed: getRandomNumber(1, 10)
    }
}

function generateEngineer(teamNum, seasonNum) {
    let creativity = getRandomNumber(1, 10)
    let conventionalDesign = getRandomNumber(0, creativity);
    
    let thisEngineer = {
        name: `Engineer ${seasonNum}-${teamNum + 1}`,
        level: getRandomNumber(1, 10),
        type: 'ENGINEER',
        costSaving: getRandomNumber(1, 10),
        conventionalDesign: conventionalDesign, //if low, then they design a conventional car | if high, not conventional and has risks
        faultChance: getRandomNumber(conventionalDesign, 10),
        cost: getRandomNumber(1, 10),
        money: getRandomNumber(1, 10),
        skill: getRandomNumber(1, 10),
        speed: getRandomNumber(1, 10),
        vehicle: {}
    }

    return thisEngineer;
}

function generateCrew(teamNum, seasonNum) {
    return {
        name: `Crew ${seasonNum}-${teamNum + 1}`,
        level: getRandomNumber(1, 10),
        type: 'CREW',
        cost: getRandomNumber(1, 10),
        money: getRandomNumber(1, 10),
        skill: getRandomNumber(1, 10),
        speed: getRandomNumber(1, 10)
    }
}

export { createFaculty };
'use strict';

import { getRandomNumber } from './getRandomNumber.js';

function createFaculty(facultyToGenerate, teams, seasonNum) {
    // console.log('Creating Faculty', facultyToGenerate);

    let facultyArray = [];
    let typesToGenerate = [];
    let keys = Object.keys(teams[0]);
    let values = Object.values(teams[0]);
    let thisCount = 0;

    values.forEach((value, index) => {
        if(undefined !== value.faculty) typesToGenerate.push(keys[index])
    });

    for(let i=0; i<facultyToGenerate; i++) {
        if(thisCount === typesToGenerate.length) thisCount = 0;
        facultyArray.push(createMember(typesToGenerate[thisCount], i, seasonNum));
        thisCount++
    }
    
    return facultyArray;
}

//TEAMNUM IS WRONG, WORKS FOR NOW, BUT FIX SOON, ITS EZ
function createMember(memberToGenerate, teamNum, seasonNum) {
    if      (memberToGenerate === 'ceo') return generateCeo(teamNum, seasonNum) 
    else if (memberToGenerate === 'principal') return generatePrincipal(teamNum, seasonNum)
    else if (memberToGenerate === 'strategist') return generateStrategist(teamNum, seasonNum)
    else if (memberToGenerate === 'mechanic') return generateMechanic(teamNum, seasonNum)
    else if (memberToGenerate === 'engineer') return generateEngineer(teamNum, seasonNum)
    else if (memberToGenerate === 'crew') return generateCrew(teamNum, seasonNum)
}

function generateCeo(teamNum, seasonNum) {
    let ceoMoney = getRandomNumber(10, 20);
    let ceoExpectation = getRandomNumber(1, ceoMoney);
    return {
        name: `CEO ${seasonNum}-${teamNum + 1}`,
        money: ceoMoney,
        expectation: ceoExpectation,
        type: 'CEO',
        skill: getRandomNumber(1, 10),
        speed: getRandomNumber(1, 10),
        retirement: getRandomNumber(1, 5),
        contractLength: 0,
        faculty: true
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
        speed: getRandomNumber(1, 10),
        retirement: getRandomNumber(1, 5),
        contractLength: 0,
        faculty: true
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
        speed: getRandomNumber(1, 10),
        retirement: getRandomNumber(1, 5),
        contractLength: 0,
        faculty: true
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
        speed: getRandomNumber(1, 10),
        retirement: getRandomNumber(1, 5),
        contractLength: 0,
        faculty: true
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
        retirement: getRandomNumber(1, 5),
        contractLength: 0,
        faculty: true,
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
        speed: getRandomNumber(1, 10),
        retirement: getRandomNumber(1, 5),
        contractLength: 0,
        faculty: true
    }
}

export { createFaculty };
function createFaculty(facultyToGenerate, teams) {
    console.log('Creating Faculty', facultyToGenerate);

    let facultyArray = [];
    for(let i=0; i<facultyToGenerate; i++) {
        for(let ii=0; ii<teams[0].faculty.length; ii++) {
            facultyArray.push(createMember(teams[0].faculty[ii].type, i))
        }
    }
    return facultyArray;
}

function createMember(memberToGenerate, teamNum) {
    if      (memberToGenerate === 'ceo') return generateCeo(teamNum) 
    else if (memberToGenerate === 'principal') return generatePrincipal(teamNum)
    else if (memberToGenerate === 'strategist') return generateStrategist(teamNum)
    else if (memberToGenerate === 'mechanic') return generateMechanic(teamNum)
    else if (memberToGenerate === 'engineer') return generateEngineer(teamNum)
    else if (memberToGenerate === 'crew') return generateCrew(teamNum)
}

function generateCeo(teamNum) {
    let ceoMoney = getRandomNumber(0, 10);
    let ceoExpectation = getRandomNumber(0, ceoMoney);
    return {
        name: `CEO ${teamNum + 1}`,
        money: ceoMoney,
        expectation: ceoExpectation,
        type: 'CEO'
    }
}

function generatePrincipal(teamNum) {
    return {
        name: `Principal ${teamNum + 1}`,
        level: getRandomNumber(0, 10),
        type: 'PRINCIPAL',
        cost: getRandomNumber(0, 10)
    }
}

function generateStrategist(teamNum) {
    return {
        name: `Strategist ${teamNum + 1}`,
        level: getRandomNumber(0, 10),
        type: 'STRATEGIST',
        cost: getRandomNumber(0, 10)
    }
}

function generateMechanic(teamNum) {
    return {
        name: `Mechanic ${teamNum + 1}`,
        level: getRandomNumber(0, 10),
        type: 'MECHANIC',
        cost: getRandomNumber(0, 10)
    }
}

function generateEngineer(teamNum) {
    let creativity = getRandomNumber(0, 10)
    let conventionalDesign = getRandomNumber(0, creativity);
    
    let thisEngineer = {
        name: `Engineer ${teamNum + 1}`,
        level: getRandomNumber(0, 10),
        type: 'ENGINEER',
        costSaving: getRandomNumber(0, 10),
        conventionalDesign: conventionalDesign, //if low, then they design a conventional car | if high, not conventional and has risks
        faultChance: getRandomNumber(conventionalDesign, 10),
        cost: getRandomNumber(0, 10),
        vehicle: {}
    }

    return thisEngineer;
}

function generateCrew(teamNum) {
    return {
        name: `Crew ${teamNum + 1}`,
        level: getRandomNumber(0, 10),
        type: 'CREW',
        cost: getRandomNumber(0, 10)
    }
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createFaculty };
function createTeam(teamsToGenerate, driversPerTeam) {
    let teamArray = [];
    for(let i=0; i<teamsToGenerate; i++) {
        //Creates a new team
        //Each member should be created more thoroughly
        //EG, multiple drivers/crew/mechanics etc
        //EG, driver skills/crew skills/mechanic skills
        let newTeam = {
            name: `Team ${i}`,  
            ceo: {
                name: `CEO ${i}`,
                money: getRandomNumber(1, 100),
                skill: getRandomNumber(0, 10)
            },
            principal: {
                name: `PRINCIPAL ${i}`,
                skill: getRandomNumber(0, 10)
            },
            strategist: {
                name: `STRATEGIST ${i}`,
                skill: getRandomNumber(0, 10)
            },
            mechanic: {
                name: `MECHANIC ${i}`,
                skill: getRandomNumber(0, 10)
            },
            engineer: {
                name: `ENGINEER ${i}`,
                skill: getRandomNumber(0, 10)
            },
            crew: {
                name: `CREW ${i}`,
                skill: getRandomNumber(0, 10)
            },
            driver: createDriver(driversPerTeam, i)
            //Other members to generate
            //IT
            //PR
            //LOGISTICS
    
        }
        teamArray.push(newTeam)
    }
    return teamArray;
}

function createDriver(driversPerTeam, teamNumber) {
    let drivers = [];
    for(let i=0; i<driversPerTeam; i++) {
        // console.log(`${teamNumber} - ${i}`)
        let newDriver =  {
            name: `TEAM: ${teamNumber} - DRIVER ${i}`,
            driverNumber: i,
            skill: getRandomNumber(0, 10),
            team: teamNumber,
            car: {
                name: `CAR ${i}`,
                skill: getRandomNumber(0, 10),
                straightSkill: getRandomNumber(0, 10),
                cornerSkill: getRandomNumber(0, 10)
            }
        };
        drivers.push(newDriver)
    }

    return drivers;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createTeam }
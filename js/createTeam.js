function createTeam(teamsToGenerate) {
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
            driver: {
                name: `DRIVER ${i}`,
                skill: getRandomNumber(0, 10),
                car: {
                    name: `CAR ${i}`,
                    skill: getRandomNumber(0, 10),
                    straightSkill: getRandomNumber(0, 10),
                    cornerSkill: getRandomNumber(0, 10)
                }
            }
            //Other members to generate
            //IT
            //PR
            //LOGISTICS
    
        }
        teamArray.push(newTeam)
    }
    return teamArray;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createTeam }
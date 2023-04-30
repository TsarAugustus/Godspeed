import { getRandomNumber } from './getRandomNumber.js';

function createVehicles(vehiclesToGenerate, faculty, seasonNum) {
    //Vehicles are to be influenced by the engineers created
    let engineerArray = [];
    let vehicleArray = [];
    for(let i=0; i<faculty.length; i++) {
        if(faculty[i].type === 'ENGINEER') {
            engineerArray.push(faculty[i])
        }
    }
    
    console.log('Creating Vehicles', engineerArray.length);

    engineerArray.forEach((engineer, index) => {
        let newVehicle = {
            name: `Vehicle ${seasonNum}-${index+1}`,
            engineer: engineer,
            cost: getRandomNumber(engineer.costSaving, 10) - engineer.costSaving,
            faultChance: getRandomNumber(engineer.conventionalDesign, engineer.faultChance),
            cornerSpeed: getRandomNumber(1, engineer.conventionalDesign),
            cornerSkill: getRandomNumber(1, engineer.conventionalDesign),
            straightSpeed: getRandomNumber(1, engineer.conventionalDesign),
            straightSkill: getRandomNumber(1, engineer.conventionalDesign),
        }

        vehicleArray.push(newVehicle);
    })

    return vehicleArray;
}

export { createVehicles };
function createVehicles(vehiclesToGenerate, faculty) {
    //Vehicles are to be influenced by the engineers created
    let engineerArray = [];
    let vehicleArray = [];
    for(let i=0; i<faculty.length; i++) {
        if(faculty[i].type === 'ENGINEER') {
            engineerArray.push(faculty[i])
        }
    }
    
    console.log('Creating Vehicles', engineerArray.length);

    for(let i=0; i<engineerArray.length; i++) {
        let thisEngineer = engineerArray[i];

        let newVehicle = {
            name: `Vehicle ${i+1}`,
            engineer: thisEngineer,
            cost: getRandomNumber(thisEngineer.costSaving, 10) - thisEngineer.costSaving,
            faultChance: getRandomNumber(thisEngineer.conventionalDesign, thisEngineer.faultChance),
            cornerSpeed: getRandomNumber(1, thisEngineer.conventionalDesign),
            cornerSkill: getRandomNumber(1, thisEngineer.conventionalDesign),
            straightSpeed: getRandomNumber(1, thisEngineer.conventionalDesign),
            straightSkill: getRandomNumber(1, thisEngineer.conventionalDesign),
        }

        vehicleArray.push(newVehicle);
    }
    
    return vehicleArray;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createVehicles };
function createDrivers(driversToGenerate, teams) {
    console.log('Creating Drivers', driversToGenerate);

    let driverArray = [];

    for(let i=0; i<driversToGenerate; i++) {
        let newDriver = {
            name: `Driver ${i+1}`,
            faultAllowance: getRandomNumber(0, 10),
            cornerSkill: getRandomNumber(0, 10),
            straightSkill: getRandomNumber(0, 10),
            car: []
        }

        driverArray.push(newDriver);
    }
    
    return driverArray;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createDrivers };
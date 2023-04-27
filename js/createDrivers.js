function createDrivers(driversToGenerate, seasonNum) {
    console.log('Creating Drivers', driversToGenerate);

    let driverArray = [];
    for(let i=0; i<driversToGenerate; i++) {
        let newDriver = {
            name: `Driver ${seasonNum}-${i+1}`,
            seasonNum: seasonNum,
            faultAllowance: getRandomNumber(0, 10),
            cornerSkill: getRandomNumber(0, 10),
            straightSkill: getRandomNumber(0, 10),
            totalSkill: 0,
            totalPoints: 0,
            cost: getRandomNumber(1, 10),
            retirement: getRandomNumber(5, 15),
            contractLength: getRandomNumber(1, 10),
            championships: 0,
            seasonEntered: 0,
            seasonRetired: 0,
            vehicle: []
        }

        newDriver.totalSkill = newDriver.cornerSkill + newDriver.straightSkill + newDriver.faultAllowance;

        driverArray.push(newDriver);
    }
    
    return driverArray;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createDrivers };
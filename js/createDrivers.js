import { getRandomNumber } from './getRandomNumber.js';

function createDrivers(driversToGenerate, seasonNum) {
    // console.log('Creating Drivers', driversToGenerate);

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
            retirement: 0,
            contractLength: getRandomNumber(1, 5),
            championships: 0,
            seasonEntered: seasonNum,
            seasonRetired: 0,
            vehicle: []
        }

        newDriver.retirement = getRandomNumber(newDriver.contractLength, getRandomNumber(newDriver.contractLength, 10))
        newDriver.totalSkill = newDriver.cornerSkill + newDriver.straightSkill + newDriver.faultAllowance;

        driverArray.push(newDriver);
    }
    
    return driverArray;
}

export { createDrivers };
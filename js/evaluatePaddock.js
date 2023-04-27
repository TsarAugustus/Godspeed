import { createDrivers } from "./createDrivers.js";

function evaluatePaddock(paddock, seasonArray, currentSeasonNum, initPaddock) {
    let teams = [];
    let drivers = [];
    let previousChampions = [];
    let retiredDrivers = [];
    let freeDrivers = [];

    //Iterate over previous seasons, push champions to array
    for(let i=0; i<seasonArray.length; i++) {
        previousChampions.push(seasonArray[i].finalResult[0]);
    }
   
    //Go through each team/driver on the current paddock
    for(let i=0; i<paddock.length; i++) {
        teams.push(paddock[i]);
        for(let ii=0; ii<teams[i].drivers.length; ii++) {
            drivers.push(teams[i].drivers[ii]);
        }
    }

    //Match previous champions to those in the current paddock
    for(let i=0; i<previousChampions.length; i++) {
        for(let ii=0; ii<drivers.length; ii++) {
            if(previousChampions[i].name === drivers[ii].name) {
                drivers[ii].championships = previousChampions[i].championships;
                drivers[ii].cost++;
            }
        }
    }

    //Iterate through all drivers
    for(let i=0; i<drivers.length; i++) {
        //Reduce the retirement and contract length
        drivers[i].retirement--;
        drivers[i].contractLength--;

        //Evaluate driver retirement
        if(drivers[i].retirement === 0) {
            if(evaluateDriverRetirement(drivers[i]).retired) {
                drivers[i].seasonRetired = currentSeasonNum;
                let retiredDriversElement = document.getElementById('retiredDrivers');
                retiredDriversElement.innerHTML += `${drivers[i].name}  - ${drivers[i].seasonRetired}</br>`;
                retiredDrivers.push(drivers[i]);
                // drivers.splice(drivers[i], 1);
            }
        }

        //Evaluate a new driver contract
        if(undefined !== drivers[i] && drivers[i].contractLength === 0) {
            if(evaluateDriverContract(drivers[i], teams).expired) {
                drivers[i].team = {};
                drivers[i].vehicle = {};
                freeDrivers.push(drivers[i]);
                // drivers.splice(drivers[i], 1);
            }
        }
    }

    //Remove retired/free drivers from paddock
    for(let i=0; i<paddock.length; i++) {
        for(let ii=0; ii<paddock[i].drivers.length; ii++) {
            for(let iii=0; iii<drivers.length; iii++) {
                if(drivers[iii].name === paddock[i].drivers[ii].name) {
                    paddock[i].drivers[ii] = drivers[iii];
                }
            }
        }

        for(let iii=0; iii<freeDrivers.length; iii++) {
            paddock[i].drivers = paddock[i].drivers.filter(driver => driver.name !== freeDrivers[iii].name);
        }

        for(let iii=0; iii<retiredDrivers.length; iii++) {
            paddock[i].drivers = paddock[i].drivers.filter(driver => driver.name !== retiredDrivers[iii].name);
        }
    }

    let driverPoolSize = initPaddock.teams.length * initPaddock.driverLimit;
    if(drivers.length < driverPoolSize) {
        let newSeasonDrivers = createDrivers((driverPoolSize - drivers.length + 1) * 2, currentSeasonNum);
        for(let i=0; i<newSeasonDrivers.length; i++) {
            freeDrivers.push(newSeasonDrivers[i])
        }
    }

    for(let i=0; i<paddock.length; i++) {
        for(let ii=0; ii<freeDrivers.length; ii++) {
            if(paddock[i].drivers.length === 0 && paddock[i].money >= freeDrivers[ii].cost) {
                freeDrivers[ii].team = paddock[i];
                freeDrivers[ii].contractLength = getRandomNumber(1, 5);
                freeDrivers[ii].vehicle = paddock[i].faculty[4].vehicle;
                paddock[i].drivers.push(freeDrivers[ii]);
                freeDrivers = freeDrivers.filter(driver => driver.name !== freeDrivers[ii].name);
            } else if(paddock[i].drivers.length < initPaddock.driverLimit && paddock[i].money >= freeDrivers[ii].cost) {
                freeDrivers[ii].team = paddock[i];
                freeDrivers[ii].contractLength = getRandomNumber(1, 5);
                freeDrivers[ii].vehicle = paddock[i].faculty[4].vehicle;
                paddock[i].drivers.push(freeDrivers[ii]);
                freeDrivers = freeDrivers.filter(driver => driver.name !== freeDrivers[ii].name);
            }
        }
    }

    return paddock;
}

function evaluateDriverRetirement(driver) {
    let retired = true;
    return { retired: retired };
}

function evaluateDriverContract(driver, teams) {
    let expired = true;

    return { expired: expired };
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { evaluatePaddock }
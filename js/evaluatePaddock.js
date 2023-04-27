function evaluatePaddock(paddock, seasonArray, currentSeasonNum) {
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
                drivers[ii].championships = previousChampions[i].championships
            }
        }
    }

    for(let i=0; i<drivers.length; i++) {
        drivers[i].retirement--;
        drivers[i].contractLength--;

        if(drivers[i].retirement === 0) {
            if(evaluateDriverRetirement(drivers[i]).retired) {
                drivers[i].seasonRetired = currentSeasonNum;
                let retiredDriversElement = document.getElementById('retiredDrivers');
                retiredDriversElement.innerHTML += `${drivers[i].name}  - ${drivers[i].seasonRetired}</br>`;
                retiredDrivers.push(drivers[i]);
                // drivers.splice(drivers[i], 1);
            }
        }

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

    // console.log(teams, drivers, retiredDrivers, freeDrivers)

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

export { evaluatePaddock }
function attemptDriverBuy(team, driverPool, driverLimit) {
    let drivers = [];

    for(let i=0; i<driverLimit; i++) {
        let potentialDriver = {};
        for(let ii=0; ii<driverPool.length; ii++) {
            if(undefined === potentialDriver.name && team.faculty[0].money >= driverPool[ii].cost) {
                potentialDriver = driverPool[ii];
            } else if(driverPool[ii].totalSkill > potentialDriver.totalSkill && team.faculty[0].money >= driverPool[ii].cost) {
                potentialDriver = driverPool[ii];
            }
            driverPool = driverPool.filter(function(driver) {
                return driver.name !== potentialDriver.name
            })
        }

        if(undefined !== potentialDriver.name)
            drivers.push(potentialDriver);
    }

    return drivers;
}

export { attemptDriverBuy }
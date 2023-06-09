'use strict';

import { getRandomNumber } from "./getRandomNumber.js";

function attemptDriverBuy(team, driverPool, driverLimit) {
    let drivers = [];
    if(undefined !== team.ceo) {
        for(let i=0; i<driverLimit; i++) {
            let potentialDriver = {};
            for(let ii=0; ii<driverPool.length; ii++) {
                
                if(undefined === potentialDriver.name && team.ceo.money >= driverPool[ii].cost) {
                    potentialDriver = driverPool[ii];
                } else if(driverPool[ii].totalSkill > potentialDriver.totalSkill && team.ceo.money >= driverPool[ii].cost) {
                    potentialDriver = driverPool[ii];
                }
                driverPool = driverPool.filter(function(driver) {
                    return driver.name !== potentialDriver.name
                })
            }
    
            if(undefined !== potentialDriver.name) {
                potentialDriver.contractLength = getRandomNumber(1, 5);
                drivers.push(potentialDriver);
            }
        }
    }
    
    return drivers;
}

export { attemptDriverBuy }
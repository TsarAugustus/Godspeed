'use strict';

import { createCircuit }            from './createCircuit.js'
import { createTeams }              from './createTeams.js';
import { createDrivers }            from './createDrivers.js';
import { createFaculty }            from './createFaculty.js';
import { createVehicles }           from './createVehicles.js';
// import { assemblePaddock }          from './assemblePaddock.js';
import { circuitStep }              from './circuitStep.js';
import { createHTMLResult }         from './createHTMLResult.js';
// import { evaluatePaddock }          from './evaluatePaddock.js';
import { calculateSeasonResult }    from './calculateSeasonResult.js';
import { evalPaddock } from './evalPaddock.js';

function main() {

    let retiredDriversElement = document.createElement('p');
    retiredDriversElement.id = `retiredDrivers`;
    retiredDriversElement.innerHTML = '<h2>Retired Drivers</h2>';
    // retiredDriversElement.classList.add('retiredDrivers');

    document.body.appendChild(retiredDriversElement);
    //Generates the area for the game
    createGameArea();

    let circuitsToGenerate  = 22;
    let teamsToGenerate     = 10;
    let driversToGenerate   = 30;
    let facultyToGenerate   = 30;
    let vehiclesToGenerate  = 1;
    let seasonsToGenerate   = 10;
    let driverLimit         = 2;

    let circuits    = createCircuit(circuitsToGenerate);
    let teams       = createTeams(teamsToGenerate, 0);
    let drivers     = createDrivers(driversToGenerate, 0);
    let faculty     = createFaculty(facultyToGenerate, teams, 0);
    let vehicles    = createVehicles(vehiclesToGenerate, faculty, 0);

    let initPaddock = {
        circuits: circuits,
        teams: teams,
        drivers: drivers,
        faculty: faculty,
        vehicles: vehicles,
        driverLimit: driverLimit,
        teamLimit: teamsToGenerate
    }

    let result = initialize(seasonsToGenerate, initPaddock);
    createHTMLResult(result);
}

function initialize(seasonsToGenerate, initPaddock) {
    let seasonArray = [];

    let paddock = [];
    for(let i=0; i<seasonsToGenerate; i++) {

        paddock = evalPaddock(i, initPaddock, paddock, seasonArray)

        let seasonResult = {
            name: `Season ${i + 1}`,
            result: generateSeason(paddock, i, initPaddock.circuits),
            finalResult: [],
            seasonDrivers: [],
            retiredDrivers: [],
            freeDrivers: []
        }

        if(undefined !== paddock.retiredDrivers && paddock.retiredDrivers.length > 0) {
            seasonResult.retiredDrivers = paddock.retiredDrivers;
        }

        paddock.forEach(team => {
            team.drivers.forEach(driver => {
                seasonResult.seasonDrivers.push(driver);
            });
        });

        seasonResult.finalResult = calculateSeasonResult(seasonResult, seasonArray).finalResult;
        seasonResult.teamResult = calculateSeasonResult(seasonResult, seasonArray).teamResult;

        seasonArray.push(seasonResult);
    }

    return seasonArray;
}

function generateSeason(paddock, seasonNumber, circuits) {
    let seasonResult = [];

    for(let i=0; i<circuits.length; i++) {        

        let result = circuitStep(paddock, circuits[i]);
        let circuitResult = {
            name: `Circuit ${i + 1}`,
            result: result
        }

        seasonResult.push(circuitResult);
    }

    return seasonResult;
}


//Create the game area 
function createGameArea() {
    let gameArea = document.createElement('div');
    gameArea.id = 'gameArea';
    document.body.appendChild(gameArea);
}

window.onload = function() {
    main()
}
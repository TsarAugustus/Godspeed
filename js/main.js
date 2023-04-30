import { createCircuit }    from './createCircuit.js'
import { createTeams }      from './createTeams.js';
import { createDrivers }    from './createDrivers.js';
import { createFaculty }    from './createFaculty.js';
import { createVehicles }   from './createVehicles.js';
import { assemblePaddock }  from './assemblePaddock.js';
import { circuitStep } from './circuitStep.js';
import { createHTMLResult } from './createHTMLResult.js';
import { evaluatePaddock } from './evaluatePaddock.js';

function main() {

    let retiredDriversElement = document.createElement('p');
    retiredDriversElement.id = `retiredDrivers`;
    retiredDriversElement.innerHTML = '<h2>Retired Drivers</h2>';
    // retiredDriversElement.classList.add('retiredDrivers');

    document.body.appendChild(retiredDriversElement);
    //Generates the area for the game
    createGameArea();

    let circuitsToGenerate  = 10;
    let teamsToGenerate     = 13;
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
    console.log('Initializing Seasons', seasonsToGenerate);
    let seasonArray = [];


    let paddock = [];
    for(let i=0; i<seasonsToGenerate; i++) {

        if(paddock.length === 0) {
            paddock = assemblePaddock(initPaddock)
        } else {
            paddock = evaluatePaddock(paddock, seasonArray, i, initPaddock);
        }

        let seasonResult = {
            name: `Season ${i + 1}`,
            result: generateSeason(paddock, i, initPaddock.circuits),
            finalResult: [],
            seasonDrivers: []
        }

        paddock.forEach( (team) => {
            team.drivers.forEach( (driver) => {
                seasonResult.seasonDrivers.push(driver);
            });
        });

        seasonResult.finalResult = calculateSeasonResult(seasonResult, seasonArray);
        seasonArray.push(seasonResult);

    }

    return seasonArray;
}

function calculateSeasonResult(seasonResult, seasonArray) {
    let finalResultArray = [];

    seasonResult.seasonDrivers.forEach(seasonDriverResult => {
        let driverResult = {
            name: seasonDriverResult.name,
            pointsTotal: 0,
            totalAfterCircuit: 0,
            championships: 0,
            team: seasonDriverResult.team
        };

        seasonResult.result.forEach(circuitResult => {
            circuitResult.result.circuitResult.forEach(driverResultArray => {
                if (driverResultArray.driver.name == seasonDriverResult.name) driverResult.pointsTotal += driverResultArray.points;
            });
        });

        finalResultArray.push(driverResult)            
    });
    
    //Sorts the final result by points
    finalResultArray.sort(function(a, b) {
        return b.pointsTotal - a.pointsTotal;
    });

    //Create array to hold previous champions
    let champions = [];

    //Push this seasons champion
    if(champions.length === 0) {
        champions.push(finalResultArray[0]);
    }
    
    //Go through each season, grab sorted final result, push to champion array
    seasonArray.forEach(arrayIndex => {
        champions.push(arrayIndex.finalResult[0]);
    });

    //Find each champion, match their championships to their driver
    finalResultArray.forEach(result => {
        champions.forEach(champion => {
            if(result.name === champion.name) {
                result.championships++;
            }
        });
    });

    return finalResultArray;
}

function generateSeason(paddock, seasonNumber, circuits) {
    // console.log('Generating Season', seasonNumber + 1)
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
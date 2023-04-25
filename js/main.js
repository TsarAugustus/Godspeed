import { createCircuit }    from './createCircuit.js'
import { createTeams }      from './createTeams.js';
import { createDrivers }    from './createDrivers.js';
import { createFaculty }    from './createFaculty.js';
import { createVehicles }   from './createVehicles.js';
import { assemblePaddock }  from './assemblePaddock.js';
import { circuitStep } from './circuitStep.js';
import { createHTMLResult } from './createHTMLResult.js';

function main() {
    //Generates the area for the game
    createGameArea();

    let circuitsToGenerate  = 10;
    let teamsToGenerate     = 10;
    let driversToGenerate   = 30;
    let facultyToGenerate   = 10;
    let vehiclesToGenerate  = 1;
    let seasonsToGenerate   = 10;
    let driverLimit         = 2;

    let circuits    = createCircuit(circuitsToGenerate);
    let teams       = createTeams(teamsToGenerate);
    let drivers     = createDrivers(driversToGenerate, teams);
    let faculty     = createFaculty(facultyToGenerate, teams);
    let vehicles    = createVehicles(vehiclesToGenerate, faculty);

    let initPaddock = {
        circuits: circuits,
        teams: teams,
        drivers: drivers,
        faculty: faculty,
        vehicles: vehicles,
        driverLimit: driverLimit
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
        }

        let seasonResult = {
            name: `Season ${i + 1}`,
            result: generateSeason(paddock, i, initPaddock.circuits),
            finalResult: [],
            seasonDrivers: []
        }

        for(let ii=0; ii<paddock.length; ii++) {
            let thisTeam = paddock[ii];
            for(let iii=0; iii<thisTeam.drivers.length; iii++) {
                let thisDriver = thisTeam.drivers[iii];
                seasonResult.seasonDrivers.push(thisDriver);
            }
        }
        // console.log(seasonResult, paddock)

        seasonResult.finalResult = calculateSeasonResult(seasonResult, seasonArray);
        seasonArray.push(seasonResult);

    }

    return seasonArray;
}

function calculateSeasonResult(seasonResult, seasonArray) {
    let finalResultArray = [];

    if(seasonArray.length > 0) {
        // console.log(seasonArray)
    }

    for(let i=0; i<seasonResult.seasonDrivers.length; i++) {
        let thisDriver = seasonResult.seasonDrivers[i];
        let driverResult = {
            name: thisDriver.name,
            pointsTotal: 0,
            totalAfterCircuit: {},
            championships: 0,
            team: seasonResult.seasonDrivers[i].team
        };

        for(let ii=0; ii<seasonResult.result.length; ii++) {
            let thisCircuitResult = seasonResult.result[ii].result.circuitResult;

            for(let iii=0; iii<thisCircuitResult.length; iii++) {
                let thisCircuitResultDriver = thisCircuitResult[iii];

                if(thisCircuitResultDriver.driver.name === thisDriver.name) {
                    driverResult.pointsTotal += thisCircuitResultDriver.points;
                }

            }
        }

        finalResultArray.push(driverResult);
    }
    
    finalResultArray.sort(function(a, b) {
        return b.pointsTotal - a.pointsTotal;
    });

    let champions = [];
    
    if(champions.length === 0) {
        champions.push(finalResultArray[0]);
    }
    
    for(let i=0; i<seasonArray.length; i++) {
        champions.push(seasonArray[i].finalResult[0]);
    }

    for(let i=0; i<finalResultArray.length; i++) {
        for(let ii=0; ii<champions.length; ii++){
            if(finalResultArray[i].name === champions[ii].name) {
                finalResultArray[i].championships++;
            }
        }
    }

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
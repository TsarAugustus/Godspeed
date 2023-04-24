import { createCircuit }    from './createCircuit.js'
import { createTeams }      from './createTeams.js';
import { createDrivers }    from './createDrivers.js';
import { createFaculty }    from './createFaculty.js';
import { createVehicles }   from './createVehicles.js';
import { assemblePaddock }  from './assemblePaddock.js';

function main() {
    //Generates the area for the game
    createGameArea();

    let circuitsToGenerate  = 1;
    let teamsToGenerate     = 10;
    let driversToGenerate   = 10;
    let facultyToGenerate   = 10;
    let vehiclesToGenerate  = 1;
    let seasonsToGenerate   = 1;
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

    initialize(seasonsToGenerate, initPaddock);
}

function initialize(seasonsToGenerate, initPaddock) {
    console.log('Initializing Seasons', seasonsToGenerate);
    let seasonArray = [];

    for(let i=0; i<seasonsToGenerate; i++) {
        seasonArray.push(generateSeason(initPaddock, i));
    }

    return seasonArray;
}

function generateSeason(initPaddock, seasonNumber) {
    console.log('Generating Season', seasonNumber + 1)
    let seasonResult = [];
    let seasonPaddock = {};

    for(let i=0; i<initPaddock.circuits.length; i++) {
        if(i === 0) {
            seasonPaddock = assemblePaddock(initPaddock);
            console.log(seasonPaddock)
            
            //Debugging purposes
            for(let ii=0; ii<seasonPaddock.length; ii++) {
                // console.log(seasonPaddock[ii].drivers, seasonPaddock)
            }
        }
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
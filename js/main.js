import { createCircuit }    from './createCircuit.js'
import { createTeams }      from './createTeams.js';
import { createDrivers }    from './createDrivers.js';
import { createFaculty }    from './createFaculty.js';
import { createVehicles }   from './createVehicles.js';
import { assemblePaddock }  from './assemblePaddock.js';
import { circuitStep } from './circuitStep.js';

function main() {
    //Generates the area for the game
    createGameArea();

    let circuitsToGenerate  = 2;
    let teamsToGenerate     = 5;
    let driversToGenerate   = 10;
    let facultyToGenerate   = 10;
    let vehiclesToGenerate  = 1;
    let seasonsToGenerate   = 1;
    let driverLimit         = 1;

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

    for(let i=0; i<result.length; i++) {
        let body = document.body;

        let season = result[i];

        let seasonDiv = document.createElement('div');
        seasonDiv.id = season.name;
        seasonDiv.innerHTML = `<h1>${season.name}</h1>`

        let resultDiv = document.createElement('div');
        resultDiv.id = `${season.name}`;
        let driverStandingDiv = document.createElement('div');
        driverStandingDiv.id = `${season.name} Driver Standing`
        for(let ii=0; ii<season.finalResult.length; ii++) {
            let standing = document.createElement('p');
            standing.id = `${season.finalResult[ii]} Standing`;
            standing.innerHTML = `${season.finalResult[ii].name} - ${season.finalResult[ii].pointsTotal}`;
            
            driverStandingDiv.appendChild(standing)
        }

        seasonDiv.appendChild(driverStandingDiv)
        for(let ii=0; ii<season.result.length; ii++) {
            let circuit = season.result[ii];
            
            let circuitResultDiv = document.createElement('div');
            circuitResultDiv.id = circuit.name;
            circuitResultDiv.innerHTML = `<h2>${circuit.name}</h2>`;
            for(let iii=0; iii<circuit.result.driverResult.length; iii++) {
                let driver = circuit.result.driverResult[iii];
                
                let driverResultDiv = document.createElement('p');
                driverResultDiv.id = `${driver.driver.name}`;
                driverResultDiv.innerHTML = `${driver.driver.name} - ${iii + 1}/${circuit.result.driverResult.length} - ${driver.points}`;

                circuitResultDiv.appendChild(driverResultDiv);
            }

            seasonDiv.appendChild(circuitResultDiv)
        }

        body.appendChild(seasonDiv)
    }
}

function initialize(seasonsToGenerate, initPaddock) {
    console.log('Initializing Seasons', seasonsToGenerate);
    let seasonArray = [];

    for(let i=0; i<seasonsToGenerate; i++) {
        let seasonResult = {
            name: `Season ${i + 1}`,
            result: generateSeason(initPaddock, i),
            finalResult: [],
            seasonDrivers: []
        }

        let teams = initPaddock.teams;

        for(let ii=0; ii<teams.length; ii++) {
            let thisTeam = initPaddock.teams[ii];
            for(let iii=0; iii<thisTeam.drivers.length; iii++) {
                let thisDriver = thisTeam.drivers[iii];
                seasonResult.seasonDrivers.push(thisDriver);
            }
        }

        seasonResult.finalResult = calculateSeasonResult(seasonResult, initPaddock);
        seasonArray.push(seasonResult);
    }

    return seasonArray;
}

function calculateSeasonResult(seasonResult, initPaddock) {
    let finalResultArray = [];
    for(let i=0; i<seasonResult.seasonDrivers.length; i++) {
        let thisDriver = seasonResult.seasonDrivers[i];
        let driverResult = {
            name: thisDriver.name,
            pointsTotal: 0
        };

        for(let ii=0; ii<seasonResult.result.length; ii++) {
            let thisCircuitResult = seasonResult.result[ii].result.driverResult;
            for(let iii=0; iii<thisCircuitResult.length; iii++) {
                let thisCircuitResultDriver = thisCircuitResult[iii];
                if(thisDriver.name === thisCircuitResultDriver.driver.name) {
                    driverResult.pointsTotal += thisCircuitResultDriver.points;
                }

            }
        }
        finalResultArray.push(driverResult);
    }
    
    finalResultArray.sort(function(a, b) {
        return b.pointsTotal - a.pointsTotal;
    });

    return finalResultArray;
}

function generateSeason(initPaddock, seasonNumber) {
    console.log('Generating Season', seasonNumber + 1)
    let seasonResult = [];
    let seasonPaddock = {};

    //Temportary measure
    //Assigns paddock if it's the first race of the season
    for(let i=0; i<initPaddock.circuits.length; i++) {        
        if(i === 0) {
            seasonPaddock = assemblePaddock(initPaddock);
        }

        let result = circuitStep(seasonPaddock, initPaddock.circuits[i]);
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
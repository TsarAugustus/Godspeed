import { createCircuit }    from './createCircuit.js'
import { createTeams }      from './createTeams.js';
import { createDrivers }    from './createDrivers.js';
import { createFaculty }    from './createFaculty.js';
import { createVehicles }   from './createVehicles.js';
import { assemblePaddock }  from './assemblePaddock.js';
import { circuitStep } from './circuitStep.js';
import { pointsTable } from './pointsTable.js';

function main() {
    //Generates the area for the game
    createGameArea();

    let circuitsToGenerate  = 1;
    let teamsToGenerate     = 10;
    let driversToGenerate   = 30;
    let facultyToGenerate   = 20;
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

    let result = initialize(seasonsToGenerate, initPaddock);
    createHTMLResult(result);
}

function createHTMLResult(result) {
    let gameArea = document.getElementById('gameArea');
    for(let i=0; i<result.length; i++) {

        let thisSeason = result[i];
        let seasonDiv = document.createElement('div');
        seasonDiv.id = thisSeason.name;
        seasonDiv.classList.add('season')
        seasonDiv.innerHTML = `<h1>${thisSeason.name}</h1>`

        let driverStandingElement = document.createElement('p');
        driverStandingElement.id = `${thisSeason.name} Driver Standing`;
        driverStandingElement.innerHTML = '<h2>Final Standings</h2>'

        for(let ii=0; ii<thisSeason.finalResult.length; ii++) {
            let finalResultDriver = thisSeason.finalResult[ii];
            let finalResultDriverElement = document.createElement('p');
            finalResultDriverElement.innerHTML = `${finalResultDriver.name} - ${finalResultDriver.pointsTotal}`

            if(ii === 0) {
                //First Place
                finalResultDriverElement.classList.add('FIRST');
            } else if(ii === 1) {
                //Second Place
                finalResultDriverElement.classList.add('SECOND');
            } else if (ii === 2) {
                //Third Place
                finalResultDriverElement.classList.add('THIRD');
            }

            driverStandingElement.appendChild(finalResultDriverElement)
        }

        seasonDiv.appendChild(driverStandingElement)

        for(let ii=0; ii<thisSeason.result.length; ii++) {
            let thisCircuit = thisSeason.result[ii];

            let circuitResultElement = document.createElement('p');
            circuitResultElement.id = thisCircuit.name
            circuitResultElement.innerHTML = `<h2>${thisCircuit.name}</h1>`;

            for(let iii=0; iii<thisCircuit.result.circuitResult.length; iii++) {
                let thisDriver = thisCircuit.result.circuitResult[iii];
                let driverResultElement = document.createElement('p');
                driverResultElement.id = `${thisCircuit.name}-${thisDriver.driver.name}`
                driverResultElement.innerHTML = `${thisDriver.driver.name} - ${thisDriver.points} - ${iii + 1}/${thisCircuit.result.circuitResult.length}`
                if(iii === 0) {
                    //First Place
                    driverResultElement.classList.add('FIRST');
                } else if(iii === 1) {
                    //Second Place
                    driverResultElement.classList.add('SECOND');
                } else if (iii === 2) {
                    //Third Place
                    driverResultElement.classList.add('THIRD');
                } else if(iii < Object.keys(pointsTable).length) {
                    driverResultElement.classList.add('POINTS')
                }

                circuitResultElement.appendChild(driverResultElement);
            }

            seasonDiv.appendChild(circuitResultElement)
        }

        gameArea.appendChild(seasonDiv)
    }
}

function initialize(seasonsToGenerate, initPaddock) {
    console.log('Initializing Seasons', seasonsToGenerate);
    let seasonArray = [];

    for(let i=0; i<seasonsToGenerate; i++) {
        let seasonPaddock;
        //Temportary measure
        //Assigns paddock if it's the first race of the season
        if(i === 0) {
            seasonPaddock = assemblePaddock(initPaddock);
        }

        let seasonResult = {
            name: `Season ${i + 1}`,
            result: generateSeason(seasonPaddock, i, initPaddock.circuits),
            finalResult: [],
            seasonDrivers: []
        }

        for(let ii=0; ii<seasonPaddock.length; ii++) {
            let thisTeam = seasonPaddock[ii];
            for(let iii=0; iii<thisTeam.drivers.length; iii++) {
                let thisDriver = thisTeam.drivers[iii];
                seasonResult.seasonDrivers.push(thisDriver);
            }
        }

        seasonResult.finalResult = calculateSeasonResult(seasonResult);
        seasonArray.push(seasonResult);
    }

    return seasonArray;
}

function calculateSeasonResult(seasonResult) {
    let finalResultArray = [];

    for(let i=0; i<seasonResult.seasonDrivers.length; i++) {
        let thisDriver = seasonResult.seasonDrivers[i];
        // console.log(thisDriver)
        let driverResult = {
            name: thisDriver.name,
            pointsTotal: 0,
            totalAfterCircuit: {},
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

    return finalResultArray;
}

function generateSeason(paddock, seasonNumber, circuits) {
    console.log('Generating Season', seasonNumber + 1)
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
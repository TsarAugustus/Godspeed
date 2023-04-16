import { createCircuit } from './createCircuit.js'
import { createTeam } from './createTeam.js';

function main() {
    //Generates the area for the game
    createGameArea();

    //createTeam & createCircuit allows amount of teams to be generated
    let teams = createTeam(10, 2);
    let circuits = createCircuit(22);
    //Start the season
    //TODO: add multiple seasons with same drivers/teams    
    let season = createSeason(teams, circuits);
    //After the season is finished, push it to the Game Area

    for(let i=0; i<season.length; i++) {
        let string = document.createElement('p');
        string.innerHTML = `${season[i][0]} : ${season[i][1].points}`;
        document.getElementById('gameArea').appendChild(string)
    }
}

//Create Season Function
//Could use a lot of work
function createSeason(teams, circuits) {
    //Standings array
    let standings = [];

    //Go through the circuit with each team
    for(let i=0; i<circuits.length; i++) {
        standings.push(circuitStep(circuits[i], teams));
    }

    let finalStanding = {};

    for(let i=0; i<standings.length; i++) {
        for(let ii=0; ii<standings[i].length; ii++) {
            if(!finalStanding[standings[i][ii].driver.name]) {
                finalStanding[standings[i][ii].driver.name] = {
                    points: 0
                }

                finalStanding[standings[i][ii].driver.name].points += standings[i][ii].points;
            } else {
                finalStanding[standings[i][ii].driver.name].points += standings[i][ii].points;
            }

        }
    }

    return Object.entries(finalStanding).sort((a, b) => b[1].points - a[1].points);
}


//Steps through each circuit
function circuitStep(circuit, teams) {
    //Result array
    let totalResult = [];

    //Step through each team, and each driver at the circuit
    for(let i=0; i<teams.length; i++) {
        for(let ii=0; ii<teams[i].driver.length; ii++) {
            let team = teams[i];
            let driver = teams[i].driver[ii];
            let circuitFinal = {
                circuit: circuit,
                team: team,
                driver: driver,
                total: 0,
                points: 0,
                result: 0
            }
            //Step through each path on the circuit
            for(let ii=0; ii<circuit.path.length; ii++) {
                circuitFinal.total += pathStep(circuit.path[ii], driver);
            }
            
            //Push circuit totalResult to totalResult array
            totalResult.push(circuitFinal);
        }  
    }

    totalResult.sort(({total: a}, {total: b}) => b-a);
    let placeTable = {
        1: 25,
        2: 18,
        3: 15,
        4: 12,
        5: 10,
        6: 8,
        7: 6,
        8: 4,
        9: 2,
        10: 1
    }

    for(let i=0; i<totalResult.length; i++) {
        totalResult[i].result = i + 1;

        if(Number(Object.keys(placeTable)[i]) === (i + 1)) {
            totalResult[i].points += placeTable[i+1];
        }
    }

    //Return totalResult to createSeason function
    return totalResult;
}

//Step through each corner/straight
function pathStep(path, driver) {
    //'Points' total per step on path
    //Should be refined
    let pathTotal = 0;


    //Determines if corner or straight, checks the driver/car skill against corner/straight
    //More variables should be added for chaos
    for(let i=0; i<path.length; i++) {
        if(path.type === 'Corner') {
            pathTotal += path.skill - driver.car.cornerSkill
        } else if(path.type === 'Straight') {
            pathTotal += path.skill - driver.car.straightSkill
        }
    }

    //Return to circuitStep function
    return pathTotal;
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
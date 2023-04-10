import { createCircuit } from './createCircuit.js'
import { createTeam } from './createTeam.js';

function main() {
    //Generates the area for the game
    createGameArea();

    //createTeam & createCircuit allows amount of teams to be generated
    let teams = createTeam(10);
    let circuits = createCircuit(10);
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

    //Sifts the drivers based on points
    //Should be reduced into a different function
    let driverStandings = {};
    for(let i=0; i<standings.length; i++) {
        for(let ii=0; ii<standings[i].length; ii++) {
            let standing = standings[i][ii];
            
            if(!driverStandings[standing.team.driver.name]) {
                driverStandings[standing.team.driver.name] = {
                    points: standing.points
                }
            } else {
                driverStandings[standing.team.driver.name].points += standing.points;
            }
        }
    }

    let final = Object.entries(driverStandings).sort(function(a, b) {
        return parseFloat(parseFloat(b[1].points - a[1].points));
    });

    return final;
}

//Steps through each circuit
function circuitStep(circuit, teams) {
    //Result array
    let result = [];

    //Step through each team at the circuit
    for(let i=0; i<teams.length; i++) {
        let team = teams[i];
        let circuitFinal = {
            circuit: circuit,
            team: team,
            points: 0
        }
        //Step through each path on the circuit
        for(let ii=0; ii<circuit.path.length; ii++) {
            circuitFinal.points += pathStep(circuit.path[ii], team);
        }
        
        //Push circuit result to result array
        result.push(circuitFinal);
    }

    //Return result to createSeason function
    return result;
}

//Step through each corner/straight
function pathStep(path, team) {
    //'Points' total per step on path
    //Should be refined
    let pathTotal = 0;

    //Determines if corner or straight, checks the driver/car skill against corner/straight
    //More variables should be added for chaos
    for(let i=0; i<path.length; i++) {
        if(path.type === 'Corner') {
            pathTotal += path.skill - team.driver.car.cornerSkill
        } else if(path.type === 'Straight') {
            pathTotal += path.skill - team.driver.car.straightSkill
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
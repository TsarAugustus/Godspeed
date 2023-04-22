import { createCircuit } from './createCircuit.js'
import { createTeam } from './createTeam.js';

let placeTable = {
    //Formula 1 Points System
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

    //Formula 1 2003
    // 1: 10,
    // 2: 8,
    // 3: 6,
    // 4: 5,
    // 5: 4,
    // 6: 3,
    // 7: 2,
    // 8: 1

    //F5000 1979
    // 1: 15,
    // 2: 14,
    // 3: 13,
    // 4: 12,
    // 5: 11,
    // 6: 10,
    // 7: 9,
    // 8: 8,
    // 9: 7,
    // 10: 6,
    // 11: 5,
    // 12: 4,
    // 13: 3,
    // 14: 2,
    // 15: 1

    //ARCA 2009
    // 1: 200,
    // 2: 195,
    // 3: 190,
    // 4: 185,
    // 5: 180,
    // 6: 175,
    // 7: 170,
    // 8: 165,
    // 9: 160,
    // 10: 155,
    // 11: 150,
    // 12: 145,
    // 13: 140,
    // 14: 135,
    // 15: 130,
    // 16: 125,
    // 17: 120,
    // 18: 115,
    // 19: 110,
    // 20: 105,
    // 21: 100,
    // 22: 95,
    // 23: 90,
    // 24: 85,
    // 25: 80,
    // 26: 75,
    // 27: 70,
    // 28: 65,
    // 29: 60,
    // 30: 55,
    // 31: 50,
    // 32: 45,
    // 33: 40,
    // 34: 35,
    // 35: 30,
    // 36: 25,
    // 37: 20,
    // 38: 15,
    // 39: 10,
    // 40: 5,
    // 41: 5,
    // 42: 5,
    // 43: 5,
    // 44: 5,
    // 45: 5,
    // 46: 5,
    // 47: 5,
    // 48: 5,
    // 49: 5,
    // 50: 5
};

function main() {
    //Generates the area for the game
    createGameArea();

    //createTeam & createCircuit allows amount of teams to be generated
    // let teams = createTeam(getRandomNumber(1, 1));
    console.log(createCircuit(getRandomNumber(1, 1)));
    //Start the season
    //TODO: add multiple seasons with same drivers/teams    
    // let season = createSeason(teams, circuits);
    let drivers = 0;
    // for(let i=0; i<teams.length; i++) {
    //     for(let ii=0; ii<teams[i].driver.length; ii++) {
    //         drivers++;
    //     }
    // }
    //After the season is finished, push it to the Game Area
    // console.log(season)
    // console.log(teams)
    // console.log(circuits)
    // let gameAreaDiv = document.getElementById('gameArea');
    // let info = document.createElement('p');
    // info.id = 'info';
    // info.innerHTML = `Drivers: ${drivers}</br>
    // Teams: ${teams.length}</br>
    // Circuits: ${circuits.length}`;
    // gameAreaDiv.appendChild(info)

    // for(let i=0; i<season.length; i++) {
    //     let driverDiv = document.createElement('div');
    //     driverDiv.id = season[i][0]
    //     driverDiv.classList.add('driverList')
    //     document.getElementById('gameArea').appendChild(driverDiv)
    //     let string = document.createElement('p');
    //     string.innerHTML = `${season[i][0]}</br>
    //     Position: ${i+1}
    //     Points: ${season[i][1].points}`;
    //     driverDiv.appendChild(string);
        
    //     let placementDiv = document.createElement('div');
    //     let pointsTotalDivCount = 0;
    //     for(let ii=0; ii<Object.keys(season[i][1].placement).length; ii++) {
    //         let placement = document.createElement('p');
    //         if(placeTable[season[i][1].placement[ii + 1]] !== undefined) {
    //             pointsTotalDivCount += season[i][1].pointsCollected[ii];
    //         } 
    //         // console.log(season[i], placeTable[season[i][1].placement[ii+1]], ii)

    //         placement.innerHTML += `Race ${Object.keys(season[i][1].placement)[ii]} : ${season[i][1].placement[ii + 1]} (${pointsTotalDivCount}) - FL: ${season[i][1].fastestLaps[ii]*season[i][1].multiplyer[ii]}`; // ${placeTable[season[i][1].placement[ii + 1]]}x${season[i][1].multiplyer[ii]}

    //         if(season[i][1].placement[ii + 1] === 1) {
    //             placement.classList.add('FIRST')
    //         } else if (season[i][1].placement[ii + 1] === 2) {
    //             placement.classList.add('SECOND')
    //         } else if(season[i][1].placement[ii + 1] === 3) {
    //             placement.classList.add('THIRD')
    //         } else if(season[i][1].placement[ii + 1] <= Object.keys(placeTable).length) {
    //             placement.classList.add('POINTS')
    //         } 

    //         placementDiv.appendChild(placement)
    //     }

    //     driverDiv.appendChild(placementDiv)
    // }
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

    // for(let i=0; i<standings.length; i++) {
    //     for(let ii=0; ii<standings[i].length; ii++) {
    //         let circuitPointsMultiplyer = standings[i][ii].circuit.circuitPointsMultiplyer;
    //         console.log(standings[i][ii].fastestLap.result, standings[i][ii].points, circuitPointsMultiplyer)
    //         let circuitPoints = (standings[i][ii].fastestLap.result + standings[i][ii].points) * circuitPointsMultiplyer;

    //         if(!finalStanding[standings[i][ii].driver.name]) {
    //             finalStanding[standings[i][ii].driver.name] = {
    //                 points: 0,
    //                 placement: {},
    //                 pointsCollected: [],
    //                 multiplyer: [],
    //                 fastestLaps: []
    //             }

    //             finalStanding[standings[i][ii].driver.name].placement[i+1] = ii + 1; 
    //             finalStanding[standings[i][ii].driver.name].points += circuitPoints//standings[i][ii].points * circuitPointsMultiplyer;
    //             finalStanding[standings[i][ii].driver.name].pointsCollected.push(circuitPoints);
    //         } else {
    //             finalStanding[standings[i][ii].driver.name].placement[i+1] = ii + 1; 
    //             finalStanding[standings[i][ii].driver.name].points += circuitPoints //standings[i][ii].points * circuitPointsMultiplyer;
    //             finalStanding[standings[i][ii].driver.name].pointsCollected.push(circuitPoints);
    //         }

    //         finalStanding[standings[i][ii].driver.name].multiplyer.push(circuitPointsMultiplyer);
    //         finalStanding[standings[i][ii].driver.name].fastestLaps.push(standings[i][ii].fastestLap.result)
    //     }
    // }
    // console.log(finalStanding)



    // return Object.entries(finalStanding).sort((a, b) => b[1].points - a[1].points);
}


//Steps through each circuit
function circuitStep(circuit, teams) {
    //Result array
    // let totalResult = [];
    // let bestLap = {
    //     driver: '',
    //     lap: 0
    // }
    // //Step through each team, and each driver at the circuit
    // for(let i=0; i<teams.length; i++) {
    //     for(let ii=0; ii<teams[i].driver.length; ii++) {
    //         let team = teams[i];
    //         let driver = teams[i].driver[ii];
    //         let circuitFinal = {
    //             circuit: circuit,
    //             team: team,
    //             driver: driver,
    //             total: 0,
    //             points: 0,
    //             result: 0,
    //             bestLap: 0,
    //             fastestLap: {}
    //         }
    //         //Step through each path on the circuit
    //         for(let iii=0; iii<circuit.laps; iii++) {
    //             let thisLap = 0;
    //             for(let iiii=0; iiii<circuit.path.length; iiii++) {
    //                 let step = pathStep(circuit.path[ii], driver);
    //                 circuitFinal.total += step;
    //                 thisLap += step;
    //             }

    //             if(circuitFinal.bestLap === 0) {
    //                 circuitFinal.bestLap = thisLap
    //             } else if(circuitFinal.bestLap < thisLap){
    //                 circuitFinal.bestLap = thisLap;
    //             }
    //         }
            
    //         //Push circuit totalResult to totalResult array
    //         totalResult.push(circuitFinal);
    //     }  
    // }
    // for(let i=0; i<totalResult.length; i++) {
    //     if(totalResult[i].bestLap > bestLap.lap || bestLap.lap === 0) {
    //         bestLap.driver = totalResult[i];
    //         bestLap.lap = totalResult[i].bestLap;
    //     }
    // }

    // for(let i=0; i<totalResult.length; i++) {
    //     if(totalResult[i].driver.name === bestLap.driver.driver.name) {
    //         totalResult[i].fastestLap = {circuit: i, result: 1};
    //     } else {
    //         totalResult[i].fastestLap = {circuit: i, result: 0};
    //     }
    // }
    
    // for(let i=0; i<totalResult.length; i++) {
    //     totalResult[i].result = i + 1;
        
    //     if(Number(Object.keys(placeTable)[i]) === (i + 1)) {
    //         totalResult[i].points += placeTable[i+1];
    //     }
    // }
    // let finalResult = totalResult.sort(({total: a}, {total: b}) => b-a);
    
    // //Return totalResult to createSeason function
    // return finalResult;
}

//Step through each corner/straight
function pathStep(path, driver) {
    //'Points' total per step on path
    //Should be refined
    let pathTotal = 0;

    //Determines if corner or straight, checks the driver/car skill against corner/straight
    //More variables should be added for chaos
    let faultThreshhold = 2500;
    for(let i=0; i<path.length; i++) {
        let thisFaultChance = getRandomNumber(0, 100);
        if(path.type === 'Corner') {
            if(driver.car.faultChance * thisFaultChance <= faultThreshhold) {
                //No Fault
                pathTotal += path.skill - driver.car.cornerSkill
            } else {
                //Fault
                pathTotal -= path.skill - driver.car.cornerSkill
            }
        } else if(path.type === 'Straight') {
            if(driver.car.faultChance * thisFaultChance <= faultThreshhold) {
                //No Fault
                pathTotal += path.skill - driver.car.straightSkill
            } else {
                //Fault
                pathTotal -= path.skill - driver.car.straightSkill
            }
        }
    }

    //Return to circuitStep function
    return pathTotal;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
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
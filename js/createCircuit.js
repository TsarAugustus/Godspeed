let multipliers = {
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    5: 50
}

function createCircuit(circuitsToGenerate) {
    console.log('Creating Circuits', circuitsToGenerate);
    let circuitArray = [];

    for(let i=0; i<circuitsToGenerate; i++) {
        let cornerAmt = getRandomNumber(1, 10);
        let straightAmt = getRandomNumber(1, cornerAmt);
        let newCircuit = {
            name: `Circuit ${i + 1}`,
            laps: getRandomNumber(0, 10),
            lapLength: 0,
            raceLength: 0,
            multiplier: 1,
            corners: cornerAmt,
            straights: straightAmt,
            path: definePath(cornerAmt, straightAmt)
        }

        newCircuit.multiplier = refineCircuitMultiplier(newCircuit);
        newCircuit.lapLength = getLapLength(newCircuit);
        newCircuit.raceLength = newCircuit.lapLength * newCircuit.laps;

        circuitArray.push(newCircuit);
    }
    return circuitArray
}

//This function is almost the exact same as refineCircuitMultiplier
//This should be made redundant
function getLapLength(circuit) {
    let pathLength = 0;

    for(let ii=0; ii<circuit.path.length; ii++) {
        pathLength += circuit.path[ii].length;
    }

    return pathLength
}

function refineCircuitMultiplier(circuit) {
    let pathLength = 0;
    let pathMultiplier = 0; 

    for(let i=0; i<circuit.laps; i++) {
        for(let ii=0; ii<circuit.path.length; ii++) {
            pathLength += circuit.path[ii].length;
        }
    }

    for(let i=0; i<Object.keys(multipliers).length; i++) {
        if(pathLength > multipliers[i+1]) {
            pathMultiplier = i + 1
        }
    }

    return pathMultiplier;    
}

function definePath(corners, straights) {
    let pathLength = corners + straights;
    let cornerCount = 0;
    let straightCount = 0;

    let pathArray = [];

    for(let i=0; i<pathLength; i++) {
        let thisPath = getRandomNumber(0, 1);
        
        //0 === Corner
        if(thisPath === 0) {
            if(cornerCount < corners) {
                pathArray.push(createCorner());
                cornerCount++;
            } else {
                pathArray.push(createStraight());
                straightCount++;
            }
        //1 === Straight
        } else {
            if(straightCount < straights) {
                pathArray.push(createStraight());
                straightCount++;
            } else {
                pathArray.push(createCorner());
                cornerCount++
            }
        }
    }
    return pathArray;
}

function createCorner() {
    let thisCorner = {
        type: 'Corner',
        length: getRandomNumber(1, 10),
        //Skill is very broad at the moment, should be refined
        skill: getRandomNumber(1, 10)
    }

    return thisCorner;
}

function createStraight() {
    let thisStraight = {
        type: 'Straight',
        length: getRandomNumber(1, 10),
        //Skill is very broad at the moment, should be refined
        skill: getRandomNumber(1, 10)
    }

    return thisStraight;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createCircuit };
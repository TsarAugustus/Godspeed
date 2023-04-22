let pointsMultiplyer = {
    1000: 1.5,
    1250: 1.25,
    1500: 1.5,
    1750: 1.75,
    2000: 2
}

function createCircuit(circuitsToGenerate) {
    //Season circuit array
    let circuitArray = [];
    for(let i=0; i< circuitsToGenerate; i++) {
        //Randomly generate corners/straights
        //Straights are always less than corners
        let corners = Math.round(getRandomNumber(4, 30));
        let straights = Math.round(getRandomNumber(2, Math.round(corners / 2)));

        //Container used for counting in loops
        let cornerCount = 0;
        let straightCount = 0;

        //newCircuit object
        let newCircuit = {
            name: `Circuit ${i}`,
            laps: getRandomNumber(0, 100),
            path: [],
            length: 0,
            circuitPointsMultiplyer: 1,
            corners: [],
            straights: []
        }
        
        //Go through each corner, give it a name and length/width (TODO: USE LENGTH/WIDTH)
        //Skill is random
        for(let i=0; i<=corners; i++) {
            let newCorner = {
                cornerName: `Corner ${i}`,
                type: 'Corner',
                length: Math.round(getRandomNumber(1, 100)),
                width: Math.round(getRandomNumber(1, 20)),
                skill: Math.round(getRandomNumber(0, 10))
            }
            newCircuit.corners.push(newCorner)
        }
        //Go through each straight, give it a name and length/width (TODO: USE LENGTH/WIDTH)
        //Skill is random
        for(let i=0; i<=straights; i++) {
            let newStraight = {
                straightName: `Straight ${i}`,
                type: 'Straight',
                length: Math.round(getRandomNumber(1, 100)),
                width: Math.round(getRandomNumber(1, 20)),
                skill: Math.round(getRandomNumber(0, 10))
            }
            newCircuit.straights.push(newStraight);
        }

        //Go through each corner/straight, add it to the 'path'

        //TODO: THIS DOESNT ADD ALL THE STRAIGHTS OR CORNERS TO THE PATH
        // FIX THIS
        for(let i=0; i<corners + straights; i++) {
            //Generate 0=corner, 1=straight
            //TODO: GENERATE BETTER
            let randomPath = Math.round(getRandomNumber(0, 1));

            //CORNER
            if(randomPath === 0) {
                if(cornerCount < newCircuit.corners.length) {
                    addToPath('corner')
                } else if(cornerCount >= newCircuit.straights.length && straightCount < newCircuit.straights.length) {
                    //If there is max amount of corners, add a straight if it isn't at max wither
                    addToPath('straight')
                } else {
                    addToPath('corner')
                }
            } 
            //STRAIGHT
            else if(randomPath === 1) {
                if(straightCount < newCircuit.straights.length) {
                    addToPath('straight');
                } else if (straightCount >= newCircuit.straights.length && cornerCount < newCircuit.corners.length) {
                    //If there is max amount of straights, make a corner if it isn't at max either
                    addToPath('corner')
                } else {
                    addToPath('straight')
                }
            }
        }

        //Pushed corner/straight to the path
        //TODO: Reduce this
        function addToPath(pathType) {
            // console.log(pathType);
            if(pathType === 'corner') {
                newCircuit.path.push(newCircuit.corners[cornerCount]);
                cornerCount++
            } else if(pathType === 'straight') {
                newCircuit.path.push(newCircuit.straights[straightCount]);
                straightCount++;
            }
        }
        if(newCircuit.length === 0){
            newCircuit.length = newCircuit.laps * newCircuit.path.length
        }
        for(let i=0; i<Object.keys(pointsMultiplyer).length; i++) {
            // console.log(standings[i][0].circuit.length, Object.keys(pointsMultiplyer)[i])
            if(newCircuit.length > Object.keys(pointsMultiplyer)[i]) {
                newCircuit.circuitPointsMultiplyer = Object.values(pointsMultiplyer)[i];
            }
        }

        circuitArray.push(newCircuit);
    }
    
    return circuitArray;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createCircuit }
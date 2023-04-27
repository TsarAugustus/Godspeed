import { pointsTable } from './pointsTable.js';

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
        driverStandingElement.innerHTML = '<h2>Final Standings</h2>';
        driverStandingElement.classList.add('standings');

        for(let ii=0; ii<thisSeason.finalResult.length; ii++) {
            let finalResultDriver = thisSeason.finalResult[ii];
            let finalResultDriverElement = document.createElement('p');
            finalResultDriverElement.innerHTML = `${finalResultDriver.name} - ${finalResultDriver.championships} - ${finalResultDriver.team.name}- ${finalResultDriver.pointsTotal}`;
            if(finalResultDriver.championships > 0) {
                finalResultDriverElement.classList.add('previousChampion')
            }

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
            circuitResultElement.classList.add('circuitResult')

            for(let iii=0; iii<thisCircuit.result.circuitResult.length; iii++) {
                let thisDriver = thisCircuit.result.circuitResult[iii];
                let driverResultElement = document.createElement('p');
                driverResultElement.id = `${thisCircuit.name}-${thisDriver.driver.name}`
                driverResultElement.classList.add('driverList')
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

export { createHTMLResult };
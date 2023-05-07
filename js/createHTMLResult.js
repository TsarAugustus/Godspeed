'use strict';

import { pointsTable } from './pointsTable.js';

function createHTMLResult(result) {
    let gameArea = document.getElementById('gameArea');

    for(let i=0; i<result.length; i++) {

        let thisSeason = result[i];
        let seasonDiv = document.createElement('div');
        seasonDiv.id = thisSeason.name;
        seasonDiv.classList.add('season')
        seasonDiv.innerHTML = `<h1>${thisSeason.name}</h1>`

        let standingsElement = document.createElement('div');
        standingsElement.classList.add('standingsElement');
        seasonDiv.appendChild(standingsElement);

        let seasonRetiredDrivers = document.createElement('div');
        seasonRetiredDrivers.classList.add('seasonRetiredDrivers');
        
        for(let ii=0; ii<result[i].retiredDrivers.length; ii++) {
            let thisRetiredDriverElement = document.createElement('p');
            thisRetiredDriverElement.innerHTML = `RETIRED-${result[i].retiredDrivers[ii].name}`;
            seasonRetiredDrivers.appendChild(thisRetiredDriverElement);
        }

        seasonDiv.appendChild(seasonRetiredDrivers);
        
        let circuitElement = document.createElement('div');
        circuitElement.id = 'circuitElement';
        seasonDiv.appendChild(circuitElement);

        let driverStandingElement = document.createElement('p');
        driverStandingElement.id = `${thisSeason.name} Driver Standing`;
        driverStandingElement.innerHTML = '<h2>Final Driver Standings</h2>';
        driverStandingElement.classList.add('standings');

        let driverContainer = document.createElement('div');
        driverContainer.classList.add('driverContainer');
        driverStandingElement.appendChild(driverContainer);

        let teamStandingElement = document.createElement('p');
        teamStandingElement.id = `${thisSeason.name} Team Standing`;
        teamStandingElement.innerHTML = '<h2>Final Team Standings</h2>';
        teamStandingElement.classList.add('teamStandings');

        let teamContainer = document.createElement('div');
        teamContainer.classList.add('teamContainer');
        teamStandingElement.appendChild(teamContainer);

        thisSeason.teamResult.forEach((team, index) => {
            let teamResultElement = document.createElement('p');
            teamResultElement.innerHTML = `${team.name} - WCC${team.championships} - WDC${team.driverChampionships} - ${team.points}`;
            teamContainer.appendChild(teamResultElement);

            if(team.championships > 0) teamResultElement.classList.add('previousChampion');

            if(index === 0) teamResultElement.classList.add('FIRST');
            else if(index === 1) teamResultElement.classList.add('SECOND');
            else if(index === 2) teamResultElement.classList.add('THIRD');
        });

        standingsElement.appendChild(teamStandingElement)

        for(let ii=0; ii<thisSeason.finalResult.length; ii++) {
            let finalResultDriver = thisSeason.finalResult[ii];
            let finalResultDriverElement = document.createElement('p');
            finalResultDriverElement.innerHTML = `${finalResultDriver.name} - ${finalResultDriver.championships} - ${finalResultDriver.team.name} - ${finalResultDriver.pointsTotal}`;
            
            if(finalResultDriver.championships > 0) finalResultDriverElement.classList.add('previousChampion')
            if(ii === 0) finalResultDriverElement.classList.add('FIRST')
            else if(ii === 1) finalResultDriverElement.classList.add('SECOND')
            else if (ii === 2) finalResultDriverElement.classList.add('THIRD')

            driverContainer.appendChild(finalResultDriverElement)
        }

        standingsElement.appendChild(driverStandingElement);

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
                
                if(iii === 0) driverResultElement.classList.add('FIRST')
                else if(iii === 1) driverResultElement.classList.add('SECOND')
                else if (iii === 2) driverResultElement.classList.add('THIRD')
                else if(iii < Object.keys(pointsTable).length) driverResultElement.classList.add('POINTS')

                circuitResultElement.appendChild(driverResultElement);
            }

            circuitElement.appendChild(circuitResultElement)
        }

        gameArea.appendChild(seasonDiv)
    }
}

export { createHTMLResult };
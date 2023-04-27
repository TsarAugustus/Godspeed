import { attemptCEOTeamBuy } from "./attemptCEOTeamBuy.js";
import { attemptDriverBuy } from "./attemptDriverBuy.js";
import { attemptFacultyBuy } from "./attemptFacultyBuy.js";

function assemblePaddock(initPaddock) {
    // console.log('Assembling Paddock');

    let teamPool    = initPaddock.teams;
    let vehiclePool = initPaddock.vehicles;
    let driverPool  = initPaddock.drivers;
    let circuitPool = initPaddock.circuits;
    let facultyPool = initPaddock.faculty;
    
    let ceoPool = [];
    let seasonTeams = [];

    //Set up the CEO's and Teams
    for(let i=0; i<facultyPool.length; i++) {
        //Go through each CEO, and see if they can buy a team
        if(facultyPool[i].type === 'CEO') {
            let ceoAttempt = attemptCEOTeamBuy(teamPool, facultyPool[i]);
            if(Object.values(ceoAttempt).length > 0) {
                seasonTeams.push(attemptCEOTeamBuy(teamPool, facultyPool[i]));
                teamPool = teamPool.filter(function(team) {
                    return team.name !== ceoAttempt.name
                });        
            }
        }
    }

    //Assign Vehicles to their respective Engineers
    //Bit messy but it works
    for(let i=0; i<facultyPool.length; i++) {
        if(facultyPool[i].type === 'ENGINEER') {
            for(let ii=0; ii<vehiclePool.length; ii++) {
                if(vehiclePool[ii].engineer.name === facultyPool[i].name) {
                    facultyPool[i].vehicle = vehiclePool[ii];
                }
            }
        }
    }

    //Setup Team Faculty/Drivers
    for(let i=0; i<seasonTeams.length; i++) {
        for(let ii=0; ii<seasonTeams[i].faculty.length; ii++) {
            if(seasonTeams[i].drivers.length === 0) {
                let driverBuy = attemptDriverBuy(seasonTeams[i], driverPool, initPaddock.driverLimit);
                for(let iii=0; iii<driverBuy.length; iii++) {
                    driverBuy[iii].team = seasonTeams[i];
                    driverPool = driverPool.filter(function(driverPoolDriver) {
                        return driverPoolDriver.name !== driverBuy[iii].name
                    })
                }
                seasonTeams[i].drivers = driverBuy
            }

            if(undefined === seasonTeams[i].faculty[ii].name) {
                let facultyBuy = attemptFacultyBuy(seasonTeams[i], ii, facultyPool);
                seasonTeams[i].faculty[ii] = facultyBuy;
                facultyPool = facultyPool.filter(function(faculty) {
                    return faculty.name !== facultyBuy.name
                })
            }
        }
    }

    let filteredTeams = [];
    //Filter through the teams, remove any that are missing faculty or drivers
    for(let i=0; i<seasonTeams.length; i++) {
        let teamPassValue = 0;
        
        //Filter if the team has a driver first
        if(seasonTeams[i].drivers.length > 0) {
            //Then filter if the team has enough faculty
            for(let ii=0; ii<seasonTeams[i].faculty.length; ii++) {
                if(undefined !== seasonTeams[i].faculty[ii].name) {
                    teamPassValue++;
                }
            }
        }        
        
        if(teamPassValue === seasonTeams[i].faculty.length) {
            filteredTeams.push(seasonTeams[i])
            for(let ii=0; ii<seasonTeams[i].drivers.length; ii++) {
                seasonTeams[i].drivers[ii].vehicle = seasonTeams[i].faculty[4].vehicle
            }
        }
    }
    
    return filteredTeams;
}



export { assemblePaddock };
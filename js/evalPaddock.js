'use strict';

import { attemptCEOTeamBuy } from "./attemptCEOTeamBuy.js";
import { attemptDriverBuy } from "./attemptDriverBuy.js";
import { attemptFacultyBuy } from "./attemptFacultyBuy.js";
import { createTeams } from "./createTeams.js";

function evalPaddock(currentSeasonNum, initPaddock, paddock, seasonArray) {
    let freeFaculty = [];
    let freeDrivers = [];

    //Initializes first season faculty
    if(initPaddock.faculty.length > 0) {
        freeFaculty = initPaddock.faculty;
        initPaddock.faculty = [];
    }

    if(initPaddock.drivers.length > 0) {
        freeDrivers = initPaddock.drivers;
        initPaddock.drivers = 0;
    }

    //Creates a blank team if there is room for them
    let newTeams = createTeams((initPaddock.teamLimit - paddock.length), currentSeasonNum);

    //Attempt to have a CEO buy a team
    //This is where teams should have money applied to their total
    freeFaculty.forEach(member => {
        if(member.type === 'CEO') {
            let attempt = attemptCEOTeamBuy(newTeams, member);
            attempt.money += member.money;
            paddock.push(attempt);

            freeFaculty = freeFaculty.filter(thisMember => thisMember.name !== member.name);
            newTeams = newTeams.filter(team => team.name !== attempt.name)
        }
    }); 

    paddock.forEach((team, paddockIndex) => {
        let keys = Object.keys(team);
        let values = Object.values(team);
        values.forEach((value, index) => {
            let attempt = attemptFacultyBuy(team, keys[index], freeFaculty);
            if(value.faculty && undefined === team[keys[index]].name && team.money >= attempt.cost) {
                paddock[paddockIndex][keys[index]] = attempt;
                freeFaculty = freeFaculty.filter(member => member.name !== attempt.name)
            }
        });

        if(team.drivers.length < initPaddock.driverLimit) {
            let attempt = attemptDriverBuy(team, freeDrivers, initPaddock.driverLimit);
            attempt.forEach(driver => {
                driver.team = team;
                paddock[paddockIndex].drivers.push(driver);
                freeDrivers = freeDrivers.filter(thisDriver => thisDriver.name !== driver.name)
            });

        }        
    });

    //Check paddock teams for drivers/faculty
    //Remove the team if they fail to have full faculty/drivers
    paddock.forEach(team => {
        if(team.drivers.length === 0) paddock.filter(thisTeam => thisTeam.name === team.name);

        let keys = Object.keys(team);
        let values = Object.values(team);
        
        values.forEach(value => {
            if(value.faculty && undefined === value.faculty.name) paddock.filter(thisTeam => thisTeam.name === team.name);
        })
    })

    return paddock;
}

export { evalPaddock }
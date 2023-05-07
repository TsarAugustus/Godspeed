'use strict';

function calculateSeasonResult(seasonResult, seasonArray) {
    let finalResultArray = [];

    seasonResult.seasonDrivers.forEach(seasonDriverResult => {
        let driverResult = {
            name: seasonDriverResult.name,
            pointsTotal: 0,
            totalAfterCircuit: 0,
            championships: 0,
            team: seasonDriverResult.team
        };

        seasonResult.result.forEach(circuitResult => {
            circuitResult.result.circuitResult.forEach(driverResultArray => {
                if (driverResultArray.driver.name == seasonDriverResult.name) driverResult.pointsTotal += driverResultArray.points;
            });
        });

        finalResultArray.push(driverResult)            
    });
    
    //Sorts the final result by points
    finalResultArray.sort(function(a, b) {
        return b.pointsTotal - a.pointsTotal;
    });

    //Create array to hold previous champions
    let champions = [];

    //Push this seasons champion
    if(champions.length === 0) {
        champions.push(finalResultArray[0]);
    }
    
    //Go through each season, grab sorted final result, push to champion array
    seasonArray.forEach(arrayIndex => {
        champions.push(arrayIndex.finalResult[0]);
    });

    //Find each champion, match their championships to their driver
    finalResultArray.forEach(result => champions.forEach(champion => result.name === champion.name ? result.championships++ : ''));

    return {finalResult: finalResultArray, teamResult: calculateTeamStanding(seasonResult, seasonArray)};
}

function calculateTeamStanding(seasonResult, seasonArray) {
    let teamResultArray = [];
    let teamChampions = [];
    let teamDriverChampions = [];

    seasonResult.result.forEach(circuitResult => {
        circuitResult.result.circuitResult.forEach(driverResult => {
            let thisTeamInArray = teamResultArray.find(team => team.name === driverResult.driver.team.name);

            if(undefined === thisTeamInArray) teamResultArray.push({"name": driverResult.driver.team.name, points: driverResult.points, championships: 0, driverChampionships: 0})
            else if(thisTeamInArray) thisTeamInArray.points += driverResult.points
        });
    });

    teamResultArray.sort(function(a, b) {
        return b.points - a.points;
    }); 

    seasonArray.forEach(season => teamChampions.push(season.teamResult[0]));

    teamResultArray.forEach(team => teamChampions.forEach(champion => team.name === champion.name ? team.championships++ : ''));

    seasonArray.forEach(season => teamDriverChampions.push(season.finalResult[0]));

    teamResultArray.forEach(team => {
        teamDriverChampions.forEach(driver => {
            driver.team.name === team.name ?team.driverChampionships++ : ''
        });
    });

    teamResultArray[0].championships++;

    return teamResultArray;
}

export { calculateSeasonResult }
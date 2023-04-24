function attemptFacultyBuy(team, facultyNumber, facultyPool) {
    let memberToReturn = {};
    let memberPool = [];
    for(let i=0; i<facultyPool.length; i++) {
        if(facultyPool[i].type.toLowerCase() === team.faculty[facultyNumber].type && team.faculty[0].money >= facultyPool[i].cost) {
            memberPool.push(facultyPool[i]);
        }
    }

    for(let i=0; i<memberPool.length; i++) {
        if(undefined === memberToReturn.name) {
            memberToReturn = memberPool[i];
        } else if (memberPool[i].level > memberToReturn.level) {
            memberToReturn = memberPool[i];
        }
    }

    return memberToReturn;
}

export { attemptFacultyBuy }
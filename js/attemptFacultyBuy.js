function attemptFacultyBuy(team, facultyNumber, facultyPool) {
    let memberToReturn = {};
    let memberPool = [];

    facultyPool.forEach(faculty => {
        if(faculty.type.toLowerCase() === team.faculty[facultyNumber].type && team.faculty[0].money >= faculty.cost) {
            memberPool.push(faculty);
        }
    });

    memberPool.forEach(member => {
        if(undefined === memberToReturn.name) memberToReturn = member
        else if( member.level > memberToReturn.level) memberToReturn = member
    });

    return memberToReturn;
}

export { attemptFacultyBuy }
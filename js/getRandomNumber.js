'use strict';

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { getRandomNumber }
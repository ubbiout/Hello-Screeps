var roleTraveler = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say('Trav');
        if(creep.pos.roomName == 'E7S65') {
            creep.moveTo(49,25);
        }
        else {
            creep.move(RIGHT);
            creep.memory.role = 'scout';
        }
    }
};

module.exports = roleTraveler;
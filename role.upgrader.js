var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                creep.say('upG2');
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            /*if(creep.pos.inRangeTo(sources[0],15) == false) { //needid this to get pathfinding to stay in-room
                creep.moveTo(28,16);
                creep.say('mWay');
            }*/
            //else {
                creep.say('harvAtt');
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                    creep.say('mSour');
                }
            //}
        }
    }
};

module.exports = roleUpgrader;
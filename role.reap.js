var roleReap = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //go between source and fill containers
        
        if(creep.carry.energy < creep.carryCapacity) { //get energy from source
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
                creep.say('R-har');
            }
        } //now either moving towards sorce or harvesting energy at source.... or full of energy
        else { //any logic performed with full energy
            var containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
            }); //filter for containers that aren't full already
            
            if(containersWithEnergy.length > 0) { //transfer to container 0
                if(creep.pos.inRangeTo(containersWithEnergy[0],1)) {
                    creep.transfer(containersWithEnergy[0], RESOURCE_ENERGY);
                    creep.say('R-xfer');
                }
                else {
                    creep.moveTo(containersWithEnergy[0]); //or move to container 0
                    creep.say('Rc');
                }
            }
        }
        
        //repair containers if need be.
        
    }
};

module.exports = roleReap;
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleScout = require('role.scout');
var roleTraveler = require('role.traveler');
var roleReap = require('role.reap');

module.exports.loop = function () {
    
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    var cHarvest = 0;
    var cUpgrade = 0;
    var cBuild = 0;
    var cScout = 0;
    var cTrav = 0;
    var cReap = 0;

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            cHarvest++;
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            cUpgrade++;
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            cBuild++;
        }
        if(creep.memory.role == 'scout') {
            roleScout.run(creep);
            cScout++;
        }
        if(creep.memory.role == 'traveler') {
            roleTraveler.run(creep);
            cTrav++;
        }
        if(creep.memory.role == 'reap') {
            roleReap.run(creep);
            cReap++;
        }
    }
    
    //if(Game.spawns.Spawn1.energy > 299)
        if(cHarvest == 0) {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], null, {role: 'Harvester'});
        }
        if(cUpgrade == 0) {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], null, {role: 'upgrader'});
        }
        if(cBuild == 0) {
           Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], null, {role: 'builder'});
        }
        if(cReap == 0) {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], null, {role: 'reap'});
        }
        //if(cScout == 0) {
            //Game.spawns.Spawn1.createCreep([CLAIM, MOVE, MOVE], null, {role: 'scout'});
            //Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], null, {role: 'traveler'});
        //}
        if(cHarvest < 5) {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE], null, {role: 'harvester'});
        }
        if(cUpgrade < 5) {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], null, {role: 'upgrader'});
        }
        if(cBuild < 2) {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], null, {role: 'builder'});
        }

    //*/
    
    /////remove dead creeps from memory pool
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
}

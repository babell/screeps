var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    // Always place this memory cleaning code at the very top of your main loop!

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var energy = Game.rooms['W19S41'].energyAvailable;
    var parts = [WORK,WORK,CARRY,MOVE];
    if (energy>=550) {
        parts=[WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE];
    } else if (energy>=500) {
        parts=[WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    } else if (energy>=450) {
        parts=[WORK,WORK,WORK,CARRY,MOVE,MOVE];
    } else if (energy>=400) {
        parts=[WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    } else if (energy>=350) {
        parts=[WORK,WORK,CARRY,MOVE,MOVE];
    }

    var roles=['harvester','upgrader','builder'];
    var canCreate=true;
    for(var rolename in roles) {
        var myCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == roles[rolename]);
        if(myCreeps.length < 6 && energy>=300 && canCreate) {
            canCreate=false;
            var newName = Game.spawns.Spawn1.createCreep(parts, undefined, {role: roles[rolename]});
            console.log('Spawning new ' + roles[rolename] + ': ' + newName);
        }        
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'||creep.memory.role == 'harvester-big') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader'||creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'||creep.memory.role == 'builder-big') {
            roleBuilder.run(creep);
        }
    }
}
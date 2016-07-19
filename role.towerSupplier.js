module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if(creep.memory.working) {
            var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_TOWER
            });
            if (tower) {
                if(creep.repair(tower) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower);
                }
            } else {
                var flags = creep.room.find(FIND_FLAGS);
                creep.moveTo(flags[0]);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
    }
};
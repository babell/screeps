module.exports = {
    /** @param {Structure} structure **/
    run: function(structure) {

        var closestDamagedStructure = structure.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            structure.repair(closestDamagedStructure);
        }

        var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            structure.attack(closestHostile);
        }

    }
};
/**
 * Created by ben on 09/07/16.
 */
module.exports = function() {
    StructureSpawn.prototype.autobuild = function () {
        var minimumNumberOfHarvesters = 6;
        var minimumNumberOfUpgraders = 2;
        var minimumNumberOfBuilders = 4;
        var minimumNumberOfRepairers = 2;
        var minimumNumberOfWallRepairers = 2;
        var minimumNumberOfSoldiers = 2;
        var minimumNumberOfTowerSuppliers = 2;

        // count the number of creeps alive for each role
        // _.sum will count the number of properties in Game.creeps filtered by the
        //  arrow function, which checks for the creep being a harvester
        var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
        var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
        var numberOfSoldiers = _.sum(Game.creeps, (c) => c.memory.role == 'soldier');
        var numberOfTowerSuppliers = _.sum(Game.creeps, (c) => c.memory.role == 'towerSupplier');

        var enemies = Game.spawns.Spawn1.room.find(FIND_HOSTILE_CREEPS);
        
        var roleToBuild = undefined;
        var bodyToBuild = undefined;

        if (numberOfHarvesters < minimumNumberOfHarvesters){
            roleToBuild = 'harvester';
            bodyToBuild = [WORK,CARRY,MOVE,WORK];
        }
        else if (numberOfSoldiers < minimumNumberOfSoldiers && enemies.length>0) {
            roleToBuild = 'soldier';
            bodyToBuild = [ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE];
        }
        else if (numberOfUpgraders < minimumNumberOfUpgraders) {
            roleToBuild = 'upgrader';
            bodyToBuild = [WORK,CARRY,MOVE,MOVE];
        }
        else if (numberOfBuilders < minimumNumberOfBuilders) {
            roleToBuild = 'builder';
            bodyToBuild = [WORK,WORK,CARRY,MOVE,MOVE];
        }
        else if (numberOfRepairers < minimumNumberOfRepairers) {
            roleToBuild = 'repairer';
            bodyToBuild = [WORK,WORK,CARRY,MOVE,MOVE];
        }
        else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
            roleToBuild = 'wallRepairer';
            bodyToBuild = [WORK,WORK,CARRY,MOVE,MOVE]
        }
        else if (numberOfTowerSuppliers < minimumNumberOfTowerSuppliers) {
            roleToBuild = 'towerSupplier';
            bodyToBuild = [WORK,CARRY,MOVE,MOVE];
        }

        if (!roleToBuild){
            this.memory.hold = false;
            return;
        }

        var enoughEnergy = this.canCreateCreep(bodyToBuild) !== ERR_NOT_ENOUGH_ENERGY;

        if (enoughEnergy) {
            this.memory.hold = false;
            return this.createCreep(bodyToBuild, undefined, {role: roleToBuild});
        }
        else {
            return this.memory.hold = true;
        }
    };
};
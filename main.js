"use strict";
require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleSoldier = require('role.soldier');

module.exports.loop = function () {
    // Always place this memory cleaning code at the very top of your main loop!

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

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

    Game.spawns.Spawn1.autobuild();

    for(let name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role === 'harvester'){
            roleHarvester.run(creep);
        }

        if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }

        if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }

        if (creep.memory.role === 'repairer') {
            roleRepairer.run(creep);
        }

        if (creep.memory.role === 'wallRepairer') {
            roleWallRepairer.run(creep);
        }

        if (creep.memory.role === 'soldier') {
            roleSoldier.run(creep);
        }
    }
};
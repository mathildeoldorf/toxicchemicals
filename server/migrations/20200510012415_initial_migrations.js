exports.up = function (knex) {
    return knex.schema
        .createTable('tSite', (table) => {
            table.increments('nSiteID').primary().unsigned().notNullable();
            table.string('cSiteName', 2).unique().notNullable();
        })
        .createTable('tWarehouse', (table) => {
            table.increments('nWarehouseID').primary().unsigned().notNullable();
            table.string('cWarehouseName', 2).notNullable();
            table.integer('nCapacity').unsigned();
            table.integer('nCurrentStock').unsigned();
            table.integer('nSiteID').unsigned().notNullable();
            table.foreign('nSiteID').references('nSiteID').inTable('tSite');
        })
        .createTable('tChemical', (table) => {
            table.increments('nChemicalID').primary().unsigned().notNullable();
            table.string('cChemicalName', 1).notNullable();
        })
        .createTable('tChemicalStock', (table) => {
            table.integer('nWarehouseID').unsigned().notNullable();
            table.integer('nChemicalID').unsigned().notNullable();
            table.primary(['nWarehouseID', 'nChemicalID']);
            table.foreign('nWarehouseID').references('nWarehouseID').inTable('tWarehouse');
            table.foreign('nChemicalID').references('nChemicalID').inTable('tChemical');
            table.integer('nStock').unsigned();
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        })
        .createTable('tUser', (table) => {
            table.increments('nUserID').primary().unsigned().notNullable();
            table.string('cEmail').notNullable().unique();
            table.string('cPassword').notNullable();
            table.integer('nWarehouseID').unsigned().notNullable();
            table.foreign('nWarehouseID').references('nWarehouseID').inTable('tWarehouse');
        })
        .createTable('tShipmentJob', (table) => {
            table.bigIncrements('nShipmentJobID').primary().unsigned().notNullable();
            table.integer('nTicketNo').unsigned().notNullable().unique();
            table.string('cShipmentJobType', 1).notNullable();
            table.timestamp('dDate').notNullable().defaultTo(knex.fn.now());
            table.boolean('nStatus').defaultTo(0).notNullable();
        })
        .createTable('tShipmentItem', table => {
            table.bigIncrements('nShipmentItemID').primary().unsigned().notNullable();
            table.integer('nAmount').unsigned().notNullable();
            table.bigInteger('nShipmentJobID').unsigned().notNullable();
            table.foreign('nShipmentJobID').references('nShipmentJobID').inTable('tShipmentJob');
            table.integer('nChemicalID').unsigned().notNullable();
            table.foreign('nChemicalID').references('nChemicalID').inTable('tChemical');
            table.integer('nWarehouseID').unsigned().notNullable();
            table.foreign('nWarehouseID').references('nWarehouseID').inTable('tWarehouse');
        })
        .createTable('tAudit', table => {
            table.bigIncrements('nID').primary().unsigned().notNullable();
            table.bigInteger('nShipmentItemID').unsigned().notNullable();
            table.integer('nAmount').unsigned().notNullable();
            table.bigInteger('nShipmentJobID').unsigned().notNullable();
            table.integer('nChemicalID').unsigned().notNullable();
            table.integer('nWarehouseID').unsigned().notNullable();
            table.string('cShipmentJobType', 1).notNullable();
            table.timestamp("dDate").notNullable().defaultTo(knex.fn.now());
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tAudit')
        .dropTableIfExists('tShipmentItem')
        .dropTableIfExists('tShipmentJob')
        .dropTableIfExists('tUser')
        .dropTableIfExists('tChemicalStock')
        .dropTableIfExists('tChemical')
        .dropTableIfExists('tWarehouse')
        .dropTableIfExists('tSite')
        .dropTableIfExists('AuditUser')
};
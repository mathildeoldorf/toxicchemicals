const {
    Model
} = require("objection");

class Warehouse extends Model {
    static get tableName() {
        return "tWarehouse";
    }
    static get idColumn() {
        return "nWarehouseID";
    }

    static get relationMappings() {
        return {
            site: {
                relation: Model.HasOneRelation,
                modelClass: `${__dirname}/tSite.js`,
                join: {
                    from: 'tWarehouse.nSiteID',
                    to: 'tSite.nSiteID',
                },
            },
            user: {
                relation: Model.HasManyRelation,
                modelClass: `${__dirname}/tUser.js`,
                join: {
                    from: 'tWarehouse.nWarehouseID',
                    to: 'tUser.nWarehouseID',
                },
            },
            shipmentItem: {
                relation: Model.HasManyRelation,
                modelClass: `${__dirname}/ShipmentItem.js`,
                join: {
                    from: 'tWarehouse.nWarehouseID',
                    to: 'tShipmentItem.nWarehouseID',
                },
            },
        };
    }
}

module.exports = Warehouse;
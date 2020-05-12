const {
    Model
} = require("objection");

class ShipmentItem extends Model {
    static get tableName() {
        return "tShipmentItem";
    }
    static get idColumn() {
        return "nShipmentItemID";
    }

    static get relationMappings() {
        return {
            shipmentJob: {
                relation: Model.HasOneRelation,
                modelClass: `${__dirname}/ShipmentJob.js`,
                join: {
                    from: 'tShipmentItem.nShipmentJobID',
                    to: 'tShipmentJob.nShipmentJobID',
                },
            },
            chemical: {
                relation: Model.HasOneRelation,
                modelClass: `${__dirname}/Chemical.js`,
                join: {
                    from: 'tShipmentItem.nChemicalID',
                    to: 'tChemical.nChemicalID',
                },
            },
            warehouse: {
                relation: Model.HasOneRelation,
                modelClass: `${__dirname}/Warehouse.js`,
                join: {
                    from: 'tShipmentItem.nWarehouseID',
                    to: 'tWarehouse.nWarehouseID',
                },
            },
        };
    }
}

module.exports = ShipmentItem;
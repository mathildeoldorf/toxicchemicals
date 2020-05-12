const {
    Model
} = require("objection");

class ShipmentJob extends Model {
    static get tableName() {
        return "tShipmentJob";
    }
    static get idColumn() {
        return "nShipmentJobID";
    }

    static get relationMappings() {
        return {
            shipmentItem: {
                relation: Model.HasManyRelation,
                modelClass: `${__dirname}/ShipmentItem.js`,
                join: {
                    from: 'tShipmentJob.nShipmentJobID',
                    to: 'tShipmentItem.nShipmentJobID',
                },
            }
        };
    }
}

module.exports = ShipmentJob;
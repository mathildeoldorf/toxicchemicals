const {
    Model
} = require("objection");

class ChemicalStock extends Model {
    static get tableName() {
        return "tChemicalStock";
    }
    static get idColumn() {
        return "nChemicalStockID";
    }

    static get relationMappings() {
        return {
            chemical: {
                relation: Model.HasOneRelation,
                modelClass: `${__dirname}/Chemical.js`,
                join: {
                    from: 'tChemicalStock.nChemicalID',
                    to: 'tChemical.nChemicalID',
                },
            },
            warehouse: {
                relation: Model.HasOneRelation,
                modelClass: `${__dirname}/Warehouse.js`,
                join: {
                    from: "tChemicalStock.nWarehouseID",
                    to: "tWarehouse.nWarehouseID"
                }
            }
        };
    }
}

module.exports = ChemicalStock;
const {
    Model
} = require("objection");

class Chemical extends Model {
    static get tableName() {
        return "tChemical";
    }
    static get idColumn() {
        return "nChemicalID";
    }

    static get relationMappings() {
        return {
            chemicalStock: {
                relation: Model.HasManyRelation,
                modelClass: `${__dirname}/ChemicalStock.js`,
                join: {
                    from: 'tChemical.nChemicalID',
                    to: 'tChemicalStock.nChemicalID',
                },
            },
        };
    }
}

module.exports = Chemical;
const {
    Model
} = require("objection");

class Site extends Model {
    static get tableName() {
        return "tSite";
    }
    static get idColumn() {
        return "nSiteID";
    }

    static get relationMappings() {
        return {
            warehouse: {
                relation: Model.HasManyRelation,
                modelClass: `${__dirname}/Warehouse.js`,
                join: {
                    from: 'tSite.nSiteID',
                    to: 'tWarehouse.nSiteID',
                },
            }
        };
    }
}

module.exports = Site;
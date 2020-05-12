const {
    Model
} = require("objection");

class User extends Model {
    static get tableName() {
        return "tUser";
    }
    static get idColumn() {
        return "nUserID";
    }

    static get relationMappings() {
        return {
            warehouse: {
                relation: Model.HasOneRelation,
                modelClass: `${__dirname}/Warehouse.js`,
                join: {
                    from: 'tUser.nWarehouseID',
                    to: 'tWarehouse.nWarehouseID',
                },
            }
        };
    }
}

module.exports = User;
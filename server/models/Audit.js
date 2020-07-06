const {
    Model
} = require("objection");

class Audit extends Model {
    static get tableName() {
        return "tAudit";
    }
    static get idColumn() {
        return "nID";
    }
}

module.exports = Audit;
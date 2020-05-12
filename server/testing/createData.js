const Site = require('./site')
const Warehouse = require('./warehouse')
const Ticket = require('./ticket')
const Job = require('./job')
// 10, 12, 5, 3, 9

let site1 = new Site()
let site2 = new Site()
let warehouse1 = new Warehouse(1, 10)
let warehouse2 = new Warehouse(2, 12)
let warehouse3 = new Warehouse(3, 5)
let warehouse4 = new Warehouse(4, 3)
let warehouse5 = new Warehouse(5, 9)
let warehouse11 = new Warehouse(11, 10)
let warehouse12 = new Warehouse(12, 12)
let warehouse13 = new Warehouse(13, 5)
let warehouse14 = new Warehouse(14, 3)
let warehouse15 = new Warehouse(15, 9)

site1.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
site2.warehouses = [warehouse11, warehouse12, warehouse13, warehouse14, warehouse15]

let ticket1 = new Ticket('incoming', {'A': 5, 'C':2})
let ticket2 = new Ticket('incoming', {'B': 7, 'C':3})
let ticket3 = new Ticket('incoming', {'C':7})
let ticket4 = new Ticket('outgoing', {'C':7})
let ticket5 = new Ticket('outgoing', {'A':2})
let ticket6 = new Ticket('incoming', {'A':5, 'C':7})


site1.processTicket(ticket1)
// console.log(site1.warehouses)
site1.processTicket(ticket2)
// console.log(site1.warehouses)
site1.processTicket(ticket4)
console.log(ticket4.status)
if(ticket4.status === 'Denied'){
    site1.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
}
console.log(site1.warehouses)
// site2.processTicket(ticket3)
// console.log(site2.warehouses)
// site2.processTicket(ticket4)
// console.log(site2.warehouses)
// site2.processTicket(ticket5)
// console.log(site2.warehouses)
// site2.processTicket(ticket6)
// console.log(site2.warehouses)
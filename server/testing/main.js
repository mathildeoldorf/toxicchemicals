const Site = require('./site')
const Warehouse = require('./warehouse')
const Ticket = require('./ticket')
const Job = require('./job')
// 10, 12, 5, 3, 9

const site1 = new Site(1);
const warehouse1 = new Warehouse(11, 10, {'A':2})
const warehouse2 = new Warehouse(12, 12, {'B':5,'C':5})
const warehouse3 = new Warehouse(13, 5, {'A':1})
const warehouse4 = new Warehouse(14, 3)
const warehouse5 = new Warehouse(15, 9, {'C':1})
site1.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]

const ticket = new Ticket({'C':2, 'B':5})
 const job = new Job(
   'inProcess',
     [ { warehouse: 11, chemical: 'C' },
       { warehouse: 11, chemical: 'C' },
       { warehouse: 12, chemical: 'B' },
       { warehouse: 12, chemical: 'B' },
       { warehouse: 14, chemical: 'B' },
       { warehouse: 14, chemical: 'B' },
       { warehouse: 14, chemical: 'B' } ] 
    )

console.log(warehouse2.checkIfSpaceForChemicals(job))
warehouse2.checkIfSpaceForChemicals(job)
// console.log(ticket.status)
// console.log(site1.getRemainingCapacityOfSite())

// console.log(site1.getWarehousesToStoreChemicals(ticket))
// // console.log(site1.placeIndividualChemicalTypes(15, 'A', ticket)    )
// return

// console.log(site1.placeChemicals(chemicalTestArray))
// console.log(site1.getAlertLevel())
// console.log(site1.processTicket(ticket))
// console.log(site1.dispatchChemicals(ticket))
// console.log(site1.warehouses)
// console.log(warehouse1.getChemicalsinStorage())
// console.log(warehouse2.getChemicalsinStorage())
// console.log(warehouse3.getChemicalsinStorage())
// console.log(warehouse4.getChemicalsinStorage())
// console.log(warehouse5.getChemicalsinStorage())



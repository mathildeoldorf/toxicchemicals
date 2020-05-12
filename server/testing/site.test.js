// expect site to exist
// expext site to contain warehouses
// expect ticket to get approved or not depending on space
// expect alert to be triggered if total amount of A >=15

const Site = require('./site')
const Warehouse = require('./warehouse')
const Ticket = require('./ticket')

test('expect site to exist', () => {
    // const site = new Site()
    expect(site).toBeTruthy()
})

const site = new Site()


test('Expect site to contain 5 warehouses', ()=> {
    const warehouse =  new Warehouse()
    site.warehouses =[warehouse, warehouse, warehouse, warehouse, warehouse]
    expect(site.warehouses.length).toBe(5)
})

test('Expect there to be space for chemicals and ticket approved', () => {
    const ticket= new Ticket({'A':5, 'C':6})
    const warehouse1 = new Warehouse(11, 10, {'A':2})
    const warehouse2 = new Warehouse(12, 12, {'B':5,'C':5})
    const warehouse3 = new Warehouse(13, 5, {'A':1})
    const warehouse4 = new Warehouse(14, 3)
    const warehouse5 = new Warehouse(15, 9, {'C':1})
    const site = new Site()
    site.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
    expect(site.processTicket(ticket)).toBeTruthy()
    expect(ticket.status).toBe('Approved')
})

test('expect there to be no space and ticket denied', () => {
    const ticket= new Ticket({'A':100, 'C':6})
    const warehouse1 = new Warehouse(11, 10, {'A':2})
    const warehouse2 = new Warehouse(12, 12, {'B':5,'C':5})
    const warehouse3 = new Warehouse(13, 5, {'A':1})
    const warehouse4 = new Warehouse(14, 3)
    const warehouse5 = new Warehouse(15, 9, {'C':1})
    const site = new Site()
    site.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
    expect(site.processTicket(ticket)).toBeFalsy()
    expect(ticket.status).toBe('Denied')
})

test('Expect alert level to be false', () => {
    const warehouse1 = new Warehouse(11, 10, {'A':2})
    const warehouse2 = new Warehouse(12, 12, {'B':5,'C':5})
    const warehouse3 = new Warehouse(13, 5, {'A':1})
    const warehouse4 = new Warehouse(14, 3)
    const warehouse5 = new Warehouse(15, 9, {'C':1})
    site.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
    expect(site.getAlertLevel()).toBeFalsy()
})

test('Expect alert level to be true', () => {
    const warehouse1 = new Warehouse(11, 10, {'A':10})
    const warehouse2 = new Warehouse(12, 12,  {'B':5,'C':5})
    const warehouse3 = new Warehouse(13, 5, {'A':5})
    const warehouse4 = new Warehouse(14, 3)
    const warehouse5 = new Warehouse(15, 9,{'C':1, 'A':8})
    site.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
    expect(site.getAlertLevel()).toBeTruthy()
})


test('Expect to accept ticket and sort chemicals accordingly', () => {
    const warehouse1 = new Warehouse(11, 10, {'A':2})
    const warehouse2 = new Warehouse(12, 12, {'B':5,'C':5})
    const warehouse3 = new Warehouse(13, 5, {'A':1})
    const warehouse4 = new Warehouse(14, 3)
    const warehouse5 = new Warehouse(15, 9, {'C':1})
    const ticket = new Ticket({'A': 5, 'C':5})
    site.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
    expect(site.getWarehousesToStoreChemicals(ticket)).toStrictEqual([
        [{warehouseId:11, chemical: 'A'},
        {warehouseId:11, chemical: 'A'},
        {warehouseId:11, chemical: 'A'},
        {warehouseId:11, chemical: 'A'},
        {warehouseId:11, chemical: 'A'}],
        [{warehouseId:11, chemical: 'C'},
        {warehouseId:11, chemical: 'C'},
        {warehouseId:11, chemical: 'C'},
        {warehouseId:12, chemical: 'C'},
        {warehouseId:12, chemical: 'C'}]
    ])
})

test('expect ticket to be denied because of too many A chem', () => {
    const warehouse1 = new Warehouse(11, 10, {'A':2})
    const warehouse2 = new Warehouse(12, 12, {'B':5,'C':5})
    const warehouse3 = new Warehouse(13, 5, {'A':1})
    const warehouse4 = new Warehouse(14, 3)
    const warehouse5 = new Warehouse(15, 9, {'C':1})
    const ticket = new Ticket({'A': 25, 'C':5})
    site.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
    expect(site.getWarehousesToStoreChemicals(ticket)).toBeFalsy()
})

test('expect dispatch ticket to be denied', () => {
    const warehouse1 = new Warehouse(11, 10, {'A':2})
    const warehouse2 = new Warehouse(12, 12, {'B':5,'C':5})
    const warehouse3 = new Warehouse(13, 5, {'A':1})
    const warehouse4 = new Warehouse(14, 3)
    const warehouse5 = new Warehouse(15, 9, {'C':1})
    const ticket = new Ticket({'C':8})
    site.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
    expect(site.dispatchChemicals(ticket)).toBeFalsy()
})

test('expect dispatch ticket to be approved', () => {
    const warehouse1 = new Warehouse(11, 10, {'A':2})
    const warehouse2 = new Warehouse(12, 12, {'B':5,'C':5})
    const warehouse3 = new Warehouse(13, 5, {'A':1})
    const warehouse4 = new Warehouse(14, 3)
    const warehouse5 = new Warehouse(15, 9, {'C':1})
    const ticket = new Ticket({'C':8, 'A':15})
    site.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
    expect(site.dispatchChemicals(ticket)).toBeFalsy()
})
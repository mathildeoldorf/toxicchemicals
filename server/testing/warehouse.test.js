// expect warehouse to exist
// expect to get allowed chemicals in Warehouse


const Warehouse = require('./warehouse')
const Ticket = require('./ticket')

test('Check if warehouse is there', () => {
    const warehouse = new Warehouse()
    expect(warehouse).toBeTruthy()
})

test('expect to get space and allowed chemicals', () => {
    const warehouse = new Warehouse(12, 12, {'B':5,'C':5})
    expect(warehouse.getChemicalsinStorage()).toStrictEqual(
        {chemicalsAllowed: ['B', 'C'],
        remainingStorage: 2}
    )
})

test('Expect that empty warehouse allows all chemicals', () => {
    const warehouse = new Warehouse(12, 12)
    expect(warehouse.getChemicalsinStorage()).toStrictEqual(
        {
            chemicalsAllowed: ['A', 'B', 'C'],
            remainingStorage: 12
        }
    )
})

test('expect ticket to be approved at warehouse', () => {
    const warehouse = new Warehouse(12, 12, {'A':10})
    const ticket = new Ticket({'A':2})
    expect(warehouse.checkIfSpaceForChemicals(ticket)).toBeTruthy()
})

test('expect ticket to be denide because of chemical type', () => {
    const warehouse = new Warehouse(12, 12, {'A':10})
    const ticket = new Ticket({'B':1})
    expect(warehouse.checkIfSpaceForChemicals(ticket)).toStrictEqual([false])
})

test('expect ticket to be denide because of space', () => {
    const warehouse = new Warehouse(12, 12, {'A':10})
    const ticket = new Ticket({'A':5})
    expect(warehouse.checkIfSpaceForChemicals(ticket)).toStrictEqual([false])
})

test('expect ticket to be denide because of space and chemical type', () => {
    const warehouse = new Warehouse(12, 12, {'A':10})
    const ticket = new Ticket({'A':5, 'B':1})
    expect(warehouse.checkIfSpaceForChemicals(ticket)).toStrictEqual([false, false])
})
const Ticket = require('./ticket')

test('ticket is there', () => {
    const ticket = new Ticket({'A':5, 'C':6})
    expect(ticket).toBeTruthy()
})
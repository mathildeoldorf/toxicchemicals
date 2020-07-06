const { fetchSite, checkSiteStock, checkTicketAmount, compare } = require("./algorithm");
test("Expect all sites with warehouses and stock", async () => {
    const site = await fetchSite();
    expect(site.length).toBe(1);
    expect(site[0].warehouse.length).toBe(5);

});

test("Expect to get the current stock of the site to be equal to 41", async () => {
    console.log(checkSiteStock);
    const currentStock = await checkSiteStock();
    expect(currentStock).toBe(33);
});

const ticket = {
    "A": 3,
    "C": 1
}

test("Expect the ticket to have an amount of chemicals", async () => {
    console.log(checkTicketAmount);
    const amount = await checkTicketAmount(ticket);
    expect(amount).toBeTruthy();
})

test("Expect to return true if the site has space for the amount in the ticket, false if not", async () => {
    console.log(ticket);
    const isSpace = compare();
    expect(isSpace).toBeTruthy();
});


const warehouseMatches = [
    5, 1, 4, 3,
    4, 3, 4, 3
]

// test("Expect the array of matches", async () => {
//     expect(compare()).toStrictEqual();
// })

// toStrictEqual([])

// test("Expect ticket to be approved and get chemicals removed from stock of the respective warehouses", async () => {

// })
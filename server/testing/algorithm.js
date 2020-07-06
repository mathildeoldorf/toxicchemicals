const axios = require("axios");
const { response } = require("express");

let site;

// ALERT LEVEL : COUNT ALL A CHEMICALS IN EACH SITE - IF ITS MORE THAN 15 SET ALERT LEVEL

// GET ALL INFO FROM 1 SITE -- ALL WAREHOUSES WITH STOCK
// CHECK TICKET TYPE - I OR O
// SPLIT INTO TWO 


// OUTGOING
// COUNT CHEMICAL ON SITE AND SEE IF THEY ARE EQUAL OR MORE THAN THE TICKET AMOUNT
///// --> NOT - DENY THE TICKET
//// --> IS - GOT INTO WAREHOUSES AND FIGURE OUT WHERE TO TAKE IT FROM - LOOP THROUGH THEM AND TAKE THE CHEMICALS OUT ONE BY ONE FROM THE WAREHOUSE
/// DEDUCT IT FROM THE WAREHOUSE AND TICKET EACH TIME
// SAVE THE MATCH SOMEWHERE (WAREHOUSE ID AND CHEMICAL ID) IN AN ARRAY OR OBJECT AND INCREASE THE COUNT IN THAT IN THE LOOP
// IF NOT SUCCESFUL FINDING ALL THE CHEMICALS IN THE TICKET -- IF THE TICKET IS NOT EMPTY DENY THE TICKET 
// IF SUCCESFUL FINDING ALL CHEMICALS - IF THE TICKET IS EMPTY - PUSH THE DATA TO THE DATABASE 
/// 

const ticket = {
    1: 2,
    3: 4
}

const fetchSite = async () => {
    console.log("Fetching all info about the sites");
    const siteID = 1;
    const response = await axios.get(`http://localhost:9090/site/${siteID}/warehouses/stock`);
    const data = await response.data;
    site = data;
    console.log(site.length);

    compare(ticket);
    return site;
}



const checkSiteStock = async () => {
    let count = 0;

    site[0].warehouse.forEach(warehouse => {
        count = count + parseInt(warehouse.nCurrentStock);
        console.log(count);
    });

    return count;
}

// COUNTING THE AMOUNT OF CHEMICHALS IN THE TICKET
const checkTicketAmount = async (ticket) => {
    let amounts = Object.values(ticket);
    console.log(amounts);

    const reducer = (a, c) => a + c;

    amounts = amounts.reduce(reducer);
    return amounts;
}

// COMPARING SITE STOCK AGAINST TICKET AMOUNT
const compare = () => {
    if (checkSiteStock() >= checkTicketAmount(ticket)) {
        console.log('Ticket approved');

        findDispatchDestination();
        return true;
    }
    else {
        console.log('Ticket denied');
        return false;
    };
}

const findDispatchDestination = () => {
    console.log("Finding the warehouses to dispatch chemicals from");
    let warehouses = [];

    Object.keys(ticket).forEach(chemicalID => {
        amount = ticket[chemicalID];

        // if (ticket[chemicalID] !== 0) {
        // console.log(amount);
        for (let i = 0; i < amount; i++) {
            let warehouseMatch;
            site[0].warehouse.find(warehouse => {

                // console.log(warehouse);
                warehouse.chemicalStock.find(chemical => {
                    // console.log(chemical);
                    if (chemical.nChemicalID == chemicalID && chemical.nStock > 0 && ticket[chemicalID] > 0) {
                        console.log(i);
                        warehouseMatch = { ...warehouse };

                        // console.log(warehouseMatch.chemicalStock[0]);
                        console.log(chemical);

                        // console.log(ticket[chemicalID]);
                        // ticket[chemicalID]--;

                        // console.log(chemicalID);
                        // console.log(warehouseMatch);
                        // console.log(chemical.nStock);

                        // chemical.nStock--;
                        // console.log(warehouseMatch);
                        // console.log(chemical.nStock);
                        // console.log(ticket);

                        // console.log(warehouseMatch.chemicalStock);

                        // console.log(ticket[chemicalID]--);
                        // console.log(chemical.nStock--);

                        // DECREASE TICKET AMOUNT BY 1 OF THAT CEHMICAL WITH THAT KEY - MANIPULATE THE TICKET VARIABLE
                        // DECREASE nSTOCK OF THAT CHEMICAL INSIDE THE WAREHOUSE - MANIPULATE WAREHOUSE MATCH VARIABLE
                        ///// THIS WILL MAKE SURE THAT THE CORRECT INFO IS IN THE DB


                    }
                })
            });

            // console.log(warehouseMatch);
            warehouses.push(warehouseMatch.nWarehouseID, parseInt(chemicalID));
        }
        // console.log(ticket);
        // }
        console.log(warehouses);
    });

    // END WITH:
    //// IF CHECK TOTAL TICKET AMOUNT IS NOT 0 - DENY TICKET (console.log)
    /// ELSE - RETURN warehouses - APPROVE THE DISPATCH AND PUSH THE INFO TO THE DB

    // return warehouses;
}

fetchSite();


module.exports = {
    fetchSite,
    checkSiteStock,
    checkTicketAmount,
    compare
}
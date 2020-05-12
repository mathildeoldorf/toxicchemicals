Each site is a class containing an id and 5 different warehouses.

Each warehouse is a class containing an id, a capacity and an inventory of chemicals if there are any,
    in each warehouse there is a method, getChemicalsinStorage,  that returns an array of the allowed chemicals to be stored there based on what is already stored(or if nothing is stored all chemicals are allowed) and the number of remaining spaces based on the total amount of chemicals minus the capacity of the warehouse.
    It also contains a method to check when a delivery reaches the warehouse that checks if the chemical is allowed there and if ther is space
        ---> once it is connected to the database it will also be possible to query what adjacent warehouses contain and modify the allowed chemicals.

Each ticket is  a class containing an object of chemicals and it's amount (fx.{'A':3, 'C':5}), the total amount of chemicals( which is a method that caluculates the amount based on the chemicals it carries), they type of ticket(incoming or outgoing) and a status(approved or denied)

Each job contains a status and a placement array of which warehouse to place each chemicals

The site does the heavy lifting, it accepts a ticket, runs a methond called processTicket with the ticket as a parameter and firstly it checks if it is outgoing or incoming.
    ----if it is incoming it runs the method getRemainingCapacityOfSite to see if there is space for the chemicals, if there is space it runs the method getWarehousesToStoreChemicals which runs the method placeIndividualChemicalTypes on each chemical key.
    the placeIndividualChemicalTypes takes the ticket, the chemical type and amount of chemicals to be placed as parameters. based on the amount it will run a for loop and find a warehouse that is able to take said chemical.
        first it checks if the chemical is A, if it is A then it checks if adjacent warehouses carry A and returns the warehouseId if it does not carry it. Otherwise it returns false and another warehouse is checked. 
        If it finds a match it will increase said chemicals inventory and decrease the amount in the ticket.
        If the chemical is not A, it will check for warehouses where that chemical is allowed (based on the warehouse method getChemicalsinStorage) and decrease the amount in the ticket as well as update the warehouse inventory. 
       
    if there is not space for the chemicals getRemainingCapacityOfSite returns false and the ticket.status is set to denied.

    ----if the ticket is outgoing it runs the method dispatchChemicals which on each chemical type in the ticket, runs a loop for the amount of said chemical, finds a warehouse that carries that chemical and decreases the amount of that chemical by one, and the amount of that chemical in the ticket by one.
    it will return an placementArray which contains a warehouseId and which chemical to be removed from there.
    if the ticket still has any chemicals left dispatchChemicals will return false and the ticket status will be set to denied. otherwise it will return the placementArray of which warehouses to remove chemicals from.

    --if the ticket is approved, it will make a Job class instance with the status as 'inProcess' and the placementArray that details where to remove/add chemicals.

    --> once a check at the warehouse is fully implemented that will decrease the placementArray until it is 0 which will set the Job.status as confirmed. but this I fucked up in my code and I need to connect it to the DB so that it can finish perfectly.

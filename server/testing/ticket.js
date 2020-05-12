class Ticket {
    constructor(type, chemicals){
        this.chemicals = chemicals
        this.totalAmount = this.getTotalAmountOfChemicals()
        this.status
        this.type = type
    }

    getTotalAmountOfChemicals(){
        let totalAmount = 0;
        Object.keys(this.chemicals).map(chemical =>{
            totalAmount = totalAmount+this.chemicals[chemical]
        })
        return totalAmount
    }

}
module.exports = Ticket

/* Tickets are to be checked to match at a front gate, if ticket is approved, 
 job is raised
 By delivery ticket is also checked for physical possibility at loading dock,
 by dispatching ticket is checked again by warehouse
 Ticket status can be = denied, approved
*/
// create a warehouse class containing chemicals

class Warehouse {

    constructor(id, capacity, chemicalInventory){
        this.id = id
        this.capacity = capacity
        this.chemicalInventory = chemicalInventory
    } 

    getChemicalsinStorage(){
        if(this.chemicalInventory !== undefined){
            let chemicalsAllowed;
            // const chemicalInventory = Object.keys(this.chemicalInventory)
            let totalAmount = Object.values(this.chemicalInventory)        
            totalAmount =  totalAmount.reduce((a, b) => a + b, 0)
            if(this.chemicalInventory.A){
                chemicalsAllowed = ['A', 'C']
            }else if(this.chemicalInventory.B){
                chemicalsAllowed = ['B', 'C']
            }else if(this.chemicalInventory.C){
                chemicalsAllowed = ['A', 'B', 'C']
            }
            return {chemicalsAllowed, remainingStorage: this.capacity - totalAmount}
        }else{
            return {chemicalsAllowed: ['A', 'B', 'C'], remainingStorage: this.capacity}
        }
    }
 
    checkIfSpaceForChemicals(job){
        let space = false
        // console.log(job.placementArray)
        const chemicalsForWarehouse = job.placementArray.filter((chemicalPlacement) => {
           if(chemicalPlacement.warehouse === this.id){
            let warehouseId = chemicalPlacement.warehouse
            let chemical = chemicalPlacement.chemical
               return {warehouseId, chemical}
           }
        })
        if(this.getChemicalsinStorage().remainingStorage >= chemicalsForWarehouse.length){
            space = true
        }
        const isSpace = chemicalsForWarehouse.map(x => {
            if(space && this.getChemicalsinStorage().chemicalsAllowed.includes(x.chemical)){
                return true
            }
            else {
                return false}
        })
        
        return isSpace

        // must know what adjacent warehouses carry in order to tell if it can store said chemical
    }

}


module.exports = Warehouse
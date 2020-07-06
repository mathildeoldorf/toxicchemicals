const router = require("express").Router();

const Warehouse = require("./../models/Warehouse");
const ChemicalStock = require("./../models/ChemicalStock");
const Chemical = require("./../models/Chemical");
const Site = require("./../models/Site");
const ShipmentItem = require("./../models/ShipmentItem");
const ShipmentJob = require("./../models/ShipmentJob");
const User = require("./../models/User");
const Audit = require("./../models/Audit");

// ALL THE STOCK
router.get("/warehouses/stock", async (req, res) => {
    console.log("getting all stock from warehouses");
    try {
        const warehousesStock = await Warehouse.query().select().withGraphFetched("chemicalStock");
        return res.status(200).send(warehousesStock);
    } catch (error) {
        console.log(error);
        return;
    }
});

// ALL THE STOCK
router.get("/site/:id/warehouses/stock", async (req, res) => {
    const siteID = req.params.id;
    console.log("getting all stock from warehouses from each site");
    try {
        const warehousesStock = await Site.query().select().withGraphFetched("warehouse.chemicalStock").where("nSiteID", siteID);
        return res.status(200).send(warehousesStock);
    } catch (error) {
        console.log(error);
        return;
    }
});

// GET CURRENT STOCK BY WAREHOUSE ID
router.get("/warehouse/:id/stock", async (req, res) => {
    const warehouseID = req.params.id;
    try {
        const warehouseStock = await ChemicalStock.query().select().withGraphFetched("chemical").where("nWarehouseID", warehouseID);
        res.status(200).send(warehouseStock);
    } catch (error) {
        console.log(error);
        return;
    }
});

// GET ALL SHIPMENTJOBS WITH SHIPMENTITEMS
router.get("/shipmentJobs", async (req, res) => {
    console.log("getting all shipment jobs");
    try {
        const jobs = await ShipmentJob.query().select().withGraphFetched("shipmentItem.chemical");
        res.status(200).send(jobs);
    } catch (error) {
        console.log(error);
        return;
    }
});

// PROCESS JOB

router.post("/processJob", async (req, res) => {
    const { job } = req.body;
    console.log(job);
    let siteID;
    let newJob;

    if (job.placementArray[0].warehouse <= 5) {
        siteID = 1;
    } else {
        siteID = 2;
    }

    try {
        newJob = await ShipmentJob.query().insert({
            cShipmentJobType: job.type.toUpperCase(),
            nTicketNo: Math.floor(Math.random() * 1000),
            nStatus: 1
        });

        job.placementArray.map(async item => {
            item.chemical = item.chemical === "A" ? 1 : item.chemical === "B" ? 2 : 3;

            const jobItem = await ShipmentItem.query().insert({
                nAmount: item.amount,
                nShipmentJobID: newJob.nShipmentJobID,
                nChemicalID: item.chemical,
                nWarehouseID: item.warehouse
            });

            if (job.type.toUpperCase() === "O") {
                await ChemicalStock.query().decrement('nStock', item.amount).where('nWarehouseID', item.warehouse)
                    .andWhere('nChemicalID', item.chemical);

                await Warehouse.query().decrement('nCurrentStock', item.amount).where('nWarehouseID', item.warehouse);
            }
            else {

                let isPresent = await ChemicalStock.query().select().where('nChemicalID', item.chemical).andWhere('nWarehouseID', item.warehouse);

                if (isPresent[0]) {
                    await ChemicalStock.query().increment('nStock', item.amount).where('nWarehouseID', item.warehouse)
                        .andWhere('nChemicalID', item.chemical);
                }
                else {
                    await ChemicalStock.query().insert({
                        nWarehouseID: item.warehouse,
                        nChemicalID: item.chemical,
                        nStock: item.amount
                    });
                }

                await Warehouse.query().increment('nCurrentStock', item.amount).where('nWarehouseID', item.warehouse);
            }

            await Audit.query().insert({

                nShipmentItemID: jobItem.nShipmentItemID,
                nAmount: item.amount,
                nShipmentJobID: newJob.nShipmentJobID,
                nChemicalID: item.chemical,
                nWarehouseID: item.warehouse,
                cShipmentJobType: job.type.toUpperCase()
            });

            return res.status(200).send({ response: "success" });

        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ response: error })
    }

});

// AUDIT ROUTES

module.exports = router;
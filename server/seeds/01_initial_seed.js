exports.seed = function (knex) {
  return knex('tSite').insert([{
        cSiteName: "S1"
      },
      {
        cSiteName: "S2"
      },
    ])
    .then(async () => {
      global.siteIDs = await knex.select("nSiteID").from("tSite");
      siteIDs.sort(function (a, b) {
        return a.nSiteID - b.nSiteID;
      });

      return knex('tWarehouse').insert([{
          cWarehouseName: "W1",
          nCapacity: 10,
          nCurrentStock: 10,
          nSiteID: siteIDs[0].nSiteID,
        },
        {
          cWarehouseName: "W2",
          nCapacity: 12,
          nCurrentStock: 9,
          nSiteID: siteIDs[0].nSiteID,
        },
        {
          cWarehouseName: "W3",
          nCapacity: 5,
          nCurrentStock: 2,
          nSiteID: siteIDs[0].nSiteID,
        },
        {
          cWarehouseName: "W4",
          nCapacity: 3,
          nCurrentStock: 3,
          nSiteID: siteIDs[0].nSiteID,
        },
        {
          cWarehouseName: "W5",
          nCapacity: 9,
          nCurrentStock: 9,
          nSiteID: siteIDs[0].nSiteID,
        },
        {
          cWarehouseName: "W1",
          nCapacity: 10,
          nCurrentStock: 8,
          nSiteID: siteIDs[1].nSiteID,
        },
        {
          cWarehouseName: "W2",
          nCapacity: 12,
          nCurrentStock: 12,
          nSiteID: siteIDs[1].nSiteID,
        },
        {
          cWarehouseName: "W3",
          nCapacity: 5,
          nCurrentStock: 5,
          nSiteID: siteIDs[1].nSiteID,
        },
        {
          cWarehouseName: "W4",
          nCapacity: 3,
          nCurrentStock: 2,
          nSiteID: siteIDs[1].nSiteID,
        },
        {
          cWarehouseName: "W5",
          nCapacity: 9,
          nCurrentStock: 1,
          nSiteID: siteIDs[1].nSiteID,
        },
      ]);
    })
    .then(async () => {
      return knex('tChemical').insert([{
          cChemicalName: "A"
        },
        {
          cChemicalName: "B"
        },
        {
          cChemicalName: "C"
        }
      ]);
    })
    .then(async () => {
      global.chemicalIDs = await knex.select("nChemicalID").from("tChemical");
      chemicalIDs.sort(function (a, b) {
        return a.nChemicalID - b.nChemicalID;
      });
      global.warehouseIDs = await knex.select("nWarehouseID").from("tWarehouse");
      warehouseIDs.sort(function (a, b) {
        return a.nWarehouseID - b.nWarehouseID;
      });

      return knex('tChemicalStock').insert([{
          nWarehouseID: warehouseIDs[0].nWarehouseID,
          nChemicalID: chemicalIDs[0].nChemicalID,
          nStock: 5 // Max cap. is 10
        },
        {
          nWarehouseID: warehouseIDs[0].nWarehouseID,
          nChemicalID: chemicalIDs[2].nChemicalID,
          nStock: 5
        },
        {
          nWarehouseID: warehouseIDs[1].nWarehouseID,
          nChemicalID: chemicalIDs[2].nChemicalID,
          nStock: 9 // Max cap. is 12
        },
        {
          nWarehouseID: warehouseIDs[2].nWarehouseID,
          nChemicalID: chemicalIDs[1].nChemicalID,
          nStock: 2 // Max cap. is 5
        },
        {
          nWarehouseID: warehouseIDs[3].nWarehouseID,
          nChemicalID: chemicalIDs[2].nChemicalID,
          nStock: 3 // Max cap. is 3
        },
        {
          nWarehouseID: warehouseIDs[4].nWarehouseID,
          nChemicalID: chemicalIDs[0].nChemicalID,
          nStock: 9 // Max cap is 9
        },
        {
          nWarehouseID: warehouseIDs[5].nWarehouseID,
          nChemicalID: chemicalIDs[1].nChemicalID,
          nStock: 8 // Max cap. is 10
        },
        {
          nWarehouseID: warehouseIDs[6].nWarehouseID,
          nChemicalID: chemicalIDs[2].nChemicalID,
          nStock: 3 // Max cap. is 12
        },
        {
          nWarehouseID: warehouseIDs[6].nWarehouseID,
          nChemicalID: chemicalIDs[0].nChemicalID,
          nStock: 9
        },
        {
          nWarehouseID: warehouseIDs[7].nWarehouseID,
          nChemicalID: chemicalIDs[2].nChemicalID,
          nStock: 5 // Max cap. is 5
        },
        {
          nWarehouseID: warehouseIDs[8].nWarehouseID,
          nChemicalID: chemicalIDs[2].nChemicalID,
          nStock: 2 // Max cap. is 3
        },
        {
          nWarehouseID: warehouseIDs[9].nWarehouseID,
          nChemicalID: chemicalIDs[1].nChemicalID,
          nStock: 1 // Max cap. is 9
        },
      ]);
    })
    .then(async () => {
      return knex('tUser').insert([{
          cEmail: "admin@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[0].nWarehouseID

        },
        {
          cEmail: "warehouse1@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[0].nWarehouseID
        },
        {
          cEmail: "warehouse2@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[1].nWarehouseID
        },
        {
          cEmail: "warehouse3@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[2].nWarehouseID
        },
        {
          cEmail: "warehouse4@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[3].nWarehouseID
        },
        {
          cEmail: "warehouse5@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[4].nWarehouseID
        },
        {
          cEmail: "warehouse6@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[5].nWarehouseID
        },
        {
          cEmail: "warehouse7@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[6].nWarehouseID
        },
        {
          cEmail: "warehouse8@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[7].nWarehouseID
        },
        {
          cEmail: "warehouse9@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[8].nWarehouseID
        },
        {
          cEmail: "warehouse10@toxicchemical.com",
          cPassword: "$2a$10$vC9EN2MEoVNIYhGbsCBDuO0RsmXC8RpF3BpaJOrY3nVwM4p6n9XZe",
          nWarehouseID: warehouseIDs[9].nWarehouseID
        }
      ]);
    })
    .then(async () => {
      return knex('tShipmentJob').insert([{
          nTicketNo: 1,
          cShipmentJobType: 'O',
          nStatus: 0
        },
        {
          nTicketNo: 2,
          cShipmentJobType: 'O',
          nStatus: 1
        },
        {
          nTicketNo: 3,
          cShipmentJobType: 'I',
          nStatus: 0
        },
        {
          nTicketNo: 4,
          cShipmentJobType: '0',
          nStatus: 0
        },
        {
          nTicketNo: 5,
          cShipmentJobType: 'I',
          nStatus: 0
        },
      ]);
    })
    .then(async () => {
      global.shipmentJobIDs = await knex.select("nShipmentJobID").from("tShipmentJob");
      shipmentJobIDs.sort(function (a, b) {
        return a.nShipmentJobID - b.nShipmentJobID;
      });

      return knex("tShipmentItem").insert([{
          nAmount: 4,
          nShipmentJobID: shipmentJobIDs[0].nShipmentJobID,
          nChemicalID: chemicalIDs[0].nChemicalID,
          nWarehouseID: warehouseIDs[0].nWarehouseID
        },
        {
          nAmount: 8,
          nShipmentJobID: shipmentJobIDs[1].nShipmentJobID,
          nChemicalID: chemicalIDs[1].nChemicalID,
          nWarehouseID: warehouseIDs[9].nWarehouseID,
        },
        {
          nAmount: 6,
          nShipmentJobID: shipmentJobIDs[2].nShipmentJobID,
          nChemicalID: chemicalIDs[2].nChemicalID,
          nWarehouseID: warehouseIDs[9].nWarehouseID
        },
        {
          nAmount: 7,
          nShipmentJobID: shipmentJobIDs[3].nShipmentJobID,
          nChemicalID: chemicalIDs[0].nChemicalID,
          nWarehouseID: warehouseIDs[6].nWarehouseID
        },
        {
          nAmount: 3,
          nShipmentJobID: shipmentJobIDs[4].nShipmentJobID,
          nChemicalID: chemicalIDs[2].nChemicalID,
          nWarehouseID: warehouseIDs[2].nWarehouseID
        },
      ]);
    })
};
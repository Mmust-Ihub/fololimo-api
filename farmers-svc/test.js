const schedul = [
  {
    "name": "Land Preparation - Plowing",
    "startDate": "2025-04-01",
    "duration": "7 days",
    "cost": "KES 20,000 - KES 30,000",
    "description": "Plowing the 20-acre land to break up the soil, improve aeration, and bury weeds and crop residue. Consider using oxen or a tractor depending on affordability and access."
  },
  {
    "name": "Land Preparation - Harrowing",
    "startDate": "2025-04-08",
    "duration": "5 days",
    "cost": "KES 15,000 - KES 25,000",
    "description": "Harrowing the plowed land to create a fine seedbed for planting. Ensures proper seed-to-soil contact for good germination."
  },
  {
    "name": "Soil Testing (Optional)",
    "startDate": "2025-04-01",
    "duration": "1 day (collection) + 14 days (analysis)",
    "cost": "KES 5,000 - KES 10,000",
    "description": "Collecting soil samples from different areas of the farm and sending them to a laboratory for nutrient analysis. This informs fertilizer application decisions for optimal crop growth. Not always necessary but highly recommended in the first year."
  },
  {
    "name": "Seed and Fertilizer Purchase",
    "startDate": "2025-04-15",
    "duration": "3 days",
    "cost": "KES 80,000 - KES 120,000",
    "description": "Purchasing certified maize seeds (e.g., Hybrid 614), bean seeds (e.g., Rosecoco), pea seeds (e.g., Early Onward), and appropriate fertilizers (e.g., DAP, CAN) based on soil analysis recommendations (if performed) or general best practices for the region. Allocate approximately 10 acres for maize, 5 acres for beans, and 5 acres for peas."
  },
  {
    "name": "Maize Planting",
    "startDate": "2025-04-20",
    "duration": "5 days",
    "cost": "KES 10,000 - KES 15,000",
    "description": "Planting maize seeds at the recommended spacing (e.g., 75cm x 30cm) and depth. Apply DAP fertilizer at planting. Consider using a jab planter for efficiency."
  },
  {
    "name": "Bean Planting",
    "startDate": "2025-04-25",
    "duration": "3 days",
    "cost": "KES 6,000 - KES 9,000",
    "description": "Planting bean seeds at the recommended spacing (e.g., 50cm x 20cm) and depth.  Beans can be intercropped with maize. Apply DAP fertilizer at planting."
  },
    {
    "name": "Pea Planting",
    "startDate": "2025-04-28",
    "duration": "3 days",
    "cost": "KES 6,000 - KES 9,000",
    "description": "Planting pea seeds at the recommended spacing (e.g., 45cm x 7cm) and depth. Apply DAP fertilizer at planting."
  },
  {
    "name": "First Weeding (Maize, Beans, Peas)",
    "startDate": "2025-05-15",
    "duration": "7 days",
    "cost": "KES 12,000 - KES 18,000",
    "description": "Removing weeds from the maize, beans, and pea fields to reduce competition for nutrients, water, and sunlight.  Manual weeding is common in this area."
  },
  {
    "name": "Top Dressing (Maize)",
    "startDate": "2025-05-30",
    "duration": "3 days",
    "cost": "KES 15,000 - KES 20,000",
    "description": "Applying CAN fertilizer to the maize crop as a top dressing to provide nitrogen for healthy growth."
  },
  {
    "name": "Second Weeding (Maize, Beans, Peas)",
    "startDate": "2025-06-10",
    "duration": "7 days",
    "cost": "KES 12,000 - KES 18,000",
    "description": "Second round of weeding to ensure the crops are free from weed competition throughout their growth cycle."
  },
  {
   "name": "Pest and Disease Control (Maize, Beans, Peas)",
    "startDate": "2025-05-20",
    "duration": "Ongoing (as needed)",
    "cost": "KES 5,000 - KES 15,000 (depending on severity)",
    "description": "Regularly monitoring crops for pests and diseases (e.g., stalk borers in maize, bean aphids, pea powdery mildew). Apply appropriate pesticides or fungicides as needed, following safety guidelines. Cost will vary based on infestation levels."
  },
  {
    "name": "Maize Harvesting",
    "startDate": "2025-08-15",
    "duration": "14 days",
    "cost": "KES 25,000 - KES 35,000",
    "description": "Harvesting mature maize cobs. This process involves cutting the stalks, collecting the cobs, and drying them adequately to prevent spoilage. Manual labor is usually employed."
  },
   {
    "name": "Bean Harvesting",
    "startDate": "2025-08-01",
    "duration": "10 days",
    "cost": "KES 15,000 - KES 25,000",
    "description": "Harvesting mature bean pods. Drying, threshing, and winnowing the beans is critical for storage and sales."
  },
   {
    "name": "Pea Harvesting",
    "startDate": "2025-07-15",
    "duration": "10 days",
    "cost": "KES 15,000 - KES 25,000",
    "description": "Harvesting mature pea pods. Drying, threshing, and winnowing the peas is critical for storage and sales."
  },
  {
    "name": "Maize Shelling",
    "startDate": "2025-08-29",
    "duration": "7 days",
    "cost": "KES 10,000 - KES 15,000",
    "description": "Shelling the dried maize cobs to separate the kernels from the cob. Can be done manually or using a maize sheller."
  },
  {
    "name": "Maize Storage",
    "startDate": "2025-09-05",
    "duration": "Ongoing",
    "cost": "KES 5,000 - KES 10,000 (for storage bags/facilities)",
    "description": "Storing the shelled maize in airtight bags or a well-ventilated granary to protect it from pests and moisture. Proper storage is crucial for maintaining grain quality."
  },
  {
    "name": "Bean and Pea Storage",
    "startDate": "2025-08-11",
    "duration": "Ongoing",
    "cost": "KES 3,000 - KES 7,000 (for storage bags/facilities)",
    "description": "Storing the shelled beans and peas in airtight bags or a well-ventilated storage to protect it from pests and moisture. Proper storage is crucial for maintaining quality."
  },
  {
    "name": "Marketing and Sales",
    "startDate": "2025-09-15",
    "duration": "Ongoing",
    "cost": "KES 2,000 - KES 5,000 (for transportation and market fees)",
    "description": "Selling the harvested maize, beans and peas  to local markets, traders, or cooperatives. Negotiating prices and arranging transportation. Consider selling in stages to capitalize on price fluctuations."
  },
  {
    "name": "Post-Harvest Land Preparation",
    "startDate": "2025-09-30",
    "duration": "7 days",
    "cost": "KES 10,000 - KES 15,000",
    "description": "Clearing crop residues from the field after harvesting to prepare for the next planting season. This can involve burning (though not recommended due to environmental concerns) or incorporating the residue into the soil."
  }
]

console.log(schedul.length)
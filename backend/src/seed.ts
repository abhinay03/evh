import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.weatherRecord.deleteMany();
  await prisma.sustainability.deleteMany();
  await prisma.neighbourhood.deleteMany();
  await prisma.communityEvent.deleteMany();
  await prisma.usageRecord.deleteMany();
  await prisma.reward.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.customer.deleteMany();

  // Create customers
  const customers = [
    { id: "CUST-001", name: "Anna Becker", email: "demo@evh.de", password: "demo123", address: "Merseburger Str. 42, 06110 Halle", district: "Innenstadt", type: "apartment", residents: 1, heatingType: "district", hasSolar: false, hasEvCharger: false, joinedDate: new Date("2023-03-15"), avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
    { id: "CUST-002", name: "Thomas Müller", email: "mueller@evh.de", password: "demo123", address: "Frohe Zukunft 12, 06118 Halle", district: "Frohe Zukunft", type: "house", residents: 4, heatingType: "district", hasSolar: true, hasEvCharger: true, joinedDate: new Date("2022-08-01"), avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
    { id: "CUST-003", name: "Horst Schneider", email: "schneider@evh.de", password: "demo123", address: "Am Kirchtor 3, 06108 Halle", district: "Altstadt", type: "apartment", residents: 2, heatingType: "gas", hasSolar: false, hasEvCharger: false, joinedDate: new Date("2021-11-20"), avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
    { id: "CUST-004", name: "Lisa Fischer", email: "fischer@evh.de", password: "demo123", address: "Ludwig-Wucherer-Str. 78, 06108 Halle", district: "Innenstadt", type: "apartment", residents: 2, heatingType: "district", hasSolar: false, hasEvCharger: false, joinedDate: new Date("2024-01-10"), avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
    { id: "CUST-005", name: "Klaus Weber", email: "weber@evh.de", password: "demo123", address: "Delitzscher Str. 56, 06112 Halle", district: "Freiimfelde", type: "house", residents: 3, heatingType: "district", hasSolar: true, hasEvCharger: false, joinedDate: new Date("2023-06-05"), avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" },
    { id: "CUST-006", name: "Maria Schmidt", email: "schmidt@evh.de", password: "demo123", address: "Heideallee 23, 06120 Halle", district: "Heide-Nord", type: "house", residents: 5, heatingType: "oil", hasSolar: false, hasEvCharger: true, joinedDate: new Date("2022-04-18"), avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" },
    { id: "CUST-007", name: "Felix Hoffmann", email: "hoffmann@evh.de", password: "demo123", address: "Große Märkerstr. 15, 06108 Halle", district: "Altstadt", type: "apartment", residents: 1, heatingType: "electric", hasSolar: false, hasEvCharger: false, joinedDate: new Date("2024-02-28"), avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop" },
    { id: "CUST-008", name: "Sabine Wagner", email: "wagner@evh.de", password: "demo123", address: "Herrfurthstr. 8, 06116 Halle", district: "Dautzsch", type: "house", residents: 3, heatingType: "gas", hasSolar: true, hasEvCharger: true, joinedDate: new Date("2021-09-12"), avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop" },
    { id: "CUST-009", name: "Daniel Richter", email: "richter@evh.de", password: "demo123", address: "Rennbahnweg 5, 06122 Halle", district: "Südstadt", type: "apartment", residents: 2, heatingType: "district", hasSolar: false, hasEvCharger: false, joinedDate: new Date("2023-10-01"), avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
    { id: "CUST-010", name: "Petra Klein", email: "klein@evh.de", password: "demo123", address: "Trothaer Str. 34, 06118 Halle", district: "Trotha", type: "house", residents: 4, heatingType: "district", hasSolar: false, hasEvCharger: false, joinedDate: new Date("2022-12-03"), avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
  ];

  for (const c of customers) {
    await prisma.customer.create({ data: c });
  }

  // Invoices for Anna (CUST-001)
  const invoices = [
    { id: "INV-2024-01", customerId: "CUST-001", month: "January 2024", amount: 89.50, paid: true, dueDate: "2024-02-15", type: "combined" },
    { id: "INV-2024-02", customerId: "CUST-001", month: "February 2024", amount: 94.20, paid: true, dueDate: "2024-03-15", type: "combined" },
    { id: "INV-2024-03", customerId: "CUST-001", month: "March 2024", amount: 78.30, paid: true, dueDate: "2024-04-15", type: "combined" },
    { id: "INV-2024-04", customerId: "CUST-001", month: "April 2024", amount: 65.80, paid: true, dueDate: "2024-05-15", type: "combined" },
    { id: "INV-2024-05", customerId: "CUST-001", month: "May 2024", amount: 52.40, paid: true, dueDate: "2024-06-15", type: "combined" },
    { id: "INV-2024-06", customerId: "CUST-001", month: "June 2024", amount: 48.60, paid: false, dueDate: "2024-07-15", type: "combined" },
    { id: "INV-2024-01-EL", customerId: "CUST-001", month: "January 2024", amount: 45.00, paid: true, dueDate: "2024-02-15", type: "electricity" },
    { id: "INV-2024-02-EL", customerId: "CUST-001", month: "February 2024", amount: 42.00, paid: true, dueDate: "2024-03-15", type: "electricity" },
    { id: "INV-2024-03-EL", customerId: "CUST-001", month: "March 2024", amount: 38.00, paid: true, dueDate: "2024-04-15", type: "electricity" },
    { id: "INV-2024-04-EL", customerId: "CUST-001", month: "April 2024", amount: 36.00, paid: true, dueDate: "2024-05-15", type: "electricity" },
    { id: "INV-2024-05-EL", customerId: "CUST-001", month: "May 2024", amount: 34.00, paid: true, dueDate: "2024-06-15", type: "electricity" },
    { id: "INV-2024-06-EL", customerId: "CUST-001", month: "June 2024", amount: 40.00, paid: false, dueDate: "2024-07-15", type: "electricity" },
  ];

  for (const inv of invoices) {
    await prisma.invoice.create({ data: inv });
  }

  // Rewards for Anna
  const rewards = [
    { id: "REW-001", customerId: "CUST-001", title: "Coffee at Kaffeehaus Halle", description: "Free coffee at any participating café", points: 50, category: "coffee", claimed: false, expiresAt: "2024-12-31" },
    { id: "REW-002", customerId: "CUST-001", title: "Händel Museum Tickets", description: "2-for-1 entry to the Händel Museum", points: 120, category: "museum", claimed: false, expiresAt: "2024-10-31" },
    { id: "REW-003", customerId: "CUST-001", title: "Havelinn Card Top-Up", description: "€10 credit for public transport", points: 80, category: "transport", claimed: false, expiresAt: "2024-11-30" },
    { id: "REW-004", customerId: "CUST-001", title: "Dinner at Mexti", description: "15% off your meal at Mexti Restaurant", points: 200, category: "restaurant", claimed: false, expiresAt: "2024-12-31" },
    { id: "REW-005", customerId: "CUST-001", title: "Tree Planted in Your Name", description: "EVH plants a tree in Halles Stadtpark", points: 30, category: "green", claimed: false, expiresAt: "2025-01-01" },
    { id: "REW-006", customerId: "CUST-001", title: "Saale Cycle Tour Voucher", description: "Free bike rental for a day along the Saale", points: 150, category: "green", claimed: false, expiresAt: "2024-09-30" },
    { id: "REW-007", customerId: "CUST-001", title: "Südpark BBQ Set", description: "EVH picnic package for the Südpark", points: 100, category: "restaurant", claimed: false, expiresAt: "2024-08-31" },
    { id: "REW-008", customerId: "CUST-001", title: "Peissnitzburg Visit", description: "Free entry to the Peissnitzburg leisure park", points: 90, category: "museum", claimed: true, expiresAt: "2024-07-31" },
  ];

  for (const r of rewards) {
    await prisma.reward.create({ data: r });
  }

  // Usage records
  const usageMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const usageData = [
    { heating: 420, electricity: 180, temperature: -1 },
    { heating: 380, electricity: 165, temperature: 1 },
    { heating: 320, electricity: 155, temperature: 5 },
    { heating: 240, electricity: 150, temperature: 10 },
    { heating: 150, electricity: 145, temperature: 15 },
    { heating: 80, electricity: 160, temperature: 19 },
    { heating: 45, electricity: 200, temperature: 22 },
    { heating: 40, electricity: 195, temperature: 21 },
    { heating: 90, electricity: 155, temperature: 17 },
    { heating: 200, electricity: 150, temperature: 11 },
    { heating: 310, electricity: 160, temperature: 5 },
    { heating: 400, electricity: 175, temperature: 1 },
  ];

  for (let i = 0; i < usageMonths.length; i++) {
    await prisma.usageRecord.create({
      data: {
        id: `USG-CUST-001-${String(i + 1).padStart(2, "0")}`,
        customerId: "CUST-001",
        month: usageMonths[i],
        heating: usageData[i].heating,
        electricity: usageData[i].electricity,
        temperature: usageData[i].temperature,
      },
    });
  }

  // Community events
  const events = [
    { id: "EVT-001", title: "Halle Clean-Up Day", date: "2024-07-15", location: "Stadtpark Halle", type: "volunteer", participants: 234, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
    { id: "EVT-002", title: "Energy Workshop: District Heating", date: "2024-07-22", location: "EVH Kundencenter", type: "workshop", participants: 45, image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop" },
    { id: "EVT-003", title: "Tree Planting at Heidesee", date: "2024-08-05", location: "Heidesee", type: "volunteer", participants: 89, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop" },
    { id: "EVT-004", title: "Halle Night of Energy", date: "2024-08-20", location: "Marktplatz Halle", type: "event", participants: 1200, image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop" },
    { id: "EVT-005", title: "School Energy Education Day", date: "2024-09-02", location: "Grundschule Frohe Zukunft", type: "workshop", participants: 60, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop" },
    { id: "EVT-006", title: "Saaleufer Clean & Green", date: "2024-09-12", location: "Saaleufer", type: "volunteer", participants: 156, image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop" },
  ];

  for (const e of events) {
    await prisma.communityEvent.create({ data: e });
  }

  // Neighbourhoods
  const neighbourhoods = [
    { id: "N-01", name: "Innenstadt", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 12450, homesConnected: 8400, renewablePercentage: 65, communityProjects: 12 },
    { id: "N-02", name: "Altstadt", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 8900, homesConnected: 5200, renewablePercentage: 58, communityProjects: 8 },
    { id: "N-03", name: "Frohe Zukunft", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 7200, homesConnected: 3800, renewablePercentage: 72, communityProjects: 5 },
    { id: "N-04", name: "Heide-Nord", districtHeating: false, expansionPlanned: true, expansionYear: "2025", carbonSaved: 3400, homesConnected: 1200, renewablePercentage: 45, communityProjects: 3 },
    { id: "N-05", name: "Freiimfelde", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 5600, homesConnected: 2900, renewablePercentage: 61, communityProjects: 6 },
    { id: "N-06", name: "Südstadt", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 9800, homesConnected: 6100, renewablePercentage: 55, communityProjects: 9 },
    { id: "N-07", name: "Dautzsch", districtHeating: false, expansionPlanned: true, expansionYear: "2025", carbonSaved: 2100, homesConnected: 800, renewablePercentage: 38, communityProjects: 2 },
    { id: "N-08", name: "Trotha", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 4800, homesConnected: 2600, renewablePercentage: 59, communityProjects: 4 },
    { id: "N-09", name: "Neustadt", districtHeating: true, expansionPlanned: true, expansionYear: "2024", carbonSaved: 15200, homesConnected: 9500, renewablePercentage: 68, communityProjects: 15 },
    { id: "N-10", name: "Kröllwitz", districtHeating: false, expansionPlanned: true, expansionYear: "2026", carbonSaved: 1800, homesConnected: 600, renewablePercentage: 42, communityProjects: 2 },
  ];

  for (const n of neighbourhoods) {
    await prisma.neighbourhood.create({ data: n });
  }

  // Sustainability
  await prisma.sustainability.create({
    data: { id: "SUS-001", co2Saved: 84700, renewableGeneration: 186, districtHeatingAdoption: 64, homesConnected: 42000, futureTarget: 95000, treesEquivalent: 125000 },
  });

  // Weather
  await prisma.weatherRecord.create({
    data: { id: "WEA-001", temperature: 6, condition: "Cloudy", humidity: 72, windSpeed: 14 },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

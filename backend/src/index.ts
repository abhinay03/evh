import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Auth
app.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;
  const customer = await prisma.customer.findUnique({ where: { email } });
  if (!customer || customer.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const { password: _, ...safeCustomer } = customer;
  res.json({ customer: safeCustomer, token: "mock-jwt-token" });
});

// Dashboard
app.get("/api/dashboard", async (req, res) => {
  const customerId = (req.query.customerId as string) || "CUST-001";
  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  const usage = await prisma.usageRecord.findMany({ where: { customerId } });
  const invoices = await prisma.invoice.findMany({ where: { customerId } });
  const weather = await prisma.weatherRecord.findFirst();
  const totalSavings = invoices.reduce((sum, inv) => sum + (inv.paid ? 0 : inv.amount), 0);

  res.json({
    customer,
    usage,
    weather,
    totalSavings,
    currentMonthUsage: usage[usage.length - 1],
    lastYearComparison: -12,
    energyScore: 82,
    rewards: await prisma.reward.findMany({ where: { customerId, claimed: false } }),
  });
});

// Heating
app.get("/api/heating", async (req, res) => {
  const customerId = (req.query.customerId as string) || "CUST-001";
  const usage = await prisma.usageRecord.findMany({ where: { customerId } });
  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  
  res.json({
    usage,
    efficiency: 82,
    monthlyComparison: -8,
    schedule: [
      { time: "05:30", temp: 20 },
      { time: "08:00", temp: 18 },
      { time: "16:00", temp: 21 },
      { time: "22:00", temp: 17 },
    ],
    maintenance: [
      { date: "2024-03-15", type: "Annual inspection", status: "completed" },
      { date: "2024-09-20", type: "Filter replacement", status: "scheduled" },
    ],
    districtAvailable: customer?.heatingType === "district" || false,
    expansionInfo: customer?.district ? { district: customer.district, planned: false } : null,
    recommendations: [
      "Schedule a smart thermostat installation to save up to 12%",
      "Your heating efficiency peaks between 16:00-20:00",
      "Consider lowering night temperature by 1°C to save €35/year",
    ],
  });
});

// Electricity
app.get("/api/electricity", async (req, res) => {
  const customerId = (req.query.customerId as string) || "CUST-001";
  const usage = await prisma.usageRecord.findMany({ where: { customerId } });
  const customer = await prisma.customer.findUnique({ where: { id: customerId } });

  res.json({
    usage,
    hasSolar: customer?.hasSolar || false,
    hasEvCharger: customer?.hasEvCharger || false,
    peakHours: { start: "17:00", end: "21:00" },
    recommendations: [
      "Shift laundry and dishwasher to after 21:00 to save on peak rates",
      "Your base load seems higher than average — check for standby devices",
      "Green energy mix: 100% renewable from EVH",
    ],
  });
});

// Bills
app.get("/api/bills", async (req, res) => {
  const customerId = (req.query.customerId as string) || "CUST-001";
  const invoices = await prisma.invoice.findMany({
    where: { customerId },
    orderBy: { month: "desc" },
  });

  const totalPaid = invoices.filter((i) => i.paid).reduce((s, i) => s + i.amount, 0);
  const totalDue = invoices.filter((i) => !i.paid).reduce((s, i) => s + i.amount, 0);

  res.json({ invoices, totalPaid, totalDue });
});

// Rewards
app.get("/api/rewards", async (req, res) => {
  const customerId = (req.query.customerId as string) || "CUST-001";
  const rewards = await prisma.reward.findMany({ where: { customerId } });
  const totalPoints = rewards.filter((r) => !r.claimed).reduce((s, r) => s + r.points, 0);

  res.json({ rewards, totalPoints, claimedCount: rewards.filter((r) => r.claimed).length });
});

// Community
app.get("/api/community", async (req, res) => {
  const events = await prisma.communityEvent.findMany({
    orderBy: { date: "asc" },
  });
  const neighbourhoods = await prisma.neighbourhood.findMany();

  res.json({ events, neighbourhoods });
});

// Sustainability
app.get("/api/sustainability", async (req, res) => {
  const data = await prisma.sustainability.findFirst();
  res.json(data);
});

// Weather
app.get("/api/weather", async (req, res) => {
  const weather = await prisma.weatherRecord.findFirst();
  res.json({
    ...weather,
    forecast: [
      { day: "Tomorrow", temp: 8, condition: "Partly Cloudy" },
      { day: "Wed", temp: 5, condition: "Rain" },
      { day: "Thu", temp: 4, condition: "Cloudy" },
      { day: "Fri", temp: 7, condition: "Sunny" },
    ],
  });
});

// Customer profile
app.get("/api/customer", async (req, res) => {
  const customerId = (req.query.customerId as string) || "CUST-001";
  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) return res.status(404).json({ message: "Customer not found" });
  const { password: _, ...safeCustomer } = customer;
  res.json(safeCustomer);
});

app.listen(PORT, () => {
  console.log(`🚀 EVH Backend running on http://localhost:${PORT}`);
});

import { NextResponse } from "next/server";
import { customers, usageData, invoices, rewards, weatherData } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId") || "CUST-001";
  
  const customer = customers.find((c) => c.id === customerId);
  if (!customer) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const customerInvoices = invoices.filter((i) => i.customerId === customerId);
  const totalSavings = customerInvoices.filter((i) => i.paid).reduce((s, i) => s + i.amount, 0);
  
  return NextResponse.json({
    customer,
    usage: usageData,
    weather: weatherData,
    totalSavings,
    currentMonthUsage: usageData[usageData.length - 1],
    lastYearComparison: -12,
    energyScore: 82,
    rewards: rewards.filter((r) => r.customerId === customerId && !r.claimed),
    neighbourhoodRank: 3,
  });
}

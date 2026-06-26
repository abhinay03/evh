import { NextResponse } from "next/server";
import { usageData, customers } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId") || "CUST-001";
  const customer = customers.find((c) => c.id === customerId);

  return NextResponse.json({
    usage: usageData,
    efficiency: 82,
    monthlyComparison: -8,
    schedule: [
      { time: "05:30", temp: 20, label: "Wake up" },
      { time: "08:00", temp: 18, label: "Away" },
      { time: "16:00", temp: 21, label: "Evening" },
      { time: "22:00", temp: 17, label: "Night" },
    ],
    maintenance: [
      { date: "2024-03-15", type: "Annual inspection", status: "completed" },
      { date: "2024-09-20", type: "Filter replacement", status: "scheduled" },
    ],
    districtAvailable: customer?.heatingType === "district" || false,
    recommendations: [
      "Schedule a smart thermostat installation to save up to 12%",
      "Your heating efficiency peaks between 16:00-20:00",
      "Consider lowering night temperature by 1°C to save €35/year",
    ],
  });
}

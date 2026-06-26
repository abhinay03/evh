import { NextResponse } from "next/server";
import { usageData, customers } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId") || "CUST-001";
  const customer = customers.find((c) => c.id === customerId);

  return NextResponse.json({
    usage: usageData,
    hasSolar: customer?.hasSolar || false,
    hasEvCharger: customer?.hasEvCharger || false,
    peakHours: { start: "17:00", end: "21:00" },
    recommendations: [
      "Shift laundry and dishwasher to after 21:00 to save on peak rates",
      "Your base load seems higher than average — check for standby devices",
      "Green energy mix: 100% renewable from EVH",
    ],
  });
}

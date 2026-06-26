import { NextResponse } from "next/server";
import { rewards } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId") || "CUST-001";

  const customerRewards = rewards.filter((r) => r.customerId === customerId);
  const totalPoints = customerRewards.filter((r) => !r.claimed).reduce((s, r) => s + r.points, 0);
  const claimedCount = customerRewards.filter((r) => r.claimed).length;

  return NextResponse.json({ rewards: customerRewards, totalPoints, claimedCount });
}

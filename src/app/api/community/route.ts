import { NextResponse } from "next/server";
import { communityEvents, neighbourhoods } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    events: communityEvents,
    neighbourhoods,
  });
}

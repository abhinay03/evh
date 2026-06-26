import { NextResponse } from "next/server";
import { sustainabilityData } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(sustainabilityData);
}

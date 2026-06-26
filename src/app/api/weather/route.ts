import { NextResponse } from "next/server";
import { weatherData } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(weatherData);
}

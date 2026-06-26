import { NextResponse } from "next/server";
import { customers } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId") || "CUST-001";

  const customer = customers.find((c) => c.id === customerId);
  if (!customer) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const { password: _, ...safeCustomer } = customer;
  return NextResponse.json(safeCustomer);
}

import { NextResponse } from "next/server";
import { customers } from "@/lib/mock-data";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const customer = customers.find((c) => c.email === email && c.password === password);
  
  if (!customer) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const { password: _, ...safeCustomer } = customer;
  return NextResponse.json({ customer: safeCustomer, token: "mock-jwt-token" });
}

export async function GET() {
  return NextResponse.json({ authenticated: false });
}

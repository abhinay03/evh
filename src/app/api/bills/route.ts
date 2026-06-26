import { NextResponse } from "next/server";
import { invoices } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId") || "CUST-001";

  const customerInvoices = invoices
    .filter((i) => i.customerId === customerId)
    .sort((a, b) => b.month.localeCompare(a.month));

  const totalPaid = customerInvoices.filter((i) => i.paid).reduce((s, i) => s + i.amount, 0);
  const totalDue = customerInvoices.filter((i) => !i.paid).reduce((s, i) => s + i.amount, 0);

  return NextResponse.json({ invoices: customerInvoices, totalPaid, totalDue });
}

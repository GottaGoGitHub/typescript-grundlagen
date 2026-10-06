import { readFile } from "node:fs/promises"
import type { Order, Status } from "./types.js"

const ordersJSON = process.argv[2];

if(!ordersJSON){
    console.error("Aufruf: npx tsx cli.ts <datei.json>")
    process.exit(1);
}

let orders: Order[];

try {
  const content = await readFile(ordersJSON, "utf-8");
  const data = JSON.parse(content);
  if(!Array.isArray(data)){
    throw new Error(`Parsing Fehler. Datei ist kein Array`);
  }
  orders = data;
} catch (error) {
  if (error instanceof Error) {
    console.error("Fehler:", error.message);
  }
  process.exit(1);
}

if (orders.length === 0) {
  console.log("Keine Bestellungen in der Datei.");
  process.exit(0);
}

function describeStatus(status: Status): string {
  switch (status) {
    case "paid":
      return "Order ist bezahlt";
    case "open":
      return "Order ist noch nicht bezahlt";
    case "cancelled":
      return "Order wurde storniert";
  }
}

const countByStatus = orders.reduce<Record<Status, number>>((acc, order) => {
  const statusAmount = acc[order.status] + 1;
  return {...acc, [order.status]: statusAmount};
}, {paid: 0, open: 0, cancelled: 0});

function sumBy<T>(items: T[], getValue: (item: T) => number): number{
    const total = items.reduce((sum, item) => sum + getValue(item), 0);
    return total;
}

const paidOrders = orders.filter((order) => order.status === "paid");

const revenuePerCustomer = paidOrders.reduce<Record<string, number>>((acc, order) => {
  const newTotal = (acc[order.customer] ?? 0) + order.total;
  return {...acc, [order.customer]: newTotal};
}, {}); 

const maxOrder = paidOrders.reduce((best, order) => {
    return best.total > order.total ? best : order;
});

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const statuses: Status[] = ["paid", "open", "cancelled"];

console.log("=== Bestellbericht ===");
console.log(`Bestellungen gesamt: ${orders.length}`);

console.log("\nNach Status:");
for (const status of statuses) {
  console.log(`  ${describeStatus(status)}: ${countByStatus[status]}`);
}

console.log(`\nUmsatz (bezahlt): ${euro.format(sumBy(paidOrders, (o) => o.total))}`);

console.log("\nUmsatz pro Kunde:");
for (const [customer, revenue] of Object.entries(revenuePerCustomer)) {
  console.log(`  ${customer}: ${euro.format(revenue)}`);
}

console.log(`\nTeuerste Bestellung: #${maxOrder.id} (${maxOrder.customer}, ${euro.format(maxOrder.total)})`);
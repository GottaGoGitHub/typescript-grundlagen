type Status = "paid" | "open" | "cancelled";

interface Order {
  id: number;
  customer: string;
  total: number;
  status: Status;
  note?: string;
}

const orders: Order[] = [
  { id: 1, customer: "Anna", total: 49.9, status: "paid" },
  { id: 2, customer: "Ben", total: 15.0, status: "open" },
  { id: 3, customer: "Anna", total: 120.5, status: "paid" },
  { id: 4, customer: "Cem", total: 80.0, status: "cancelled" },
  { id: 5, customer: "Ben", total: 33.3, status: "paid" },
];

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

function sumBy<T>(items: T[], getValue: (item: T) => number): number{
    const total = items.reduce((sum, item) => sum + getValue(item), 0);
    return total;
}

const countByStatus = orders.reduce<Record<Status, number>>((acc, order) => {
  const statusAmount = acc[order.status] + 1;
  return {...acc, [order.status]: statusAmount};
}, {paid: 0, open: 0, cancelled: 0});
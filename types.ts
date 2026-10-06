export type Status = "paid" | "open" | "cancelled";

export interface Order {
  id: number;
  customer: string;
  total: number;
  status: Status;
  note?: string;
}
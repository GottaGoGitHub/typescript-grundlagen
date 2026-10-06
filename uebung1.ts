import {orders} from "./daten.js";
// Aufgabe 1
const paidOrders = orders.filter((order) => order.status === "paid");

// Aufgabe 2
const customerNames = orders.map((order) => order.customer);
const uniqueNames = new Set(customerNames);
const nameList = [...uniqueNames];

//Aufgabe 3
const orderTotal = paidOrders.reduce((sum, order) => sum + order.total, 0);

//Aufgabe 4
//filtern nach bezahlten bestellungen: paidorders in Aufgabe1 definiert
const revenuePerCustomer = paidOrders.reduce<Record<string, number>>((acc, order) => {
  const newTotal = (acc[order.customer] ?? 0) + order.total;
  return {...acc, [order.customer]: newTotal};
}, {}); 

//Aufgabe 5
//Approach 1: absteigend sortieren und erste bestellung ausgeben
const sorted = [...orders].sort((a, b) => b.total - a.total)

//Approach 2: reduce
const maxOrder = orders.reduce((best, order) => {
    return best.total > order.total ? best : order;
});

//Results
console.log("Task 1:\n" , paidOrders);
console.log("Task 2:\n" , nameList);
console.log("Task 3:\n" , orderTotal);
console.log("Task 4:\n" , revenuePerCustomer);
console.log("Task 5a:\n" , sorted[0]);
console.log("Task 5b:\n", maxOrder);
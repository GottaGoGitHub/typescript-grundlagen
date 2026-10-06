const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function loadUser(id: number): Promise<{ id: number; name: string }> {
  await wait(500);
  if (id <= 0) throw new Error("Ungültige ID");
  return { id, name: `User ${id}` };
}

try {
    const users = await Promise.all([loadUser(1), loadUser(2), loadUser(-1)]);
    console.log(users);
}   catch (error) {
    if (error instanceof Error) {
    console.log("Fehler:", error.message);
  }
}


const results = await Promise.allSettled([loadUser(1), loadUser(2), loadUser(-1)]);
const okUsers = results.filter((user) => user.status === "fulfilled").map((user) => user.value);
console.log(okUsers);
const errors = results.filter((user) => user.status === "rejected").map((user) => user.reason);
console.log(errors);

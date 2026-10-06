interface User{
    id: number;
    name: string;
    email: string;
}

try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if(!response.ok) {
        throw new Error(`HTTP-Fehler: ${response.status}`);
    }
    const users: User[] = await response.json();
    const myUsers = users.map((user) => ({name: user.name, email: user.email }));
    console.table(myUsers);
} catch (error) {
    if (error instanceof Error) {
    console.log("Fehler:", error.message);
  }
}
import app from "./app";
import connect from "./database";

app.listen(3000);
connect();
console.log("server on port ", 3000);

import app from "./app";
import connect from "./dataBase";

connect();

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

import app from "./app";
import connectToDB from "./config/database";

const port = process.env.PORT || 3000;

connectToDB()
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

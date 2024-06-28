import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import brandRoutes from "./routes/brandRoutes";
import modelRoutes from "./routes/modelRoutes";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/brands", brandRoutes);
app.use("/models", modelRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;

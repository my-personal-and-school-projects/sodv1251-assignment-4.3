import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = express();

// Serve static assets in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(process.cwd(), "frontend", "public")));
  app.use("/src", express.static(path.join(process.cwd(), "frontend", "src")));
  app.use(
    "/components",
    express.static(path.join(process.cwd(), "frontend", "src", "components"))
  );
}

// Listen on port 5003
const PORT = process.env.PORT || 5003;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

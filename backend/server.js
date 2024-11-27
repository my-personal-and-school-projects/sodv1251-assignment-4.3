import express from "express";
import dotenv from "dotenv";
import path from "path";
import mssql from "mssql";

dotenv.config();
const app = express();
app.use(express.json());

//create configuration for MSSQL
const configMssql = {
  user: process.env.MSSQL_USER_NAME,
  password: process.env.MSSQL_PASSWORD,
  database: "BVC_Airlines_DB",
  server: "localhost",
  options: {
    encrypt: false,
    trustedconnection: true,
    enableArithAbort: true,
  },
};

const poolPromise = mssql.connect(configMssql);

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

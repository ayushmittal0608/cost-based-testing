import express from "express";
import cors from "cors";
import { CostExplorerClient, GetCostAndUsageCommand } from "@aws-sdk/client-cost-explorer";

const app = express();
app.use(cors({
    origin: "https://effective-space-happiness-v4p75q79jg6cxg6-3001.app.github.dev/",  // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://effective-space-happiness-v4p75q79jg6cxg6-3000.app.github.dev");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

const client = new CostExplorerClient({ region: "us-east-1" });

app.get("/", (req, res) => {
    res.send("Backend is running!"); // Handle requests to '/'
});

app.get("/api/cost-data", async (req, res) => {
    try {
        const params = {
            TimePeriod: { Start: "2024-05-01", End: "2024-05-31" },
            Granularity: "MONTHLY",
            Metrics: ["UnblendedCost", "UsageQuantity"],
            GroupBy: [{ Type: "DIMENSION", Key: "SERVICE" }]
        };
        const command = new GetCostAndUsageCommand(params);
        const data = await client.send(command);
        res.json(data.ResultsByTime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));

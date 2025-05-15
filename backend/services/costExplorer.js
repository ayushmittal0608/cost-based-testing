import { CostExplorerClient, GetCostAndUsageCommand } from "@aws-sdk/client-cost-explorer";

const client = new CostExplorerClient({ region: "us-east-1" });

async function getCostData() {
    try {
        const params = {
            TimePeriod: { Start: "2024-05-01", End: "2024-05-31" },
            Granularity: "MONTHLY",
            Metrics: ["UnblendedCost", "UsageQuantity"],
            GroupBy: [{ Type: "DIMENSION", Key: "SERVICE" }]
        };

        const command = new GetCostAndUsageCommand(params);
        const data = await client.send(command);

        console.log("Cost Data:", JSON.stringify(data.ResultsByTime, null, 2));
    } catch (error) {
        console.error("Error fetching cost data:", error);
    }
}

getCostData();

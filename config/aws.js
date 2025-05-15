import { CostExplorerClient } from "@aws-sdk/client-cost-explorer";

try {
    const client = new CostExplorerClient({
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    });

    console.log("Client information fetched");
} catch (error) {
    console.error("Error creating Cost Explorer client:", error);
}


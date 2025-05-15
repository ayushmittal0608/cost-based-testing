import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function CostChart() {
    const [costData, setCostData] = useState([]);

    useEffect(() => {
    fetch("https://effective-space-happiness-v4p75q79jg6cxg6-5000.app.github.dev/api/cost-data", {
    mode: "cors",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }
})
    .then(response => response.json())
    .then(data => setCostData(data))
    .catch(error => console.error("Error fetching data:", error));
}, []);

    const chartData = {
        labels: costData.map(entry => entry.TimePeriod.Start),
        datasets: [
            {
                label: "AWS Cost",
                data: costData.map(entry => entry.Total.Amount),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 0.2
            }
        ]
    };

    return <Line data={chartData} />;
}

export default CostChart;

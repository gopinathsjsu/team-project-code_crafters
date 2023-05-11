import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const generateActivityData = (length, maxDataValue, backgroundColor, borderColor, borderWidth) => {
    return {
        data: Array.from({ length }, () => Math.floor(Math.random() * maxDataValue)),
        backgroundColor,
        borderColor,
        borderWidth,
    };
};

const Activities = ({ userName }) => {
    const [timeRange, setTimeRange] = useState("week");

    const getLabels = () => {
        switch (timeRange) {
            case "week":
                return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            case "month":
                return Array.from({ length: 30 }, (_, i) => i + 1);
            case "90days":
                return Array.from({ length: 90 }, (_, i) => `Day ${i + 1}`);
            default:
                return [];
        }
    };

    const treadmillData = generateActivityData(
        getLabels().length,
        60,
        "rgba(54, 162, 235, 0.2)",
        "rgba(54, 162, 235, 1)",
        1
    );

    const cyclingData = generateActivityData(
        getLabels().length,
        120,
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 99, 132, 1)",
        1
    );

    const chartData = {
        labels: getLabels(),
        datasets: [
            {
                label: "Treadmill",
                ...treadmillData,
            },
            {
                label: "Cycling",
                ...cyclingData,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `${userName}'s Recent Activity Graph`,
                font: { size: 20 },
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    font: { size: 16 },
                },
            },
        },
    };

    return (
        <div>
            <div>
                <label>
                    <input
                        type="radio"
                        name="time-range"
                        value="week"
                        checked={timeRange === "week"}
                        onChange={() => setTimeRange("week")}
                    />
                    Past Week
                </label>
                <label>
                    <input
                        type="radio"
                        name="time-range"
                        value="month"
                        checked={timeRange === "month"}
                        onChange={() => setTimeRange("month")}
                    />
                    Past Month
                </label>
                <label>
                    <input
                        type="radio"
                        name="time-range"
                        value="90days"
                        checked={timeRange === "90days"}
                        onChange={() => setTimeRange("90days")}
                    />
                    Last 90 Days
                </label>
            </div>
            <div style={{ width: "800px", height: "400px" }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default Activities;


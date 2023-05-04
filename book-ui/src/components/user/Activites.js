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

const Activities = () => {
    const [timeRange, setTimeRange] = useState("hour");

    const runningData = generateActivityData(
        24,
        60,
        "rgba(54, 162, 235, 0.2)",
        "rgba(54, 162, 235, 1)",
        1
    );

    const weightLiftingData = generateActivityData(
        24,
        120,
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 99, 132, 1)",
        1
    );

    const swimmingData = generateActivityData(
        24,
        180,
        "rgba(255, 206, 86, 0.2)",
        "rgba(255, 206, 86, 1)",
        1
    );

    const chartData = {
        labels:
            timeRange === "week"
                ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                : timeRange === "day"
                    ? Array.from({ length: 24 }, (_, i) => i + 1)
                    : Array.from({ length: 7 }, (_, i) => `Wk ${i + 1}`),
        datasets: [
            {
                label: "Running Time on Treadmill",
                ...runningData,
            },
            {
                label: "Weight Lifting Session",
                ...weightLiftingData,
            },
            {
                label: "Swimming",
                ...swimmingData,
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
                text: "Activity Graph",
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
                        value="hour"
                        checked={timeRange === "hour"}
                        onChange={() => setTimeRange("hour")}
                    />
                    Hourly
                </label>
                <label>
                    <input
                        type="radio"
                        name="time-range"
                        value="day"
                        checked={timeRange === "day"}
                        onChange={() => setTimeRange("day")}
                    />
                    Daily
                </label>
                <label>
                    <input
                        type="radio"
                        name="time-range"
                        value="week"
                        checked={timeRange === "week"}
                        onChange={() => setTimeRange("week")}
                    />
                    Weekly
                </label>
            </div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default Activities;

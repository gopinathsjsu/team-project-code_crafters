import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import {config} from "../../Constants";
import AuthContext from "../context/AuthContext";
Chart.register({ id: 'category', type: 'category', ticks: { align: 'center' } });
// const dataByDay = {
//     labels: ['1', '2', '3', '4', '5', '6', '7'],
//     datasets: [
//         {
//             label: 'Number of visitors by the hour (by day)',
//             data: [20, 10, 30, 15, 25, 20, 30],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//         },
//     ],
// };
//
// const dataByWeekday = {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//     datasets: [
//         {
//             label: 'Number of visitors by the hour (by weekday)',
//             data: [40, 30, 20, 25, 35],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//         },
//     ],
// };
//
// const dataByWeekend = {
//     labels: ['Saturday', 'Sunday'],
//     datasets: [
//         {
//             label: 'Number of visitors by the hour (by weekend)',
//             data: [45, 50],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//         },
//     ],
// };
const dataByDay = { labels: [], datasets: [] };
const dataByWeekday = { labels: [], datasets: [] };
const dataByWeekend = { labels: [], datasets: [] };

const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})

function basicAuth(user) {
    if (user) {
        return `Basic ${user.authdata}`;
    }
    return null;
}

class LineChartForClassesAndEnrollment extends Component {

    static contextType = AuthContext
    constructor(props) {
        super(props);
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        const endDate = new Date();
        this.state = {
            selectedOption: 'byDay',
            chartData: dataByDay,
            startDateForClasses: startDate,

            endDateForClasses:endDate,
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            type: 'category',
                            labels: [],
                        },
                    ],
                },
            },
        };
    }

    getData(){
        const Auth = this.context
        const user = Auth.getUser()
        const startDatee = this.state.startDateForClasses.toISOString().substr(0, 10);
        const endDatee = this.state.endDateForClasses.toISOString().substr(0, 10);
        const data = { startDate: startDatee , endDate: endDatee}
        instance.post('/api/classes/data',data ,{
            headers: {'Content-type': 'application/json',
            'Authorization': basicAuth(user) }
        })
            .then(response => {
                // this.setState({
                //     chartData: {
                //         labels: response.data.dataByDay.labels, // update the labels here
                //         datasets: response.data.dataByDay.datasets
                //     },
                //     dataByDay: {
                //
                //         labels: response.data.dataByDay.labels, // update the labels here
                //         datasets: response.data.dataByDay.datasets
                //     },
                //     dataByWeekday: {
                //         labels: response.data.dataByWeekday.labels,
                //         datasets: response.data.dataByWeekday.datasets
                //     },
                //     dataByWeekend: {
                //         labels: response.data.dataByWeekend.labels,
                //         datasets: response.data.dataByWeekend.datasets
                //     },
                //     options: {
                //         scales: {
                //             yAxes: [
                //                 {
                //                     ticks: {
                //                         beginAtZero: true,
                //                     },
                //                 },
                //             ],
                //             xAxes: [{
                //                 type: 'category',
                //                 labels: response.data.dataByDay.labels,
                //             }]
                //         }
                //     }
                // });
            })
            .catch(error => console.log(error));
    }
    componentDidMount() {

        this.generateChartData()
    }

    generateChartData = () => {
        const value = this.state.selectedOption
        console.log(this.state.startDateForClasses)
        console.log(this.state.endDateForClasses)
        ///verfiy start end date
        this.getData()
        switch (value) {
            case 'byWeekday':
                // this.setState({
                //     chartData: {
                //         labels: this.state.dataByWeekday.labels,
                //         datasets: this.state.dataByWeekday.datasets
                //     },
                //     options: {
                //         scales: {
                //             yAxes: [
                //                 {
                //                     ticks: {
                //                         beginAtZero: true,
                //                     },
                //                 },
                //             ],
                //             xAxes: [{
                //                 type: 'category',
                //                 labels: this.state.dataByWeekday.labels,
                //             }]
                //         }
                //     }
                //
                // });
                break;

            case 'byWeekend':
                // this.setState({
                //     chartData: {
                //         labels: this.state.dataByWeekend.labels,
                //         datasets: this.state.dataByWeekend.datasets
                //     },
                //     options: {
                //         scales: {
                //             yAxes: [
                //                 {
                //                     ticks: {
                //                         beginAtZero: true,
                //                     },
                //                 },
                //             ],
                //             xAxes: [{
                //                 type: 'category',
                //                 labels: this.state.dataByWeekend.labels,
                //             }]
                //         }
                //     }
                //
                // });
                break;
            default:
                // this.setState({
                //     chartData: {
                //         labels: this.state.dataByDay.labels,
                //         datasets: this.state.dataByDay.datasets
                //     },
                //     options: {
                //         scales: {
                //             yAxes: [
                //                 {
                //                     ticks: {
                //                         beginAtZero: true,
                //                     },
                //                 },
                //             ],
                //             xAxes: [{
                //                 type: 'category',
                //                 labels: this.state.dataByDay.labels,
                //             }]
                //         }
                //     }
                //
                // });
                break;
        }
    };
    handleOptionChange = (event) => {
        this.setState(
            {

                selectedOption: event.target.value,
            },
            () => {
                this.generateChartData();
            }
        );
    };
    handleStartDateChange = (event) => {
        const v = event.target.value
        this.setState(
            {
                startDateForClasses: v ,
            },
            () => {
                this.generateChartData();
            }
        );
    };

    handleEndDateChange = (event) => {
        this.setState(
            {
                endDateForClasses: event.target.value,
            },
            () => {
                this.generateChartData();
            }
        );
    };
    render() {
        return (
            <div>
                <div>
                    <label htmlFor="selectOption">Select option: </label>
                    <select
                        id="selectOption"
                        value={this.state.selectedOption}
                        onChange={this.handleOptionChange}
                    >
                        <option value="byDay">By day</option>
                        <option value="byWeekday">By weekday</option>
                        <option value="byWeekend">By weekend</option>
                    </select>
                    <div>
                        <label htmlFor="startDate">Start Date: </label>
                        <input
                            type="date"
                            id="startDate"
                            value={this.state.startDateForClasses}
                            onChange={this.handleStartDateChange}
                        />
                        <label htmlFor="endDate">End Date: </label>
                        <input
                            type="date"
                            id="endDate"
                            value={this.state.endDateForClasses}
                            onChange={this.handleEndDateChange}
                        />
                    </div>
                </div>
                {this.state.chartData && <Line data={this.state.chartData} options={this.state.options} />}
            </div>
        );
    }
}

export default LineChartForClassesAndEnrollment;

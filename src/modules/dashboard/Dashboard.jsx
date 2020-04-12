import React, {Component} from 'react'
import PageLayout from '../../layout/PageLayout';
import {Row, Col} from 'antd'
import Chart from 'chart.js'

class Dashboard extends Component {
    componentDidMount(){
        var ctx = document.getElementById("myChart");
        var ctx2 = document.getElementById("myChart2");
        var ctx3 = document.getElementById("myChart3");
        new Chart(ctx, {
        type: 'bar',
            data: {
                labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
                datasets: [{
                    label: "Productos",
                    data: [120, 200, 150, 250, 300],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
        });
        new Chart(ctx2, {
            type: 'line',
                data: {
                    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
                    datasets: [{
                        label: "Productos",
                        data: [120, 200, 150, 250, 300],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
            });
            new Chart(ctx3, {
                type: 'pie',
                    data: {
                        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
                        datasets: [{
                            label: "Productos",
                            data: [120, 200, 150, 250, 300],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                });
    }
    render() {
        return (
            <PageLayout>
                <div>
                    <Row gutter={12}>
                        <Col span={24}>
                            <canvas id="myChart2" width="500" height="120"></canvas>
                        </Col>
                        <Col span={12}>
                            <canvas id="myChart" width="250" height="120"></canvas>
                        </Col>
                        <Col span={12}>
                            <canvas id="myChart3" width="250" height="120"></canvas>
                        </Col>
                    </Row>
                </div>
            </PageLayout>
        )
    }
}

export default Dashboard
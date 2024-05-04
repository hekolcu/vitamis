'use client';

import React, { useRef } from 'react';
import { ApexOptions } from 'apexcharts';
import { Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

interface VitaminGaugeChartProps {
    name: string;
    series: number;
}

export function VitaminGaugeChart({ name, series }: VitaminGaugeChartProps): React.JSX.Element {
    const chartRef = useRef(null);

    const chartOptions: ApexOptions = {
        chart: {
            type: "radialBar",
        },
        series: [series],
        colors: ["#ff8400"],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: '#fcecdc',
                    startAngle: -90,
                    endAngle: 90,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: "15px",
                        show: true
                    }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: ["#ffad54"],
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "butt"
        },
        labels: ["Progress"]
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'center', // This will center your chart and text horizontally
            justifyContent: 'center', // This will center your chart and text vertically
            padding: '18px', // You can adjust padding as needed
            boxShadow: 'none', // Ensures no shadow
        }}>
            <ReactApexChart options={chartOptions} series={chartOptions.series} type="radialBar" />
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>{name}</Typography>
        </div>
    );
};

'use client';

import React, { useRef } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { Card, CardHeader, CardContent, Stack, useTheme, Typography } from '@mui/material';
import { Chart } from '@/components/core/chart';
// import { margin } from '@mui/system';
import ReactApexChart from 'react-apexcharts';

interface VitaminGaugeChartProps {
    name: string;
    series: number;
}

export function VitaminGaugeChart({ name, series }: VitaminGaugeChartProps): React.JSX.Element {
    const chartRef = useRef(null);

    const chartOptions = {
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
        // <Card sx={{
        //     boxShadow: 'none', // Removes any shadow
        //     margin: 0,
        //     borderRadius: 0, // Removes border radius if you want sharp corners
        //     '&:before': { // Removes pseudo-elements that might cause a shadow
        //         display: 'none',
        //     }
        // }}>
        //     <CardContent >
        //         {/* <Chart height="100%" options={chartOptions} series={[10]} type="donut" width="100%" /> */}
        //         <ReactApexChart options={chartOptions} series={chartOptions.series} type="radialBar" />
        //         <Typography variant="body2" align="center" sx={{ mt: 1 }}>Vitamin A</Typography>
        //     </CardContent>
        // </Card>
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

function useChartOptions(): ApexOptions {
    const theme = useTheme();

    return {
        chart: { background: 'transparent' },
        colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
        dataLabels: { enabled: false },
        legend: { show: false },
        plotOptions: { pie: { expandOnClick: false } },
        states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
        stroke: { width: 0 },
        theme: { mode: theme.palette.mode },
        tooltip: { fillSeriesColor: false },
    };
}
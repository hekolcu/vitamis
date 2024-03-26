'use client';

import React, { useRef } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { Card, CardHeader, CardContent, Stack, useTheme } from '@mui/material';
import { Chart } from '@/components/core/chart';
// import { margin } from '@mui/system';
import ReactApexChart from 'react-apexcharts';

export function VitaminGaugeChart(): React.JSX.Element {
    const chartRef = useRef(null);

    const chartOptions = {
        chart: {
            height: 280,
            type: "radialBar",
        },
        series: [65],
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
                        fontSize: "30px",
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
        // <Card sx={{}}>
        //     <CardHeader title="Daily Intakes" />
        //     <CardContent sx={{ padding: '20px'}}>
        //         {/* <Chart height="100%" options={chartOptions} series={[10]} type="donut" width="100%" /> */}
        //         <div id="chart2">
        //             <ReactApexChart options={chartOptions} series={chartOptions.series} type="radialBar" height={280} />
        //         </div>
        //     </CardContent>
        // </Card>

        <div id="chart2">
            <ReactApexChart options={chartOptions} series={chartOptions.series} type="radialBar" height={280} />
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
export const lineChartOptions = {
    chart: {
        type: 'line',
    },
    yaxis: {
        labels: {
            style: {
                colors: '#00E396',
                fontSize: '12px',
                fontWeight: 600,
            },
        },
    },
    colors: ["#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0"],
    xaxis: {
        categories: ['01', '02', '03', '04', '05', '06'],
        labels: {
            style: {
                colors: '#cfcde4',
                fontSize: '12px',
            },
        },
    },
};

export const barChartOptions = {
    chart: {
        type: 'bar',
    },
    colors: ["#7367f0", "#7367f0", "#7367f0", "#7367f0"],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr'],
    },
};


export const areaChartOptions = {
    chart: {
        type: 'area',
    },
    colors: ["#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0"],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
};

export const radarChartOptions = {
    chart: {
        type: 'radar',
    },
    colors: ["#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0"],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
};

export const series = ({data}) => [
    {
        name: 'Sales',
        colors: ["#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0", "#7367f0"],
        data: data,
    },
];
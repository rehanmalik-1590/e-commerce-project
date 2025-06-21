import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu';
import OrderList from './OrderList';

const AdminDashboard = () => {
    // Dummy data since there's no backend
    const dummySales = { totalSales: 10234.56 };
    const dummyCustomers = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const dummyOrders = { totalOrders: 10 };
    const dummySalesDetail = [
        { _id: "2024-06-01", totalSales: 1200 },
        { _id: "2024-06-02", totalSales: 1800 },
        { _id: "2024-06-03", totalSales: 2100 },
    ];

    const [chartType, setChartType] = useState("donut");
    const [state, setState] = useState({
        options: {
            chart: { type: "donut" },
            tooltip: { theme: "dark" },
            colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0"],
            title: {
                text: "Sales Data",
                align: "center",
                style: { fontSize: '16px', fontWeight: 'bold' },
            },
            legend: { position: "bottom", horizontalAlign: "center" },
            xaxis: { categories: [] },
        },
        series: [],
    });

    useEffect(() => {
        if (dummySalesDetail.length > 0) {
            const formattedSalesData = dummySalesDetail.map((item) => {
                const date = new Date(item._id);
                const formattedDate = !isNaN(date)
                    ? date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                    : "Invalid Date";

                return {
                    label: formattedDate,
                    value: isNaN(item.totalSales) ? 0 : item.totalSales,
                };
            });

            if (chartType === "donut" || chartType === "pie") {
                setState((prevState) => ({
                    ...prevState,
                    options: {
                        ...prevState.options,
                        labels: formattedSalesData.map((item) => item.label),
                    },
                    series: formattedSalesData.map((item) => item.value),
                }));
            } else {
                setState((prevState) => ({
                    ...prevState,
                    options: {
                        ...prevState.options,
                        xaxis: {
                            ...prevState.options.xaxis,
                            categories: formattedSalesData.map((item) => item.label),
                        },
                    },
                    series: [
                        {
                            name: "Total Sales",
                            data: formattedSalesData.map((item) => item.value),
                        },
                    ],
                }));
            }
        }
    }, [chartType]);

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            options: {
                ...prevState.options,
                chart: {
                    ...prevState.options.chart,
                    type: chartType,
                },
            },
        }));
    }, [chartType]);

    return (
        <>
            <AdminMenu />
            <section className="ml-2 md:ml-8 lg:ml-16">
                <div className="w-full flex justify-center gap-6 flex-wrap mt-8">
                    <div className="shadow-md rounded-lg p-5 w-[18rem] text-center">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3 mx-auto">
                            $
                        </div>
                        <p className="mt-5">Sales</p>
                        <h1 className="text-xl font-bold">${dummySales.totalSales.toFixed(2)}</h1>
                    </div>
                    <div className="shadow-md rounded-lg p-5 w-[18rem] text-center">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3 mx-auto">
                            👥
                        </div>
                        <p className="mt-5">Customers</p>
                        <h1 className="text-xl font-bold">{dummyCustomers.length}</h1>
                    </div>
                    <div className="shadow-md rounded-lg p-5 w-[18rem] text-center">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3 mx-auto">
                            📦
                        </div>
                        <p className="mt-5">All Orders</p>
                        <h1 className="text-xl font-bold">{dummyOrders.totalOrders}</h1>
                    </div>
                </div>

                <div className="w-full flex justify-center mt-6">
                    <select
                        className="p-2 border rounded bg-gray-700 text-lg text-white"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                    >
                        <option value="donut">Donut</option>
                        <option value="pie">Pie</option>
                        <option value="area">Area</option>
                        <option value="radar">Radar</option>
                        <option value="scatter">Scatter</option>
                        <option value="heatmap">Heatmap</option>
                        <option value="bar">Bar</option>
                    </select>
                </div>

                <div className="w-full flex justify-center mt-12">
                    <div className="w-full md:w-[80%] lg:w-[70%] p-6 rounded-lg shadow-sm border">
                        <Chart
                            options={state.options}
                            series={state.series}
                            type={chartType}
                            height={350}
                        />
                    </div>
                </div>

                <div className="mt-12">
                    <OrderList />
                </div>
            </section>
        </>
    );
};

export default AdminDashboard;

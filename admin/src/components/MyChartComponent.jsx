import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, registerables } from 'chart.js';

ChartJS.register(...registerables);

const MyChartComponent = ({ data }) => {
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return; // Bỏ qua nếu không có dữ liệu

        const ctx = canvasRef.current.getContext('2d');

        // Hủy biểu đồ cũ nếu đã tồn tại
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new ChartJS(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => `${d._id.day}/${d._id.month}/${d._id.year}`),
                datasets: [{
                    label: 'Tổng doanh thu',
                    data: data.map(d => d.totalRevenue),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    fill: true,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Dọn dẹp
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={canvasRef}></canvas>;
};

export default React.memo(MyChartComponent);

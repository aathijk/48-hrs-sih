const ctx = document.getElementById('weatherChart').getContext('2d');

const weatherChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Temperature (°C)', 'Rainfall (%)', 'Soil Moisture (%)'],
        datasets: [{
            label: 'Weather Data',
            data: [28, 60, 75], // Example values
            backgroundColor: ['#ff7043', '#42a5f5', '#66bb6a'],
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.raw + (context.dataIndex === 0 ? ' °C' : ' %');
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

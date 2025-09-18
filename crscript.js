const ctx = document.getElementById('cropChart').getContext('2d');

const data = {
    labels: ['Water', 'Nutrients', 'Sunlight', 'Pest Resistance', 'Growth Rate'],
    datasets: [{
        label: 'Crop Health (%)',
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
    }]
};

const cropChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        scales: { y: { beginAtZero: true, max: 100 } },
        animation: { duration: 1500, easing: 'easeOutBounce' }
    }
});

const progress = [0, 0, 0, 0, 0];
const target = [80, 70, 90, 60, 85];
const labels = ['Water Level', 'Nutrients', 'Sunlight Exposure', 'Pest Resistance', 'Growth Rate'];
const detailList = document.querySelectorAll('#cropDetails li');
const statusText = document.getElementById('statusText');

let interval = setInterval(() => {
    let done = true;
    for (let i = 0; i < progress.length; i++) {
        if (progress[i] < target[i]) {
            progress[i] += Math.floor(Math.random() * 5) + 1;
            if (progress[i] > target[i]) progress[i] = target[i];
            done = false;
        }
        detailList[i].innerText = `${labels[i] }: ${ progress[i] } %`;
    }
    cropChart.data.datasets[0].data = progress;
    cropChart.update();

    if (done) {
        clearInterval(interval);
        statusText.innerText = "Analysis Complete! Crop is healthy 🌿";
    }
}, 300);

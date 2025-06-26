document.addEventListener('DOMContentLoaded', async () => {
  const ctx = document.getElementById('usageChart').getContext('2d');
  const summary = document.getElementById('summary');

  try {
    const response = await fetch("http://localhost:5000/report");
    const data = await response.json();

    // Separate by category
    const productive = data.filter(item => item.category === 'productive');
    const unproductive = data.filter(item => item.category === 'unproductive');

    const labels = [...new Set(data.map(item => item.website))];
    const productiveData = labels.map(label =>
      productive.find(item => item.website === label)?.totalTime || 0
    );
    const unproductiveData = labels.map(label =>
      unproductive.find(item => item.website === label)?.totalTime || 0
    );

    // Draw chart
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Productive (min)',
            data: productiveData,
            backgroundColor: 'rgba(0, 123, 255, 0.6)'
          },
          {
            label: 'Unproductive (min)',
            data: unproductiveData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Time (minutes)'
            }
          }
        }
      }
    });

    const totalProductive = productive.reduce((sum, item) => sum + Number(item.totalTime), 0);
    const totalUnproductive = unproductive.reduce((sum, item) => sum + Number(item.totalTime), 0);
    const total = totalProductive + totalUnproductive;

    summary.innerText = `In the last 7 days, you spent ${totalProductive.toFixed(0)} minutes on productive websites and ${totalUnproductive.toFixed(0)} minutes on unproductive ones (${total.toFixed(0)} minutes total).`;

  } catch (error) {
    console.error('Failed to fetch report:', error);
    summary.textContent = 'Error loading report. Make sure the backend is running.';
  }
});

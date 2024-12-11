let fullData = []; // Store the full dataset for filtering
let chart; // Store the Chart.js instance

// Function to filter data based on the selected range
function filterData(range) {
  const [start, end] = range.split('-');
  const filteredData = fullData.filter(d =>
    d.aircraft[0].toUpperCase() >= start && d.aircraft[0].toUpperCase() <= end
  );

  return {
    labels: filteredData.map(d => d.aircraft),
    data: filteredData.map(d => d.incidents),
  };
}

// Function to update the chart with filtered data
function updateChart(filtered) {
  chart.data.labels = filtered.labels;
  chart.data.datasets[0].data = filtered.data;
  chart.update();
}

// Fetch CSV data and initialize the chart
d3.csv('../../backend/processed-data/strike-data.csv')
  .then(data => {
    // Count incidents per aircraft type
    const aircraftCount = data.reduce((acc, item) => {
      const aircraftType = item.AIRCRAFT;
      if (aircraftType) {
        acc[aircraftType] = (acc[aircraftType] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert aircraftCount to an array and sort alphabetically
    fullData = Object.entries(aircraftCount)
      .map(([aircraft, incidents]) => ({ aircraft, incidents }))
      .sort((a, b) => a.aircraft.localeCompare(b.aircraft));

    // Initialize the chart with default range A-C
    const initialFiltered = filterData('A-C');

    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: initialFiltered.labels,
        datasets: [{
          label: 'Number of Incidents',
          data: initialFiltered.data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Add event listener for dropdown change
    document.getElementById('aircraftFilter').addEventListener('change', (e) => {
      const selectedRange = e.target.value;
      const filtered = filterData(selectedRange);
      updateChart(filtered);
    });
  })
  .catch(error => {
    console.error('Error loading or parsing CSV file:', error);
  });
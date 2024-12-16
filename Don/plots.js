const htmlID = "graphCanvas"
let fullData = []; // Store the full dataset for filtering
let chart; // Store the Chart.js instance

const chart1APIUrl = "http://127.0.0.1:5000/incidents_per_aircraft"

// Function to filter data based on the selected range
function filterData(range) {
  const [start, end] = range.split('-');
  const filteredData = fullData.filter(d =>
    d.aircraft[0].toUpperCase() >= start && d.aircraft[0].toUpperCase() <= end
  );

  return {
    labels: filteredData.map(d => d.aircraft),
    data: filteredData.map(d => d.count),
  };
}

// Function to update the chart with filtered data
function updateChart(filtered) {
  chart.data.labels = filtered.labels;
  chart.data.datasets[0].data = filtered.data;
  chart.update();
}

function populateGraph1(isDisplayed) {
  if (!isDisplayed) { return false; }

  // Getting Data Filters
  const selectedRange = document.getElementsByClassName("aircraftFilter")[0].value;

  d3.json(chart1APIUrl).then((data) => {
    fullData = data
    filteredData = filterData(selectedRange)
    updateChart(filteredData)
  });
}

// Fetch CSV data and initialize the chart
d3.json(chart1APIUrl).then((data) => {
  fullData = data

  // Initialize the chart with default range A-C
  const initialFiltered = filterData('A-C');

  const ctx = document.getElementsByClassName(htmlID)[0].getContext('2d');
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
      maintainAspectRatio: false,
      events : ['mousemove', 'mouseout', 'touchstart', 'touchmove'],
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Add event listener for dropdown change
  document.getElementsByClassName('aircraftFilter')[0].addEventListener('change', (e) => {
    const selectedRange = e.target.value;
    const filtered = filterData(selectedRange);
    updateChart(filtered);
  });
})
.catch(error => {
  console.error('Error loading or parsing CSV file:', error);
});
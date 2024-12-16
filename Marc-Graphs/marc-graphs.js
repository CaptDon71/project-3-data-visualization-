const graph2ApiEndpoint = "http://127.0.0.1:5000/graph_data/graph_2"

const container2 = document.getElementById("graph2");

let yData = [];

populateGraph2(true)

function populateGraph2(isDisplayed) {
    if (!isDisplayed) { return false; }

    const isActive = (container2.id == "graph-active")
    const htmlId = (isActive) ? "graph-active" : "graph2";

    d3.json(graph2ApiEndpoint).then((data) => {
        let xData = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        yData = []

        for (row of data) {
            yData.push(row["count"])
        };

        const dataWrapper = [{
            x : xData,
            y : yData,
            type : "line",
            mode: (isActive) ? 'lines+markers+text' : '',
            text : (isActive) ? yData : [],
            textposition : (isActive) ? 'bottom center' : ''
        }];

        const layout = {
            title : {
                text : "Seasonal Trends Of Bird Strikes By Month",
                font : {
                    font : 5
                }
            },
            margin : {
                l : 40,
                r : 40,
                t : 50,
                b : 50,
                pad : 0
            },
            paper_bgcolor : '#E5E1DA',
            plot_bgcolor : '#E5E1DA',
        };

        const config = {
            staticPlot: true, 
            displayModeBar: false,
            responsive : true
        };

        Plotly.newPlot(htmlId, dataWrapper, layout, config)
    })
}

function resizeGraph2(isDisplayed) {
    const isActive = (container2.id == "graph-active")
    const htmlId = (isActive) ? "graph-active" : "graph2";

    const updateLayout = {
        mode: (isActive) ? 'lines+markers+text' : '',
        text : (isActive) ? [yData] : [],
        textposition : (isActive) ? 'bottom center' : ''
    }

    Plotly.restyle(htmlId, updateLayout, [0])

    Plotly.Plots.resize(htmlId);
}
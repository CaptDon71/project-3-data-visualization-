const api_endpoint = "http://127.0.0.1:5000/grouped-bar-data"

const container1 = document.getElementById("graph3");

const graphId = "graph3"

const margin = { top: 20, right: 30, bottom: 50, left: 50 };

let isDisplayed = true;

populateGraph3(true)

function populateGraph3(isDisplayed) {
    if (!isDisplayed) { return false; }

    const isActive = (container1.id == "graph-active")
    const currentGraphId = (isActive) ? "graph-active" : graphId;

    d3.select(`#${currentGraphId}`).select("svg").remove();

    const graphElement = document.getElementById(currentGraphId)
    const containerHeight = graphElement.offsetHeight;
    const containerWidth = graphElement.offsetWidth;

    const height = containerHeight - margin.top - margin.bottom;
    const width = containerWidth - margin.left - margin.right;

    const svg = d3.select(`#${currentGraphId}`)
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    // Fetch data from Flask API
    d3.json(api_endpoint).then((data) => {
        console.log(data)
        // Filter out null values
        const filteredData = data.filter(d => d.damage_level && d.size && d.frequency !== null);
        const damageTotals = d3.rollup(
            filteredData,
            v => d3.sum(v, d => d.frequency), 
            d => d.damage_level
        );
        // Group data by damage level
        const groupedData = d3.group(filteredData, d => d.damage_level);
        const xOrder = ["Aircraft Destroyed", "Substantial Damage", "Minor Damage"];
        const x0 = d3.scaleBand()
            .domain(xOrder)
            .range([0, width])
            .padding(0.3);
        const x1 = d3.scaleBand()
            .domain(["Small", "Medium", "Large"])
            .range([0, x0.bandwidth()])
            .padding(0.05);
        const y = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.frequency)])
            .nice()
            .range([height, 0]);
        const color = d3.scaleOrdinal()
            .domain(["Small", "Medium", "Large"])
            .range(["#1F77B4", "#FF7F0E", "#2CA02C"]);
        // Add X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x0))
            .selectAll("text")
            .attr("transform", "rotate(-20)")
            .style("text-anchor", "end")
            .style("font-size", "10px");
        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y).ticks(5))
            .style("font-size", "12px");
        // Add bars
        svg.append("g")
            .selectAll("g")
            .data([...groupedData])
            .enter()
            .append("g")
            .attr("transform", d => `translate(${x0(d[0])},0)`)
            .selectAll("rect")
            .data(d => d[1])
            .enter()
            .append("rect")
            .attr("x", d => x1(d.size))
            .attr("y", d => y(d.frequency))
            .attr("width", x1.bandwidth())
            .attr("height", d => height - y(d.frequency))
            .attr("fill", d => color(d.size));
        // Add annotations
        svg.append("g")
            .selectAll("g")
            .data([...groupedData])
            .enter()
            .append("g")
            .attr("transform", d => `translate(${x0(d[0])},0)`)
            .selectAll("text")
            .data(d => d[1])
            .enter()
            .append("text")
            .attr("x", d => x1(d.size) + x1.bandwidth() / 2)
            .attr("y", d => y(d.frequency) - 5)
            .attr("text-anchor", "middle")
            .text(d => d.frequency)
            .style("font-size", "10px")
            .style("fill", "black");


        svg.selectAll(".total-label")
            .data([...damageTotals])
            .enter()
            .append("text")
            .attr("x", d => x0(d[0]) + x0.bandwidth() / 2) 
            .attr("y", -5) 
            .attr("text-anchor", "middle")
            .text(d => `Total: ${d[1]}`) 
            .style("font-size", "12px")
            .style("fill", "black")
            .attr("class", "total-label");

            
                // Add legend
        const legend = svg.append("g")
        .attr("transform", `translate(25, 15)`); 

        // Data for the legend
        const legendData = ["Small", "Medium", "Large"];
        const legendColors = ["#1F77B4", "#FF7F0E", "#2CA02C"];

        // Add legend rectangles
        legend.selectAll("rect")
            .data(legendData)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", (d, i) => i * 20)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", (d, i) => legendColors[i]);

        // Add legend text
        legend.selectAll("text")
            .data(legendData)
            .enter()
            .append("text")
            .attr("x", 20) 
            .attr("y", (d, i) => i * 20 + 12) 
            .text(d => d)
            .style("font-size", "12px")
            .attr("alignment-baseline", "middle");
            
    }) 
}
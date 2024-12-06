let viewType = "graph-view";
const animationTime = 1000;
let selectedGraphWrapper = ""
let selectedGraph = ""
let selectedGraphDesc = ""
let previousX = 0;
let previousY = 0;

function containerSwap(refreshFunction) {
    const graphContainerElement = document.getElementById("graph-view")
    const leafletContainerElement = document.getElementById("leaflet-view")
    const animationCover = document.getElementsByClassName("animation-cover")[0];

    if (viewType === "graph-view") {
        animationCover.id = "animation-cover-active"

        setTimeout(() => {
            graphContainerElement.style.display = "none";
            leafletContainerElement.style.display = "flex";
            viewType = "leaflet-view"
            refreshFunction()
        }, animationTime);

        setTimeout(() => {
            animationCover.id = "";
        }, animationTime * 2)
    }
    else {
        animationCover.id = "animation-cover-active"

        setTimeout(() => {
            leafletContainerElement.style.display = "none";
            graphContainerElement.style.display = "flex";
            viewType = "graph-view"
        }, animationTime);

        setTimeout(() => {
            animationCover.id = "";
        }, animationTime * 2)
    }
}

function graphSelected(event) {
    const target = event.target;
    const targetId = target.id;

    const targetGraph = target.children[0];
    const targetGraphDesc = target.children[1]
    const graphId = targetGraph.id;
    const descId = targetGraphDesc.id;

    console.log(targetGraphDesc)

    if (targetId === "graph-wrapper-active") {
        const animationCover = document.getElementsByClassName("animation-cover")[0];

        animationCover.id = "animation-cover-active"

        setTimeout(() => {
            if (selectedGraph !== "graph1") { document.getElementById("graphWrapper1").style.display = "" }
            if (selectedGraph !== "graph2") { document.getElementById("graphWrapper2").style.display = "" }
            if (selectedGraph !== "graph3") { document.getElementById("graphWrapper3").style.display = "" }
            if (selectedGraph !== "graph4") { document.getElementById("graphWrapper4").style.display = "" }
            if (selectedGraph !== "graph5") { document.getElementById("graphWrapper5").style.display = "" }
            if (selectedGraph !== "graph6") { document.getElementById("graphWrapper6").style.display = "" }

            target.style.position = "";
            target.style.left = "";
            target.style.top = "";

            target.id = selectedGraphWrapper;
            targetGraph.id = selectedGraph;
            targetGraphDesc.id = selectedGraphDesc
            
            selectedGraphWrapper = "";
            selectedGraph = "";
            selectedGraphDesc = "";

        }, animationTime)

        setTimeout(() => {
            animationCover.id = "";
        }, animationTime * 2)
    }
    else {
        const targetChildPosition = targetGraph.getBoundingClientRect()

        selectedGraphWrapper = targetId;
        selectedGraph = graphId;
        selectedGraphDesc = descId;
        
        target.style.position = "absolute";
        target.style.left = targetChildPosition.x;
        target.style.top = targetChildPosition.y;
        
        if (graphId !== "graph1") { document.getElementById("graphWrapper1").style.display = "none" }
        if (graphId !== "graph2") { document.getElementById("graphWrapper2").style.display = "none" }
        if (graphId !== "graph3") { document.getElementById("graphWrapper3").style.display = "none" }
        if (graphId !== "graph4") { document.getElementById("graphWrapper4").style.display = "none" }
        if (graphId !== "graph5") { document.getElementById("graphWrapper5").style.display = "none" }
        if (graphId !== "graph6") { document.getElementById("graphWrapper6").style.display = "none" }

        target.id = "graph-wrapper-active";
        targetGraph.id = "graph-active";
        targetGraphDesc.id = "graph-description-active";
    }
}
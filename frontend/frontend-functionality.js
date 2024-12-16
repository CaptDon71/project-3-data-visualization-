let viewType = "graph-view";
let processRunning = false;
const animationTime = 1000;
let selectedGraphWrapper = ""
let selectedGraph = ""
let selectedGraphDesc = ""
let previousX = 0;
let previousY = 0;

let globalSelectedGraph = ""

function getGlobalSelectedGraph() { return globalSelectedGraph; }
function getViewType() { return viewType; }

function containerSwap(refreshFunction, populateGraph1, populateGraph2, populateGraph3) {
    const graphContainerElement = document.getElementById("graph-view")
    const leafletContainerElement = document.getElementById("leaflet-view")
    const animationCover = document.getElementsByClassName("animation-cover")[0];
    const switchShuttle = document.getElementsByClassName("view-switch-shuttle")[0];
    const switchGutter = document.getElementsByClassName("view-switch-gutter")[0];

    if (!processRunning && viewType === "graph-view") {
        animationCover.id = "animation-cover-active"
        switchShuttle.id = "view-switch-shuttle-active"

        switchShuttle.style.position = 'absolute';

        processRunning = true;

        setTimeout(() => {
            switchGutter.id = 'view-switch-gutter-active'
        }, 125)


        setTimeout(() => {
            graphContainerElement.style.display = "none";
            leafletContainerElement.style.display = "flex";
            viewType = "leaflet-view"
            refreshFunction()
        }, animationTime);

        setTimeout(() => {
            animationCover.id = "";
            processRunning = false;
        }, animationTime * 2)
    }
    else if (!processRunning) {
        animationCover.id = "animation-cover-active"
        switchShuttle.id = "view-switch-shuttle-inactive"

        processRunning = true;

        setTimeout(() => {
            switchGutter.id = ''
        }, 125)

        setTimeout(() => {
            leafletContainerElement.style.display = "none";
            graphContainerElement.style.display = "flex";
            switchShuttle.style.position = '';
            viewType = "graph-view"
        }, animationTime);

        setTimeout(() => {
            animationCover.id = "";
            switchShuttle.id = "";

            processRunning = false;

            if      (globalSelectedGraph === 'graph1') { populateGraph1(true); }
            else if (globalSelectedGraph === 'graph2') { populateGraph2(true); }
            else if (globalSelectedGraph === 'graph3') { populateGraph3(true); }
            else {
                populateGraph1(true);
                populateGraph2(true);
                populateGraph3(true);
            }
        }, animationTime * 2)
    }
}

function graphSelected(event, populateGraph1, populateGraph2, populateGraph3) {
    const targetGraphCover = event.target
    const targetGraph = targetGraphCover.nextElementSibling;

    const graphId = targetGraph.id;

    const targetIdNum = targetGraph.id.charAt(targetGraph.id.length - 1)

    const targetId = (graphId === "graph-active") ? "graph-wrapper-active" : `graphWrapper${targetIdNum}`;
    const target = document.getElementById(targetId)

    const descId = (graphId === "graph-active") ? "graph-description-active" : `graph-${targetIdNum}-description`;
    const targetGraphDesc =  document.getElementById(descId)

    if (targetId === "graph-wrapper-active") {
        const animationCover = document.getElementsByClassName("animation-cover")[0];

        animationCover.id = "animation-cover-active"

        setTimeout(() => {
            if (selectedGraph !== "graph1") { document.getElementById("graphWrapper1").style.display = "" }
            if (selectedGraph !== "graph2") { document.getElementById("graphWrapper2").style.display = "" }
            if (selectedGraph !== "graph3") { document.getElementById("graphWrapper3").style.display = "" }

            target.style.position = "";
            target.style.left = "";
            target.style.top = "";

            targetGraphCover.id = "";
            target.id = selectedGraphWrapper;
            targetGraph.id = selectedGraph;
            targetGraphDesc.id = selectedGraphDesc
            
            selectedGraphWrapper = "";
            selectedGraph = "";
            selectedGraphDesc = "";

            globalSelectedGraph = "";
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

        globalSelectedGraph = selectedGraph;
        
        target.style.position = "absolute";
        target.style.left = targetChildPosition.x;
        target.style.top = targetChildPosition.y;
        
        if (graphId !== "graph1") { document.getElementById("graphWrapper1").style.display = "none" }
        if (graphId !== "graph2") { document.getElementById("graphWrapper2").style.display = "none" }
        if (graphId !== "graph3") { document.getElementById("graphWrapper3").style.display = "none" }

        targetGraphCover.id = "graph-cover-active"
        target.id = "graph-wrapper-active";
        targetGraph.id = "graph-active";
        targetGraphDesc.id = "graph-description-active";

        setTimeout(() => {
            target.style.animationDuration = "0s";
        }, 1000)
    }

    setTimeout(() => {
        console.log(globalSelectedGraph)
        if (viewType === "leaflet-view") {}
        else if (globalSelectedGraph === 'graph1') { populateGraph1(true); }
        else if (globalSelectedGraph === 'graph2') { populateGraph2(true); }
        else if (globalSelectedGraph === 'graph3') { populateGraph3(true); }
        else {
            populateGraph1(true);
            populateGraph2(true);
            populateGraph3(true);
        }
    }, animationTime)
}


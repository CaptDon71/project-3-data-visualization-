let viewType = "graph-view";
const animationTime = 1000;
let selectedGraph = ""
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

    const targetChild = target.children[0];
    const targetChildId = targetChild.id;

    if (targetId === "graph-wrapper-active") {
        const animationCover = document.getElementsByClassName("animation-cover")[0];

        animationCover.id = "animation-cover-active"

        setTimeout(() => {
            if (targetChildId !== "graph1") { document.getElementById("graphWrapper1").style.display = "" }
            if (targetChildId !== "graph2") { document.getElementById("graphWrapper2").style.display = "" }
            if (targetChildId !== "graph3") { document.getElementById("graphWrapper3").style.display = "" }
            if (targetChildId !== "graph4") { document.getElementById("graphWrapper4").style.display = "" }
            if (targetChildId !== "graph5") { document.getElementById("graphWrapper5").style.display = "" }
            if (targetChildId !== "graph6") { document.getElementById("graphWrapper6").style.display = "" }

            target.style.position = "";
            target.style.left = "";
            target.style.top = "";

            target.id = selectedGraph;
            selectedGraph = "";
        }, animationTime)

        setTimeout(() => {
            animationCover.id = "";
        }, animationTime * 2)
    }
    else {
        const targetChildPosition = targetChild.getBoundingClientRect()

        selectedGraph = targetId;
        
        target.style.position = "absolute";
        target.style.left = targetChildPosition.x;
        target.style.top = targetChildPosition.y;
        
        if (targetChildId !== "graph1") { document.getElementById("graphWrapper1").style.display = "none" }
        if (targetChildId !== "graph2") { document.getElementById("graphWrapper2").style.display = "none" }
        if (targetChildId !== "graph3") { document.getElementById("graphWrapper3").style.display = "none" }
        if (targetChildId !== "graph4") { document.getElementById("graphWrapper4").style.display = "none" }
        if (targetChildId !== "graph5") { document.getElementById("graphWrapper5").style.display = "none" }
        if (targetChildId !== "graph6") { document.getElementById("graphWrapper6").style.display = "none" }

        target.id = "graph-wrapper-active";
    }
}
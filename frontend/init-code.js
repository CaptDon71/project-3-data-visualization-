const graphDescriptions = {
    "graph1" : {
        "title" : "Placeholder Title",
        "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in velit sed augue lacinia accumsan in eget augue. Mauris lacus urna, viverra eu porttitor in, varius et tellus. Mauris elementum rhoncus arcu, et pretium est euismod in. Morbi eu facilisis orci. Praesent id dolor nisi. Ut sodales leo quis convallis dapibus. Curabitur eget vulputate ante. Duis sapien ligula, ullamcorper nec nunc nec, efficitur efficitur sem. Duis vel risus ut nibh accumsan vestibulum. Phasellus porttitor eros enim, sed aliquam augue accumsan ut. Aliquam sollicitudin sem id risus euismod volutpat. Proin hendrerit est at laoreet venenatis. Cras ultricies orci varius orci interdum, nec eleifend ex porta. Fusce viverra tempus risus id iaculis. Phasellus sollicitudin venenatis condimentum. Aenean ut ultrices neque, vitae vestibulum massa."
    },
    "graph2" : {
        "title" : "Placeholder Title",
        "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in velit sed augue lacinia accumsan in eget augue. Mauris lacus urna, viverra eu porttitor in, varius et tellus. Mauris elementum rhoncus arcu, et pretium est euismod in. Morbi eu facilisis orci. Praesent id dolor nisi. Ut sodales leo quis convallis dapibus. Curabitur eget vulputate ante. Duis sapien ligula, ullamcorper nec nunc nec, efficitur efficitur sem. Duis vel risus ut nibh accumsan vestibulum. Phasellus porttitor eros enim, sed aliquam augue accumsan ut. Aliquam sollicitudin sem id risus euismod volutpat. Proin hendrerit est at laoreet venenatis. Cras ultricies orci varius orci interdum, nec eleifend ex porta. Fusce viverra tempus risus id iaculis. Phasellus sollicitudin venenatis condimentum. Aenean ut ultrices neque, vitae vestibulum massa."
    },
    "graph3" : {
        "title" : "Placeholder Title",
        "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in velit sed augue lacinia accumsan in eget augue. Mauris lacus urna, viverra eu porttitor in, varius et tellus. Mauris elementum rhoncus arcu, et pretium est euismod in. Morbi eu facilisis orci. Praesent id dolor nisi. Ut sodales leo quis convallis dapibus. Curabitur eget vulputate ante. Duis sapien ligula, ullamcorper nec nunc nec, efficitur efficitur sem. Duis vel risus ut nibh accumsan vestibulum. Phasellus porttitor eros enim, sed aliquam augue accumsan ut. Aliquam sollicitudin sem id risus euismod volutpat. Proin hendrerit est at laoreet venenatis. Cras ultricies orci varius orci interdum, nec eleifend ex porta. Fusce viverra tempus risus id iaculis. Phasellus sollicitudin venenatis condimentum. Aenean ut ultrices neque, vitae vestibulum massa."
    },
    "graph4" : {
        "title" : "Placeholder Title",
        "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in velit sed augue lacinia accumsan in eget augue. Mauris lacus urna, viverra eu porttitor in, varius et tellus. Mauris elementum rhoncus arcu, et pretium est euismod in. Morbi eu facilisis orci. Praesent id dolor nisi. Ut sodales leo quis convallis dapibus. Curabitur eget vulputate ante. Duis sapien ligula, ullamcorper nec nunc nec, efficitur efficitur sem. Duis vel risus ut nibh accumsan vestibulum. Phasellus porttitor eros enim, sed aliquam augue accumsan ut. Aliquam sollicitudin sem id risus euismod volutpat. Proin hendrerit est at laoreet venenatis. Cras ultricies orci varius orci interdum, nec eleifend ex porta. Fusce viverra tempus risus id iaculis. Phasellus sollicitudin venenatis condimentum. Aenean ut ultrices neque, vitae vestibulum massa."
    },
    "graph5" : {
        "title" : "Placeholder Title",
        "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in velit sed augue lacinia accumsan in eget augue. Mauris lacus urna, viverra eu porttitor in, varius et tellus. Mauris elementum rhoncus arcu, et pretium est euismod in. Morbi eu facilisis orci. Praesent id dolor nisi. Ut sodales leo quis convallis dapibus. Curabitur eget vulputate ante. Duis sapien ligula, ullamcorper nec nunc nec, efficitur efficitur sem. Duis vel risus ut nibh accumsan vestibulum. Phasellus porttitor eros enim, sed aliquam augue accumsan ut. Aliquam sollicitudin sem id risus euismod volutpat. Proin hendrerit est at laoreet venenatis. Cras ultricies orci varius orci interdum, nec eleifend ex porta. Fusce viverra tempus risus id iaculis. Phasellus sollicitudin venenatis condimentum. Aenean ut ultrices neque, vitae vestibulum massa."
    },
    "graph6" : {
        "title" : "Placeholder Title",
        "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in velit sed augue lacinia accumsan in eget augue. Mauris lacus urna, viverra eu porttitor in, varius et tellus. Mauris elementum rhoncus arcu, et pretium est euismod in. Morbi eu facilisis orci. Praesent id dolor nisi. Ut sodales leo quis convallis dapibus. Curabitur eget vulputate ante. Duis sapien ligula, ullamcorper nec nunc nec, efficitur efficitur sem. Duis vel risus ut nibh accumsan vestibulum. Phasellus porttitor eros enim, sed aliquam augue accumsan ut. Aliquam sollicitudin sem id risus euismod volutpat. Proin hendrerit est at laoreet venenatis. Cras ultricies orci varius orci interdum, nec eleifend ex porta. Fusce viverra tempus risus id iaculis. Phasellus sollicitudin venenatis condimentum. Aenean ut ultrices neque, vitae vestibulum massa."
    }
}

for (let index = 1; index <= 6; index++) {
    const titleObject = document.getElementById(`graph-${index}-title`);
    const textObject = document.getElementById(`graph-${index}-text`);
    const graphDesc = graphDescriptions[`graph${index}`];

    titleObject.textContent = graphDesc.title;
    textObject.textContent = graphDesc.text;
}
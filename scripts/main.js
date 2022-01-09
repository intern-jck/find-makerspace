let requestURL = 'https://raw.githubusercontent.com/intern-jck/findMakerspace/main/assets/json/spaceList.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

var makerList = {};

request.onload = function () {
    makerList = request.response;
    // console.log(makerList);
}

let mySvg = document.getElementById("us-map");
mySvg.onload = getStates();

// All the state SVGs
function getStates() {
    // Get each state path
    let svgPaths = document.getElementById("us-map").children;
    // Add the events to it
    for (let i = 0; i < svgPaths.length; i++) {
        // console.log(svgPaths[i]);
        addEvent(svgPaths[i]);
    }
}

// Add events to each state SVG
function addEvent(state) {

    // let stateElements = getStates();
    // console.log(state.id)

    element = document.getElementById(state.id);

    // console.log(element);
    element.addEventListener("mouseover", function () {
        document.getElementById("state-title").textContent = state.id.toUpperCase();
    });
    // // Reset state SVG
    element.addEventListener("mouseout", function () {
        document.getElementById("state-title").textContent = "PICK A STATE!";
    });
    // // If clicked, show that state's makerspace list
    element.addEventListener("click", function () {
        // Show the new state list
        updateMakerList(state.id);
    });

}

function clearList() {
    // Get the elements in the div
    let spaceList = document.getElementById("list-content");

    // If there are more than two, remove the first one, its the oldest
    if (spaceList.children.length >= 1) {
        spaceList.removeChild(spaceList.children[0]);
    }
}

function updateMakerList(stateId) {
    clearList();

    // Title of the current makerspace list
    document.getElementById("list-title").innerHTML = stateId.toUpperCase() + " Makerspaces";

    // Create the table to show space names and links
    let table = document.createElement('table');
    table.setAttribute("class", "table table-responsive");

    let tableHead = document.createElement('thead');
    tableHead.setAttribute("class", "text-left");

    let tableBody = document.createElement('tbody');

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    let headingRow = document.createElement('tr');
    let nameHeading = document.createElement('th');
    nameHeading.innerHTML = "NAME";

    let linkHeading = document.createElement('th');
    linkHeading.innerHTML = "LINK";

    headingRow.appendChild(nameHeading);
    headingRow.appendChild(linkHeading);
    tableHead.appendChild(headingRow);

    for (let space in makerList[stateId]) {

        let bodyRow = document.createElement('tr');

        var spaceName = document.createElement('td');
        spaceName.innerHTML = makerList[stateId][space][0];

        var spaceLink = document.createElement('td');
        var linkAnchor = document.createElement('a');
        linkAnchor.innerHTML = makerList[stateId][space][1];

        linkAnchor.setAttribute("href", makerList[stateId][space][1]);
        linkAnchor.setAttribute("target", "_blank");

        spaceLink.appendChild(linkAnchor);
        bodyRow.appendChild(spaceName);
        bodyRow.appendChild(spaceLink);
        tableBody.appendChild(bodyRow);
    }

    document.getElementById("list-content").appendChild(table);
    document.getElementById("list-title").scrollIntoView();
}


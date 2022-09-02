// Get the json file of us makerspaces from github
let requestURL = 'https://raw.githubusercontent.com/intern-jck/findMakerspace/main/assets/json/spaceList.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

// Save contents of json
let makerList = {};
request.onload = function () {
    makerList = request.response;
};

// When the SVG loads, add events to each SVG path
let mySvg = document.getElementById("us-map");
mySvg.onload = function () {

  // Get each state path
  let svgPaths = document.getElementById("us-map").children;
  // Add the events to it
  for (let i = 0; i < svgPaths.length; i++) {
    // console.log(svgPaths[i]);
    addEvent(svgPaths[i]);
  }
};

// Add events to each state SVG
function addEvent(state) {

  // Get each state svg.
  element = document.getElementById(state.id);

  // If mouse hover on state svg, show it's name
  element.addEventListener("mouseover", function () {
    document.getElementById("state-title").textContent = state.id.toUpperCase();
  });
  // Reset title if not
  element.addEventListener("mouseout", function () {
    document.getElementById("state-title").textContent = "PICK A STATE!";
  });

  // If clicked, show that state's makerspace list
  element.addEventListener("click", function () {
    updateMakerList(state.id);
    window.scrollBy(0, 400);
  });

};

function updateMakerList(stateId) {

  // Get the block to display makerspace list
  let listContent = document.getElementById("list-content");
  console.log(listContent)

  // Create title for list
  document.getElementById("list-title").innerHTML = stateId.toUpperCase() + " Makerspaces";

  // Clear any lists currently being shown
  while (listContent.firstChild) {
    listContent.removeChild(listContent.firstChild);
  }

  // For each space in the list
  for (let space in makerList[stateId]) {

    // Make the space row
    let spaceNameRow = document.createElement("div");
    spaceNameRow.classList.add("row");
    spaceNameRow.classList.add("space-name-row");
    spaceNameRow.classList.add("d-flex");

    // Make the space name
    var spaceName = document.createElement('h2');
    spaceName.innerHTML = makerList[stateId][space][0];
    spaceName.classList.add("pt-2");
    spaceName.classList.add("space-name");

    // Make the link row
    let spaceLinkRow = document.createElement("div");
    spaceLinkRow.classList.add("row");
    spaceLinkRow.classList.add("space-link-row");
    spaceLinkRow.classList.add("d-flex");

    // Make the space link
    var spaceLink = document.createElement('h3');
    var linkAnchor = document.createElement('a');
    linkAnchor.innerHTML = makerList[stateId][space][1];
    linkAnchor.setAttribute("href", makerList[stateId][space][1]);
    linkAnchor.setAttribute("target", "_blank");
    linkAnchor.classList.add("pb-2");
    linkAnchor.classList.add("space-link");
    spaceLink.appendChild(linkAnchor);

    // Add name and link to their rows
    spaceNameRow.appendChild(spaceName);
    spaceLinkRow.appendChild(spaceLink);

    // Add the rows to the page
    listContent.appendChild(spaceNameRow);
    listContent.appendChild(spaceLinkRow);
  }
}
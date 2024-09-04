// Get the json file of makerspaces from GitHub.
// let requestURL =
//   "https://raw.githubusercontent.com/intern-jck/findMakerspace/main/assets/json/spaceList.json";
// let request = new XMLHttpRequest();
// request.open("GET", requestURL);
// request.responseType = "json";
// request.send();

// // Save contents of JSON.
// let makerList = {};
// request.onload = function () {
//   makerList = request.response;
// };

// When the SVG loads, add events to each SVG path.
// let mySvg = document.getElementById("us-map");
// console.log(mySvg)

// mySvg.onload = function () {
//   let svgPaths = document.getElementById("us-map").children;
//   console.log(svgPaths)
//   for (let i = 0; i < svgPaths.length; i++) {
//     addEvent(svgPaths[i]);
//   }
// };

window.addEventListener("load", () => {
  let mySvg = document.getElementById("us-map");
  let svgPaths = document.getElementById("us-map").children;
  for (let i = 0; i < svgPaths.length; i++) {
    addStateMouseEvents(svgPaths[i]);
  }
});

function addStateMouseEvents(state) {
  // Get state svg.
  element = document.getElementById(state.id);
  // Show name on mouse hover.
  element.addEventListener("mouseover", function () {
    document.getElementById("state-title").textContent = state.id
      .replace("-", " ")
      .toUpperCase();
  });

  // Reset title if not.
  element.addEventListener("mouseout", function () {
    document.getElementById("state-title").textContent = "PICK A STATE!";
  });

  // If clicked, show that state's makerspace list.
  element.addEventListener("click", function () {
    updateMakerList(state.id);
    const windowHeight = window.innerHeight;
    // A little hacky but should adjust so window scrolls into view on different screens
    window.scrollBy(0, windowHeight - 200);
  });
}

function updateMakerList(stateId) {
  console.log(stateId);

  // Get the div to display makerspace list.
  let listContent = document.getElementById("list-content");

  // Create title for list.
  document.getElementById("list-title").innerHTML =
    stateId.toUpperCase() + " Makerspaces";

  // Clear any lists currently being shown.
  while (listContent.firstChild) {
    listContent.removeChild(listContent.firstChild);
  }

  // For each space in the list,
  for (let space in makerList[stateId]) {
    // make the name row,
    let spaceNameRow = document.createElement("div");
    spaceNameRow.classList.add("row");

    // make the space name,
    var spaceName = document.createElement("h2");
    spaceName.innerHTML = makerList[stateId][space][0];
    spaceName.classList.add("pt-2");
    spaceName.classList.add("space-name");

    // make the link row,
    let spaceLinkRow = document.createElement("div");
    spaceLinkRow.classList.add("row");

    // make the space link,
    var spaceLink = document.createElement("h2");
    var linkAnchor = document.createElement("a");
    linkAnchor.innerHTML = makerList[stateId][space][1];
    linkAnchor.setAttribute("href", makerList[stateId][space][1]);
    linkAnchor.setAttribute("target", "_blank");
    linkAnchor.classList.add("pb-2");
    linkAnchor.classList.add("space-link");
    spaceLink.appendChild(linkAnchor);

    // add name and link to their rows,
    spaceNameRow.appendChild(spaceName);
    spaceLinkRow.appendChild(spaceLink);

    // then add the rows to the page.
    listContent.appendChild(spaceNameRow);
    listContent.appendChild(spaceLinkRow);
  }
}

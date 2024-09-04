// Get the json file of makerspaces from GitHub.
// let requestURL =
//   "https://raw.githubusercontent.com/intern-jck/findMakerspace/main/assets/json/spaceList.json";

const testList = {
  states: {
    state_1: {
      space_1: {
        name: "makerspace name",
        url: "https://testurl.com",
      },
      space_2: {
        name: "makerspace name",
        url: "https://testurl.com",
      },
      space_3: {
        name: "makerspace name",
        url: "https://testurl.com",
      },
    },
    state_2: {
      space_1: {
        name: "makerspace name",
        url: "https://testurl.com",
      },
      space_2: {
        name: "makerspace name",
        url: "https://testurl.com",
      },
    },
    state_3: {
      space_1: {
        name: "makerspace name",
        url: "https://testurl.com",
      },
    },
  },
};

let makerspaceList = {};

window.addEventListener("load", () => {
  makerspaceList = testList.states;
  let mySvg = document.getElementById("us-map");
  let svgPaths = document.getElementById("us-map").children;
  for (let i = 0; i < svgPaths.length; i++) {
    addSvgMouseEvents(svgPaths[i]);
  }
});

function addSvgMouseEvents(state) {
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
    stateId.toUpperCase() + " MAKERSPACES";

  // Clear any lists currently being shown.
  while (listContent.firstChild) {
    listContent.removeChild(listContent.firstChild);
  }

  let ranNum = Math.floor(Math.random() * 3) + 1;
  stateId = `state_${ranNum}`;

  console.log(stateId);
  const makerspaces = makerspaceList[stateId];
  // console.log(makerspaces)

  // test
  // for (let key in makerspaces) {
  //   const space = makerspaces[key]
  //   console.log(space)
  //   console.log(space.name)
  //   console.log(space.url)
  // }

  for (let key in makerspaces) {

    const space = makerspaces[key]
    // console.log(space)
    console.log(space.name)
    console.log(space.url)

    const name = space.name;
    const url = space.url;

    // make the space div,
    let spaceRow = document.createElement("div");
    spaceRow.classList.add("space-list-row");

    // make the space name,
    var spaceName = document.createElement("h2");
    spaceName.classList.add("space-name");
    spaceName.textContent = name;

    // make the link row,
    let spaceUrl = document.createElement("a");
    spaceUrl.classList.add("space-url");
    spaceUrl.setAttribute("href", url);
    spaceUrl.setAttribute("target", "_blank");
    spaceUrl.innerHTML = url;

    // add name and link to their rows,
    spaceRow.appendChild(spaceName);
    spaceRow.appendChild(spaceUrl);
    console.log(spaceRow)

    // then add the rows to the page.
    listContent.appendChild(spaceRow);
  }
}

function getStateList() {
  const requestURL = "../assets/data/state_list.json";
  const request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  makerspaceList = {};
  request.onload = function () {
    console.log(request.response);
    makerspaceList = request.response;
  };
}

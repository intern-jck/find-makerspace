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

let spaceList = {};
let makerspaceList = {};

window.addEventListener("load", () => {
  makerspaceList = testList.states;

  fetch("../assets/data/state_list.json")
    .then(res => res.json())
    .then(data => spaceList = data)
    .catch(error => console.log(error));

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

  console.log(stateId)
  // have to modify stateId to match key in spaceList
  let stateName = stateId.split("-");
  console.log(stateName);

  for (let i in stateName) {
    let name = String(stateName[i]).charAt(0).toUpperCase() + String(stateName[i]).slice(1);
    stateName[i] = name;
  }

  stateName = stateName.join(" ");
  console.log(stateName);

  // Get the div to display makerspace list.
  let listContent = document.getElementById("list-content");

  // Clear any lists currently being shown.
  while (listContent.firstChild) {
    listContent.removeChild(listContent.firstChild);
  }

  // Create title for list.
  document.getElementById("list-title").textContent = stateName + " Makerspaces";

  // For testing
  // let ranNum = Math.floor(Math.random() * 3) + 1;
  // stateId = `state_${ranNum}`;
  // console.log(stateId);
  //  const makerspaces = makerspaceList[stateId];
  // console.log(makerspaces)

  console.log(stateName)
  const makerspaces = spaceList[stateName]

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

    // make the space div,
    let row = document.createElement("div");
    row.classList.add("list-row");

    // make the  name,
    let name = document.createElement("h3");
    name.classList.add("name");
    name.textContent = space.Name;


    let snippet = document.createElement("p");
    snippet.classList.add("snippet");
    snippet.textContent = space.Snippet;

    // make the link row,
    let link = document.createElement("a");
    link.classList.add("link");
    link.setAttribute("href", space.Link);
    link.setAttribute("target", "_blank");
    link.textContent = space.Link;

    // add name and link to their rows,
    row.appendChild(name);
    row.appendChild(snippet);
    row.appendChild(link);
    // console.log(spaceRow)

    // then add the rows to the page.
    listContent.appendChild(row);
  }
}

// function getStateList() {
//   const requestURL = "../assets/data/state_list.json";
//   const request = new XMLHttpRequest();
//   request.open("GET", requestURL);
//   request.responseType = "json";
//   request.send();

//   makerspaceList = {};
//   request.onload = function () {
//     console.log(request.response);
//     makerspaceList = request.response;
//   };
// }

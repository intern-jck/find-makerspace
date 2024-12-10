let spaceList = {};

window.onload = function () {

  // Get json data for makerspaces.
  fetch("../assets/data/state_list.json")
    .then(res => res.json())
    .then(data => spaceList = data)
    .catch(error => console.log(error));

  // Add mouse events to svg.
  let svgPaths = document.getElementById("us-map").children;
  for (let i = 0; i < svgPaths.length; i++) {
    addSvgMouseEvents(svgPaths[i]);
  }
};

// Get scroll to top button.
const scrollButton = document.getElementById('scroll-top-btn');

// Listen for the scroll event.
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollButton.style.display = 'block'; // Show button
  } else {
    scrollButton.style.display = 'none'; // Hide button
  }
};

function addSvgMouseEvents(state) {

  // Get state svg.
  element = document.getElementById(state.id);

  // Show state name on mouse hover.
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
    const listTitle = document.getElementById("list-title");
    listTitle.scrollIntoView({alignToTop: true, behavior: 'smooth'});
  });
}

function updateMakerList(stateId) {

  // Hide dropdown menu when selection is made.
  const dropdownMenu = document.getElementById("state-menu");
  if (dropdownMenu.classList.contains("show")) {
    dropdownMenu.classList.remove("show")
  }

  // Modify stateId to match key in stateList
  let stateName = stateId.split("-");

  for (let i in stateName) {
    let name = String(stateName[i]).charAt(0).toUpperCase() + String(stateName[i]).slice(1);
    stateName[i] = name;
  }

  stateName = stateName.join(" ");

  // Get div for makerspace list.
  const listContent = document.getElementById("list-content");

  // Clear any lists in div.
  while (listContent.firstChild) {
    listContent.removeChild(listContent.firstChild);
  }

  // Create title for list.
  document.getElementById("list-title").textContent = stateName + " Makerspaces";

  // Go through list of spaces and create html to display.
  const makerspaces = spaceList[stateName]

  for (let key in makerspaces) {

    const space = makerspaces[key]

    let row = document.createElement("div");
    row.classList.add("list-row");

    let name = document.createElement("h3");
    name.classList.add("name");
    name.textContent = space.Name;

    let snippet = document.createElement("p");
    snippet.classList.add("snippet");
    snippet.textContent = space.Snippet;

    let link = document.createElement("a");
    link.classList.add("link");
    link.setAttribute("href", space.Link);
    link.setAttribute("target", "_blank");
    link.textContent = space.Link;

    row.appendChild(name);
    row.appendChild(snippet);
    row.appendChild(link);

    listContent.appendChild(row);
  }
}

// Shows state list dropdown menu.
function toggleMenu() {

  const dropdownMenu = document.getElementById("state-menu");
  dropdownMenu.classList.toggle("show");

  const dropdownIcon = document.getElementById("dropdown-icon");
  dropdownIcon.classList.toggle("rotate");

}

// Scrolls to the top of the page.
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

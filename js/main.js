// Select DOM Items
const menuBtn = document.querySelector(".menu-btn");
const hamburgerIcon = document.querySelector(".hamburgerIcon");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".nav-item");
const navItemi = document.querySelectorAll(".nav-item");

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    hamburgerIcon.classList.add("open");
    menu.classList.add("show");
    menuNav.classList.add("show");
    navItems.forEach((item) => item.classList.add("show"));
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    // Set Menu State
    showMenu = true;
  } else if (showMenu) {
    hamburgerIcon.classList.remove("open");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    navItems.forEach((item) => item.classList.remove("show"));
    document.getElementsByTagName("body")[0].style.overflowY = "auto";

    showMenu = false;

    // Set Menu State
  }
}

const loader = () => {
  const body = document.getElementsByTagName("body")[0];
  var loader = document.createElement("div");
  loader.id = "loader";
  var inner_loader = document.createElement("div");
  inner_loader.className = "spinner-box";
  var inner_loader_h5 = document.createElement("div");
  inner_loader_h5.className = "pulse-container";
  inner_loader_h5.innerHTML = ` <div class="pulse-bubble pulse-bubble-1"></div>
  <div class="pulse-bubble pulse-bubble-2"></div>
  <div class="pulse-bubble pulse-bubble-3"></div>`;
  // <h1 class="loadingtext"></h1>;
  loader.appendChild(inner_loader);
  inner_loader.appendChild(inner_loader_h5);
  body.prepend(loader);
};

// FETCHING THE DATA FROM THE JSON
fetch("./json/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    document.getElementById("loaders").remove();
    loader();
    setTimeout(function wait() {
      appendData(data);
      document.getElementById("loader").remove();
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
    }, 2500);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

const appendData = (data) => {
  const mainContainer = document.getElementById("projects");

  // sorting the data
  data.sort(function (a, b) {
    return a.rank - b.rank;
  });
  for (var i = 0; i < data.length; i++) {
    const project_name = data[i].name;
    const project_live = data[i].live_link;
    const project_source = data[i].source_code;
    const project_alt = data[i].name;
    const project_img_src = data[i].img_src;

    var item_div = document.createElement("div");
    item_div.className = "item";

    var item_image = document.createElement("div");
    item_image.className = "item--image";

    var img = document.createElement("img");
    img.alt = project_alt;
    img.src = `img/${project_img_src}`;

    var item_title = document.createElement("div");
    item_title.className = "item--title";

    var item_title_span = document.createElement("span");
    item_title_span.innerHTML = project_name;

    var work_buttons = document.createElement("div");
    work_buttons.className = "work--buttons";

    var work_button_live = document.createElement("div");
    work_button_live.className = "live";

    var work_button_live_a = document.createElement("a");
    work_button_live_a.className = "btns";
    work_button_live_a.target = "_blank";
    work_button_live_a.innerHTML = "See Live";
    work_button_live_a.href = project_live;

    if (project_source) {
      var work_button_source = document.createElement("div");
      work_button_source.className = "source";

      var work_button_source_a = document.createElement("a");
      work_button_source_a.className = "btns";
      work_button_source_a.target = "_blank";
      work_button_source_a.innerHTML = "Source Code";

      work_button_source_a.href = project_source;
    }

    item_div.appendChild(item_image);
    item_div.appendChild(work_buttons);
    work_buttons.appendChild(work_button_live);
    if (project_source) {
      work_buttons.appendChild(work_button_source);
      work_button_source.appendChild(work_button_source_a);
    }
    work_button_live.appendChild(work_button_live_a);
    item_image.appendChild(img);
    item_image.appendChild(item_title);
    item_title.appendChild(item_title_span);

    mainContainer.appendChild(item_div);
  }
};

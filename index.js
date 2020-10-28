/* eslint-disable prettier/prettier */
import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import axios from "axios";
import { default as Modal } from "./components/Modal/Modal";

const router = new Navigo(window.location.origin);
router
  .on({
    ":page": (params) => {
      render(state[params.page]);
    },
    "/": () => render(state.Home),
  })
  .resolve();

axios
  .get("https://swapi.dev/api/people/")
  .then((response) => {
    response.data.results.forEach((char) => {
      state.Bio.listOfSWChars.push(char);
    });
  })
  .catch((err) => console.log(err));

axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    response.data.forEach((post) => {
      state.Blog.posts.push(post);
    });
    const params = router.lastRouteResolved().params;
    if (params) {
      render(state[params.page]);
    }
  })
  .catch((err) => console.log(err));

function render(st = state.Home) {
  // console.log("rendering state", st);
  // console.log("state.Blog", state.Blog);
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
`;

  router.updatePageLinks();
  if (st === state.Home || st === state.Blog) {
    const button = document.querySelectorAll(".modal"); // gets all buttons with class modal
    button.forEach((curr) => { // looping through and adding my event listener
      curr.addEventListener("click", (e) => {
        e.preventDefault(); // prevents default A tag reaction
        Modal(state, e.target.name); // this name is part of the actual A tag in Home.js and im passing state so i have access to the different modal "types" in the modal state
      });
    });
  }
  addNavEventListeners();
  addPicOnFormSubmit(st);
}

function addNavEventListeners() {
  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );
}

function addPicOnFormSubmit(st) {
  if (st.view === "Form") {
    document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      // convert HTML elements to Array
      let inputList = Array.from(event.target.elements);
      // remove submit button from list
      inputList.pop();
      // construct new picture object
      let newPic = inputList.reduce((pictureObject, input) => {
        pictureObject[input.name] = input.value;
        return pictureObject;
      }, {});
      // add new picture to state.Gallery.pictures
      state.Gallery.pictures.push(newPic);
      render(state.Gallery);
    });
  }
}

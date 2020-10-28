export default (st, item) => {
  let portal = document.getElementById("portal"); // grabs my portal element in index.html which i added

  // This actually puts the modal in the DOM
  portal.innerHTML = `<div id="mainModal">
  <div class="modal-content">
  <span class="close">&times;</span>
        <h1>${st.Modal[item].name}</h1>
        <p>${st.Modal[item].info}</p>
    </div>
  </div>`;

  // This removes the modal by using removeChild on the portal. WHen you click, it rips that shit out violently
  const closeButton = document.getElementsByClassName("close");
  portal = document.getElementById("portal");
  closeButton[0].addEventListener("click", () => {
    portal.removeChild(portal.childNodes[0]);
  });
};

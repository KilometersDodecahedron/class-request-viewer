const general = {
  overlayElement: document.querySelector(".overlay"),
  hideOverlayElement: () => general.overlayElement.classList.add("d-none"),
  showOverlayElement: () => general.overlayElement.classList.remove("d-none"),
}

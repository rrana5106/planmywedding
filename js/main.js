// countdown
setInterval(() => {
  const currentDay = dayjs().format("D-MMM-YYYY HH:mm:ss");
  const countdownElement = document.querySelector("#countdown");
  countdownElement.classList.add("btn");
  countdownElement.textContent = currentDay;
}, 1000);

// Initialize and add the map
let map;

async function initMap() {
  // The location of Zimbabwe
  const position = { lat: -19.097, lng: 29.875 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Zimbabwe
  map = new Map(document.getElementById("map"), {
    zoom: 7,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Zimbabwe
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Zimbabwe",
  });
}

initMap();

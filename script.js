const video = document.getElementById("video");
const videoUpload = document.getElementById("videoUpload");
const overlayContainer = document.getElementById("overlayContainer");
const overlayForm = document.getElementById("overlayForm");

let overlays = [];

// Handle video upload
videoUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    video.src = url;
    video.load();
  }
});

// Tambah overlay
overlayForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = document.getElementById("overlayText").value;
  const start = parseFloat(document.getElementById("startTime").value);
  const end = parseFloat(document.getElementById("endTime").value);
  const color = document.getElementById("colorPicker").value;
  const fontSize = document.getElementById("fontSize").value;
  const font = document.getElementById("fontSelect").value;

  const posTop = parseFloat(document.getElementById("posTop").value);
  const posLeft = parseFloat(document.getElementById("posLeft").value);
  const center = document.getElementById("centerText").checked;

  const id = "overlay-" + overlays.length;

  const div = document.createElement("div");
  div.classList.add("overlay-text");
  div.id = id;
  div.textContent = text;

  // Apply styles
  div.style.color = color;
  div.style.fontSize = fontSize + "px";
  div.style.fontFamily = font;
  div.style.top = posTop + "%";

  if (center) {
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
  } else {
    div.style.left = posLeft + "%";
    div.style.transform = "none";
  }

  overlayContainer.appendChild(div);

  overlays.push({ id, start, end });

  overlayForm.reset();
});

// Tampilkan overlay saat video diputar
video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  overlays.forEach(o => {
    const el = document.getElementById(o.id);
    if (currentTime >= o.start && currentTime <= o.end) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
});

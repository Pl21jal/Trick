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

  const id = "overlay-" + overlays.length;

  const div = document.createElement("div");
  div.classList.add("overlay-text");
  div.id = id;
  div.textContent = text;
  div.style.color = color;
  div.style.fontSize = fontSize + "px";

  overlayContainer.appendChild(div);

  overlays.push({ id, start, end });

  // Reset form
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

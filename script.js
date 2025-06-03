const video = document.getElementById('video');
const overlayContainer = document.getElementById('overlayContainer');
const textInputsContainer = document.getElementById('textInputs');

// === SETUP WAKTU OVERLAY ===
// Kamu bisa ubah sesuai keinginan
const overlays = [
  { start: 2, end: 5, text: "", id: "text1" },
  { start: 6, end: 9, text: "", id: "text2" },
  { start: 10, end: 13, text: "", id: "text3" }
];

// Generate input form
overlays.forEach((overlay, index) => {
  const div = document.createElement('div');
  div.innerHTML = `
    <label>Teks ${index + 1} (detik ${overlay.start} - ${overlay.end}):</label>
    <input type="text" id="${overlay.id}" placeholder="Tulis teks di sini..." />
    <br><br>
  `;
  textInputsContainer.appendChild(div);

  // Create corresponding div overlay in video
  const textDiv = document.createElement('div');
  textDiv.classList.add('overlay-text');
  textDiv.id = `display-${overlay.id}`;
  overlayContainer.appendChild(textDiv);
});

function applyOverlay() {
  overlays.forEach(overlay => {
    const userText = document.getElementById(overlay.id).value;
    overlay.text = userText;
    document.getElementById(`display-${overlay.id}`).textContent = userText;
  });
}

video.addEventListener('timeupdate', () => {
  const currentTime = video.currentTime;
  overlays.forEach(overlay => {
    const display = document.getElementById(`display-${overlay.id}`);
    if (currentTime >= overlay.start && currentTime <= overlay.end && overlay.text.trim() !== "") {
      display.style.display = 'block';
    } else {
      display.style.display = 'none';
    }
  });
});

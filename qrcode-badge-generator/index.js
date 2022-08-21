var typeNumber = 0;
var errorCorrectionLevel = "L";
var qr = qrcode(typeNumber, errorCorrectionLevel);

const form = document.getElementById("form");
const name = form.elements["name"];
const email = form.elements["email"];
const twitter = form.elements["twitter"];
const github = form.elements["github"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let attendeeInfo = {
    name: name.value,
    email: email.value,
    twitter: `@${twitter.value}`,
    github: github.value,
  };
  qr.addData(JSON.stringify(attendeeInfo));
  qr.make();

  document.querySelector(".qr-container").innerHTML = qr.createImgTag();
  const imgEl = document.querySelector("img");
  const downloadBtn = document.createElement("a");
  downloadBtn.href = imgEl.src;
  downloadBtn.download = "qr-image.png";
  downloadBtn.innerHTML = `
  <i class="fa-solid fa-download"></i> Download
  `;
  downloadBtn.classList.add("download");

  document.querySelector(".qr-container").appendChild(downloadBtn);
});

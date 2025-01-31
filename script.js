const colorCodeData = JSON.parse(localStorage.getItem("CNR_COLOR_CODER_DATA")) ?? new Array(64).fill(["#888", "#f88", "#88f", "#f8f"]).flat();
let copiedColorCount = 0;

const e_header = document.getElementById("header");
const e_colorCodeList = document.getElementById("colorCodeList");

e_header.textContent = `0 / ${colorCodeData.length}`;

e_colorCodeList.textContent = "";
colorCodeData.forEach((color, idx) => {
  const clsOneLine = idx % 16 == 15 ? "separate" : "";
  e_colorCodeList.insertAdjacentHTML("beforeend", `<div class="color-code-item ${clsOneLine}" style="--color: ${color};" data-color="${color}" onclick="clickColor()"><span>${color}</span></div>`);
});

const clickColor = () => {
  const target = event.target;
  const color = target.dataset.color;
  navigator.clipboard.writeText(color);
  e_header.textContent = `${++copiedColorCount} / ${colorCodeData.length}`;
  target.remove();
};

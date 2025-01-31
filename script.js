const colorCodeData = JSON.parse(localStorage.getItem("CNR_COLOR_CODER_DATA")) ?? new Array(64).fill(["#888", "#f88", "#88f", "#f8f"]).flat();
let copiedColorCount = 0;

const e_header = document.getElementById("header");
const e_editor = document.getElementById("editor");
const e_editorTextarea = document.getElementById("editorTextarea");
const e_colorCodeList = document.getElementById("colorCodeList");

e_header.textContent = `0 / ${colorCodeData.length}`;

e_editorTextarea.value = colorCodeData.join("\n");

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

const openEditor = () => {
  e_editor.classList.remove("hide");
};

let timeout;
e_editorTextarea.oninput = () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    const data = e_editorTextarea.value.split("\n");
    localStorage.setItem("CNR_COLOR_CODER_DATA", JSON.stringify(data));
  }, 1000);
};

const ramos = [
  { nombre: "Morfología I", sct: 4, semestre: 1 },
  { nombre: "Ciencias Biológicas y Químicas", sct: 7, semestre: 1 },
  { nombre: "Gestión e Investigación I", sct: 3, semestre: 1 },
  { nombre: "Rol de la Matrona", sct: 11, semestre: 1 },
  { nombre: "Fundamentos Biológicos I", sct: 6, semestre: 2 },
  { nombre: "Morfología II", sct: 5, semestre: 2 },
  { nombre: "Gestión e Investigación II", sct: 3, semestre: 2 },
  { nombre: "Atención Integral a la Mujer", sct: 11, semestre: 2 },
  { nombre: "Electivo Cultural", sct: 3, semestre: 2 },
  { nombre: "Fundamentos Biológicos II", sct: 9, semestre: 3 },
  { nombre: "Gestión e Investigación III", sct: 3, semestre: 3 },
  { nombre: "Embriología y Genética", sct: 4, semestre: 3 },
  { nombre: "Puerperio y Salud Pública", sct: 13, semestre: 3 },
  { nombre: "Fundamentos Biológicos III", sct: 9, semestre: 4 },
  { nombre: "Gestión e Investigación IV", sct: 3, semestre: 4 },
  { nombre: "Electivo Cultural II", sct: 3, semestre: 4 },
  { nombre: "Promoción de la Salud de la Mujer", sct: 15, semestre: 4 },
  { nombre: "Salud Familiar y Ginecología Preventiva", sct: 22, semestre: 5 },
  { nombre: "Gestión M I", sct: 6, semestre: 5 },
  { nombre: "Salud Sexual y Planificación", sct: 23, semestre: 6 },
  { nombre: "Gestión M II", sct: 5, semestre: 6 },
  { nombre: "Parto y Recién Nacido", sct: 23, semestre: 7 },
  { nombre: "Gestión M III", sct: 5, semestre: 7 },
  { nombre: "Alto Riesgo Obstétrico", sct: 24, semestre: 8 },
  { nombre: "Seminario Gestión", sct: 7, semestre: 8 },
  { nombre: "Práctica Profesional I", sct: 29, semestre: 9 },
  { nombre: "Práctica Profesional II", sct: 28, semestre: 10 },
];

const malla = document.getElementById("malla");

ramos.forEach((ramo) => {
  const div = document.createElement("div");
  div.className = "ramo no-tomado";
  div.style.gridColumn = ramo.semestre;
  div.textContent = ramo.nombre + " (" + ramo.sct + " SCT)";

  div.addEventListener("click", () => {
    div.classList.toggle("aprobado");
    div.classList.remove("reprobado", "no-tomado");
  });

  div.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    div.classList.toggle("reprobado");
    div.classList.remove("aprobado", "no-tomado");
  });

  malla.appendChild(div);
});

document.getElementById("colorPicker").addEventListener("input", (e) => {
  document.querySelectorAll(".ramo").forEach((r) => {
    if (!r.classList.contains("aprobado") &&
        !r.classList.contains("reprobado")) {
      r.style.backgroundColor = e.target.value;
    }
  });
});

function filtrarRamos() {
  const filtro = document.getElementById("filtroEstado").value;
  const ramos = document.querySelectorAll(".ramo");
  ramos.forEach((r) => {
    r.style.display =
      filtro === "todos" || r.classList.contains(filtro) ? "block" : "none";
  });
}

function exportarComoImagen() {
  html2canvas(document.getElementById("malla")).then((canvas) => {
    const link = document.createElement("a");
    link.download = "malla.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

function agregarNota() {
  const container = document.getElementById("inputs");
  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.max = 7;
  input.placeholder = "Nota";
  container.appendChild(input);
}

function calcularPromedio() {
  const inputs = document.querySelectorAll("#inputs input");
  let total = 0;
  let count = 0;
  inputs.forEach((input) => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) {
      total += val;
      count++;
    }
  });
  const promedio = (total / count).toFixed(2);
  document.getElementById("promedioResultado").innerText =
    count > 0 ? `Promedio: ${promedio}` : "Ingresa notas válidas";
}

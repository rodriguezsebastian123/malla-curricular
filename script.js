const estados = ["aprobado", "reprobado", "cursando", "nocursado"];
const colores = {
  aprobado: "✅",
  reprobado: "❌",
  cursando: "📘",
  nocursado: "⬜"
};

const malla = [
  { nivel: 1, ramos: ["Morfología I", "Ciencias Biológicas y Químicas", "Módulo Gestión en Salud I", "Módulo Profesional Integrado I"] },
  { nivel: 2, ramos: ["Fundamentos Biológicos II", "Morfología II", "Módulo Gestión en Salud II", "Electivo Cultural", "Atención de Salud Integral a la Mujer"] },
  { nivel: 3, ramos: ["Fundamentos Biológicos III", "Embriología y Genética", "Módulo Gestión en Salud III", "Puerperio y Salud Pública"] },
  { nivel: 4, ramos: ["Fundamentos Biológicos IV", "Módulo Gestión en Salud IV", "Electivo Cultural II", "Promoción de la Salud"] },
  { nivel: 5, ramos: ["Atención Primaria y Ginecología Preventiva", "Módulo Gestión en Matronería I"] },
  { nivel: 6, ramos: ["Salud Sexual y Planificación Familiar", "Módulo Gestión en Matronería II"] },
  { nivel: 7, ramos: ["Parto, Recién Nacido Inmediato", "Módulo Gestión en Matronería III"] },
  { nivel: 8, ramos: ["Alto Riesgo Obstétrico y Neonatal", "Seminario de Gestión o Investigación"] },
  { nivel: 9, ramos: ["Práctica Profesional Controlada I"] },
  { nivel: 10, ramos: ["Práctica Profesional Controlada II"] }
];

function crearMalla() {
  const container = document.getElementById("niveles");
  malla.forEach(n => {
    const nivel = document.createElement("div");
    nivel.className = "nivel";
    nivel.innerHTML = `<h2>Nivel ${n.nivel}</h2>`;
    n.ramos.forEach(r => {
      const ramo = document.createElement("div");
      ramo.className = "ramo";
      ramo.textContent = r;
      ramo.dataset.nombre = `nivel${n.nivel}-${r}`;
      ramo.onclick = cambiarEstado;
      nivel.appendChild(ramo);
    });
    container.appendChild(nivel);
  });
}

function cambiarEstado(e) {
  const div = e.target;
  const nombre = div.dataset.nombre;
  let estadoActual = localStorage.getItem(nombre) || "nocursado";
  let index = estados.indexOf(estadoActual);
  let nuevoEstado = estados[(index + 1) % estados.length];
  div.className = "ramo " + nuevoEstado;
  localStorage.setItem(nombre, nuevoEstado);
  actualizarResumen();
}

function cargarEstados() {
  document.querySelectorAll(".ramo").forEach(div => {
    let estado = localStorage.getItem(div.dataset.nombre) || "nocursado";
    div.classList.add(estado);
  });
}

function actualizarResumen() {
  let contadores = { aprobado: 0, reprobado: 0, cursando: 0, nocursado: 0 };
  document.querySelectorAll(".ramo").forEach(r => {
    estados.forEach(est => {
      if (r.classList.contains(est)) contadores[est]++;
    });
  });
  let total = O


const ramos = [
  { nombre: "Morfología I", sct: 4, nivel: 1 },
  { nombre: "Ciencias Biológicas y Químicas", sct: 7, nivel: 1 },
  { nombre: "Gestión e Investigación en Salud I", sct: 3, nivel: 1 },
  { nombre: "Rol de la Matrona en la Sociedad", sct: 11, nivel: 1 },

  { nombre: "Fundamentos Biológicos I", sct: 6, nivel: 2 },
  { nombre: "Morfología II", sct: 5, nivel: 2 },
  { nombre: "Gestión e Investigación en Salud II", sct: 3, nivel: 2 },
  { nombre: "Atención de Salud Integral a la Mujer", sct: 11, nivel: 2 },
  { nombre: "Electivo Cultural, Humanista o Deportivo", sct: 3, nivel: 2 },

  { nombre: "Fundamentos Biológicos II", sct: 9, nivel: 3 },
  { nombre: "Gestión e Investigación en Salud III", sct: 3, nivel: 3 },
  { nombre: "Embriología y Genética", sct: 4, nivel: 3 },
  { nombre: "Puerperio y Salud Pública", sct: 13, nivel: 3 },

  { nombre: "Fundamentos Biológicos III", sct: 9, nivel: 4 },
  { nombre: "Gestión e Investigación en Salud IV", sct: 3, nivel: 4 },
  { nombre: "Electivo Cultural, Humanista o Deportivo", sct: 3, nivel: 4 },
  { nombre: "Promoción de la Salud de la Mujer, Control Prenatal y Salud Pública", sct: 15, nivel: 4 },

  { nombre: "Atención Primaria en Salud Familiar y Ginecología Preventiva", sct: 22, nivel: 5 },
  { nombre: "Gestión e Investigación en Matronería I", sct: 6, nivel: 5 },

  { nombre: "Salud Sexual, Planificación Familiar y Ginecología Preventiva II", sct: 23, nivel: 6 },
  { nombre: "Gestión e Investigación en Matronería II", sct: 5, nivel: 6 },

  { nombre: "Obstetricia Preventiva I: Parto, Recién Nacido Inmediato", sct: 23, nivel: 7 },
  { nombre: "Gestión e Investigación en Matronería III", sct: 5, nivel: 7 },

  { nombre: "Obstetricia Preventiva II: Alto Riesgo Obstétrico y Neonatal", sct: 24, nivel: 8 },
  { nombre: "Seminario de Proyecto de Gestión o Investigación en Matronería", sct: 7, nivel: 8 },

  { nombre: "Práctica Profesional Controlada Urbana o Rural I", sct: 29, nivel: 9 },
  { nombre: "Práctica Profesional Controlada Urbana o Rural II", sct: 28, nivel: 10 }
];

const malla = document.getElementById("malla");

ramos.forEach((ramo) => {
  const div = document.createElement("div");
  div.className = "ramo no-tomado";
  div.style.gridColumn = ramo.nivel;
  div.textContent = `${ramo.nombre}\nSCT: ${ramo.sct}`;

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



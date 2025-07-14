// Usuarios válidos
const usuarios = [{ usuario: "estudiante", clave: "1234" }];

function iniciarSesion() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("clave").value;
  const encontrado = usuarios.find(u => u.usuario === user && u.clave === pass);

  if (encontrado) {
    localStorage.setItem("usuarioActivo", user);
    mostrarContenido();
  } else {
    document.getElementById("error").innerText = "Usuario o contraseña incorrectos";
  }
}

function verificarSesion() {
  if (localStorage.getItem("usuarioActivo")) {
    mostrarContenido();
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  location.reload();
}

function mostrarContenido() {
  document.getElementById("login").style.display = "none";
  document.getElementById("contenidoPrincipal").style.display = "block";
  cargarEstado();
}

// Datos de ramos
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

// Agrupar por semestre
const semestres = {};
ramos.forEach((ramo) => {
  if (!semestres[ramo.semestre]) semestres[ramo.semestre] = [];
  semestres[ramo.semestre].push(ramo);
});

Object.keys(semestres).forEach((sem) => {
  semestres[sem].forEach((ramo, index) => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.style.gridColumn = ramo.semestre;
    div.style.gridRow = index + 1;
    div.innerHTML = `${ramo.nombre}<div class="tooltip">SCT: ${ramo.sct}</div>`;

    div.addEventListener("click", () => {
      div.classList.toggle("aprobado");
      div.classList.remove("pendiente");
      guardarEstado();
    });

    div.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      div.classList.toggle("pendiente");
      div.classList.remove("aprobado");
      guardarEstado();
    });

    malla.appendChild(div);
  });
});

document.getElementById("colorPicker").addEventListener("input", (e) => {
  document.querySelectorAll(".ramo").forEach((r) => {
    r.style.backgroundColor = e.target.value;
  });
});

function agregarNota() {
  const container = document.getElementById("inputs");
  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.max = 7;
  input.placeholder = "Nota";

  const peso = document.createElement("input");
  peso.type = "number";
  peso.min = 1;
  peso.max = 100;
  peso.placeholder = "%";

  container.appendChild(input);
  container.appendChild(peso);
  container.appendChild(document.createElement("br"));
}

function calcularPromedio() {
  const inputs = document.querySelectorAll("#inputs input");
  let total = 0;
  let pesoTotal = 0;

  for (let i = 0; i < inputs.length; i += 2) {
    const nota = parseFloat(inputs[i].value);
    const peso = parseFloat(inputs[i + 1].value);
    if (!isNaN(nota) && !isNaN(peso)) {
      total += nota * (peso / 100);
      pesoTotal += peso;
    }
  }

  if (pesoTotal === 100) {
    document.getElementById("promedioResultado").innerText = `Promedio: ${total.toFixed(2)}`;
  } else {
    document.getElementById("promedioResultado").innerText = "La suma de porcentajes debe ser 100%";
  }
}

function guardarEstado() {
  const estado = {};
  document.querySelectorAll(".ramo").forEach((div, i) => {
    estado[i] = {
      aprobado: div.classList.contains("aprobado"),
      pendiente: div.classList.contains("pendiente"),
    };
  });
  localStorage.setItem("estadoMalla", JSON.stringify(estado));
  actualizarProgreso();
}

function cargarEstado() {
  const estado = JSON.parse(localStorage.getItem("estadoMalla"));
  if (estado) {
    document.querySelectorAll(".ramo").forEach((div, i) => {
      if (estado[i]) {
        if (estado[i].aprobado) div.classList.add("aprobado");
        if (estado[i].pendiente) div.classList.add("pendiente");
      }
    });
  }
  actualizarProgreso();
}

function filtrarRamos() {
  const filtro = document.getElementById("filtroEstado").value;
  document.querySelectorAll(".ramo").forEach((div) => {
    if (filtro === "todos") {
      div.style.display = "flex";
    } else if (div.classList.contains(filtro)) {
      div.style.display = "flex";
    } else {
      div.style.display = "none";
    }
  });
}

function actualizarProgreso() {
  const total = document.querySelectorAll(".ramo").length;
  const completados = document.querySelectorAll(".ramo.aprobado").length;
  const porcentaje = ((completados / total) * 100).toFixed(1);
  document.getElementById("progreso").innerText = `Progreso: ${completados}/${total} (${porcentaje}%)`;
}

function exportarComoImagen() {
  html2canvas(document.getElementById("malla")).then((canvas) => {
    const link = document.createElement("a");
    link.download = "malla_curricular.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

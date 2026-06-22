/* EJERCICIO 1: Cálculo de Cargas Sociales e Impuesto de Renta */

const PORCENTAJE_CARGAS_SOCIALES = 0.1083;

const TRAMOS_RENTA = [
  { limite: 918000,   tasa: 0.00 },
  { limite: 1347000,  tasa: 0.10 },
  { limite: 2364000,  tasa: 0.15 },
  { limite: 4727000,  tasa: 0.20 },
  { limite: Infinity, tasa: 0.25 }
];

function calcularImpuestoRenta(salarioBruto) {
  let impuesto = 0;
  let limiteAnterior = 0;

  for (let i = 0; i < TRAMOS_RENTA.length; i++) {
    const tramo = TRAMOS_RENTA[i];
    if (salarioBruto > limiteAnterior) {
      const base = Math.min(salarioBruto, tramo.limite) - limiteAnterior;
      impuesto += base * tramo.tasa;
      limiteAnterior = tramo.limite;
    } else {
      break;
    }
  }
  return impuesto;
}

function formatoColones(valor) {
  return "₡ " + valor.toLocaleString("es-CR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcularPlanilla() {
  const salarioBruto = parseFloat(document.getElementById("salarioBruto").value);

  if (isNaN(salarioBruto) || salarioBruto <= 0) {
    alert("Por favor ingresa un salario bruto válido.");
    return;
  }

  const cargasSociales = salarioBruto * PORCENTAJE_CARGAS_SOCIALES;
  const impuestoRenta  = calcularImpuestoRenta(salarioBruto);
  const salarioNeto    = salarioBruto - cargasSociales - impuestoRenta;

  
  document.getElementById("montoCargas").textContent = formatoColones(cargasSociales);
  document.getElementById("montoRenta").textContent  = formatoColones(impuestoRenta);
  document.getElementById("montoNeto").textContent   = formatoColones(salarioNeto);
}

/* EJERCICIO 2: Manipulación del DOM */

let parrafoCambiado = false;

function cambiarParrafo() {
  const parrafo = document.getElementById("parrafoDemo");  // id="parrafoDemo"

  if (!parrafoCambiado) {
    parrafo.textContent = "¡El contenido cambió! Esto se logró con document.getElementById() y .textContent.";
    parrafoCambiado = true;
  } else {
    parrafo.textContent = "Este es el párrafo original. Todavía no ha sido modificado.";
    parrafoCambiado = false;
  }
}

/* EJERCICIO 3: Condicional de edad */

function verificarEdad() {
  const edad = parseInt(document.getElementById("edad").value);  // id="edad"
  const resultado = document.getElementById("resultadoEdad");    // id="resultadoEdad"

  if (isNaN(edad) || edad < 0) {
    alert("Por favor ingresa una edad válida.");
    return;
  }

  if (edad > 18) {
    resultado.textContent = "Eres mayor de edad.";
  } else {
    resultado.textContent = "Eres menor de edad.";
  }
}

/* EJERCICIO 4: Arreglo de objetos (estudiantes) */

const estudiantes = [
  { nombre: "María",   edad: 20, nota: 92 },
  { nombre: "Esteban", edad: 22, nota: 78 },
  { nombre: "Daniela", edad: 19, nota: 85 },
  { nombre: "Kevin",   edad: 21, nota: 64 },
  { nombre: "Fabiola", edad: 20, nota: 95 }
];

function renderizarEstudiantes() {
  const tbody = document.getElementById("tablaAlumnos");
  tbody.innerHTML = "";

  estudiantes.forEach(function (estudiante, indice) {
    const fila = document.createElement("tr");
    fila.innerHTML =
      "<td>" + estudiante.nombre + "</td>" +
      "<td>" + estudiante.edad   + "</td>" +
      "<td>" + estudiante.nota   + "</td>";
    tbody.appendChild(fila);
  });

  const sumaNotas = estudiantes.reduce(function (acumulado, estudiante) {
    return acumulado + estudiante.nota;
  }, 0);
  const promedio = sumaNotas / estudiantes.length;

  document.getElementById("promedioNota").textContent = "Promedio del grupo: " + promedio.toFixed(2);
}

renderizarEstudiantes();
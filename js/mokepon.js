const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonTierra = document.getElementById("boton-tierra");
sectionReiniciar.style.display = "none";
const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

let mokepones = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;
let inputCharmander;
let inputSquirtle;
let inputPicachu;
let mascotaJugador;
let VidasJugador = 3;
let VidasEnemigo = 3;

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let charmander = new Mokepon("Charmander", "./assets/charmander.png", 5);
let squirtle = new Mokepon("Squirtle", "./assets/squirtle_1.png", 5);
let picachu = new Mokepon("Picachu", "./assets/picachu.png", 5);

charmander.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" }
);

squirtle.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);

picachu.ataques.push(
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);

mokepones.push(charmander, squirtle, picachu);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
      <p>${mokepon.nombre}</p>
      <img src=${mokepon.foto} alt=${mokepon.nombre} />
    </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputCharmander = document.getElementById("Charmander");
    inputSquirtle = document.getElementById("Squirtle");
    inputPicachu = document.getElementById("Picachu");
  });

  botonMascotaJugador.addEventListener("click", SeleccionarMascotaJugador);
  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonTierra.addEventListener("click", ataqueTierra);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function SeleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";
  sectionSeleccionarAtaque.style.display = "flex";

  if (inputCharmander.checked) {
    spanMascotaJugador.innerHTML = inputCharmander.id;
    mascotaJugador = inputCharmander.id;
  } else if (inputSquirtle.checked) {
    spanMascotaJugador.innerHTML = inputSquirtle.id;
    mascotaJugador = inputSquirtle.id;
  } else if (inputPicachu.checked) {
    spanMascotaJugador.innerHTML = inputPicachu.id;
    mascotaJugador = inputPicachu.id;
  } else {
    alert("Selecciona una mascota");
  }
  extraerAtaques(mascotaJugador);
  SeleccionarMascotaEnemigo();
}
function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function SeleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

  spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
}

function ataqueFuego() {
  ataqueJugador = "FUEGO";
  ataqueAleatorioEnemigo();
}
function ataqueAgua() {
  ataqueJugador = "AGUA";
  ataqueAleatorioEnemigo();
}
function ataqueTierra() {
  ataqueJugador = "TIERRA";
  ataqueAleatorioEnemigo();
}
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "fuego";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "agua";
  } else {
    ataqueEnemigo = "tierra";
  }
  combate();
}
function combate() {
  //COMBATE
  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("EMPATE");
  } else if (
    (ataqueJugador == "fuego" && ataqueEnemigo == "tierra") ||
    (ataqueJugador == "agua" && ataqueEnemigo == "fuego") ||
    (ataqueJugador == "tierra" && ataqueEnemigo == "agua")
  ) {
    crearMensaje("GANASTE");
    triunfos = triunfos + 1;
    VidasEnemigo--;
    spanVidasEnemigo.innerHTML = VidasEnemigo;
  } else {
    crearMensaje("PERDISTE");
    VidasJugador--;
    spanVidasJugador.innerHTML = VidasJugador;
  }
  revisarVidas();
}
function revisarVidas() {
  if (VidasEnemigo == 0) {
    crearMensajeFinal("FELICIDADES GANASTE. 🎉🎊");
  } else if (VidasJugador == 0) {
    crearMensajeFinal("PERDISTE LA PARTIDA. 😪");
  }
}
function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}
function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonTierra.disabled = true;

  sectionReiniciar.style.display = "block";
}
function reiniciarJuego() {
  location.reload();
}
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);

/* Proyecto realizado por: José A. Rodríguez López-->
 * Fecha: 10/10/2022
 */

let pal_adivinar; //Palabra a adivinar.
let pal_aciertos; //Palabra con los aciertos.
let pal_fallos = ""; //Palabra con los fallos.
const MAX_ERRORES = 6;  //Máximo número de errores. 
let errores = 0;  //Contador de errores.¨

window.onload = function () {
  input_adivinar.select();
}

/*Añade escuchador del evento de perdida del foco el <input id="input_adivinar">*/
input_adivinar.addEventListener('blur', empiezaJuego, false)

/*Añade escuchador del evento de keypress del <input id="input_letra">*/
input_letra.addEventListener('keyup', comprobarLetra, false)

/*Añade escuchador del evento click del <input id="input_reiniciar">*/
input_reiniciar.addEventListener('click', reiniciarJuego, false)

/*Captura el evento de onclick en la <p id="cerrar_navegador">*/
cerrar_navegador.onclick = function () {
  window.close()
}

function reiniciarJuego() {
  pal_adivinar = ""; //Palabra a adivinar.
  pal_aciertos = ""; //Palabra con los aciertos.
  pal_fallos = ""; //Palabra con los fallos.
  errores = 0;  //Contador de errores.
  input_reiniciar.hidden = true;
  input_aciertos.value = pal_aciertos;
  input_adivinar.value = pal_adivinar;
  input_fallos.value = pal_fallos;
  input_letra.readOnly = false;
  input_adivinar.readOnly = false;
  notificaciones.innerHTML = "";
  input_adivinar.select();
  input_letra.value = "";
}

/*Función que da comienzo a la ejecucion del juego*/
function empiezaJuego(evento) {
  pal_adivinar = input_adivinar.value.trim().toUpperCase();
  if (pal_adivinar.length != 0) {
    input_adivinar.readOnly = true;
    pal_errores = ""; //Iniciliza la palabra con los errores.

    pal_aciertos = pal_adivinar.replace(/[a-záéíóúü]/gi, "-");
    input_aciertos.value = pal_aciertos;
    input_letra.readOnly = false;
    input_letra.select();
  }else{
    reiniciarJuego();
  }
}

/*Comprueba la letra introducida está dentro de la cadena a adivinar y realiza las acciones oportunas*/
function comprobarLetra() {
  let letra_buscar = input_letra.value.toUpperCase();
  if (validarCaracterIntroducido(letra_buscar)) {
    notificaciones.innerHTML = "";
    if (pal_adivinar.includes(letra_buscar)) {
      if (!pal_aciertos.includes(letra_buscar)) {
        for (let index = 0; index < pal_adivinar.length; index++) {
          if (pal_adivinar[index] === letra_buscar) {
            pal_aciertos = pal_aciertos.reemplazarCaracter(index, letra_buscar);
          }
        }
        input_aciertos.value = pal_aciertos;
      } else {
        notificaciones.innerHTML = "<h2>La letra ya ha sido evaluada</h2>";
      }
    } else {
      if (pal_fallos.includes(letra_buscar)) {
        notificaciones.innerHTML = "<h2>La letra ya ha sido evaluada</h2>";
      } else {
        pal_fallos = pal_fallos + letra_buscar + " ";
        input_fallos.value = pal_fallos;
        errores++;
        mostrarAhorcado(errores);
      }
    }
    input_letra.value="";
    input_letra.select();
    if (pal_aciertos.localeCompare(pal_adivinar) == 0) {
      notificaciones.innerHTML = "<h2>Enhorabuena, ha averiguado la palabra oculta</h2>";
      input_reiniciar.hidden = false;
    }
    if (errores === MAX_ERRORES) {
      notificaciones.innerHTML = "<h2>No ha averiguado la palabra oculta</h2>";
      input_letra.readOnly = true;
      input_reiniciar.hidden = false;
    }
  }
}


String.prototype.reemplazarCaracter = function (index, caracter) {
  let caracteres = this.split('');
  caracteres[index] = caracter;
  return caracteres.join('');
}

function mostrarAhorcado(errores) {
  switch (errores) {
    case 1:
      ahorcado_0.hidden = true;
      ahorcado_1.hidden = false
      break;
    case 2:
      ahorcado_1.hidden = true;
      ahorcado_2.hidden = false
      break;
    case 3:
      ahorcado_2.hidden = true;
      ahorcado_3.hidden = false
      break;
    case 4:
      ahorcado_3.hidden = true;
      ahorcado_4.hidden = false
      break;
    case 5:
      ahorcado_4.hidden = true;
      ahorcado_5.hidden = false
      break;
    case 6:
      ahorcado_5.hidden = true;
      ahorcado_6.hidden = false
      input_reiniciar.hidden = false;
      break;
    default:
      break;
  }
}

/*Valida si el caracter introducido es un caracter alfabético.*/
function validarCaracterIntroducido(caracter) {
  if (caracter >= "A" && caracter <= "Z" || caracter === "Ñ" || caracter === "Á" || caracter === "É" || caracter === "Í" || caracter === "Ó" || caracter === "Ú" || caracter === "Ü") {
    return true;
  } else {
    return false;
  }
}


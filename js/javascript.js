/* Proyecto realizado por: José A. Rodríguez López-->
 * Fecha: 10/10/2022
 */

let pal_adivinar; //Palabra a adivinar.
let pal_aciertos; //Palabra con los aciertos.
let pal_fallos=""; //Palabra con los fallos.
const MAX_ERRORES = 6;  //Máximo número de errores. 
let errores = 0;  //Contador de errores.

/*Añade escuchador del evento de perdida del foco el <input id="input_adivinar">*/
input_adivinar.addEventListener('blur', empiezaJuego, false)

/*Añade escuchador del evento de keypress del <input id="input_letra">*/
input_letra.addEventListener('keyup', comprobarLetra, false)

/*Captura el evento de onclick en la <p id="cerrar_navegador">*/
cerrar_navegador.onclick = function () {
  window.close()
}

/*Función que da comienzo a la ejecucion del juego*/
function empiezaJuego(evento) {
  input_adivinar.readOnly = true;
  pal_errores = ""; //Iniciliza la palabra con los errores.
  pal_adivinar = input_adivinar.value.trim().toUpperCase();
  pal_aciertos = pal_adivinar.replace(/[a-z]/gi, "-");
  input_aciertos.value = pal_aciertos;
  input_letra.select();
}

function comprobarLetra() {
  let letra_buscar = input_letra.value.toUpperCase();
  if (letra_buscar >= "A" && letra_buscar <= "Z" || letra_buscar=="N" || letra_buscar=="Á" || letra_buscar=="É" || letra_buscar=="Í" || letra_buscar=="Ó" || letra_buscar=="Ú"){
    notificaciones.innerHTML="";
    if (pal_adivinar.includes(letra_buscar)) {
      for (let index = 0; index < pal_adivinar.length; index++) {
        if (pal_adivinar[index] === letra_buscar)
          pal_aciertos = pal_aciertos.reemplazarCaracter(index, letra_buscar);
      }
      input_aciertos.value = pal_aciertos;
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
      break;
    default:
      break;
  }
}
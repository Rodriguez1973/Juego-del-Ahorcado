/* Proyecto realizado por: José A. Rodríguez López-->
 * Fecha: 10/10/2022
 */

let pal_adivinar //Palabra a adivinar.
let pal_aciertos //Palabra con los aciertos.
let pal_fallos = '' //Palabra con los fallos.
const MAX_ERRORES = 6 //Máximo número de errores.
let errores = 0 //Contador de errores.
let valido = true //Bandera que controla si la palabra a adivinar es válida.
let jugando = false //Bandera que controla si se ha empezado una partida.

/*Establece el cursor en el input_adivinar, al finalizar la carga en el navegador de la página web*/
window.onload = function () {
  input_adivinar.select()
}

/*Añade escuchador del evento de perdida del foco el <input id="input_adivinar">*/
input_adivinar.addEventListener('blur', empiezaJuego, false)

/*Añade escuchador del evento de keypress del <input id="input_letra">*/
input_letra.addEventListener('keyup', comprobarLetra, false)

/*Añade escuchador del evento click del <input id="input_reiniciar">*/
input_reiniciar.addEventListener('click', reiniciarJuego, false)

/*Captura el evento onclick en la etiqueta <p id="cerrar_navegador">*/
cerrar_navegador.onclick = function () {
  window.close()
}

/*Función de reinicio del juego. Inicializa las cadenas de texto y las propiedades de los elementos html*/
function reiniciarJuego() {
  jugando = false //No se ha iniciado una partida
  pal_adivinar = '' //Palabra a adivinar.
  pal_aciertos = '' //Palabra con los aciertos.
  pal_fallos = '' //Palabra con los fallos.
  errores = 0 //Contador de errores.
  input_reiniciar.hidden = true
  input_aciertos.value = pal_aciertos
  input_adivinar.value = pal_adivinar
  input_fallos.value = pal_fallos
  input_letra.readOnly = false
  input_adivinar.readOnly = false
  input_adivinar.select()
  input_letra.value = ''
  ahorcado_0.hidden = false
  ahorcado_1.hidden = true
  ahorcado_2.hidden = true
  ahorcado_3.hidden = true
  ahorcado_4.hidden = true
  ahorcado_5.hidden = true
  ahorcado_6.hidden = true
  if (valido) {
    notificaciones.innerHTML = ''
  }
}

/*Función que da comienzo a la ejecucion del juego*/
function empiezaJuego(evento) {
  //No se ha iniciado un juego.
  if (!jugando) {
    valido = true
    notificaciones.innerHTML = ''
    pal_adivinar = input_adivinar.value.trim().toUpperCase()

    //Comprueba si la palabra a adivinar tiene caracteres.
    if (pal_adivinar.length != 0) {
      //Impide la edición en el input_adivinar durante la partida
      input_adivinar.readOnly = true
      //Iniciliza la palabra con los errores.
      pal_errores = ''
      //Reemplaza los caracteres de la expresión regular por guiones.
      pal_aciertos = pal_adivinar.replace(/[a-záéíóúü]/gi, '-')
      //Comprueba que en la cadena existen guiones con lo que existen caracteres a adivinar.
      if (pal_aciertos.includes('-')) {
        input_aciertos.value = pal_aciertos
        input_letra.readOnly = false
        jugando = true
        input_letra.select()
      } else {
        valido = false
        notificaciones.innerHTML = '<h2>La palabra a adivinar no es válida</h2>'
        reiniciarJuego()
      }
    } else {
      reiniciarJuego()
    }
  }
}

/*Comprueba la letra introducida está dentro de la cadena a adivinar y realiza las acciones oportunas*/
function comprobarLetra() {
  let letra_buscar = input_letra.value.toUpperCase()
  //Verifica que el caracter a buscar sea válido A-Z, Ñ, Á, É, Í, Ó, Ú, Ü.
  if (validarCaracterIntroducido(letra_buscar)) {
    notificaciones.innerHTML = ''
    //Comprueba que el caracter a buscar se encuentra en la palabra a adivinar.
    if (pal_adivinar.includes(letra_buscar)) {
      //Comprueba que no sea un caracter que ya se ha evaluado.
      if (!pal_aciertos.includes(letra_buscar)) {
        //Recorre la palabra a adivinar buscando las posiciones del caracter a buscar y lo sustituye en la palabra de aciertos.
        for (let index = 0; index < pal_adivinar.length; index++) {
          if (pal_adivinar[index] === letra_buscar) {
            pal_aciertos = pal_aciertos.reemplazarCaracter(index, letra_buscar)
          }
        }
        input_aciertos.value = pal_aciertos
      } else {
        notificaciones.innerHTML = '<h2>La letra ya ha sido evaluada</h2>'
      }
    } else {
      //Letra ya evaluada.
      if (pal_fallos.includes(letra_buscar)) {
        notificaciones.innerHTML = '<h2>La letra ya ha sido evaluada</h2>'
        //El caracter no se encuentra en la palabra a adivinar.
      } else {
        pal_fallos = pal_fallos + letra_buscar + ' '
        input_fallos.value = pal_fallos
        errores++
        //Muestra imagen del ahorcado.
        mostrarAhorcado(errores)
      }
    }
    input_letra.value = ''
    input_letra.select()
    //Compara si son iguales la palabra a adivinar con la de aciertos.
    if (pal_aciertos.localeCompare(pal_adivinar) == 0) {
      notificaciones.innerHTML =
        '<h2>Enhorabuena, ha averiguado la palabra oculta</h2>'
      input_letra.readOnly = true
      input_reiniciar.hidden = false
    }
    //Comprueba si se ha alcanzado el número máximo de errores.
    if (errores === MAX_ERRORES) {
      input_letra.readOnly = true
      notificaciones.innerHTML = '<h2>No ha averiguado la palabra oculta</h2>'
      input_letra.readOnly = true
      input_reiniciar.hidden = false
    }
  }
}

/*Función que reemplaza un caracter en un determinado indice de una cadena de caracteres*/
String.prototype.reemplazarCaracter = function (index, caracter) {
  let caracteres = this.split('')
  caracteres[index] = caracter
  return caracteres.join('')
}

/*Función que muestra las imagenes del ahorcado en función del número de errores*/
function mostrarAhorcado(errores) {
  switch (errores) {
    case 1:
      ahorcado_0.hidden = true
      ahorcado_1.hidden = false
      break
    case 2:
      ahorcado_1.hidden = true
      ahorcado_2.hidden = false
      break
    case 3:
      ahorcado_2.hidden = true
      ahorcado_3.hidden = false
      break
    case 4:
      ahorcado_3.hidden = true
      ahorcado_4.hidden = false
      break
    case 5:
      ahorcado_4.hidden = true
      ahorcado_5.hidden = false
      break
    case 6:
      ahorcado_5.hidden = true
      ahorcado_6.hidden = false
      input_reiniciar.hidden = false
      input_reiniciar.focus()
      break
    default:
      break
  }
}

/*Valida si el caracter introducido es un caracter alfabético.*/
function validarCaracterIntroducido(caracter) {
  if (
    (caracter >= 'A' && caracter <= 'Z') ||
    caracter === 'Ñ' ||
    caracter === 'Á' ||
    caracter === 'É' ||
    caracter === 'Í' ||
    caracter === 'Ó' ||
    caracter === 'Ú' ||
    caracter === 'Ü'
  ) {
    return true
  } else {
    return false
  }
}

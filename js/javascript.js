/* Proyecto realizado por: José A. Rodríguez López-->
 * Fecha: 10/10/2022
 */

/*Añade escuchador del evento al despulsar una tecla en el <input id="cadena_procesar">*/
cadena_procesar.addEventListener('keyup', realizarConversion, false)

/*Captura el evento de onclick en la <p id="cerrar_navegador">*/
cerrar_navegador.onclick = function () {
  window.close()
}

/*Función que realiza la conversión del caracter al idiograma chino en la cadena.*/
function realizarConversion(evento) {
  
  //console.log(evento.keyCode) //Depuracion. Imprime el código de la tecla en consola.
  
  //Filtra las teclas que son válidas.
  //Solo tiene en cuenta para la conversion las teclas de las letras y son de las que muestra su información.
  if ((evento.keyCode >= 65 && evento.keyCode <= 90) || evento.keyCode == 192) {
    let cadena = cadena_procesar.value
    //Si la cadena tiene caracteres.
    if (cadena.length >= 0) {
      //Código UNICODE del caracter.
      let codigo_caracter = cadena.charCodeAt(cadena.length - 1)
      let caracter = cadena.charAt(cadena.length - 1)
      //console.log(evento.keyCode+" "+codigo_caracter+" "+caracter); //Ayuda a la depuración.
      //Muestras la información generada.
      mostrarInformacion(codigo_caracter, caracter, evento)
      caracter = String.fromCharCode(parseInt('0x' + codigo_caracter + 'e8'))
      //Realiza la conversión.
      cadena = cadena.substring(0, cadena.length - 1) + caracter
      //Actualiza la cadena dentro del input.
      cadena_procesar.value = cadena
    }
  }
}

/*Función que muestra la información generada*/
function mostrarInformacion(codigo, cadena, evento) {
  let texto = contenedor_3.innerHTML
  //Muestras la información generada.
  texto =
    texto +
    '<p>-----------------------------------</p>' +
    '<p>Tipo de evento: ' +
    evento.type +
    '</p>' +
    '<p>Propiedad KeyCode: ' +
    codigo +
    '</p>' +
    '<p>Carácter pulsado: ' +
    cadena +
    '</p>'
  contenedor_3.innerHTML = texto
}

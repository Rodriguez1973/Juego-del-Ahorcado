/* Proyecto realizado por: José A. Rodríguez López-->
 * Fecha: 10/10/2022
 */

let pal_adivinar; //Palabra a adivinar.
let pal_aciertos; //Palabra con los aciertos.
let pal_errores; //Palabra con los errores.
const MAX_ERRORES=6;  //Máximo número de errores. 
let errores=0;  //Contador de errores.

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
  input_adivinar.readOnly=true;
  pal_errores=""; //Iniciliza la palabra con los errores.
  pal_adivinar=input_adivinar.value.trim().toUpperCase();
  pal_aciertos=pal_adivinar.replace(/[a-z]/gi,"-");
  input_aciertos.value=pal_aciertos;
}  

function comprobarLetra(){
  
    
    let letra_buscar=input_letra.value.toUpperCase();
    if(pal_adivinar.includes(letra_buscar)){
      for (let index = 0; index < pal_adivinar.length; index++) {
        if(pal_adivinar[index]===letra_buscar)
          pal_aciertos=pal_aciertos.reemplazarCaracter(index, letra_buscar);
      }
      input_aciertos.value=pal_aciertos;
    }else{
      errores++;
      pal_errores=pal_errores+letra_buscar+" ";
      input_errores.value=pal_errores;
    }
  
}

String.prototype.reemplazarCaracter=function(index, caracter){
  let caracteres=this.split('');
  caracteres[index]=caracter;
  return caracteres.join('');
}
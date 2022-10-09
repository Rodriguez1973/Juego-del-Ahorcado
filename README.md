# Juego del ahorcado
Se trata de implementar una página web que desarrolle el juego del ahorcado.

Se trata de aceptar en un input de type=”text” la palabra a buscar, generar en otro input tanto guiones como caracteres tenga la palabra a adivinar.

Para generar los guiones vamos a utilizar el método replace con una expresión regular.
 Expresiones regulares https://www.freecodecamp.org/espanol/news/javascript-string-replace-ejemplos-con-expresiones-regulares              

Este código reemplaza cualquier carácter entre a-z.
/g hace que se repita con todos los caracteres del string.
/i que no diferencie entre mayúsculas y minúsculas
                guiones = guiones.replace(/[a-z]/gi, "-");

En un tercer input hay que teclear el carácter a adivinar. Si existe reemplazarlo en la posición correspondiente del input de guiones.

Si no existe añadirlo a un cuarto input donde se visualizan los errores.
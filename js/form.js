var form = document.getElementById("form-contact");
var how_know = document.getElementsByName("how_know");

var inputOtros;
var visibilityInputOtros = false;

//Input Otros
for (var i = 0; i < how_know.length; i++ ){
    how_know[i].addEventListener("click",function(event){
        if (this.value == "otros"){
            //si no existe el input lo creo
            if (!inputOtros){
                inputOtros = document.createElement("input");
                inputOtros.setAttribute("id","otros");
                inputOtros.setAttribute("type","text");
                inputOtros.setAttribute("name","otros");
                inputOtros.setAttribute("placeholder","¿De que otra forma nos conocistes?");
                inputOtros.setAttribute("required","");
                visibilityInputOtros = true;
                this.parentNode.parentNode.appendChild(inputOtros);
            }
       
        }else  if ((this.value == "internet") || (this.value == "tv")){
            //si selecciono cualquier otro radio borro inputOtros.
            if (document.getElementById("otros")){
            //si tiene la clase error la borro.
                if (inputOtros.classList.contains("has_error")){
                    inputOtros.classList.remove("has_error");
                }
                this.parentNode.parentNode.removeChild(inputOtros);
                visibilityInputOtros = false;
            }
        }
    }) 
}


form.addEventListener("submit",function(event){

    var inputNombre = document.getElementById("nombre");
    var inputEmail = document.getElementById("email");
    var inputTelefono = document.getElementById("telefono");
    var mensaje = document.getElementsByName("mensaje")[0];
    var error = document.getElementById("error");

    deleteMsgError();
  
    //Nombre
    if (inputNombre.checkValidity() == false){
       
        event.preventDefault();

        var textError = document.createTextNode("Introduzca un nombre válido");
        var pError = document.createElement("p");
        pError.setAttribute("class","msg_error");
        pError.appendChild(textError);
        error.appendChild(pError);

        inputNombre.setAttribute("class","has_error");
        
        return false;
          
    }

    //Email
    if (inputEmail.checkValidity() == false){
       
        event.preventDefault();

        var textError = document.createTextNode("Introduzca un email válido");
        var pError = document.createElement("p");
        pError.setAttribute("class","msg_error");
        pError.appendChild(textError);
        error.appendChild(pError);

        inputEmail.setAttribute("class","has_error");
        
        return false;
          
    }
    
    //Telefono
    if (inputTelefono.checkValidity() == false){
       
        event.preventDefault();
        inputTelefono.setAttribute("class","has_error");
        var textError = document.createTextNode("Introduzca un teléfono válido (9 dígitos) y el prefijo opcional");
        var pError = document.createElement("p");
        pError.setAttribute("class","msg_error");
        pError.appendChild(textError);
        error.appendChild(pError);
       
        return false;
          
    }

    //Como nos conocisteis -> Otros
    
    if (visibilityInputOtros){
    if (inputOtros.checkValidity()== false){

            event.preventDefault();
            inputOtros.setAttribute("class","has_error");
            var textError = document.createTextNode("Si selecciona Otros, debes especificar el valor");
            var pError = document.createElement("p");
            pError.setAttribute("class","msg_error");
            pError.appendChild(textError);
            error.appendChild(pError);
       
        return false;
    }
    }
    

    //mensaje    
    if (!countWords(mensaje.value,150)){
        
        event.preventDefault();
        mensaje.setAttribute("class","has_error");
        var textError = document.createTextNode("Introduzca un mensaje (max. 150 palabras)");
        var pError = document.createElement("p");
        pError.setAttribute("class","msg_error");
        pError.appendChild(textError);
        error.appendChild(pError);
       
        return false;
    }



function countWords(cadena, maxWord){
    //eliminamos los especios varios espacios en blanco y hacemos split.
    var result = cadena.trim().split(" ");
    if ((result.length > 1) && (result.length <= maxWord)){
        return true;
    }if (result.length == 1 && (result[0] !=""))
    //mensaje de una sola palabra
        return true;
    else{
        return false;
    }
}


function deleteMsgError(){
    
    var elementsError = document.getElementsByClassName("has_error");
    document.getElementById("error").innerHTML = ""; //inicializo el div sin errores.

    //si existen clases con error los borramos.
    if ( elementsError.length > 0){
        for (var i = 0; i < elementsError.length; i++) {
            elementsError[i].classList.remove("has_error");
        }     
    }
}
});
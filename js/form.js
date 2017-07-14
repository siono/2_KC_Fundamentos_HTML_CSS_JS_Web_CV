var form = document.getElementById("form-contact");
var how_know = document.getElementsByName("how_know");
var enviarFormulario = document.getElementById("sendNewClient");

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



enviarFormulario.addEventListener("click", function (event) {

    var inputNombre = document.getElementById("nombre");
    var inputEmail = document.getElementById("email");
    var inputTelefono = document.getElementById("telefono");
    var mensaje = document.getElementsByName("mensaje")[0];

    deleteMsgError();
  
    //Nombre
    if (inputNombre.checkValidity() == false){
       
        event.preventDefault();
        createMsg("error","Introduzca un nombre válido");
        inputNombre.setAttribute("class","has_error");
     
        return false;
          
    }

    //Email
    if (inputEmail.checkValidity() == false){
       
        event.preventDefault();
        createMsg("error","Introduzca un email válido");
        inputEmail.setAttribute("class","has_error");
       
        return false;
          
    }
    
    //Telefono
    if (inputTelefono.checkValidity() == false){
       
        event.preventDefault();
        createMsg("error","Introduzca un teléfono válido (9 dígitos) y el prefijo opcional");
        inputTelefono.setAttribute("class","has_error");
       
        return false;
          
    }

    //Como nos conocisteis -> Otros
    if (visibilityInputOtros){
    if (inputOtros.checkValidity()== false){

            event.preventDefault();
            createMsg("error","Si selecciona Otros, debes especificar el valor");
            inputOtros.setAttribute("class","has_error");

            return false;
    }
        document.getElementById("how_know_3").value = inputOtros.value; 
        inputOtros.setAttribute("disabled","disabled");
    }
    

    //mensaje    
    if (!countWords(mensaje.value,150)){
        
        event.preventDefault();
        createMsg("error","Introduzca un mensaje (max. 150 palabras)");
        mensaje.setAttribute("class","has_error");
        
        return false;
    }

    event.preventDefault();
    createClient(document.getElementById("nombre").value, document.getElementById("email").value, document.getElementById("telefono").value,document.getElementsByName("how_know")[0].value, document.getElementById("mensaje").value );
    window.setTimeout(function(){
        
        createMsg("success","¡Formulario enviado correctamente! En breves, nos pondremos en contacto contigo.");
        form.reset();

    },3000);

});

function createMsg(type,msg){
    var divContainer = document.getElementById(type);
    var textMsg = document.createTextNode(msg);
    var p = document.createElement("p");
    if (type=="success"){
        p.setAttribute("class","msg_success");
    }
    if (type=="error"){
        p.setAttribute("class","msg_error");
    }
    p.appendChild(textMsg);
    divContainer.appendChild(p);
}


function countWords(cadena, maxWord){
    //eliminamos espacios duplicados y separamos por palabras.
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

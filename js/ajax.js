var clients = [];

var drawClients = function() {
	$('#clientContainer').empty();

	if (clients.length == 0) {
		$('#clientContainer').append("<li>No hay clientes con preguntas</li>");
	} else {
		var contentToAdd = '<table><tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th>¿Como nos conoció?</th><th>Mensaje</th></tr><tr>';
		for (var i = 0; i < clients.length; i++) {
            contentToAdd += '<tr><td class="clients-item">' + clients[i].nombre + '</td>'+ 
            '<td class="clients-item">' + clients[i].email + '</td>'+
            '<td class="clients-item">' + clients[i].telefono + '</td>'+
            '<td class="clients-item">' + clients[i].how_know + '</td>'+
            '<td class="clients-item">' + clients[i].mensaje + '</td>'+           
            '<td class="clients-item-buttom"><a class="btn btn-danger deleteClient" data-clientId="'+ clients[i].id + '"><i class="fa fa-trash-o" aria-hidden="true"></i></a><a class="btn btn-send" href="mailto:'+clients[i].email+'?Subject=Contestación para ' +clients[i].nombre+ '"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></a></td></tr>'
            
        }


        contentToAdd+='</table>'
		$('#clientContainer').append(contentToAdd);
	}
}

var getClients = function () {
    var XHR = new XMLHttpRequest();
    XHR.open("GET","http://localhost:8000/api/users",true);
    XHR.setRequestHeader("Content-Type", "application/json");

    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4) {
            clients = JSON.parse(XHR.responseText);
            drawClients();
        } else if (XHR.readyState === 4 && XHR.status === 400) {
            console.log("Página no encontrada");
        }
    }

    XHR.send();
}

getClients();


var createClient = function (nombre,email,telefono,conocisteis,mensaje) {
    var XHR = new XMLHttpRequest();
    XHR.open("POST", "http://localhost:8000/api/users", true);
    XHR.setRequestHeader("Content-Type", "application/json");

    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4) {
            clients.push(JSON.parse(XHR.responseText));
        } else if (XHR.readyState === 4 && XHR.status === 404) {
            console.log("Página no encontrada");
        }
    }

    XHR.send(JSON.stringify({"nombre": nombre, "email": email, "telefono": telefono, "how_know": conocisteis, "mensaje": mensaje }));
}



var deleteClient = function (id) {
    var XHR = new XMLHttpRequest();
    XHR.open("DELETE", "http://localhost:8000/api/users/"+id, true);
    XHR.setRequestHeader("Content-Type", "application/json");

    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4) {
            //window.alert("Client deleted!");
            //TODO: confirmar borrado con mensaje OK-CANCEL.
            getClients();
        } else if (XHR.readyState === 4 && XHR.status === 404) {
            console.log("Página no encontrada");
        }
    }

    XHR.send();
}

$(document).on('click', '.deleteClient', function(){
    var id = $(this).attr('data-clientid');
	deleteClient(id);
});

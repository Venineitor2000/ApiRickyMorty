//        var url = "https://jsonplaceholder.typicode.com/posts/1" + "?nombre=" + encodeURIComponent(labelNombre.value) + "&correo=" + encodeURIComponent(labelCorreo.value) + "&password=" + encodeURIComponent(labelpassword.value) + "&edad=" + encodeURIComponent(labelEdad.value) + "&telefono=" + encodeURIComponent(labelTelefono.value) + "&direccion=" + encodeURIComponent(labeldireccion.value) + "&codigo_postal=" + encodeURIComponent(labelcodigo_postal.value) + "&dni=" + encodeURIComponent(labelDni.value);
var termino = true;
function MostrarDatos(respuesta)
{
    var imagen;
    var nombre;
    var estado;
    var especie;
    var tipo;
    var genero;
    console.log(respuesta);
    respuesta.results.forEach(function(item) {
        
        imagen = item.image;
        nombre = item.name;
        estado = item.status;
        especie = item.species;
        tipo = item.type;
        genero = item.gender;
        if(tipo == "")
        tipo = " ----"
        var personaje = "<li><img src = " + imagen + "><div>Nombre:"+ nombre +"</div><div>Estado:"+ estado +"</div><div>Especie: "+ especie +"</div><div>Tipo:"+ tipo +"</div><div>Genero:"+ genero +"</div> </li>";
        document.querySelector("main ul").innerHTML += personaje;
      });
      
    
}





    function ObtenerPersonajes(url)
    {
        termino = false;
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            MostrarDatos(json);
            if (json.info.next) {
                ObtenerPersonajes(json.info.next);
              }
            else{
                termino = true;
            }
              
        } );
    }
    
    


    function MostrarTodosLosPersonajes()
    {
        if(termino == false)
        {
            alert("Aun no se terminaron de cargar los resultados anteriores, espere por favor");
            return;
        }
        
        document.querySelector("main ul").innerHTML = "";
        ObtenerPersonajes("https://rickandmortyapi.com/api/character/?page=1");
    }

    function MostrarPersonajesFiltrados()
    {
        if(termino == false)
        {
            alert("Aun no se terminaron de cargar los resultados anteriores, espere por favor");
            return;
        }
        
        document.querySelector("main ul").innerHTML = "";
        var nombre =document.querySelector("input[name = 'name']").value;
        var estado =document.querySelector("input[name = 'status']").value;
        var especie =document.querySelector("input[name = 'species']").value;
        var tipo =document.querySelector("input[name = 'type']").value;
        var genero =document.querySelector("input[name = 'gender']").value;
        var urlNombre = "name="+ nombre;
        var urlEstado = "status="+ estado;
        var urlEspecie = "species="+ especie;
        var urlTipo = "type="+ tipo;
        var urlGenero = "gender="+ genero;
        
        if(nombre == "" && estado == "" && especie == "" && tipo == "" && genero == "")
            ObtenerPersonajes("https://rickandmortyapi.com/api/character");
        else
            {
                url = "https://rickandmortyapi.com/api/character/?";
                if(nombre !== "")
                    url += urlNombre + "&"
               if(estado !== "")
                    url += urlEstado + "&"
                if(especie !== "")
                    url += urlEspecie + "&"
                if(tipo !== "")
                    url += urlTipo + "&"
                if(genero !== "")
                    url += urlGenero + "&"
                url.slice(0, -1); //Le borro el & sobrante

                ObtenerPersonajes(url);
            }
        
    }
    


            
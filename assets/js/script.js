
const btnBuscar = $("#btn-buscar");
const input = $("input");

function SuperHero(){
    $.ajax({
        url: `https://superheroapi.com/api.php/10225928059845850/${input.val()}`,
        type: 'GET',
        dataType: 'json',
        success: function(data){
            //si el id no posee información en la API se muestra un mensaje
            if (data.response == "error"){
                alert('ID de SuperHeroe no encontrado')
                return false
            }
            else{
                //destructuring data
                let {name: nombre} = data 
                let {url: urlImagen} = data.image
                let {publisher: publicado, "first-appearance": debut, alignment: alineamiento, "full-name": nombreReal} = data.biography
                let {occupation: ocupacion} = data.work
                let {height: altura, weight: peso} = data.appearance
                let {"group-affiliation": conexiones} = data.connections

                $("#info-img").attr('src',`${urlImagen}`)
                $("#info-nombre").html(nombre);
                $("#info-nombreReal").html(`<i>Nombre real: </i>${nombreReal}`)
                $("#info-conexiones").html(`<i>Conexiones: </i>${nombreReal}`)
                $("#info-publicado").html(`<i>Publicado por</i>: ${publicado}`)
                $("#info-ocupacion").html(`<i>Ocupación</i>: ${ocupacion}`)
                $("#info-debut").html(`<i>Primera aparición</i>: ${debut}`)

                alturahtml = "<i>Altura</i>: " + ((altura[1] == "0 cm")? "-" : altura[1]) //filtro para cuando no hay información de altura
                $("#info-altura").html(alturahtml)

                pesohtml = "<i>Peso</i>: " + ((peso[1] == "0 kg")? "-" : peso[1]) //filtro para cuando no hay información de altura
                $("#info-peso").html(pesohtml)

                $("#info-alianzas").html(`<i>Alianzas</i>: ${conexiones}`)
                $("#info-alineamiento").html(`<i>Alineamiento</i>: ${alineamiento}`)

                let {powerstats} = data;
                let dataPointsSH = []
                let powstatsArray = Object.entries(powerstats) 
                powstatsArray.forEach(([key, value]) => { 
                    dataPointsSH.push({y: parseInt(value), label: key})
                })
            }
        },
        error: function(error){
            alert("Error de comunicación");
            console.log(error)
        }
    })
}
//validación usando números, acepta solo enteros positivos y entrega true o false
function validar(input){
    let num = Number(input);
    return(Number.isInteger(num) && (num > 0))
}


btnBuscar.click(()=>{
    validar(input.val())
    ? SuperHero()
    : (alert("ID ingresado no válido"),input.val("")) 
})

input.on("keyup", (e)=>{
    if (e.keyCode == 13){
        btnBuscar.click()
    }
})

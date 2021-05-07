let urlDolar = {
    'Oficial': 'https://mercados.ambito.com/dolar/oficial/variacion',
    'Blue': 'https://mercados.ambito.com/dolar/informal/variacion',
    'Mayorista': 'https://mercados.ambito.com/dolar/mayorista/variacion',
    'Futuro': 'https://mercados.ambito.com/dolarfuturo/variacion'
}

//var urlLiqui='https://mercados.ambito.com/dolarrava/cl/variacion'
//var urlTurista='https://mercados.ambito.com/dolarturista/variacion';
//var urlMep='https://mercados.ambito.com/dolarrava/mep/variacion';


/**
 * Traer valores del dolar desde mercados ambito
 * @param {object} urlDolar
 */
const obtenerValores = (urlDolar) => {
    console.log('cargando');
    Object.entries(urlDolar).map(array => {
        let tipo = array[0];
        let url =array[1];
        let cargando = document.getElementById('divCargando')
        let divCotizacion = document.getElementById('cuerpoCotizacion')
        divCotizacion.setAttribute("hidden",true)
        cargando.removeAttribute("hidden")
        fetch (url).then(x => x.json()).then(response => {
            insertarValores(tipo,response)
        }).finally(()=>{
            cargando.setAttribute("hidden",true)
            divCotizacion.removeAttribute("hidden")
        })
    })
}

const insertarValores = (tipo,obj) => {
    let elemFecha = document.getElementById(`fechaAct${tipo}`)
    let elemCompra = document.getElementById(`compra${tipo}Valor`)
    let elemVenta = document.getElementById(`venta${tipo}Valor`)
    let elemSimbolo = document.getElementById(`simbolo${tipo}`)
    let elemVariacion = document.getElementById(`variacion${tipo}`)
    elemFecha.innerText = obj.fecha
    elemCompra.innerText = obj.compra
    elemVenta.innerText = obj.venta
    elemVariacion.innerText = obj.variacion
    cambiarSimbolo(elemSimbolo,elemVariacion,obj['class-variacion'])
    //elemSimbolo.classList.remove()
}

const cambiarSimbolo = (simbolo,variacion,clase) =>{
    if(clase == 'down'){
        //Menor
        simbolo.className = "fas fa-arrow-down down"
        variacion.className = "down"
    }else if(clase == 'equal'){
        //Igual
        simbolo.className = "fas fa-equals equal"
        variacion.className = "equal"
    }else{
        //Mayor
        simbolo.className = "fas fa-arrow-up up"
        variacion.className = "up"
    }
}


window.onload = () => {
    let templateCotizacion = document.getElementById('templateCotizacion');
    let appCotizacion = document.getElementById('appCotizacionExtension');
    appCotizacion.innerHTML = templateCotizacion.innerHTML;
    if(templateCotizacion.innerHTML != ""){
        templateCotizacion.innerHTML = "";
    }
    appCotizacion.style.height = "394px";
    appCotizacion.style.width = "300px";


    const btnActualizar = document.getElementById('formActualizar')

    btnActualizar.onclick = (e) => {
        e.preventDefault();
        obtenerValores(urlDolar);
    }

    obtenerValores(urlDolar);
}
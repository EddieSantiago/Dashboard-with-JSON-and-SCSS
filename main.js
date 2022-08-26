//Importamos JSON, con assert especificamos el tipo del archivo con assert
import data from "./data.json" assert { type: 'json' };

//Obtenemos elementos
const optionsContainer = document.querySelector(".profile__options");

const timeDataSelected = {
    type: "",
    current: 0,
    previous: 0
}

//Hacemos que muestre la informacion cuando cargue la web

document.addEventListener("DOMContentLoaded", function(){
    //Mostramos la informacion del elemento seleccionado (day)
    getData("Daily")
})

//Evento click a container

optionsContainer.addEventListener("click", function(e){
    //Validamos que se presiono un label
    if (e.target.classList.contains("profile__options-container__label")) {

        //Quitamos la clase de activo del label que la posea
        document.querySelector(".profile__options-container__label.active").classList.remove("active");

        //Añadimos clase al label seleccionado
        e.target.classList.add("active")

        //Llamamos funcion para obtener datos del json
        getData(e.target.textContent)
    }
})

function getData(type) {
    //Recorremos el JSON
    data.forEach( section => {
        //Destructuring
        const { title, timeframes } = section;

        //Busca el elemento que tenga ese titulo en su atributo data
        let divSection = document.querySelector(`.dashboard__item[data-section='${title}']`);

        //Obtenemos el timeFrame seleccionado (Mandandole el tipo en minusculas, como esta en el json)
        let dataSelectedByType = timeframes[type.toLowerCase()];

        //Actualizamos datos de nuestro objeto
        //Validamos propiedad type
        if (type === "Daily") {
            timeDataSelected.type = "Last Day"
        }else if (type === "Weekly") {
            timeDataSelected.type = "Last Week"
        }else if (type === "Monthly") {
            timeDataSelected.type = "Last Month"
        }

        timeDataSelected.current = dataSelectedByType.current;
        timeDataSelected.previous = dataSelectedByType.previous;

        //Muestro en pantalla
        showData(divSection, timeDataSelected.type, timeDataSelected.current, timeDataSelected.previous);
    } )
}

function showData(div, type, current, previous) {
    //Actualizamos las horas actuales
    div.children[1].firstElementChild.lastElementChild.textContent = current + "hrs";

    //Actualizamos las horas anteriores
    div.children[1].lastElementChild.lastElementChild.textContent = `${type} - ${previous}hrs`;
}
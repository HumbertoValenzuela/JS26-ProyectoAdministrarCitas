// 26. PROYECTO Administrador de Citas de Pacientes
// 1 - Escuchar los input
// 2 - Agrega datos al objeto citaObj
// 3 - Validación y Mostrar un mensaje de error


// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// variable Modo Edición
let editando;

// Clases. 
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }

    eliminarCita(id) {
        // Quita el id seleccionado, lo demás lo deja
        this.citas = this.citas.filter( cita => cita.id !== id );
    }

    editarCita(citaActualizada) {
        // cita.id Actual === citaActualizada.id Actualizada
        // ? citaActualizada reescribe lo que tenga
        // caso contrario : cita
        this.citas = this.citas.map( (cita) => cita.id === citaActualizada.id ? citaActualizada : cita);
    }

}

class UI {
    imprimirAlerta(mensaje, tipo) {
        // crear el Div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');            
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de Error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        // #contenido el principio .agregar-cita el final. Entonces será antes de .agregar-cita
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta despues de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    // imprimirCitas(citas) {const { citas } = citas;} es una forma
    // otra forma es
    imprimirCitas({citas}) {//Destructuring desde el parametro
        // console.log(citas);

        this.limpiarHTML();

        citas.forEach( cita => { 
            // destructuring
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder"> Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder"> Teléfono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder"> Sintomas: </span> ${sintomas}
            `;

            // Botón para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

            // Evento para Eliminar una cita
            btnEliminar.onclick = () => eliminarCita(id);//Argumento id

            // Añade un botón para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

            // clic y va a la función con el argumento cita (Requiero todos los datos). Para poder modificar todo
            btnEditar.onclick = () => cargaEdicion(cita);

            // Agregar las parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);
 
            // Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        })
    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

// Instanciar. Se instanciaran de forma global. Porque tendrá diferentes funciones y lugares
const ui = new UI();
const adminitrarCitas = new Citas();



// Registrar Eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);
    // UI
    formulario.addEventListener('submit', nuevaCita);
}

// El objeto citaObj se va llenando a medida que los Input son llenados.
// requisito en el HTML tener el atributo ej: name="mascota" y así con las otras propiedades en cada Input
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha:'',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto citaObj
function datosCita(e) {
    // console.log(e.target.name); 
    // console.log(e.target.name);

    // Para acceder a las propiedades de citasObj []
    // Si accedo con citaObj.e.targetname va acceder al evento de citaObj
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);// ver el objeto llenado
   
}

// Valida y agrega una nueva cita a la clase de citas 
function nuevaCita(e) {
    e.preventDefault();

    // Extraer la información del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    // validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' ||hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    } 

    // Modo Edición
    if (editando) {
        ui.imprimirAlerta('Editado Correctamente');

        // Pasar el objeto de la cita a Edición
        adminitrarCitas.editarCita({...citaObj});

        // Cambiar el texto del botón. De crear Guardar cambios a Cita
        formulario.querySelector('button[type="submit"]').textContent = ' Crear Cita';
        //Quitar modo Edición
        editando = false; // para que se reinicie el formulario
    } else {
        // console.log('Modo Modo Nueva Cita');
        // Generar una nueva cita
        // el objeto citaObj esta como variable constante pero se puede modificar sus propiedades, salvo que es te sellado
        citaObj.id = Date.now();
        // una vez creado el id esp posible crear una nueva cita

        // Creando una nueva cita
        // console.log(citaObj);

        // esta línea de código hace que el objeto crea copias iguales por cada registro
        // esto pasa porque el objeto global citaObj, le esta pasando una referencia completa del objeto.
        // Para que no sucede tiene que pasar una copia del objeto global citaObj
        // adminitrarCitas.agregarCita(citaObj);

        adminitrarCitas.agregarCita({...citaObj});
        // Mensaje de agregado Correctamente
        ui.imprimirAlerta('Se agregó Correctamente');
    }

    // y reiniciar objeto citaObj
    reiniciarObjeto();
    // Reiniciar formulario
    formulario.reset();

    // Mostrar el HTML de las citas, agregando otro método que se agrega a la clase UI
    ui.imprimirCitas(adminitrarCitas);// Se necesita la referencia o instancia adminitrarCitas, es el que tiene el arreglo con las citas
}

function reiniciarObjeto() {
    // Recordar no se puede asignar directamente citaObj a citaObj
    // es decir, ir propiedad por propiedad
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

function eliminarCita(id) {
    // console.log(id)

    // Eliminar la cita
    adminitrarCitas.eliminarCita(id);
    // muestre un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    // Refrescar la cita
    ui.imprimirCitas(adminitrarCitas);
}

// carga los datos y el modo Edición
function cargaEdicion(cita) {
    // console.log(cita);Muestra el registro del objeto cita

    // destructuring
    const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    // los valores de cita se pasan a los input del formulario
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // los Input estan con datos pero el citaObj no
    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar el texto del botón. De crear Cita a Guardar cambios
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    // Modo Edición
    editando = true;
}
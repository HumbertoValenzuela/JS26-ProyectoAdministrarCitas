# JS26-ProyectoAdministrarCitas
JS 26 - Proyecto Administrar Citas
* 1 - Escuchar los input
* 2 - Agrega datos al objeto citaObj
* 3 - Validación y Mostrar un mensaje de error
* Scripting de los elementos de la cita
* Botón para eliminar esta cita
* Evento para Eliminar una cita
* Añade un botón para editar
* clic y va a la función con el argumento cita (Requiero todos los datos). Para poder modificar todo
* Agregar las parrafos al divCita
* Agregar las citas al HTML
* Instanciar. Se instanciaran de forma global. Porque tendrá diferentes funciones y lugares
* El objeto citaObj se va llenando a medida que los Input son llenados.
*  requisito en el HTML tener el atributo ej: name="mascota" y así con las otras propiedades en cada Input
* Valida y agrega una nueva cita a la clase de citas 
* Extraer la información del objeto de cita
* Modo Edición
* Pasar el objeto de la cita a Edición
* Cambiar el texto del botón. De crear Guardar cambios a Cita
* esta línea de código hace que el objeto crea copias iguales por cada registro
        // esto pasa porque el objeto global citaObj, le esta pasando una referencia completa del objeto.
        // Para que no sucede tiene que pasar una copia del objeto global citaObj
        // adminitrarCitas.agregarCita(citaObj);

// $(document).ready(function () {

//     //Obtener el valor del parámetro 'id' de la URL
//     var urlParams = new URLSearchParams(window.location.search);
//     var idSensor = urlParams.get('id');
    
//     if(idSensor){
//         recuperarDatos(idSensor);
//     }
// });

// Manejar el evento de envío del formulario
$('#form-sensor').submit(function(event) {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();
    // Llamar a la función para enviar el formulario por Ajax
    enviarFormulario();
});

function enviarFormulario() {
    // Obtener el valores del form
    var formData = new FormData($('#form-sensor')[0]);

    // Enviar los datos por Ajax
    $.ajax({
        type: 'POST',
        url: '../../controller/sensorcontroller.php?op=registrar_sensor', 
        data: formData,
        processData: false, // Evitar que jQuery procese los datos
        contentType: false, // No establecer automáticamente el encabezado "Content-Type"
        dataType: 'JSON',
        success: function(response) {
            // Manejar la respuesta del servidor aquí
            //console.log(response);
            if(response.success == true){
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: response.message
                });
                limpiar();
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se realizo el registro.',
                    text: response.message
                });
            }
        },
        error: function(xhr, status, error) {
            // Manejar errores de Ajax aquí
            //console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error en la inserción',
                text: xhr.responseText
            });
        }
    });
}

//Funcion para Limpiar los campos
function limpiar(){
    $('#id_sensor').val("");
    $('#cargo_sensor').val("");
    $('#zona_sensor').val("");
    $('#nombre_sensor').val("");
    $('#deveui_sensor').val("");
    $('#latitud').val(-12.012713);
    $('#longitud').val(-76.996148);

    moveMarkerToNewLocation(-12.012713, -76.996148);
}


// Función para mover el marcador a una nueva ubicación
function moveMarkerToNewLocation(lat, lng) {
    var newLatLng = L.latLng(lat, lng); // Crear un objeto LatLng con las nuevas coordenadas
    marker.setLatLng(newLatLng); // Mover el marcador a la nueva ubicación
    map.panTo(newLatLng); // Centrar el mapa en la nueva ubicación del marcador
}

//Funcion para recuperar los datos del sensor 
function recuperarDatos(valor){
    $.ajax({
        type: 'POST',
        url: '../../controller/sensorcontroller.php?op=mostrar_sensor', 
        data: { id_sensor: valor },
        dataType: 'JSON',
        success: function(response) {
            // Manejar la respuesta del servidor aquí
            //console.log(response);

            //Settear los datos
            $('#id_sensor').val(response.id) ;
            $('#cargo_sensor').val(response.person);
            $('#zona_sensor').val(response.zone);
            $('#nombre_sensor').val(response.nombre);
            $('#deveui_sensor').val(response.devEUI);
            $('#latitud').val(response.latitud);
            $('#longitud').val(response.longitud);

            moveMarkerToNewLocation(response.latitud, response.longitud);
        },
        error: function(xhr, status, error) {
            // Manejar errores de Ajax aquí
            //console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error en la accion',
                text: xhr.responseText
            });
        }
    });
}


// Coordenadas iniciales del marcador (Distrito de San Juan de Lurigancho, Lima, Perú)
var initialLatLng = [-12.012713, -76.996148];
$('#latitud').val(initialLatLng[0]);
$('#longitud').val(initialLatLng[1]);

// Inicializar el mapa centrado en las coordenadas iniciales
var map = L.map('map').setView(initialLatLng, 13);

// Agregar un mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Crear un marcador inicial en las coordenadas iniciales
var marker = L.marker(initialLatLng, { draggable: true }).addTo(map)
    .bindPopup("Arrastra y suelta para mover el marcador").openPopup();

// Función para actualizar las coordenadas del marcador cuando se suelta después de arrastrarlo
function onMarkerDragEnd(event) {
    var newLatLng = event.target.getLatLng(); // Obtener las nuevas coordenadas del marcador
    //console.log("Nuevas coordenadas del marcador:", newLatLng.lat, newLatLng.lng);
    $('#latitud').val(newLatLng.lat);
    $('#longitud').val(newLatLng.lng);

    // Obtener la dirección aproximada del lugar
    //getAddressFromCoordinates(newLatLng.lat, newLatLng.lng);
}

// Asociar el evento dragend al marcador para actualizar las coordenadas cuando se suelta
marker.on('dragend', onMarkerDragEnd);


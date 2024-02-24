// mqtt-client.js

// Configuración de MQTT
const options = {
    connectTimeout: 4000,
    clientId: "client-web3",
    keepalive: 60,
    clean: true,
};

const WebSocket_URL = "ws://192.168.20.132:8083/mqtt";
const client = mqtt.connect(WebSocket_URL, options);

// Función para suscribirse a los temas MQTT
function subscribeToTopics() {
    client.subscribe("/milesight/uplink/#", { qos: 0 }, (error) => {
        if (!error) {
            console.log("Suscripción exitosa!");
        } else {
            console.log("Error en la suscripción:", error);
        }
    });
}

// Función para manejar los mensajes MQTT recibidos
function handleMessage(topic, message) {
    console.log("Mensaje recibido, tópico:", topic, "->", message.toString());
    const data = JSON.parse(message);
    if (topic.startsWith("/milesight/uplink/")) {
        displaySensorData(data);
    }
}
// Función para mostrar los datos del sensor en la página
function displaySensorData(data) {
    const sensorWidget = document.createElement('div');
    switch (data.press) {
        case 'short':
            sensorWidget.className = 'sensorWidgetShort';
            break;
        case 'double':
            sensorWidget.className = 'sensorWidgetDouble';
            break;
        case 'long':
            sensorWidget.className = 'sensorWidgetLong';
            break;
        default:
            sensorWidget.className = 'sensorWidget';
    }
    
    // Crear un elemento de imagen
    const imgElement = document.createElement('img');
    //imgElement.src = '../assets/images/icons/robo.png'; // Reemplaza con la ruta de tu imagen
    //imgElement.className = 'custom-img'; // Agrega una clase para aplicar estilos CSS
    //imgElement.alt = 'Descripción de la imagen'; // Proporciona una descripción opcional para accesibilidad
    sensorWidget.appendChild(imgElement); // Agrega la imagen al div sensorWidget

    
    // Agrega más contenido si es necesario
    sensorWidget.innerHTML += `<p>devEUI: ${data.devEUI}</p><p>press: ${data.press}</p>`;
    
    document.getElementById('sensorData').prepend(sensorWidget);
}



// Evento de conexión MQTT
client.on("connect", () => {
    console.log("Mqtt conectado por WS! ÉXITO!");
    subscribeToTopics();
});

// Evento de mensaje MQTT recibido
client.on("message", handleMessage);

document.addEventListener('DOMContentLoaded', function () {
    const fullscreenButton = document.getElementById('fullscreenButton');
    const sidebarWrapper = document.getElementById('sidebarWrapper');
    const iqBanner = document.querySelector('.position-relative.iq-banner');
    const footer = document.querySelector('footer');

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                // Se ha activado el modo de pantalla completa
                sidebarWrapper.style.display = 'none'; // Oculta el sidebar
                if (iqBanner) {
                    iqBanner.style.display = 'none'; // Oculta el iq-banner
                }
                if (footer) {
                    footer.style.display = 'none'; // Oculta el iq-banner
                }
            }).catch((error) => {
                console.error('Error al intentar activar el modo de pantalla completa:', error);
            });
        } else {
            document.exitFullscreen().then(() => {
                // Se ha desactivado el modo de pantalla completa
                sidebarWrapper.style.display = 'block'; // Muestra el sidebar
                if (iqBanner) {
                    iqBanner.style.display = 'block'; // Muestra el iq-banner
                }
                if (footer) {
                    footer.style.display = 'block'; // Muestra el iq-banner
                }
            }).catch((error) => {
                console.error('Error al intentar desactivar el modo de pantalla completa:', error);
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const fullscreenButton = document.getElementById('fullscreenButton');

    // Función para cambiar el icono del botón
    function toggleFullscreenIcon() {
        const isFullscreen = document.fullscreenElement !== null;
        const icon = isFullscreen ? 'bi bi-fullscreen-exit' : 'bi bi-fullscreen';

        // Remueve el contenido actual del botón
        fullscreenButton.innerHTML = '';

        // Crea el nuevo icono y lo agrega al botón
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("class", icon);
        svg.setAttribute("viewBox", "0 0 16 16");
        svg.innerHTML = '<path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z"/>';
        fullscreenButton.appendChild(svg);
    }

    // Función para restablecer el icono al estado inicial
    function resetFullscreenIcon() {
        const icon = 'bi bi-fullscreen';
        fullscreenButton.innerHTML = '';

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("class", icon);
        svg.setAttribute("viewBox", "0 0 16 16");
        svg.innerHTML = '<path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5" />';
        fullscreenButton.appendChild(svg);
    }

    // Agrega el evento clic al botón
    fullscreenButton.addEventListener('click', () => {
        toggleFullscreenIcon(); // Cambia el icono del botón

        // Solicitar o salir del modo de pantalla completa
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Evento para detectar cambios en el estado de pantalla completa
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            resetFullscreenIcon(); // Restablece el icono al estado inicial
        }
    });
});



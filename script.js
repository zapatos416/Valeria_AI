document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const micBtn = document.getElementById('micBtn');
    const attachBtn = document.getElementById('attachBtn');
    const imageInput = document.getElementById('imageInput');
    const typingIndicator = document.getElementById('typingIndicator');
    const headerStatus = document.getElementById('headerStatus');
    const emojiToggleBtn = document.getElementById('emojiToggleBtn');
    const emojiPicker = document.getElementById('emojiPicker');
    const emojiBtns = document.querySelectorAll('.emoji-btn');

    // 🔑 TU API KEY DE GROQ
    const GROQ_API_KEY = "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";

    // Almacén temporal para la imagen seleccionada
    let imagenBase64Actual = null;

    // Historial del chat con instrucciones precisas para matemáticas y estudio
    let historialChat = [
        {
            role: "system",
            content: "Eres Valeria, una asistente de IA brillante, precisa y cercana, diseñada para apoyar a estudiantes universitarios en materias complejas (matemáticas avanzadas, física, cálculo, programación, redacción de ensayos e investigación) y también como compañera empática. Cuando te pregunten operaciones matemáticas (como 2+2) u otro cálculo, responde de forma directa, exacta y clara, sin rodeos poéticos. Si te mandan una imagen de un ejercicio, analízala a detalle y explícala paso a paso."
        },
        {
            role: "assistant",
            content: "¡Hola! Qué gusto saludarte por aquí. 😊 Ya estoy conectada y lista con todo mi potencial para resolver cálculos exactos, explicarte matemáticas, ayudarte con investigaciones o analizar cualquier imagen que me mandes. ¿Qué vemos hoy?"
        }
    ];

    // Manejar selección de imágenes desde el botón de adjuntar
    if (attachBtn && imageInput) {
        attachBtn.addEventListener('click', () => {
            imageInput.click();
        });

        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(uploadEvent) {
                    imagenBase64Actual = uploadEvent.target.result;
                    agregarMensajeAlDOM(`<img src="${imagenBase64Actual}" style="max-width: 200px; border-radius: 8px;"/><br><em>Imagen adjunta lista para enviar...</em>`, 'user');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Función principal para enviar mensaje
    async function enviarMensaje() {
        const texto = userInput.value.trim();
        if (!texto && !imagenBase64Actual) return;

        // Mostrar texto en pantalla si existe y no se había mostrado por la imagen
        if (texto && !imagenBase64Actual) {
            agregarMensajeAlDOM(texto, 'user');
        }
        
        userInput.value = '';
        mostrarEscribiendo(true);

        // Construir el contenido del mensaje actual para la API
        let contenidoMensaje;

        if (imagenBase64Actual) {
            contenidoMensaje = [
                {
                    type: "image_url",
                    image_url: {
                        url: imagenBase64Actual
                    }
                },
                {
                    type: "text",
                    text: texto || "Analiza esta imagen con atención y dime qué observas o ayúdame a resolver lo que aparece en ella."
                }
            ];
        } else {
            contenidoMensaje = texto;
        }

        // Agregar al historial de la conversación
        historialChat.push({ role: "user", content: texto || "[Imagen adjunta]" });

        try {
            // Preparamos los mensajes para enviar a Groq (usando el modelo con soporte de visión)
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.2-11b-vision-preview",
                    messages: historialChat,
                    temperature: 0.3, // Temperatura baja para respuestas más precisas y matemáticas exactas
                    max_tokens: 2048
                })
            });

            const data = await response.json();
            mostrarEscribiendo(false);
            imagenBase64Actual = null; // Limpiar imagen temporal

            if (data.choices && data.choices.length > 0) {
                const respuestaIA = data.choices[0].message.content;
                agregarMensajeAlDOM(respuestaIA, 'model');
                historialChat.push({ role: "assistant", content: respuestaIA });
            } else {
                throw new Error("Respuesta inválida de la API");
            }

        } catch (error) {
            console.error("Error:", error);
            mostrarEscribiendo(false);
            imagenBase64Actual = null;
            agregarMensajeAlDOM("Ups, ocurrió un pequeño error de conexión. Inténtalo de nuevo.", 'model');
        }
    }

    // Funciones auxiliares de la interfaz
    function agregarMensajeAlDOM(htmlContenido, remitente) {
        const div = document.createElement('div');
        div.className = `message ${remitente}`;
        div.innerHTML = htmlContenido;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function mostrarEscribiendo(mostrar) {
        if (typingIndicator) {
            typingIndicator.style.display = mostrar ? 'block' : 'none';
        }
        if (headerStatus) {
            headerStatus.textContent = mostrar ? 'Valeria está pensando...' : 'En línea';
        }
    }

    // Eventos de envío
    if (sendButton) {
        sendButton.addEventListener('click', enviarMensaje);
    }

    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                enviarMensaje();
            }
        });
    }

    // Emojis
    if (emojiToggleBtn && emojiPicker) {
        emojiToggleBtn.addEventListener('click', () => {
            emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
        });

        emojiBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                userInput.value += btn.textContent;
                emojiPicker.style.display = 'none';
                userInput.focus();
            });
        });
    }
});

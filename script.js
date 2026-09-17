document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const attachBtn = document.getElementById('attachBtn');
    const imageInput = document.getElementById('imageInput');
    const typingIndicator = document.getElementById('typingIndicator');
    const headerStatus = document.getElementById('headerStatus');
    const emojiToggleBtn = document.getElementById('emojiToggleBtn');
    const emojiPicker = document.getElementById('emojiPicker');
    const emojiBtns = document.querySelectorAll('.emoji-btn');

    // 🔑 TU API KEY DE GROQ
    const GROQ_API_KEY = "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";

    // Historial limpio y estable para el chat
    let historialChat = [
        {
            role: "system",
            content: "Eres Valeria, una asistente de IA brillante, precisa y cercana, diseñada para apoyar a estudiantes universitarios en materias complejas (matemáticas avanzadas, física, cálculo, programación, redacción de ensayos e investigación) y también como compañera empática. Cuando te pregunten operaciones matemáticas (como 2+2) u otro cálculo, responde de forma directa, exacta y clara."
        },
        {
            role: "assistant",
            content: "¡Hola! Qué gusto saludarte por aquí. 😊 Ya estoy conectada y lista con todo mi potencial para resolver cálculos exactos, explicarte matemáticas o ayudarte con tus investigaciones universitarias. ¿Qué vemos hoy?"
        }
    ];

    // Función principal para enviar mensaje
    async function enviarMensaje() {
        const texto = userInput.value.trim();
        if (!texto) return;

        // Mostrar mensaje del usuario en pantalla
        agregarMensajeAlDOM(texto, 'user');
        userInput.value = '';
        mostrarEscribiendo(true);

        // Agregar al historial de la conversación de forma segura
        historialChat.push({ role: "user", content: texto });

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: historialChat,
                    temperature: 0.3,
                    max_tokens: 2048
                })
            });

            const data = await response.json();
            mostrarEscribiendo(false);

            if (data.choices && data.choices.length > 0) {
                const respuestaIA = data.choices[0].message.content;
                agregarMensajeAlDOM(respuestaIA, 'model');
                historialChat.push({ role: "assistant", content: respuestaIA });
            } else {
                console.error("Error de API:", data);
                throw new Error("Respuesta inválida de la API");
            }

        } catch (error) {
            console.error("Error:", error);
            mostrarEscribiendo(false);
            agregarMensajeAlDOM("Ups, ocurrió un pequeño error de conexión con el servidor. Inténtalo de nuevo.", 'model');
        }
    }

    // Funciones auxiliares de la interfaz
    function agregarMensajeAlDOM(texto, remitente) {
        const div = document.createElement('div');
        div.className = `message ${remitente}`;
        div.textContent = texto;
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

    // Eventos
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

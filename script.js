document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const typingIndicator = document.getElementById('typingIndicator');
    const headerStatus = document.getElementById('headerStatus');
    const emojiToggleBtn = document.getElementById('emojiToggleBtn');
    const emojiPicker = document.getElementById('emojiPicker');
    const emojiBtns = document.querySelectorAll('.emoji-btn');

    // 🔑 TU API KEY DE GROQ
    const GROQ_API_KEY = "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";

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

    async function enviarMensaje() {
        const texto = userInput.value.trim();
        if (!texto) return;

        agregarMensajeAlDOM(texto, 'user');
        userInput.value = '';
        mostrarEscribiendo(true);

        historialChat.push({ role: "user", content: texto });

        try {
            // Usamos la ruta oficial completa y aseguramos los headers limpios
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY.trim()}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: historialChat,
                    temperature: 0.3,
                    max_tokens: 2048
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            mostrarEscribiendo(false);

            if (data.choices && data.choices.length > 0) {
                const respuestaIA = data.choices[0].message.content;
                agregarMensajeAlDOM(respuestaIA, 'model');
                historialChat.push({ role: "assistant", content: respuestaIA });
            } else {
                throw new Error("Estructura de respuesta inválida");
            }

        } catch (error) {
            console.error("Detalle del error:", error);
            mostrarEscribiendo(false);
            agregarMensajeAlDOM("Ups, hubo un problema al conectar con el servidor. Revisa la consola para más detalles.", 'model');
        }
    }

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

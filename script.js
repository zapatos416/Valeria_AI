document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    let historial = [
        { role: "assistant", content: "¡Hola! Qué gusto saludarte por aquí. 😊 ¿Cómo va tu día? Cuéntame qué has hecho, de qué memes nos reímos o qué problema pesado de la uni resolvemos hoy. ¡Lo armamos todo! 🚀" }
    ];

    async function enviar() {
        const texto = userInput.value.trim();
        if (!texto) return;

        // Mostrar mensaje del usuario
        const divU = document.createElement('div');
        divU.className = 'message user';
        divU.textContent = texto;
        chatMessages.appendChild(divU);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        userInput.value = '';
        historial.push({ role: "user", content: texto });

        try {
            // Llamada segura a nuestra propia función de servidor en Vercel (/api/chat)
            const res = await fetch('/api/chat', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ messages: historial })
            });

            const data = await res.json();

            if (res.ok && data.choices && data.choices.length > 0) {
                const respuesta = data.choices[0].message.content;
                
                const divAI = document.createElement('div');
                divAI.className = 'message model';
                divAI.style.whiteSpace = "pre-line";
                divAI.textContent = respuesta;
                chatMessages.appendChild(divAI);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                historial.push({ role: "assistant", content: respuesta });
            } else {
                throw new Error(data.error || "Error al procesar la respuesta");
            }

        } catch (err) {
            console.error("Fallo:", err);
            
            // Fallback humano por si hay intermitencia de red
            const divAI = document.createElement('div');
            divAI.className = 'message model';
            divAI.textContent = "¡Ay, perdona! Se me trabó un segundito el servidor por acá, pero ya volví. ¿En qué nos habíamos quedado?";
            chatMessages.appendChild(divAI);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    if (sendButton) sendButton.addEventListener('click', enviar);
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enviar();
        });
    }
});

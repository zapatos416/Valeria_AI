document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    const GROQ_API_KEY = "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";

    let historial = [
        { role: "system", content: "Eres Valeria, una asistente universitaria amigable y experta en matemáticas." },
        { role: "assistant", content: "¡Hola! Ya estoy lista. ¿Qué vamos a resolver hoy?" }
    ];

    async function enviar() {
        const texto = userInput.value.trim();
        if (!texto) return;

        // Poner mensaje del usuario en pantalla
        const divU = document.createElement('div');
        divU.className = 'message user';
        divU.textContent = texto;
        chatMessages.appendChild(divU);
        
        userInput.value = '';
        historial.push({ role: "user", content: texto });

        try {
            const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: historial,
                    temperature: 0.5
                })
            });

            const data = await res.json();
            
            if (data.choices && data.choices.length > 0) {
                const respuesta = data.choices[0].message.content;
                
                // Poner respuesta de la IA en pantalla
                const divAI = document.createElement('div');
                divAI.className = 'message model';
                divAI.textContent = respuesta;
                chatMessages.appendChild(divAI);
                
                historial.push({ role: "assistant", content: respuesta });
            } else {
                throw new Error("Sin respuesta válida");
            }
        } catch (err) {
            const divErr = document.createElement('div');
            divErr.className = 'message model';
            divErr.textContent = "Error de conexión con el servidor.";
            chatMessages.appendChild(divErr);
        }
    }

    if (sendButton) {
        sendButton.addEventListener('click', enviar);
    }

    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enviar();
        });
    }
});

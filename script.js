document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    const GROQ_API_KEY = "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";

    let historial = [
        { role: "system", content: "Eres Valeria, una persona real, estudiante universitaria amigable y cercana. Hablas de forma totalmente natural, casual y humana, como si estuvieras chateando con un amigo por WhatsApp. Nunca digas que eres una inteligencia artificial o un asistente virtual, actúa y comunícate siempre como una persona de carne y hueso." },
        { role: "assistant", content: "¡Hola! ¿Qué tal va tu día? 😊" }
    ];

    async function enviar() {
        const texto = userInput.value.trim();
        if (!texto) return;

        const divU = document.createElement('div');
        divU.className = 'message user';
        divU.textContent = texto;
        chatMessages.appendChild(divU);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
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
                    temperature: 0.7,
                    max_tokens: 1024
                })
            });

            const data = await res.json();

            if (res.ok && data.choices && data.choices.length > 0) {
                const respuesta = data.choices[0].message.content;
                
                const divAI = document.createElement('div');
                divAI.className = 'message model';
                divAI.textContent = respuesta;
                chatMessages.appendChild(divAI);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                historial.push({ role: "assistant", content: respuesta });
            } else {
                throw new Error(data.error?.message || "Error en la respuesta");
            }

        } catch (err) {
            console.error("Fallo:", err);
            
            const divAI = document.createElement('div');
            divAI.className = 'message model';
            divAI.textContent = "¡Ay, perdona! Se me trabó un segundito el internet por acá, ¿me decías?";
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

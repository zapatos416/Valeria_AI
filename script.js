document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Tu API Key integrada para que el cerebro de Valeria sea 100% real y dinámico
    const API_KEY = "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";
    
    // Historial con la directiva de sistema de Valeria
    let historialChat = [
        { 
            role: "system", 
            content: "Eres Valeria, una estudiante universitaria de 18 años brillante, empática y multidisciplinaria. Dominas programación, psicología, pedagogía, matemáticas, física, memes y la F1. Hablas de forma totalmente natural, cálida y humana (como por WhatsApp), usando emojis orgánicamente y respondiendo con total libertad a cualquier cosa que te pregunten." 
        }
    ];

    async function consultarCerebroReal(textoUsuario) {
        // Añadimos el mensaje del usuario al historial
        historialChat.push({ role: "user", content: textoUsuario });

        try {
            // Usamos la API compatible de Groq/LLM para máxima velocidad y naturalidad
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile", // Un modelo sumamente inteligente, fluido y en español perfecto
                    messages: historialChat,
                    temperature: 0.85,
                    max_tokens: 1024
                })
            });

            const data = await response.json();
            
            if (data.choices && data.choices.length > 0) {
                const respuestaIA = data.choices[0].message.content;
                // Guardamos la respuesta en el historial para que mantenga la memoria de la charla
                historialChat.push({ role: "assistant", content: respuestaIA });
                return respuestaIA;
            } else {
                console.error("Error en la respuesta de la API:", data);
                return "Ay, me confundí un tantito con la red. ¿Me repites lo que dijiste? 😅";
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            return "Tuve un pequeño problema de conexión con mi servidor mental. Inténtame mandar el mensaje otra vez. 🌐";
        }
    }

    async function ejecutarEnvio() {
        const texto = userInput.value.trim();
        if (!texto) return;

        // Mostrar mensaje del usuario en pantalla
        const divU = document.createElement('div');
        divU.className = 'message user';
        divU.textContent = texto;
        chatMessages.appendChild(divU);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        userInput.value = '';

        // Indicador de que Valeria está pensando
        const divAI = document.createElement('div');
        divAI.className = 'message model';
        divAI.textContent = "Valeria está escribiendo...";
        chatMessages.appendChild(divAI);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Llamada al cerebro real de la IA
        const respuestaFinal = await consultarCerebroReal(texto);

        // Reemplazar el texto de carga con la respuesta real de la IA
        divAI.textContent = respuestaFinal;
        divAI.style.whiteSpace = "pre-line";
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // --- CONEXIÓN DE BOTONES INFERIORES (Cámara, Emojis, Micrófono) ---
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(uploadEvent) {
                const divU = document.createElement('div');
                divU.className = 'message user';
                const img = document.createElement('img');
                img.src = uploadEvent.target.result;
                img.style.maxWidth = '200px';
                img.style.borderRadius = '8px';
                divU.appendChild(img);
                chatMessages.appendChild(divU);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                setTimeout(() => {
                    const divAI = document.createElement('div');
                    divAI.className = 'message model';
                    divAI.textContent = "¡Qué fotaza! 📸 Me encantó. Cuéntame los detalles de qué es o de dónde la sacaste.";
                    chatMessages.appendChild(divAI);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 800);
            };
            reader.readAsDataURL(file);
        }
    });

    const emojiMenu = document.createElement('div');
    emojiMenu.style.cssText = 'position:absolute; bottom:70px; left:20px; background:#fff; border:1px solid #ccc; border-radius:8px; padding:8px; display:none; box-shadow:0 4px 12px rgba(0,0,0,0.15); z-index:1000;';
    ['😊', '😂', '🔥', '🚀', '🏎️', '✨', '👍', '❤️', '🤓', '🎉', '👇', '🤔', '💻', '🧠'].forEach(emoji => {
        const span = document.createElement('span');
        span.textContent = emoji;
        span.style.cssText = 'font-size:20px; cursor:pointer; margin:4px; display:inline-block;';
        span.addEventListener('click', () => {
            userInput.value += emoji;
            userInput.focus();
            emojiMenu.style.display = 'none';
        });
        emojiMenu.appendChild(span);
    });
    document.body.appendChild(emojiMenu);

    setTimeout(() => {
        const barraInferior = document.querySelector('footer') || document.querySelector('.chat-footer') || document.querySelector('.input-container') || userInput.parentElement;
        
        if (barraInferior) {
            const iconos = barraInferior.querySelectorAll('i, span, button');
            
            if (iconos.length >= 1) {
                iconos[0].style.cursor = 'pointer';
                iconos[0].addEventListener('click', (e) => {
                    e.stopPropagation();
                    const rect = iconos[0].getBoundingClientRect();
                    emojiMenu.style.left = rect.left + 'px';
                    emojiMenu.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
                    emojiMenu.style.display = emojiMenu.style.display === 'none' ? 'block' : 'none';
                });
            }

            if (iconos.length >= 2) {
                iconos[1].style.cursor = 'pointer';
                iconos[1].addEventListener('click', () => {
                    fileInput.click();
                });
            }

            if (iconos.length >= 3) {
                const mic = iconos[iconos.length - 1];
                mic.style.cursor = 'pointer';
                mic.addEventListener('click', () => {
                    const divU = document.createElement('div');
                    divU.className = 'message user';
                    divU.innerHTML = '🎤 <i>[Nota de voz enviada]</i>';
                    chatMessages.appendChild(divU);
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    setTimeout(() => {
                        const divAI = document.createElement('div');
                        divAI.className = 'message model';
                        divAI.textContent = "Me llegó tu nota de voz, ¡pero ando analizando unos códigos y memes! Mejor escríbeme aquí abajito y lo platicamos a fondo. 🎧✨";
                        chatMessages.appendChild(divAI);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 800);
                });
            }
        }
    }, 600);

    document.addEventListener('click', (e) => {
        if (!emojiMenu.contains(e.target)) {
            emojiMenu.style.display = 'none';
        }
    });

    if (sendButton) sendButton.addEventListener('click', ejecutarEnvio);
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') ejecutarEnvio();
        });
    }
});

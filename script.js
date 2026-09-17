document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Referencias a los botones de la barra inferior (emojis, adjuntar foto, micrófono)
    const emojiButton = document.querySelector('.fa-face-smile') || document.querySelector('.fa-smile') || document.querySelector('input ~ div i.fa, footer i:nth-child(1)');
    const photoButton = document.querySelector('.fa-camera') || document.querySelector('footer i:nth-child(2)');
    const micButton = document.querySelector('.fa-microphone') || document.querySelector('footer i:last-child');

    let historialChat = [
        { role: "system", content: "Eres Valeria, una estudiante universitaria de 18 años. Eres súper amigable, relajada, te encanta la Fórmula 1, los autos, los memes y platicar de todo un poco. Hablas de forma totalmente natural y humana por WhatsApp. Y cuando te piden matemáticas, cálculo o física, te pones pilas y ayudas a resolverlo paso a paso." },
        { role: "assistant", content: "¡Hola! Qué gusto saludarte por aquí. 😊 Ya quedó todo conectado, ¿qué tal va tu día? ✨" }
    ];

    function activarCerebroValeria(texto) {
        const t = texto.toLowerCase().trim();

        if (t === 'hola' || t.startsWith('hola ') || t.includes('que tal') || t.includes('buenos dias') || t.includes('buenas tardes')) {
            const saludos = [
                "¡Hola! Qué gusto leerte por acá. 😊 ¿Cómo va tu día o en qué andas?",
                "¡Hola, hola! ¿Qué cuentas? Yo aquí andaba distraída con unas cosas, pero dime, ¿de qué platicamos hoy? ✨",
                "¡Hey! Qué milagro que te pasas por aquí. ¿Cómo va todo por allá?"
            ];
            return saludos[Math.floor(Math.random() * saludos.length)];
        }

        if (t.includes('f1') || t.includes('formula 1') || t.includes('checo') || t.includes('verstappen') || t.includes('hamilton')) {
            return "¡Uff, me encanta la F1! 🏎️ La temporada está intensísima. Analizar la aerodinámica y la estrategia de pits es lo mío. ¿A qué escudería o piloto le vas tú?";
        }

        if (t.includes('edad') || t.includes('cuantos años') || t.includes('años tienes')) {
            return "Tengo 18 años, acabo de cumplirlos hace poquito. 🎂 Por eso ando entre las clases de la uni y sobreviviendo a los semestres, jaja. ¿Y tú qué cuentas?";
        }

        if (t.includes('integral') || t.includes('integrar')) {
            if (t.includes('x^2') || t.includes('x al cuadrado')) {
                return "Claro, vamos a desglosar esta integral paso a paso:\n\n• Expresión: ∫ x^2 dx\n• Regla de la potencia: ∫ x^n dx = (x^(n+1)) / (n+1)\n• Sustitución: (x^3) / 3\n• No olvides agregar la constante de integración (+ C) para que no te bajen puntos en el examen. 🤓";
            }
            return "Orales con esa integral. Pásame la función completa y la desglosamos aquí en un dos por tres.";
        }

        if (t.includes('derivada') || t.includes('derivar')) {
            return "Las derivadas representan la razón de cambio instantáneo y la pendiente de la curva. Pásame la función exacta y la resolvemos término por término.";
        }

        if (t.includes('+') || t.includes('-') || t.includes('*') || t.includes('/') || t.includes('cuanto es')) {
            try {
                const limpia = texto.replace(/[^0-9+\-*/().]/g, '');
                if (limpia.length > 0) {
                    const res = eval(limpia);
                    return `El resultado exacto es **${res}**. ¿Ves que sí estaba fácil? 🤭`;
                }
            } catch (e) { }
        }

        if (t.includes('estres') || t.includes('cansado') || t.includes('dificil') || t.includes('examen') || t.includes('no entiendo')) {
            return "Ay, te entiendo perfecto. La neta la uni a veces absorbe bien feo. Tómate un respiro, estira las patas tantito y lo vemos sin presiones. ¡Sí puedes con esto!";
        }

        const respuestasCasual = [
            "¡Jaja, qué buen punto! Oye, platícame más de eso o pásame el planteamiento completo.",
            "Súper de acuerdo contigo. Analizándolo desde ese enfoque, tiene todo el sentido del mundo.",
            "¡Ay, me encanta ese tema! Explícame un poquito más a fondo para ver cómo le hacemos.",
            "Definitivamente. Oye, ¿qué te parece si me pasas los datos exactos y lo armamos?"
        ];
        return respuestasCasual[Math.floor(Math.random() * respuestasCasual.length)];
    }

    async function ejecutarEnvio() {
        const texto = userInput.value.trim();
        if (!texto) return;

        const divU = document.createElement('div');
        divU.className = 'message user';
        divU.textContent = texto;
        chatMessages.appendChild(divU);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        userInput.value = '';
        historialChat.push({ role: "user", content: texto });

        setTimeout(() => {
            const respuestaFinal = activarCerebroValeria(texto);

            const divAI = document.createElement('div');
            divAI.className = 'message model';
            divAI.style.whiteSpace = "pre-line";
            divAI.textContent = respuestaFinal;
            chatMessages.appendChild(divAI);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            historialChat.push({ role: "assistant", content: respuestaFinal });
        }, 400);
    }

    // --- ACCESORIOS Y BOTONES INFERIORES ---

    // 1. Botón de foto/cámara: Abre el selector de archivos de tu compu o cel para mandar imágenes
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    if (photoButton) {
        photoButton.style.cursor = 'pointer';
        photoButton.addEventListener('click', () => {
            fileInput.click();
        });
    }

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(uploadEvent) {
                // Mostrar la imagen en el chat como mensaje del usuario
                const divU = document.createElement('div');
                divU.className = 'message user';
                const img = document.createElement('img');
                img.src = uploadEvent.target.result;
                img.style.maxWidth = '200px';
                img.style.borderRadius = '8px';
                divU.appendChild(img);
                chatMessages.appendChild(divU);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Respuesta de Valeria reaccionando a la foto
                setTimeout(() => {
                    const divAI = document.createElement('div');
                    divAI.className = 'message model';
                    divAI.textContent = "¡Ándale, qué buena foto! Oye, se ve increíble. Platícame qué es o de dónde la sacaste. 📸✨";
                    chatMessages.appendChild(divAI);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 800);
            };
            reader.readAsDataURL(file);
        }
    });

    // 2. Botón de emojis: Inserta caritas felices rápido en el cuadro de texto
    if (emojiButton) {
        emojiButton.style.cursor = 'pointer';
        emojiButton.addEventListener('click', () => {
            const emojisPopulares = ['😊', '🚀', '🏎️', '✨', '🔥', '😅', '💡', '💯'];
            const randomEmoji = emojisPopulares[Math.floor(Math.random() * emojisPopulares.length)];
            userInput.value += randomEmoji;
            userInput.focus();
        });
    }

    // 3. Botón de micrófono: Simula el envío de una nota de voz
    if (micButton) {
        micButton.style.cursor = 'pointer';
        micButton.addEventListener('click', () => {
            const divU = document.createElement('div');
            divU.className = 'message user';
            divU.innerHTML = '🎤 <i>[Nota de voz enviada]</i>';
            chatMessages.appendChild(divU);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                const divAI = document.createElement('div');
                divAI.className = 'message model';
                divAI.textContent = "Jaja, me mandaste nota de voz pero ando con los audífonos ocupados redactando unas cosas de la uni. Mejor escríbime aquí abajito qué me decías. 🎧👇";
                chatMessages.appendChild(divAI);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        });
    }

    if (sendButton) sendButton.addEventListener('click', ejecutarEnvio);
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') ejecutarEnvio();
        });
    }
});

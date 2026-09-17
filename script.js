document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    let historialChat = [
        { role: "system", content: "Eres Valeria, una estudiante universitaria de 18 años. Eres súper amigable, relajada, te encanta la Fórmula 1, los autos, los memes y platicar de todo un poco. Hablas de forma totalmente natural y humana por WhatsApp. Y cuando te piden matemáticas, cálculo o física, te pones pilas y ayudas a resolverlo paso a paso." },
        { role: "assistant", content: "¡Hola! Qué gusto saludarte por aquí. 😊 ¿Qué tal va tu día? ✨" }
    ];

    function activarCerebroValeria(texto) {
        const t = texto.toLowerCase().trim();

        if (t === 'hola' || t.startsWith('hola ') || t.includes('que tal') || t.includes('buenos dias') || t.includes('buenas tardes')) {
            const saludos = [
                "¡Hola! Qué gusto leerte por acá. 😊 ¿Cómo va tu día o en qué andas?",
                "¡Hola, hola! Qué cuentas. Yo aquí andaba distraída con unas cosas, pero dime, ¿de qué platicamos hoy? ✨",
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

    // --- 1. CÁMARA / GALERÍA BLINDADA ---
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    const todosLosIconos = document.querySelectorAll('i, span, button');
    todosLosIconos.forEach(el => {
        const cl = el.className.toLowerCase();
        if (cl.includes('camera') || cl.includes('image') || cl.includes('photo')) {
            el.style.cursor = 'pointer';
            el.addEventListener('click', (e) => {
                e.preventDefault();
                fileInput.click();
            });
        }
    });

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
                    divAI.textContent = "¡Qué buena foto! 📸 Se ve excelente. Platícame de qué es o qué onda.";
                    chatMessages.appendChild(divAI);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 800);
            };
            reader.readAsDataURL(file);
        }
    });

    // --- 2. PANEL DE EMOJIS FLOTANTE ---
    // Creamos un menú flotante con emojis para que al hacer clic en la carita feliz se abra
    const emojiPicker = document.createElement('div');
    emojiPicker.style.position = 'absolute';
    emojiPicker.style.bottom = '70px';
    emojiPicker.style.left = '20px';
    emojiPicker.style.background = '#ffffff';
    emojiPicker.style.border = '1px solid #ccc';
    emojiPicker.style.borderRadius = '8px';
    emojiPicker.style.padding = '8px';
    emojiPicker.style.display = 'none';
    emojiPicker.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    emojiPicker.style.zIndex = '1000';
    
    const emojisDisponibles = ['😊', '😂', '🔥', '🚀', '🏎️', '✨', '👍', '❤️', '🤓', '🎉', '👇', '🤔'];
    emojisDisponibles.forEach(emoji => {
        const span = document.createElement('span');
        span.textContent = emoji;
        span.style.fontSize = '20px';
        span.style.cursor = 'pointer';
        span.style.margin = '4px';
        span.style.display = 'inline-block';
        span.addEventListener('click', () => {
            userInput.value += emoji;
            userInput.focus();
            emojiPicker.style.display = 'none';
        });
        emojiPicker.appendChild(span);
    });
    document.body.appendChild(emojiPicker);

    todosLosIconos.forEach(el => {
        const cl = el.className.toLowerCase();
        if (cl.includes('smile') || cl.includes('face') || cl.includes('emoji')) {
            el.style.cursor = 'pointer';
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                const rect = el.getBoundingClientRect();
                emojiPicker.style.left = rect.left + 'px';
                emojiPicker.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
                emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
            });
        }
    });

    // Ocultar el panel de emojis si haces clic fuera
    document.addEventListener('click', (e) => {
        if (!emojiPicker.contains(e.target) && !e.target.className.includes('smile')) {
            emojiPicker.style.display = 'none';
        }
    });

    // --- 3. MICRÓFONO / NOTA DE VOZ ---
    todosLosIconos.forEach(el => {
        const cl = el.className.toLowerCase();
        if (cl.includes('microphone') || cl.includes('mic') || cl.includes('audio')) {
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => {
                const divU = document.createElement('div');
                divU.className = 'message user';
                divU.innerHTML = '🎤 <i>[Nota de voz]</i>';
                chatMessages.appendChild(divU);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                setTimeout(() => {
                    const divAI = document.createElement('div');
                    divAI.className = 'message model';
                    divAI.textContent = "Jaja, me mandaste nota de voz pero ando ocupada redactando. Mejor escríbeme aquí abajito. 🎧";
                    chatMessages.appendChild(divAI);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 800);
            });
        }
    });

    if (sendButton) sendButton.addEventListener('click', ejecutarEnvio);
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') ejecutarEnvio();
        });
    }
});

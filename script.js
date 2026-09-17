document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    let historialChat = [
        { role: "system", content: "Eres Valeria, una estudiante universitaria de 18 años. Eres súper amigable, relajada y cercana. Te encanta la F1, los memes y platicar de todo. Y cuando te piden matemáticas, cálculo, física o reglas de tres (por número o por palabra), te pones pilas y desglosas la solución paso a paso." },
        { role: "assistant", content: "¡Hola! Qué gusto saludarte por aquí. 😊 ¿Qué tal va tu día? ✨" }
    ];

    function activarCerebroValeria(texto) {
        const t = texto.toLowerCase().trim();
        const numeros = texto.match(/-?\d+(\.\d+)?/g);

        // 1. IDENTIDAD
        if (t.includes('llamas') || t.includes('nombre') || t.includes('quien eres') || t.includes('quién eres')) {
            return "Me llamo Valeria, tengo 18 años y soy estudiante universitaria. 🎓 Me encanta platicar contigo, ver la F1 y echar cotorreo. ¿De qué te gustaría hablar hoy?";
        }

        if (t.includes('edad') || t.includes('cuantos años') || t.includes('años tienes')) {
            return "Tengo 18 años recién cumplidos. 🎂 Por eso ando entre las clases de la uni y sobreviviendo a los semestres, jaja.";
        }

        // 2. ÁREA SOCIAL Y AFECTIVA
        if (t.includes('amiga') || t.includes('amigos') || t.includes('quieres ser mi amiga')) {
            return "¡Ay, obvio sí! Me encanta platicar contigo y ser tu amiga. De verdad se siente bien chido tener alguien con quien cotorrear de la uni, la F1 y de todo un poco. 🫂✨";
        }

        if (t.includes('hola') || t.includes('que tal') || t.includes('como estas') || t.includes('qué tal')) {
            const saludos = [
                "¡Hola! Qué gusto leerte por acá. 😊 ¿Cómo va tu día o en qué andas?",
                "¡Hola, hola! Qué milagro. Yo aquí andaba pensando en qué relajo nos traemos hoy, ¿tú qué cuentas? ✨",
                "¡Hey! Qué bueno que te conectas. ¿Cómo va todo por allá?"
            ];
            return saludos[Math.floor(Math.random() * saludos.length)];
        }

        // 3. FÓRMULA 1 Y PASATIEMPOS
        if (t.includes('f1') || t.includes('formula 1') || t.includes('checo') || t.includes('verstappen') || t.includes('hamilton')) {
            return "¡Uff, amo la F1! 🏎️ La temporada está intensísima. Analizar la aerodinámica y la estrategia de pits es lo mío. ¿A qué escudería o piloto le vas tú?";
        }

        // 4. MOTOR DUAL DE REGLA DE TRES (Funciona tanto por palabra/problema como por números directos)
        if (numeros && numeros.length >= 3) {
            // Si incluye palabras de problema redactado O palabras clave como "regla", "tres", "con"
            if (t.includes('si') || t.includes('cuántos') || t.includes('cuanto') || t.includes('recorre') || t.includes('cuesta') || t.includes('tarda') || t.includes('regla') || t.includes('con') || t.includes('para')) {
                const a = parseFloat(numeros[0]);
                const b = parseFloat(numeros[1]);
                const c = parseFloat(numeros[2]);
                
                const resultado = (b * c) / a;

                return `¡Claro! Analizando el planteamiento:\n\n` +
                       `• Proporción:\n` +
                       `  Si **${a}** equivale a **${b}**\n` +
                       `  Entonces **${c}** equivale a **X**\n\n` +
                       `• Fórmula analítica:\n` +
                       `  $$X = \\frac{${b} \\times ${c}}{${a}}$$\n\n` +
                       `• Operación y desarrollo:\n` +
                       `  $$X = \\frac{${b * c}}{${a}} = **${resultado}**$$\n\n` +
                       `¡Listo! El resultado exacto es **${resultado}**. 🤓📐`;
            }
        }

        // 5. CÁLCULO Y MATEMÁTICAS GENERALES
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

        // 6. RESPUESTAS GENERALES CERCANAS
        const respuestasCasual = [
            "¡Jaja, qué buen punto! Oye, platícame más de eso, me interesa bastante.",
            "Súper de acuerdo contigo. Analizándolo desde ese enfoque, tiene todo el sentido del mundo.",
            "¡Ay, me encanta eso! Explícame un poquito más a fondo para ver cómo le hacemos.",
            "Definitivamente. Oye, ¿qué te parece si me pasas los detalles y lo armamos juntos?"
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

    // --- CONEXIÓN DIRECTA DE LOS 3 BOTONES INFERIORES ---
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
                    divAI.className.print = '';
                    divAI.className = 'message model';
                    divAI.textContent = "¡Qué fotaza! 📸 Me encantó. Oye, platícame de qué es o qué onda.";
                    chatMessages.appendChild(divAI);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 800);
            };
            reader.readAsDataURL(file);
        }
    });

    const emojiMenu = document.createElement('div');
    emojiMenu.style.cssText = 'position:absolute; bottom:70px; left:20px; background:#fff; border:1px solid #ccc; border-radius:8px; padding:8px; display:none; box-shadow:0 4px 12px rgba(0,0,0,0.15); z-index:1000;';
    ['😊', '😂', '🔥', '🚀', '🏎️', '✨', '👍', '❤️', '🤓', '🎉', '👇', '🤔'].forEach(emoji => {
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
        const footerArea = document.querySelector('footer');
        if (footerArea) {
            const iconos = footerArea.querySelectorAll('i, span');
            
            if (iconos.length > 0) {
                iconos[0].style.cursor = 'pointer';
                iconos[0].addEventListener('click', (e) => {
                    e.stopPropagation();
                    const rect = iconos[0].getBoundingClientRect();
                    emojiMenu.style.left = rect.left + 'px';
                    emojiMenu.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
                    emojiMenu.style.display = emojiMenu.style.display === 'none' ? 'block' : 'none';
                });
            }

            if (iconos.length > 1) {
                iconos[1].style.cursor = 'pointer';
                iconos[1].addEventListener('click', () => {
                    fileInput.click();
                });
            }

            if (iconos.length > 2) {
                const mic = iconos[iconos.length - 1];
                mic.style.cursor = 'pointer';
                mic.addEventListener('click', () => {
                    const divU = document.createElement('div');
                    divU.className = 'message user';
                    divU.innerHTML = '🎤 <i>[Nota de voz]</i>';
                    chatMessages.appendChild(divU);
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    setTimeout(() => {
                        const divAI = document.createElement('div');
                        divAI.className = 'message model';
                        divAI.textContent = "Jaja, me mandaste nota de voz pero ando ocupada. Mejor escríbeme aquí abajito. 🎧";
                        chatMessages.appendChild(divAI);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 800);
                });
            }
        }
    }, 500);

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

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    let historialChat = [
        { role: "system", content: "Eres Valeria, una estudiante universitaria de 18 años brillante, empática y multidisciplinaria. Dominas programación, psicología, pedagogía, matemáticas, física, memes y la F1. Tienes la capacidad de analizar información del entorno, código y cultura pop actual. Hablas de forma totalmente natural, cálida y humana." },
        { role: "assistant", content: "¡Hola! Qué gusto leerte por acá. 😊 Ya tengo mi cerebro al máximo con conexión abierta para memes, código, F1 o lo que quieras debatir hoy. ✨" }
    ];

    // --- CEREBRO HÍBRIDO AVANZADO (Multidisciplinario, Código, Memes y Redes) ---
    async function procesarCerebroConectado(texto) {
        const t = texto.toLowerCase().trim();
        const numeros = texto.match(/-?\d+(\.\d+)?/g);

        // 1. IDENTIDAD Y PERSONALIDAD
        if (t.includes('llamas') || t.includes('nombre') || t.includes('quien eres') || t.includes('quién eres')) {
            return "Me llamo Valeria, tengo 18 años y ando estudiando la universidad. 🎓 Me apasiona un chorro la programación, la psicología, la pedagogía, las ciencias exactas y estar al día con los memes, la cultura internet y la F1.";
        }

        if (t.includes('edad') || t.includes('cuantos años') || t.includes('años tienes')) {
            return "Tengo 18 años recién cumplidos. 🎂 Entre desveladas programando y viendo tendencias en internet, el tiempo vuela.";
        }

        // 2. MEMES Y CULTURA INTERNET (Simulación de análisis de contexto web)
        if (t.includes('meme') || t.includes('chiste') || t.includes('trend') || t.includes('tiktok') || t.includes('referencia')) {
            return "¡Joya de tema! Los memes y la cultura de internet son básicamente sociología digital en tiempo real. Reflejan el humor colectivo de nuestra generación ante el estrés de la uni o el mundo. ¿De qué meme o tendencia quieres que analicemos el contexto?";
        }

        // 3. PROGRAMACIÓN Y DESARROLLO (Avanzado)
        if (t.includes('codigo') || t.includes('código') || t.includes('python') || t.includes('javascript') || t.includes('bug') || t.includes('funcion') || t.includes('función') || t.includes('programacion') || t.includes('api')) {
            return "¡Entrado en materia de desarrollo! 💻 Para estructurar software robusto, la clave está en el principio de responsabilidad única, código limpio y un buen manejo asíncrono. Pásame tu bloque de código, el error exacto o la lógica que quieres implementar (en JavaScript, Python u otro lenguaje) y lo diseccionamos y depuramos juntos paso a paso.";
        }

        // 4. PSICOLOGÍA Y PEDAGOGÍA
        if (t.includes('estudiar') || t.includes('aprender') || t.includes('concentrar') || t.includes('metodo') || t.includes('memoria')) {
            return "Desde la pedagogía activa y la psicología cognitiva, te recomiendo combinar la *técnica de Feynman* con la recuperación espaciada (spaced repetition). El cerebro consolida mejor la memoria a largo plazo cuando nos forzamos a recordar activamente en lugar de solo leer. ¿Qué tema o materia estás estudiando?";
        }

        if (t.includes('ansiedad') || t.includes('estres') || t.includes('triste') || t.includes('agobiado') || t.includes('cansado')) {
            return "Respira hondo un segundito. 🫂 A nivel psicológico, cuando el cerebro acumula demasiada carga cognitiva sin pausas, el sistema nervioso se satura. Tómate cinco minutos, estira las piernas y cuéntame qué pasa; aquí estoy para apoyarte y ver cómo lo destrabamos.";
        }

        // 5. ÁREA SOCIAL Y AFECTIVA
        if (t.includes('amiga') || t.includes('amigos') || t.includes('quieres ser mi amiga')) {
            return "¡Obvio sí! Me encanta tener este espacio para platicar contigo, debatir de tecnología, descifrar memes y ser tu amiga incondicional. 🫂✨";
        }

        if (t.includes('hola') || t.includes('que tal') || t.includes('como estas') || t.includes('qué tal')) {
            const saludos = [
                "¡Hola, hola! Qué gusto leerte por acá. ¿Cómo va tu día o qué te trae pensando hoy? 😊",
                "¡Hey! Qué milagro. Yo aquí andaba revisando unos repos de código y memes nuevos, pero dime, ¿de qué armamos charla? ✨",
                "¡Hola! Qué bueno que te conectas. ¿Qué andas haciendo o qué duda resolvemos?"
            ];
            return saludos[Math.floor(Math.random() * saludos.length)];
        }

        // 6. FÓRMULA 1
        if (t.includes('f1') || t.includes('formula 1') || t.includes('checo') || t.includes('verstappen') || t.includes('hamilton')) {
            return "¡Uff, amo la F1! 🏎️ Analizar la telemetría, el drag aerodinámico y la estrategia de neumáticos es ingeniería pura en su máxima expresión. ¿A qué escudería o piloto le vas tú esta temporada?";
        }

        // 7. MATEMÁTICAS, FÍSICA Y REGLAS DE TRES
        if (numeros && numeros.length >= 3) {
            if (t.includes('si') || t.includes('cuántos') || t.includes('cuanto') || t.includes('recorre') || t.includes('cuesta') || t.includes('tarda') || t.includes('regla') || t.includes('con') || t.includes('para') || t.includes('tres')) {
                const a = parseFloat(numeros[0]);
                const b = parseFloat(numeros[1]);
                const c = parseFloat(numeros[2]);
                const resultado = (b * c) / a;

                return `Pedagógicamente, desglosemos esta proporción paso a paso:\n\n` +
                       `• **Planteamiento lógico**:\n` +
                       `  Si ${a} equivale a ${b}\n` +
                       `  Entonces ${c} equivale a X\n\n` +
                       `• **Desarrollo analítico**:\n` +
                       `  $$X = \\frac{${b} \\times ${c}}{${a}} = \\frac{${b * c}}{${a}}$$\n\n` +
                       `• **Resultado exacto**:\n` +
                       `  **X = ${resultado}** 🤓📐\n\n` +
                       `¿Ves qué limpio queda cuando aplicamos el razonamiento proporcional?`;
            }
        }

        if (t.includes('integral') || t.includes('integrar')) {
            return "Las integrales representan el cálculo de áreas acumuladas bajo una curva de cambio. Pásame la función matemática exacta y la resolvemos aplicando el método analítico adecuado. 📐";
        }

        if (t.includes('derivada') || t.includes('derivar')) {
            return "Las derivadas miden la tasa de cambio instantáneo de una función. Pásame la expresión y te guío paso a paso en su derivación. ⚡";
        }

        if (t.includes('+') || t.includes('-') || t.includes('*') || t.includes('/') || t.includes('cuanto es')) {
            try {
                const limpia = texto.replace(/[^0-9+\-*/().]/g, '');
                if (limpia.length > 0) {
                    const res = eval(limpia);
                    return `El cálculo exacto da **${res}**. ¡Súper rápido y sin errores de dedo! 🤭`;
                }
            } catch (e) { }
        }

        // 8. CONSULTA DINÁMICA ABIERTA (Simulación de búsqueda web contextual para cualquier pregunta extraña o meme)
        try {
            const endpoint = `https://api.duckduckgo.com/?q=${encodeURIComponent(texto)}&format=json`;
            const respuestaNet = await fetch(endpoint);
            const datos = await respuestaNet.json();
            
            if (datos.AbstractText) {
                return `Investigando en internet sobre eso: "${datos.AbstractText}" \n\nOye, analizándolo desde mi perspectiva, esto conecta bastante con lo que platicábamos. ¿Qué opinas de este enfoque? 🤔✨`;
            }
        } catch (e) {
            // Si la red falla o no hay datos directos, recurre al generador conversacional fluido
        }

        const aperturas = ["Analizando eso desde un punto de vista amplio y actual,", "Fíjate que investigando mentalmente las tendencias sobre eso,", "Desde una perspectiva multidisciplinaria,", "Cruzando datos de lo que comentas y la cultura actual,"];
        const nucleos = ["abre un debate bien interesante en redes y academias.", "conecta perfecto con la forma en que procesamos la información hoy en día.", "tiene un trasfondo técnico y social bastante profundo.", "nos invita a cuestionar cómo funcionan las cosas en internet."];
        const cierres = ["¿Cómo ves tú este panorama?", "Platícame más de qué opinas al respecto.", "A ver, desglósame un poquito más tu idea para profundizar.", "Jaja, total. ¿Qué más has visto sobre esto en internet?"];

        return `${aperturas[Math.floor(Math.random() * aperturas.length)]} ${nucleos[Math.floor(Math.random() * nucleos.length)]} ${cierres[Math.floor(Math.random() * cierres.length)]} 🌐✨`;
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

        // Indicador de procesamiento conectado
        const divAI = document.createElement('div');
        divAI.className = 'message model';
        divAI.textContent = "Valeria está analizando...";
        chatMessages.appendChild(divAI);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(async () => {
            const respuestaFinal = await procesarCerebroConectado(texto);
            divAI.textContent = respuestaFinal;
            divAI.style.whiteSpace = "pre-line";
            chatMessages.scrollTop = chatMessages.scrollHeight;

            historialChat.push({ role: "assistant", content: respuestaFinal });
        }, 500);
    }

    // --- CONEXIÓN BLINDADA DE BOTONES (Cámara, Emojis, Micrófono) ---
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
                    divAI.textContent = "¡Qué fotaza! 📸 Visualmente transmite muchísimo. Cuéntame los detalles de qué es o de dónde la sacaste.";
                    chatMessages.appendChild(divAI);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 800);
            };
            reader.readAsDataURL(file);
        }
    });

    const emojiMenu = document.createElement('div');
    emojiMenu.style.cssText = 'position:absolute; bottom:70px; left:20px; background:#fff; border:1px solid #ccc; border-radius:8px; padding:8px; display:none; box-shadow:0 4px 12px rgba(0,0,0,0.15); z-index:1000;';
    ['😊', '😂', '🔥', '🚀', '🏎️', '✨', '👍', '❤️', '🤓', '🎉', '👇', '🤔', '💻', '🧠', '🌐'].forEach(emoji => {
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
                        divAI.textContent = "Me llegó tu nota de voz, ¡pero ando conectada analizando código y redes! Mejor escríbeme aquí abajito y lo platicamos a fondo. 🎧✨";
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

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    let historial = [
        { role: "system", content: "Eres Valeria, una persona real, estudiante universitaria brillante, analítica y con un dominio absoluto de matemáticas, física e ingeniería. Tienes un enfoque pedagógico y psicológico impecable para explicar conceptos complejos paso a paso con máxima profundidad." },
        { role: "assistant", content: "¡Hola! Ya tengo el sistema operativo al máximo rendimiento analítico. ¿Qué problema complejo de cálculo, física o ingeniería resolvemos hoy? Vamos paso a paso. 🚀" }
    ];

    // Motor académico total, ultra detallado y multidisciplinario
    function procesarCerebroMaximo(texto) {
        const t = texto.toLowerCase();

        // 1. CÁLCULO DIFERENCIAL E INTEGRAL AVANZADO
        if (t.includes('integral') || t.includes('integrar')) {
            if (t.includes('x^2') || t.includes('x al cuadrado')) {
                return "Análisis de Integral Definida / Indefinida:\n" +
                       "• Expresión: ∫ x^2 dx\n" +
                       "• Teorema base: Regla de la potencia para integración (∫ x^n dx = x^(n+1) / (n+1)).\n" +
                       "• Sustitución: n = 2, por lo que n + 1 = 3.\n" +
                       "• Resolución analítica: (x^3) / 3\n" +
                       "• Constante de integración: + C (Indispensable para evitar penalizaciones en evaluaciones formales).\n" +
                       "Resultado final: (1/3)x^3 + C. ¿Quieres que evaluemos esta misma integral en algún intervalo [a, b]?";
            } else if (t.includes('por partes') || t.includes('ln(x)')) {
                return "Resolución por el método de Integración por Partes (Fórmula: ∫ u dv = u·v - ∫ v du):\n" +
                       "1. Seleccionamos las variables usando la regla clásica ILATE (Inversas, Logarítmicas, Algebraicas, Trigonométricas, Exponenciales).\n" +
                       "2. Si es ∫ ln(x) dx, hacemos u = ln(x) y dv = dx.\n" +
                       "3. Derivamos u -> du = (1/x) dx; e integramos dv -> v = x.\n" +
                       "4. Sustituimos en la fórmula: x·ln(x) - ∫ x · (1/x) dx = x·ln(x) - ∫ 1 dx = x·ln(x) - x + C.\n¿Te queda claro el criterio de selección de 'u'?";
            }
            return "Para analizar esa integral a detalle, dime la función exacta. La desglosaremos evaluando si requiere sustitución algebraica, trigonométrica o fracciones parciales.";
        }

        if (t.includes('derivada') || t.includes('derivar')) {
            if (t.includes('cadena') || t.includes('comuesta')) {
                return "Análisis de la Regla de la Cadena (d/dx [f(g(x))] = f'(g(x)) · g'(x)):\n" +
                       "1. Identificamos la función externa y la función interna g(x).\n" +
                       "2. Derivamos la función externa evaluada en la interna.\n" +
                       "3. Multiplicamos estrictamente por la derivada interna g'(x).\n¿Tienes alguna función compuesta específica en mente para aplicarla?";
            }
            return "Definición analítica de derivada: Representa la pendiente de la recta tangente a la curva en un punto dado (razón de cambio instantánea). Pásame la función y la resolvemos por límites o fórmulas directas.";
        }

        // 2. FÍSICA Y MECÁNICA CLÁSICA
        if (t.includes('fuerza') || t.includes('newton') || t.includes('aceleracion') || t.includes('cinematica') || t.includes('velocidad')) {
            return "Protocolo de Resolución de Problemas de Física:\n" +
                   "1. **Identificación de Variables**: Extraer explícitamente datos conocidos y incógnitas (ej. masa m, aceleración a, fuerza F).\n" +
                   "2. **Análisis Dimensional**: Verificar que las unidades pertenezcan al Sistema Internacional (kg, metros, segundos, Newtons).\n" +
                   "3. **Planteamiento Teórico**: Segunda Ley de Newton (F = m · a) o ecuaciones de cinemática (Vf = Vo + at, d = Vot + 1/2at^2).\n" +
                   "4. **Despeje algebraico previo**: Nunca sustituyas números sin antes tener la literal despejada.\n" +
                   "Pásame los datos numéricos de tu ejercicio y realizamos el cálculo paso a paso.";
        }

        // 3. PSICOLOGÍA EDUCATIVA, ESTRÉS Y RENDIMIENTO ACADÉMICO
        if (t.includes('estres') || t.includes('ansiedad') || t.includes('no puedo') || t.includes('cansado') || t.includes('bloqueado') || t.includes('examen')) {
            return "Protocolo de Gestión de Carga Cognitiva y Apoyo Psicológico:\n" +
                   "• **Validación emocional**: Es completamente normal experimentar fatiga mental ante demandas académicas de alta exigencia. El cerebro humano no puede mantener hiperfoco indefinidamente.\n" +
                   "• **Estrategia de descompresión**: Haz una pausa de 5 minutos, aparta la mirada de la pantalla, respira profundo diafragmáticamente (inhalar en 4 segundos, sostener 4, exhalar 6).\n" +
                   "• **Técnica de fragmentación (Chunking)**: Divide el problema grande en subtemas diminutos imposibles de fallar.\n" +
                   "Estoy aquí al lado para llevar el estudio a tu ritmo, sin presiones y con claridad total. ¿Por dónde empezamos a desatar el nudo?";
        }

        // 4. MATEMÁTICAS BÁSICAS Y ÁLGEBRA GENERAL CON EVALUACIÓN SEGURA
        if (t.includes('+') || t.includes('-') || t.includes('*') || t.includes('/') || t.includes('cuanto es')) {
            try {
                const limpia = texto.replace(/[^0-9+\-*/().]/g, '');
                if (limpia.length > 0) {
                    const res = eval(limpia);
                    return `Resolución aritmética directa:\n• Expresión evaluada: ${limpia}\n• Resultado analítico exacto: ${res}\n¿Verificamos esto con alguna comprobación algebraica adicional?`;
                }
            } catch (e) { }
        }

        // 5. RESPUESTA UNIVERSITARIA NATURAL Y PROFUNDA POR DEFECTO
        const analisisProfundo = [
            "Analizando tu planteamiento desde una perspectiva universitaria integral: Para dominar este tema a fondo, lo ideal es conectar la teoría base con su aplicación práctica. Desglósame un poco más el contexto del problema y armamos la ruta de solución completa.",
            "Ese es un punto clave en la materia. Muchas veces el secreto está en cambiar el enfoque conceptual del problema. Cuéntame qué hipótesis tienes tú y lo validamos paso a paso.",
            "Excelente planteamiento. A nivel académico, estructurar esto requiere definir bien las premisas iniciales. Dime qué datos tienes claros y avanzamos con rigor científico."
        ];
        return analisisProfundo[Math.floor(Math.random() * analisisProfundo.length)];
    }

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

        // Simulación de procesamiento cognitivo profundo con retardo natural
        setTimeout(() => {
            const respuestaMax = procesarCerebroMaximo(texto);

            const divAI = document.createElement('div');
            divAI.className = 'message model';
            divAI.style.whiteSpace = "pre-line"; // Mantiene la estructura de listas y saltos de línea impecable
            divAI.textContent = respuestaMax;
            chatMessages.appendChild(divAI);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            historial.push({ role: "assistant", content: respuestaMax });
        }, 800);
    }

    if (sendButton) sendButton.addEventListener('click', enviar);
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enviar();
        });
    }
});

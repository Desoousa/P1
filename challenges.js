/**
 * CHALLENGES DATABASE - Preguntas, minijuegos y acertijos
 * Mezcla de trivia, click rápido, matemáticas, memoria y lógica
 */

const ChallengesDB = {
    // ========================================
    // TRIVIA - Opción múltiple (4 opciones)
    // ========================================
    trivia: [
        {
            question: "¿Cuál es la capital de Australia?",
            options: ["Sídney", "Melbourne", "Canberra", "Perth"],
            answer: 2,
            category: "Geografía"
        },
        {
            question: "¿En qué año llegó el hombre a la Luna?",
            options: ["1967", "1969", "1971", "1965"],
            answer: 1,
            category: "Historia"
        },
        {
            question: "¿Cuál es el elemento más abundante en el universo?",
            options: ["Oxígeno", "Carbono", "Hidrógeno", "Helio"],
            answer: 2,
            category: "Ciencia"
        },
        {
            question: "¿Quién pintó 'La noche estrellada'?",
            options: ["Picasso", "Dalí", "Van Gogh", "Monet"],
            answer: 2,
            category: "Arte"
        },
        {
            question: "¿Cuántos huesos tiene un adulto?",
            options: ["206", "208", "204", "210"],
            answer: 0,
            category: "Biología"
        },
        {
            question: "¿Qué país tiene más islas del mundo?",
            options: ["Indonesia", "Filipinas", "Suecia", "Canadá"],
            answer: 2,
            category: "Geografía"
        },
        {
            question: "¿Cuál es el río más largo?",
            options: ["Amazonas", "Nilo", "Misisipi", "Yangtsé"],
            answer: 1,
            category: "Geografía"
        },
        {
            question: "¿En qué consola salió el primer Mario?",
            options: ["NES", "SNES", "Game Boy", "Arcade"],
            answer: 3,
            category: "Videojuegos"
        },
        {
            question: "¿Qué gas hace la voz aguda?",
            options: ["Helio", "Hidrógeno", "Argón", "Neón"],
            answer: 0,
            category: "Ciencia"
        },
        {
            question: "¿Quién escribió 'Cien años de soledad'?",
            options: ["Borges", "Cortázar", "García Márquez", "Vargas Llosa"],
            answer: 2,
            category: "Literatura"
        },
        {
            question: "¿Cuál es el planeta más caliente?",
            options: ["Mercurio", "Venus", "Marte", "Júpiter"],
            answer: 1,
            category: "Astronomía"
        },
        {
            question: "¿Qué lengua tiene más hablantes nativos?",
            options: ["Inglés", "Español", "Chino mandarín", "Hindú"],
            answer: 2,
            category: "Idiomas"
        },
        {
            question: "¿En qué año cayó el Muro de Berlín?",
            options: ["1987", "1989", "1991", "1985"],
            answer: 1,
            category: "Historia"
        },
        {
            question: "¿Cuántos corazones tiene un pulpo?",
            options: ["1", "2", "3", "4"],
            answer: 2,
            category: "Biología"
        },
        {
            question: "¿Qué significa 'HTML'?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            answer: 0,
            category: "Informática"
        }
    ],

    // ========================================
    // MATEMÁTICAS - Input numérico
    // ========================================
    math: [
        { question: "7 × 8 = ?", answer: 56 },
        { question: "144 ÷ 12 = ?", answer: 12 },
        { question: "15² = ?", answer: 225 },
        { question: "√169 = ?", answer: 13 },
        { question: "2³ × 3² = ?", answer: 72 },
        { question: "99 + 87 = ?", answer: 186 },
        { question: "250 - 137 = ?", answer: 113 },
        { question: "13 × 14 = ?", answer: 182 },
        { question: "1000 ÷ 25 = ?", answer: 40 },
        { question: "5! = ?", answer: 120 },
        { question: "2¹⁰ = ?", answer: 1024 },
        { question: "½ + ⅓ = ? (decimal)", answer: 0.8333333333333333 },
        { question: "MCD(48, 72) = ?", answer: 24 },
        { question: "mcm(12, 18) = ?", answer: 36 },
        { question: "Suma 1 al 10 = ?", answer: 55 }
    ],

    // ========================================
    // CLICK RÁPIDO - Click 20 veces en 3s
    // ========================================
    clicker: [
        { question: "¡CLICK 20 VECES EN 3 SEGUNDOS!", target: 20, time: 3000 },
        { question: "¡CLICK 15 VECES EN 2 SEGUNDOS!", target: 15, time: 2000 },
        { question: "¡CLICK 30 VECES EN 4 SEGUNDOS!", target: 30, time: 4000 },
        { question: "¡CLICK 10 VECES EN 1.5 SEGUNDOS!", target: 10, time: 1500 },
        { question: "¡CLICK 25 VECES EN 3.5 SEGUNDOS!", target: 25, time: 3500 }
    ],

    // ========================================
    // MEMORIA - Secuencia de flechas
    // ========================================
    memory: [
        { question: "Memoriza la secuencia:", sequence: ['↑', '→', '↓', '←'] },
        { question: "Memoriza la secuencia:", sequence: ['→', '→', '↑', '↓', '←'] },
        { question: "Memoriza la secuencia:", sequence: ['↑', '↑', '↓', '↓', '←', '→'] },
        { question: "Memoriza la secuencia:", sequence: ['→', '↓', '←', '↑', '→', '↓'] },
        { question: "Memoriza la secuencia:", sequence: ['↑', '→', '↓', '←', '↑', '→', '↓'] }
    ],

    // ========================================
    // ACERTIJOS / LÓGICA - Input texto
    // ========================================
    riddles: [
        {
            question: "Tengo ciudades sin casas, montañas sin árboles y agua sin peces. ¿Qué soy?",
            answer: "mapa",
            alternatives: ["un mapa", "mapa"]
        },
        {
            question: "Cuanto más me quitas, más grande me hago. ¿Qué soy?",
            answer: "agujero",
            alternatives: ["un agujero", "hueco"]
        },
        {
            question: "Tengo llaves pero no cerraduras. Tengo espacio pero no habitaciones. Puedes entrar pero no salir. ¿Qué soy?",
            answer: "teclado",
            alternatives: ["un teclado", "teclado"]
        },
        {
            question: "¿Qué sube pero nunca baja?",
            answer: "edad",
            alternatives: ["la edad", "tu edad"]
        },
        {
            question: "Tiene dientes pero no muerde. ¿Qué es?",
            answer: "peine",
            alternatives: ["un peine", "peine"]
        },
        {
            question: "Soy alto cuando soy joven y bajo cuando soy viejo. ¿Qué soy?",
            answer: "vela",
            alternatives: ["una vela", "vela"]
        },
        {
            question: "¿Qué se moja mientras se seca?",
            answer: "toalla",
            alternatives: ["una toalla", "toalla"]
        },
        {
            question: "Tengo cabeza y cola pero no cuerpo. ¿Qué soy?",
            answer: "moneda",
            alternatives: ["una moneda", "moneda"]
        },
        {
            question: "Cuanto más hay de mí, menos ves. ¿Qué soy?",
            answer: "oscuridad",
            alternatives: ["la oscuridad", "oscuridad"]
        },
        {
            question: "Pertenezco a ti, pero los demás me usan más que tú. ¿Qué soy?",
            answer: "nombre",
            alternatives: ["tu nombre", "nombre"]
        },
        {
            question: "Tengo ramas pero no frutos, tronco ni hojas. ¿Qué soy?",
            answer: "banco",
            alternatives: ["un banco", "banco"]
        },
        {
            question: "¿Qué tiene palabras pero nunca habla?",
            answer: "libro",
            alternatives: ["un libro", "libro"]
        },
        {
            question: "Corre pero no camina. Tiene cama pero no duerme. ¿Qué es?",
            answer: "río",
            alternatives: ["un río", "rio", "río"]
        },
        {
            question: "Tengo un ojo pero no veo. ¿Qué soy?",
            answer: "aguja",
            alternatives: ["una aguja", "aguja"]
        },
        {
            question: "Se rompe al decir su nombre. ¿Qué es?",
            answer: "silencio",
            alternatives: ["el silencio", "silencio"]
        }
    ],

    // ========================================
    // PATRONES NUMÉRICOS
    // ========================================
    patterns: [
        { question: "Siguiente: 2, 4, 8, 16, ?", answer: 32 },
        { question: "Siguiente: 1, 1, 2, 3, 5, 8, ?", answer: 13 },
        { question: "Siguiente: 1, 4, 9, 16, 25, ?", answer: 36 },
        { question: "Siguiente: 3, 6, 12, 24, ?", answer: 48 },
        { question: "Siguiente: 10, 9, 7, 4, ?", answer: 0 },
        { question: "Siguiente: 2, 6, 18, 54, ?", answer: 162 },
        { question: "Siguiente: 100, 50, 25, 12.5, ?", answer: 6.25 }
    ],

    // ========================================
    // CATEGORÍAS CON PESOS (para aleatoriedad)
    // ========================================
    categories: [
        { type: 'trivia', weight: 25, pool: 'trivia' },
        { type: 'math', weight: 20, pool: 'math' },
        { type: 'clicker', weight: 15, pool: 'clicker' },
        { type: 'memory', weight: 15, pool: 'memory' },
        { type: 'riddle', weight: 15, pool: 'riddles' },
        { type: 'pattern', weight: 10, pool: 'patterns' }
    ],

    // ========================================
    // MÉTODOS DE UTILIDAD
    // ========================================
    
    // Obtener desafío aleatorio ponderado
    getRandomChallenge() {
        const totalWeight = this.categories.reduce((sum, cat) => sum + cat.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const cat of this.categories) {
            random -= cat.weight;
            if (random <= 0) {
                const pool = this[cat.pool];
                const challenge = pool[Math.floor(Math.random() * pool.length)];
                return { ...challenge, challengeType: cat.type };
            }
        }
        
        // Fallback
        const pool = this.trivia;
        return { ...pool[Math.floor(Math.random() * pool.length)], challengeType: 'trivia' };
    },

    // Obtener desafío por tipo específico
    getChallengeByType(type) {
        const pool = this[type + 's'] || this[type];
        if (!pool || !pool.length) return this.getRandomChallenge();
        const challenge = pool[Math.floor(Math.random() * pool.length)];
        return { ...challenge, challengeType: type };
    },

    // Verificar respuesta según tipo
    checkAnswer(challenge, userAnswer) {
        switch (challenge.challengeType) {
            case 'trivia':
                return userAnswer === challenge.answer;
                
            case 'math':
                return Math.abs(Number(userAnswer) - challenge.answer) < 0.01;
                
            case 'clicker':
                return userAnswer >= challenge.target;
                
            case 'memory':
                return JSON.stringify(userAnswer) === JSON.stringify(challenge.sequence);
                
            case 'riddle':
                const normalized = userAnswer.toLowerCase().trim().replace(/[¿?¡!.,]/g, '');
                return challenge.alternatives.some(alt => 
                    normalized === alt.toLowerCase().trim()
                );
                
            case 'pattern':
                return Number(userAnswer) === challenge.answer;
                
            default:
                return false;
        }
    },

    // Generar opciones A/B para decisión (descripción del desafío)
    getChoiceDescriptions(challenge) {
        const descriptions = {
            trivia: "Pregunta de cultura general",
            math: "Cálculo mental rápido",
            clicker: "Prueba de reflejos",
            memory: "Memoria visual",
            riddle: "Acertijo lateral",
            pattern: "Secuencia numérica"
        };
        
        const base = descriptions[challenge.challengeType] || "Desafío desconocido";
        return [
            `${base} (Fácil)`,
            `${base} (Difícil)`
        ];
    }
};

window.ChallengesDB = ChallengesDB;
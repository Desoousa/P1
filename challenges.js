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
    // LoL CHAMPION QUIZ - Adivina el campeón por detalle pixelado
    // ========================================
    lolChampion: [
        {
            id: 'ahri',
            name: 'Ahri',
            title: 'La Nueve Colas',
            role: 'Mago',
            colors: {
                primary: '#E8B4E8',   // Pelo rosa
                secondary: '#FFD700', // Colas doradas
                skin: '#FFE4C4',      // Piel
                eyes: '#00FFFF',      // Ojos cyan
                outfit: '#8B008B',    // Ropa morada
                accent: '#FF69B4'     // Detalles rosa
            },
            features: ['orejas_fox', 'colas', 'orbita', 'pelo_largo'],
            difficulty: 'fácil'
        },
        {
            id: 'jinx',
            name: 'Jinx',
            title: 'La Criminal Suelta',
            role: 'Tirador',
            colors: {
                primary: '#00FFFF',   // Pelo azul
                secondary: '#FF1493', // Ojos/cohetes rosa
                skin: '#FFE4C4',
                eyes: '#FF1493',
                outfit: '#1A1A2E',    // Chaleco oscuro
                accent: '#FFD700'     // Dientes/detalles
            },
            features: ['pelo_loco', 'cohete', 'ojos_locos', 'tatuajes'],
            difficulty: 'fácil'
        },
        {
            id: 'yasuo',
            name: 'Yasuo',
            title: 'El Imperdonado',
            role: 'Asesino',
            colors: {
                primary: '#FFFFFF',   // Pelo blanco
                secondary: '#FFD700', // Detalles dorados
                skin: '#D4B896',
                eyes: '#000000',
                outfit: '#2D2D2D',    // Ropa oscura
                accent: '#FF4444'     // Viento rojo
            },
            features: ['pelo_viento', 'espada', 'cicatriz', 'cinturon'],
            difficulty: 'medio'
        },
        {
            id: 'lux',
            name: 'Lux',
            title: 'La Dama de la Luminosidad',
            role: 'Mago',
            colors: {
                primary: '#FFD700',   // Pelo dorado
                secondary: '#FFFFFF', // Luz blanca
                skin: '#FFE4C4',
                eyes: '#00BFFF',      // Ojos azules
                outfit: '#4169E1',    // Armadura azul
                accent: '#FFD700'     // Luz
            },
            features: ['baston', 'luz', 'armadura', 'cola_caballo'],
            difficulty: 'fácil'
        },
        {
            id: 'thresh',
            name: 'Thresh',
            title: 'El Guardián de las Cadenas',
            role: 'Soporte',
            colors: {
                primary: '#1A1A2E',   // Cuerpo oscuro
                secondary: '#00FFFF', // Almas/cadenas cyan
                skin: '#0D0D1A',
                eyes: '#00FFFF',      // Ojos brillantes
                outfit: '#2D1B1B',    // Armadura
                accent: '#FFD700'     // Detalles
            },
            features: ['calavera', 'cadenas', 'lintern', 'humo'],
            difficulty: 'medio'
        },
        {
            id: 'garen',
            name: 'Garen',
            title: 'El Poder de Demacia',
            role: 'Tanque',
            colors: {
                primary: '#C0C0C0',   // Armadura plateada
                secondary: '#FFD700', // Detalles dorados
                skin: '#D4B896',
                eyes: '#0000FF',
                outfit: '#C0C0C0',
                accent: '#000080'     // Capa azul
            },
            features: ['espada_grande', 'armadura', 'capa', 'casco'],
            difficulty: 'fácil'
        },
        {
            id: 'miss_fortune',
            name: 'Miss Fortune',
            title: 'La Capitana de la Fortuna',
            role: 'Tirador',
            colors: {
                primary: '#FF4444',   // Pelo rojo
                secondary: '#FFD700', // Pistolas/dorados
                skin: '#FFE4C4',
                eyes: '#00FFFF',
                outfit: '#8B0000',    // Ropa roja oscura
                accent: '#000000'     // Sombrero
            },
            features: ['sombrero', 'pistolas', 'pelo_rojo', 'cinturon'],
            difficulty: 'fácil'
        },
        {
            id: 'zed',
            name: 'Zed',
            title: 'El Maestro de las Sombras',
            role: 'Asesino',
            colors: {
                primary: '#1A1A1A',   // Traje negro
                secondary: '#FF3333', // Energía roja
                skin: '#2D2D2D',
                eyes: '#FF3333',
                outfit: '#1A1A1A',
                accent: '#444444'     // Shurikens
            },
            features: ['mascara', 'shurikens', 'sombras', 'guantes'],
            difficulty: 'medio'
        },
        {
            id: 'jhin',
            name: 'Jhin',
            title: 'El Virtuoso',
            role: 'Tirador',
            colors: {
                primary: '#FFFFFF',   // Máscara blanca
                secondary: '#FFD700', // Detalles dorados
                skin: '#1A1A1A',
                eyes: '#FF3333',
                outfit: '#1A1A1A',    // Traje negro
                accent: '#FFD700'     // Arma
            },
            features: ['mascara', 'rifle', 'rosa', 'guantes_blancos'],
            difficulty: 'difícil'
        },
        {
            id: 'vi',
            name: 'Vi',
            title: 'La Defensora de Piltover',
            role: 'Luchadora',
            colors: {
                primary: '#FF69B4',   // Pelo rosa
                secondary: '#FFD700', // Guantes dorados
                skin: '#FFE4C4',
                eyes: '#FFD700',
                outfit: '#1A1A2E',    // Traje oscuro
                accent: '#00FFFF'     // Hextech
            },
            features: ['guantes_hextech', 'pelo_corto', 'gafas', 'tatuaje_vi'],
            difficulty: 'medio'
        },
        {
            id: 'teemo',
            name: 'Teemo',
            title: 'El Explorador Swift',
            role: 'Tirador',
            colors: {
                primary: '#8FBC8F',   // Piel verde
                secondary: '#FFD700', // Ojos/arma
                skin: '#8FBC8F',
                eyes: '#FFD700',
                outfit: '#228B22',    // Ropa verde
                accent: '#FF4444'     // Hongos
            },
            features: ['sombrero', 'pistola', 'orejas', 'hongo'],
            difficulty: 'fácil'
        },
        {
            id: 'darius',
            name: 'Darius',
            title: 'La Mano de Noxus',
            role: 'Luchador',
            colors: {
                primary: '#8B0000',   // Armadura roja
                secondary: '#C0C0C0', // Hacha plateada
                skin: '#D4B896',
                eyes: '#FF0000',
                outfit: '#8B0000',
                accent: '#FFD700'     // Detalles
            },
            features: ['hacha', 'armadura_puntiaguda', 'capa_roja', 'barba'],
            difficulty: 'medio'
        },
        {
            id: 'soraka',
            name: 'Soraka',
            title: 'La Hija de las Estrellas',
            role: 'Soporte',
            colors: {
                primary: '#E6E6FA',   // Piel lavanda
                secondary: '#FFD700', // Cuerno/estrellas
                skin: '#E6E6FA',
                eyes: '#00FFFF',
                outfit: '#9370DB',    // Ropa púrpura
                accent: '#FFFFFF'     // Estrellas
            },
            features: ['cuerno', 'baston_estrella', 'pezuñas', 'colas'],
            difficulty: 'medio'
        },
        {
            id: 'rengar',
            name: 'Rengar',
            title: 'El Acechador Orgulloso',
            role: 'Asesino',
            colors: {
                primary: '#FFA500',   // Pelo naranja
                secondary: '#FFFFFF', // Dientes/garra
                skin: '#FF8C00',
                eyes: '#FFD700',
                outfit: '#8B4513',    // Armadura cuero
                accent: '#FF0000'     // Sangre
            },
            features: ['melena', 'garra', 'cicatrices', 'orejas_gato'],
            difficulty: 'difícil'
        },
        {
            id: 'leona',
            name: 'Leona',
            title: 'El Solari Radiante',
            role: 'Tanque',
            colors: {
                primary: '#FFD700',   // Armadura dorada
                secondary: '#FF4444', // Sol rojo
                skin: '#FFE4C4',
                eyes: '#FFD700',
                outfit: '#FFD700',
                accent: '#FF8C00'     // Luz solar
            },
            features: ['escudo_solar', 'espada', 'casco', 'armadura_dorada'],
            difficulty: 'medio'
        }
    ],

    // ========================================
    // CATEGORÍAS CON PESOS (para aleatoriedad)
    // ========================================
    categories: [
        { type: 'trivia', weight: 20, pool: 'trivia' },
        { type: 'math', weight: 15, pool: 'math' },
        { type: 'clicker', weight: 12, pool: 'clicker' },
        { type: 'memory', weight: 12, pool: 'memory' },
        { type: 'riddle', weight: 12, pool: 'riddles' },
        { type: 'pattern', weight: 8, pool: 'patterns' },
        { type: 'lolChampion', weight: 21, pool: 'lolChampion' }
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
                
            case 'lolChampion':
                return userAnswer === challenge.answerIndex;
                
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
            pattern: "Secuencia numérica",
            lolChampion: "Quiz de League of Legends"
        };
        
        const base = descriptions[challenge.challengeType] || "Desafío desconocido";
        return [
            `${base} (Fácil)`,
            `${base} (Difícil)`
        ];
    },
    
    // Generar desafío LoL específico con opciones múltiples
    generateLoLChallenge(difficulty = 'mix') {
        const pool = this.lolChampion;
        let filtered = pool;
        
        if (difficulty !== 'mix') {
            filtered = pool.filter(c => c.difficulty === difficulty);
            if (filtered.length === 0) filtered = pool;
        }
        
        const champion = filtered[Math.floor(Math.random() * filtered.length)];
        
        // Generar 4 opciones (1 correcta + 3 incorrectas)
        const otherChampions = pool.filter(c => c.id !== champion.id);
        const shuffled = otherChampions.sort(() => 0.5 - Math.random());
        const options = [champion.name, ...shuffled.slice(0, 3).map(c => c.name)];
        const answerIndex = Math.floor(Math.random() * 4);
        const finalOptions = [];
        
        // Insertar respuesta correcta en posición aleatoria
        options.forEach((opt, i) => {
            if (i === answerIndex) finalOptions.push(champion.name);
            else finalOptions.push(shuffled.shift().name);
        });
        // Si la correcta no se insertó, ponerla al final
        if (!finalOptions.includes(champion.name)) {
            finalOptions[answerIndex] = champion.name;
        }
        
        return {
            question: `¿Quién es este campeón?`,
            championData: champion,
            options: finalOptions,
            answer: answerIndex,
            answerIndex: answerIndex,
            challengeType: 'lolChampion',
            category: 'League of Legends'
        };
    }
};

window.ChallengesDB = ChallengesDB;
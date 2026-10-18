/**
 * GAME ENGINE - Ardorin Ameijeiras Teucro: Pixel Roast Adventure
 * Motor principal: loop, física, IA troll, progresión, desafíos
 */

const Game = {
    // ========================================
    // CONFIGURACIÓN
    // ========================================
    config: {
        canvasWidth: 1280,
        canvasHeight: 480,
        groundY: 420,
        playerStartX: 100,
        scrollSpeed: 3,
        nodeInterval: 4000, // ms entre nodos de decisión
        obstacleInterval: 2000, // ms entre obstáculos
        maxLives: 3,
        shakeIntensity: 8,
        gravity: 0.6,
        jumpForce: -14,
        maxFallSpeed: 12
    },

    // ========================================
    // ESTADO DEL JUEGO
    // ========================================
    state: {
        running: false,
        paused: false,
        gameOver: false,
        victory: false,
        distance: 0,
        level: 1,
        lives: 3,
        roastsReceived: 0,
        shameLevel: 0,
        currentNode: 0,
        lastNodeTime: 0,
        lastObstacleTime: 0,
        obstacles: [],
        particles: [],
        screenShake: 0,
        animationFrame: 0,
        player: {
            x: 100,
            y: 420,
            velX: 0,
            velY: 0,
            width: 32,
            height: 32,
            state: 'idle', // idle, walk, jump, fall, hurt, shame, celebrate
            frame: 0,
            frameTimer: 0,
            facingRight: true,
            grounded: false,
            invulnerable: 0,
            jumpBuffer: 0,
            coyoteTime: 0
        },
        background: {
            skyX: 0,
            mountainsX: 0,
            hillsX: 0,
            groundX: 0
        }
    },

    // ========================================
    // REFERENCIAS DOM
    // ========================================
    dom: {},

    // ========================================
    // INICIALIZACIÓN
    // ========================================
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.generateLevel();
        this.showStartScreen();
    },

    cacheDOM() {
        this.dom = {
            canvas: document.getElementById('gameCanvas'),
            ctx: document.getElementById('gameCanvas').getContext('2d'),
            hud: document.getElementById('hud'),
            livesDisplay: document.getElementById('livesDisplay'),
            distanceDisplay: document.getElementById('distanceDisplay'),
            levelDisplay: document.getElementById('levelDisplay'),
            roastsDisplay: document.getElementById('roastsDisplay'),
            shameFill: document.getElementById('shameFill'),
            roastBubble: document.getElementById('roastBubble'),
            controlsHint: document.getElementById('controlsHint'),
            startScreen: document.getElementById('startScreen'),
            startBtn: document.getElementById('startBtn'),
            spritePreview: document.getElementById('spritePreview'),
            decisionModal: document.getElementById('decisionModal'),
            decisionText: document.getElementById('decisionText'),
            optionA: document.getElementById('optionA'),
            optionB: document.getElementById('optionB'),
            optionADesc: document.getElementById('optionADesc'),
            optionBDesc: document.getElementById('optionBDesc'),
            timerBar: document.getElementById('timerBar'),
            timerText: document.getElementById('timerText'),
            challengeModal: document.getElementById('challengeModal'),
            challengeTitle: document.getElementById('challengeTitle'),
            challengeText: document.getElementById('challengeText'),
            challengeInput: document.getElementById('challengeInput'),
            mcOptions: document.getElementById('mcOptions'),
            numberInput: document.getElementById('numberInput'),
            clickBtn: document.getElementById('clickBtn'),
            clickCounter: document.getElementById('clickCounter'),
            clickTimer: document.getElementById('clickTimer'),
            sequenceDisplay: document.getElementById('sequenceDisplay'),
            sequenceButtons: document.getElementById('sequenceButtons'),
            challengeFeedback: document.getElementById('challengeFeedback'),
            submitAnswer: document.getElementById('submitAnswer'),
            giveUp: document.getElementById('giveUp'),
            gameOverModal: document.getElementById('gameOverModal'),
            gameOverText: document.getElementById('gameOverText'),
            finalStats: document.getElementById('finalStats'),
            restartBtn: document.getElementById('restartBtn'),
            victoryModal: document.getElementById('victoryModal'),
            victoryText: document.getElementById('victoryText'),
            victoryStats: document.getElementById('victoryStats'),
            playAgainBtn: document.getElementById('playAgainBtn')
        };
        
        // Configurar canvas
        this.dom.ctx.imageSmoothingEnabled = false;
        
        // Preview del sprite en pantalla de inicio
        this.renderSpritePreview();
    },

    bindEvents() {
        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Botones
        this.dom.startBtn.addEventListener('click', () => this.startGame());
        this.dom.optionA.addEventListener('click', () => this.selectOption('A'));
        this.dom.optionB.addEventListener('click', () => this.selectOption('B'));
        this.dom.submitAnswer.addEventListener('click', () => this.submitChallengeAnswer());
        this.dom.giveUp.addEventListener('click', () => this.giveUpChallenge());
        this.dom.restartBtn.addEventListener('click', () => this.restartGame());
        this.dom.playAgainBtn.addEventListener('click', () => this.restartGame());
        
        // Click rápido
        this.dom.clickBtn.addEventListener('click', () => this.handleClickerClick());
        
        // Opciones múltiples
        this.dom.mcOptions.addEventListener('click', (e) => {
            const opt = e.target.closest('.mc-option');
            if (opt) this.selectMCOption(opt);
        });
        
        // Prevenir scroll con espacio
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.state.running) e.preventDefault();
        }, { passive: false });
    },

    // ========================================
    // PANTALLA DE INICIO
    // ========================================
    showStartScreen() {
        this.dom.startScreen.classList.remove('hidden');
        this.dom.hud.classList.add('hidden');
        this.dom.controlsHint.classList.add('hidden');
        this.state.running = false;
    },

    hideStartScreen() {
        this.dom.startScreen.classList.add('hidden');
        this.dom.hud.classList.remove('hidden');
        this.dom.controlsHint.classList.remove('hidden');
    },

    renderSpritePreview() {
        const canvas = this.dom.spritePreview;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        canvas.width = 128;
        canvas.height = 128;
        ctx.scale(4, 4);
        const sprite = SpriteSheet.generateArdorin(0, 'idle', 1);
        ctx.drawImage(sprite, 0, 0);
    },

    // ========================================
    // INICIO DE JUEGO
    // ========================================
    startGame() {
        this.hideStartScreen();
        this.resetGameState();
        this.state.running = true;
        this.state.lastNodeTime = performance.now();
        this.state.lastObstacleTime = performance.now();
        this.gameLoop();
    },

    resetGameState() {
        this.state.distance = 0;
        this.state.level = 1;
        this.state.lives = this.config.maxLives;
        this.state.roastsReceived = 0;
        this.state.shameLevel = 0;
        this.state.currentNode = 0;
        this.state.obstacles = [];
        this.state.particles = [];
        this.state.screenShake = 0;
        this.state.player = {
            x: this.config.playerStartX,
            y: this.config.groundY,
            velX: 0,
            velY: 0,
            width: 32,
            height: 32,
            state: 'idle',
            frame: 0,
            frameTimer: 0,
            facingRight: true,
            grounded: true,
            invulnerable: 0,
            jumpBuffer: 0,
            coyoteTime: 0
        };
        this.updateHUD();
        this.hideAllModals();
    },

    // ========================================
    // GENERACIÓN DE NIVEL
    // ========================================
    generateLevel() {
        // Pre-generar sprites de fondo
        SpriteSheet.generateBackground('sky', this.config.canvasWidth, this.config.canvasHeight);
        SpriteSheet.generateBackground('mountains', this.config.canvasWidth * 2, this.config.canvasHeight);
        SpriteSheet.generateBackground('hills', this.config.canvasWidth * 2, this.config.canvasHeight);
        SpriteSheet.generateBackground('ground', this.config.canvasWidth * 4, this.config.canvasHeight);
    },

    // ========================================
    // GAME LOOP PRINCIPAL
    // ========================================
    gameLoop(timestamp = 0) {
        if (!this.state.running) return;
        
        const dt = 16.67; // ~60fps fixed timestep
        
        this.update(dt);
        this.render();
        
        this.state.animationFrame = requestAnimationFrame((ts) => this.gameLoop(ts));
    },

    // ========================================
    // ACTUALIZACIÓN
    // ========================================
    update(dt) {
        if (this.state.paused || this.state.gameOver || this.state.victory) return;

        // Distancia y scroll
        this.state.distance += this.config.scrollSpeed * (dt / 16.67);
        this.updateBackgroundScroll(dt);
        
        // Generar obstáculos y nodos
        this.spawnObstaclesAndNodes();
        
        // Actualizar jugador
        this.updatePlayer(dt);
        
        // Actualizar obstáculos
        this.updateObstacles(dt);
        
        // Actualizar partículas
        this.updateParticles(dt);
        
        // Screen shake
        if (this.state.screenShake > 0) {
            this.state.screenShake = Math.max(0, this.state.screenShake - dt * 0.5);
        }
        
        // Invulnerabilidad
        if (this.state.player.invulnerable > 0) {
            this.state.player.invulnerable -= dt;
        }
        
        // Actualizar HUD
        this.updateHUD();
        
        // Check victoria (distancia objetivo)
        if (this.state.distance >= 50000) { // 50km = victoria
            this.triggerVictory();
        }
    },

    updateBackgroundScroll(dt) {
        const speed = this.config.scrollSpeed * (dt / 16.67);
        this.state.background.groundX = (this.state.background.groundX + speed) % (this.config.canvasWidth * 4);
        this.state.background.hillsX = (this.state.background.hillsX + speed * 0.3) % (this.config.canvasWidth * 2);
        this.state.background.mountainsX = (this.state.background.mountainsX + speed * 0.15) % (this.config.canvasWidth * 2);
        this.state.background.skyX = (this.state.background.skyX + speed * 0.05) % this.config.canvasWidth;
    },

    spawnObstaclesAndNodes() {
        const now = performance.now();
        const dist = this.state.distance;
        
        // Nodos de decisión cada ~4-5 segundos de juego real
        if (now - this.state.lastNodeTime > this.config.nodeInterval + Math.random() * 2000) {
            if (!this.isNearNode(dist) && this.state.obstacles.length === 0) {
                this.spawnDecisionNode();
                this.state.lastNodeTime = now;
            }
        }
        
        // Obstáculos entre nodos
        if (now - this.state.lastObstacleTime > this.config.obstacleInterval + Math.random() * 1500) {
            if (!this.isNearNode(dist) && this.state.obstacles.length < 3) {
                this.spawnObstacle();
                this.state.lastObstacleTime = now;
            }
        }
    },

    isNearNode(dist) {
        // Evitar spawn muy cerca de nodos existentes
        return this.state.obstacles.some(o => o.type === 'node' && Math.abs(o.x - dist) < 500);
    },

    spawnDecisionNode() {
        const nodeX = this.state.distance + this.config.canvasWidth + 200;
        this.state.obstacles.push({
            type: 'node',
            x: nodeX,
            width: 60,
            height: 100,
            triggered: false,
            decisionData: null
        });
    },

    spawnObstacle() {
        const types = ['spikes', 'hole', 'trapdoor', 'fakeblock'];
        // Más probabilidad de trampas en niveles altos
        const weights = this.state.level > 3 ? [2, 2, 3, 2] : [3, 2, 2, 1];
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let rand = Math.random() * totalWeight;
        let selectedType = types[0];
        
        for (let i = 0; i < types.length; i++) {
            rand -= weights[i];
            if (rand <= 0) {
                selectedType = types[i];
                break;
            }
        }
        
        const obstacleX = this.state.distance + this.config.canvasWidth + Math.random() * 300;
        
        let obstacle = {
            type: selectedType,
            x: obstacleX,
            triggered: false,
            trolled: false,
            phase: 0 // Para animación troll
        };
        
        switch (selectedType) {
            case 'spikes':
                obstacle.width = 32;
                obstacle.height = 32;
                obstacle.y = this.config.groundY - 32;
                break;
            case 'hole':
                obstacle.width = 64 + Math.random() * 64;
                obstacle.height = 32;
                obstacle.y = this.config.groundY - 32;
                obstacle.expandedWidth = obstacle.width + 32;
                break;
            case 'trapdoor':
                obstacle.width = 48;
                obstacle.height = 16;
                obstacle.y = this.config.groundY - 16;
                break;
            case 'fakeblock':
                obstacle.width = 32;
                obstacle.height = 32;
                obstacle.y = this.config.groundY - 32;
                break;
        }
        
        this.state.obstacles.push(obstacle);
    },

    // ========================================
    // JUGADOR - FÍSICA Y CONTROLES
    // ========================================
    handleKeyDown(e) {
        if (!this.state.running || this.state.paused) return;
        
        const code = e.code;
        
        // Salto
        if (code === 'Space' || code === 'ArrowUp' || code === 'KeyW') {
            e.preventDefault();
            this.bufferJump();
        }
        
        // Selección rápida 1/2
        if (code === 'Digit1' && this.dom.decisionModal.classList.contains('active')) {
            this.selectOption('A');
        }
        if (code === 'Digit2' && this.dom.decisionModal.classList.contains('active')) {
            this.selectOption('B');
        }
    },

    handleKeyUp(e) {
        // Para coyote time
    },

    bufferJump() {
        this.state.player.jumpBuffer = 150; // ms de buffer
    },

    updatePlayer(dt) {
        const p = this.state.player;
        
        // Coyote time
        if (p.grounded) {
            p.coyoteTime = 150;
        } else {
            p.coyoteTime = Math.max(0, p.coyoteTime - dt);
        }
        
        // Jump buffer
        if (p.jumpBuffer > 0) {
            p.jumpBuffer -= dt;
            if ((p.grounded || p.coyoteTime > 0) && p.jumpBuffer > 0) {
                this.doJump();
            }
        }
        
        // Gravedad
        if (!p.grounded) {
            p.velY = Math.min(p.velY + this.config.gravity, this.config.maxFallSpeed);
        }
        
        // Movimiento X (auto-scroll)
        p.velX = this.config.scrollSpeed;
        p.x += p.velX * (dt / 16.67);
        p.y += p.velY * (dt / 16.67);
        
        // Suelo
        if (p.y >= this.config.groundY) {
            p.y = this.config.groundY;
            p.velY = 0;
            p.grounded = true;
        } else {
            p.grounded = false;
        }
        
        // Colisiones con obstáculos
        this.checkObstacleCollisions();
        
        // Animación
        this.updatePlayerAnimation(dt);
    },

    doJump() {
        const p = this.state.player;
        p.velY = this.config.jumpForce;
        p.grounded = false;
        p.coyoteTime = 0;
        p.jumpBuffer = 0;
        
        // Trigger troll en obstáculos cercanos
        this.triggerTrollObstacles();
    },

    triggerTrollObstacles() {
        const p = this.state.player;
        const jumpX = p.x + p.width / 2;
        
        this.state.obstacles.forEach(obs => {
            if (obs.triggered || obs.trolled) return;
            
            const distX = obs.x - jumpX;
            
            // Detectar si el jugador está saltando CERCA del obstáculo
            if (distX > -50 && distX < 200) {
                // ¡TROLL ACTIVADO!
                obs.trolled = true;
                obs.phase = 1; // Fase de retracción/expansión
                
                // Timing: el obstáculo reacciona DESPUÉS del salto
                setTimeout(() => {
                    obs.phase = 2; // Fase de trampa
                }, 150 + Math.random() * 100);
                
                setTimeout(() => {
                    obs.phase = 0; // Vuelta a normal
                }, 800 + Math.random() * 400);
            }
        });
    },

    checkObstacleCollisions() {
        const p = this.state.player;
        const px = p.x, py = p.y, pw = p.width, ph = p.height;
        
        this.state.obstacles.forEach(obs => {
            if (obs.type === 'node') return; // Nodos no dañan
            
            const ox = obs.x - this.state.distance; // Posición relativa
            const oy = obs.y;
            const ow = obs.width;
            const oh = obs.height;
            
            // AABB collision
            if (px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy) {
                this.handleObstacleCollision(obs);
            }
        });
    },

    handleObstacleCollision(obs) {
        if (this.state.player.invulnerable > 0) return;
        
        const p = this.state.player;
        let damage = false;
        let roast = '';
        
        switch (obs.type) {
            case 'spikes':
                // Pinchos dañan si fase 2 (salieron) o fase 0 (normales)
                if (obs.phase === 2 || obs.phase === 0) {
                    damage = true;
                    roast = RoastsDB.getObstacleRoast('spikes');
                }
                break;
                
            case 'hole':
                // Agujero daña si el jugador está CAYENDO en él
                if (p.velY > 0 && p.y + p.height > obs.y) {
                    // Check si está sobre el hueco expandido
                    const holeLeft = ox - (obs.expandedWidth - obs.width) / 2;
                    const holeRight = holeLeft + obs.expandedWidth;
                    if (px + pw/2 > holeLeft && px + pw/2 < holeRight) {
                        damage = true;
                        roast = RoastsDB.getObstacleRoast('hole');
                    }
                }
                break;
                
            case 'trapdoor':
                // Tapa daña si está abierta (fase 2) y jugador arriba
                if (obs.phase === 2 && p.y + p.height >= obs.y) {
                    damage = true;
                    roast = RoastsDB.getObstacleRoast('trapdoor');
                }
                break;
                
            case 'fakeblock':
                // Bloque fake daña si se desvaneció (fase > 0.5)
                if (obs.phase > 0.5) {
                    damage = true;
                    roast = RoastsDB.getObstacleRoast('fakeblock');
                }
                break;
        }
        
        if (damage) {
            this.takeDamage(roast);
        }
    },

    takeDamage(roast) {
        const p = this.state.player;
        
        this.state.lives--;
        this.state.roastsReceived++;
        this.state.shameLevel = Math.min(100, this.state.shameLevel + 15);
        p.invulnerable = 1500; // 1.5s invulnerabilidad
        p.state = 'hurt';
        p.frame = 0;
        
        // Screen shake
        this.state.screenShake = this.config.shakeIntensity;
        
        // Partículas de dolor
        this.spawnParticles(p.x + p.width/2, p.y, 'red', 8);
        
        // Mostrar roast
        this.showRoast(roast, p.x - this.state.distance + p.width/2, p.y - 40);
        
        // Update HUD
        this.updateHUD();
        
        // Check game over
        if (this.state.lives <= 0) {
            this.triggerGameOver();
        }
    },

    updatePlayerAnimation(dt) {
        const p = this.state.player;
        p.frameTimer += dt;
        
        // Determinar estado
        let newState = 'idle';
        if (p.state === 'hurt' || p.state === 'shame' || p.state === 'celebrate') {
            newState = p.state;
        } else if (!p.grounded) {
            newState = p.velY < 0 ? 'jump' : 'fall';
        } else {
            newState = 'walk';
        }
        
        if (newState !== p.state && !(p.state === 'hurt' || p.state === 'shame' || p.state === 'celebrate')) {
            p.state = newState;
            p.frame = 0;
        }
        
        // Frame rate
        const frameSpeed = p.state === 'walk' ? 120 : 200;
        if (p.frameTimer > frameSpeed) {
            p.frameTimer = 0;
            p.frame = (p.frame + 1) % 4;
        }
        
        // Estados temporales
        if (p.state === 'hurt' && p.frameTimer > 500) {
            p.state = 'idle';
        }
    },

    // ========================================
    // OBSTÁCULOS - ACTUALIZACIÓN
    // ========================================
    updateObstacles(dt) {
        // Los obstáculos se mueven con el scroll (relativos al jugador)
        // Eliminar los que quedaron atrás
        this.state.obstacles = this.state.obstacles.filter(obs => {
            const relX = obs.x - this.state.distance;
            return relX > -100; // Mantener un poco detrás
        });
        
        // Actualizar fases de animación troll
        this.state.obstacles.forEach(obs => {
            if (obs.trolled && obs.phase > 0) {
                // La fase ya se maneja con timeouts en triggerTrollObstacles
            }
        });
    },

    // ========================================
    // PARTÍCULAS
    // ========================================
    spawnParticles(x, y, type, count) {
        for (let i = 0; i < count; i++) {
            this.state.particles.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 10,
                velX: (Math.random() - 0.5) * 4,
                velY: -Math.random() * 6 - 2,
                life: 1,
                maxLife: 1,
                type: type,
                size: Math.random() * 4 + 2
            });
        }
    },

    updateParticles(dt) {
        this.state.particles = this.state.particles.filter(p => {
            p.x += p.velX * (dt / 16.67);
            p.y += p.velY * (dt / 16.67);
            p.velY += 0.2; // Gravedad
            p.life -= dt / 1000;
            return p.life > 0;
        });
    },

    // ========================================
    // RENDERIZADO
    // ========================================
    render() {
        const ctx = this.dom.ctx;
        const cw = this.config.canvasWidth;
        const ch = this.config.canvasHeight;
        
        // Clear
        ctx.clearRect(0, 0, cw, ch);
        
        // Screen shake
        ctx.save();
        if (this.state.screenShake > 0) {
            const shakeX = (Math.random() - 0.5) * this.state.screenShake;
            const shakeY = (Math.random() - 0.5) * this.state.screenShake;
            ctx.translate(shakeX, shakeY);
        }
        
        // Fondos parallax
        this.renderBackground(ctx);
        
        // Obstáculos
        this.renderObstacles(ctx);
        
        // Jugador
        this.renderPlayer(ctx);
        
        // Partículas
        this.renderParticles(ctx);
        
        ctx.restore();
    },

    renderBackground(ctx) {
        const cw = this.config.canvasWidth;
        const ch = this.config.canvasHeight;
        const bg = this.state.background;
        
        // Cielo
        const sky = SpriteSheet.generateBackground('sky', cw, ch);
        ctx.drawImage(sky, -bg.skyX, 0);
        ctx.drawImage(sky, cw - bg.skyX, 0);
        
        // Montañas
        const mountains = SpriteSheet.generateBackground('mountains', cw * 2, ch);
        ctx.drawImage(mountains, -bg.mountainsX, 0);
        ctx.drawImage(mountains, cw * 2 - bg.mountainsX, 0);
        
        // Colinas
        const hills = SpriteSheet.generateBackground('hills', cw * 2, ch);
        ctx.drawImage(hills, -bg.hillsX, ch * 0.3);
        ctx.drawImage(hills, cw * 2 - bg.hillsX, ch * 0.3);
        
        // Suelo
        const ground = SpriteSheet.generateBackground('ground', cw * 4, ch);
        ctx.drawImage(ground, -bg.groundX, 0);
        ctx.drawImage(ground, cw * 4 - bg.groundX, 0);
    },

    renderObstacles(ctx) {
        this.state.obstacles.forEach(obs => {
            const relX = obs.x - this.state.distance;
            if (relX < -100 || relX > this.config.canvasWidth + 100) return;
            
            ctx.save();
            ctx.translate(relX, obs.y);
            
            switch (obs.type) {
                case 'node':
                    this.renderNode(ctx, obs);
                    break;
                case 'spikes':
                    const spikeSprite = SpriteSheet.generateSpikes(obs.phase, 1);
                    ctx.drawImage(spikeSprite, 0, 0);
                    break;
                case 'hole':
                    const holeSprite = SpriteSheet.generateHole(obs.width, obs.phase, 1);
                    ctx.drawImage(holeSprite, 0, 0);
                    break;
                case 'trapdoor':
                    const trapSprite = SpriteSheet.generateTrapdoor(obs.phase === 2, 1);
                    ctx.drawImage(trapSprite, 0, 0);
                    break;
                case 'fakeblock':
                    const fakeSprite = SpriteSheet.generateFakeBlock(obs.phase, 1);
                    ctx.drawImage(fakeSprite, 0, 0);
                    break;
            }
            
            ctx.restore();
        });
    },

    renderNode(ctx, obs) {
        // Indicador visual de nodo: arco / puerta
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, obs.height);
        ctx.quadraticCurveTo(obs.width/2, 0, obs.width, obs.height);
        ctx.stroke();
        
        // Brillo pulsante
        const pulse = Math.sin(performance.now() / 200) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 215, 0, ${pulse * 0.3})`;
        ctx.fill();
        
        // Texto "DECISIÓN"
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 10px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('⚡', obs.width/2, obs.height/2);
    },

    renderPlayer(ctx) {
        const p = this.state.player;
        const relX = p.x - this.state.distance;
        const relY = p.y;
        
        // Parpadeo si invulnerable
        if (p.invulnerable > 0 && Math.floor(p.invulnerable / 50) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }
        
        const sprite = SpriteSheet.generateArdorin(p.frame, p.state, 1);
        ctx.drawImage(sprite, relX, relY);
        
        ctx.globalAlpha = 1;
    },

    renderParticles(ctx) {
        this.state.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life / p.maxLife;
            ctx.translate(p.x - this.state.distance, p.y);
            
            if (p.type === 'gold') {
                ctx.fillStyle = '#FFD700';
            } else {
                ctx.fillStyle = '#FF3333';
            }
            
            ctx.beginPath();
            ctx.arc(0, 0, p.size * (p.life / p.maxLife), 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });
    },

    // ========================================
    // HUD
    // ========================================
    updateHUD() {
        const s = this.state;
        
        // Vidas
        this.dom.livesDisplay.textContent = '❤️ '.repeat(s.lives) + '🖤 '.repeat(this.config.maxLives - s.lives);
        
        // Distancia
        this.dom.distanceDisplay.textContent = `📍 ${Math.floor(s.distance / 100)}m`;
        
        // Nivel
        this.dom.levelDisplay.textContent = `⭐ NIVEL ${s.level}`;
        
        // Roasts
        this.dom.roastsDisplay.textContent = `🤬 ROASTS: ${s.roastsReceived}`;
        
        // Vergüenza
        this.dom.shameFill.style.width = `${s.shameLevel}%`;
    },

    // ========================================
    // ROASTS FLOTANTES
    // ========================================
    showRoast(text, x, y) {
        const bubble = this.dom.roastBubble;
        bubble.textContent = text;
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.opacity = '0';
        bubble.style.transform = 'scale(0.5)';
        
        // Trigger reflow
        bubble.offsetHeight;
        
        bubble.style.animation = 'roastPop 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), roastFloat 3s ease-out forwards';
    },

    // ========================================
    // NODOS DE DECISIÓN
    // ========================================
    checkNodeTrigger() {
        const p = this.state.player;
        const relX = p.x - this.state.distance;
        
        this.state.obstacles.forEach(obs => {
            if (obs.type === 'node' && !obs.triggered) {
                const nodeRelX = obs.x - this.state.distance;
                if (relX + p.width > nodeRelX && relX < nodeRelX + obs.width) {
                    this.triggerDecisionNode(obs);
                }
            }
        });
    },

    triggerDecisionNode(node) {
        node.triggered = true;
        this.state.paused = true;
        this.state.player.state = 'idle';
        
        // Generar desafío
        const challenge = ChallengesDB.getRandomChallenge();
        node.challengeData = challenge;
        
        // Descripciones para opciones A/B
        const descs = ChallengesDB.getChoiceDescriptions(challenge);
        
        this.dom.decisionText.textContent = `Ardorin Ameijeiras Teucro llega a una bifurcación. ¿Qué camino eliges?`;
        this.dom.optionADesc.textContent = descs[0];
        this.dom.optionBDesc.textContent = descs[1];
        
        // Timer 10 segundos
        this.startDecisionTimer(10000);
        
        this.dom.decisionModal.classList.add('active');
    },

    startDecisionTimer(duration) {
        const start = performance.now();
        const animate = () => {
            if (!this.dom.decisionModal.classList.contains('active')) return;
            
            const elapsed = performance.now() - start;
            const remaining = Math.max(0, duration - elapsed);
            const percent = remaining / duration;
            
            this.dom.timerBar.style.setProperty('--timer-width', `${percent * 100}%`);
            this.dom.timerText.textContent = `${Math.ceil(remaining / 1000)}s`;
            
            if (remaining > 0) {
                requestAnimationFrame(animate);
            } else {
                this.decisionTimeout();
            }
        };
        animate();
    },

    decisionTimeout() {
        this.dom.decisionModal.classList.remove('active');
        this.showRoast(RoastsDB.getTimeout(), 
            this.state.player.x - this.state.distance + 16, 
            this.state.player.y - 40);
        this.resumeGame();
    },

    selectOption(choice) {
        this.dom.decisionModal.classList.remove('active');
        const node = this.state.obstacles.find(o => o.type === 'node' && o.triggered);
        if (!node || !node.challengeData) return;
        
        // Iniciar desafío
        this.startChallenge(node.challengeData);
    },

    // ========================================
    // SISTEMA DE DESAFÍOS
    // ========================================
    currentChallenge: null,
    clickerState: { count: 0, startTime: 0, active: false },
    memoryState: { sequence: [], showing: false, playerInput: [], currentStep: 0 },

    startChallenge(challenge) {
        this.currentChallenge = challenge;
        this.state.paused = true;
        
        this.dom.challengeTitle.textContent = `❓ ${challenge.category || 'DESAFÍO'}`;
        this.dom.challengeText.textContent = challenge.question;
        this.dom.challengeFeedback.textContent = '';
        this.dom.challengeFeedback.className = 'challenge-feedback';
        
        // Ocultar todos los inputs
        this.hideAllChallengeInputs();
        
        // Mostrar input según tipo
        switch (challenge.challengeType) {
            case 'trivia':
                this.showMCChallenge(challenge);
                break;
            case 'math':
            case 'pattern':
                this.dom.numberInput.style.display = 'block';
                this.dom.numberInput.value = '';
                this.dom.numberInput.focus();
                break;
            case 'clicker':
                this.startClickerChallenge(challenge);
                break;
            case 'memory':
                this.startMemoryChallenge(challenge);
                break;
            case 'riddle':
                this.dom.numberInput.style.display = 'block';
                this.dom.numberInput.placeholder = 'Escribe tu respuesta...';
                this.dom.numberInput.value = '';
                this.dom.numberInput.focus();
                break;
        }
        
        this.dom.challengeModal.classList.add('active');
    },

    hideAllChallengeInputs() {
        this.dom.mcOptions.style.display = 'none';
        this.dom.mcOptions.innerHTML = '';
        this.dom.numberInput.style.display = 'none';
        this.dom.clickBtn.style.display = 'none';
        this.dom.clickCounter.style.display = 'none';
        this.dom.clickTimer.style.display = 'none';
        this.dom.sequenceDisplay.style.display = 'none';
        this.dom.sequenceButtons.style.display = 'none';
    },

    showMCChallenge(challenge) {
        this.dom.mcOptions.style.display = 'flex';
        this.dom.mcOptions.innerHTML = '';
        
        challenge.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'mc-option';
            btn.textContent = opt;
            btn.dataset.index = i;
            this.dom.mcOptions.appendChild(btn);
        });
    },

    selectMCOption(btn) {
        document.querySelectorAll('.mc-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedMCAnswer = parseInt(btn.dataset.index);
    },

    startClickerChallenge(challenge) {
        this.dom.clickBtn.style.display = 'block';
        this.dom.clickCounter.style.display = 'block';
        this.dom.clickTimer.style.display = 'block';
        
        this.clickerState = {
            count: 0,
            target: challenge.target,
            timeLeft: challenge.time,
            startTime: performance.now(),
            active: true
        };
        
        this.updateClickerUI();
        
        const tick = () => {
            if (!this.clickerState.active) return;
            
            const elapsed = performance.now() - this.clickerState.startTime;
            this.clickerState.timeLeft = Math.max(0, challenge.time - elapsed);
            this.updateClickerUI();
            
            if (this.clickerState.timeLeft > 0) {
                requestAnimationFrame(tick);
            } else {
                this.endClickerChallenge();
            }
        };
        tick();
    },

    updateClickerUI() {
        this.dom.clickCounter.textContent = `${this.clickerState.count} / ${this.clickerState.target}`;
        this.dom.clickTimer.textContent = `${(this.clickerState.timeLeft / 1000).toFixed(1)}s`;
    },

    handleClickerClick() {
        if (!this.clickerState.active) return;
        
        this.clickerState.count++;
        this.updateClickerUI();
        
        // Partícula
        this.spawnParticles(
            this.state.player.x - this.state.distance + 16,
            this.state.player.y,
            'gold', 3
        );
        
        if (this.clickerState.count >= this.clickerState.target) {
            this.endClickerChallenge(true);
        }
    },

    endClickerChallenge(success = false) {
        this.clickerState.active = false;
        this.checkChallengeResult(success);
    },

    startMemoryChallenge(challenge) {
        this.dom.sequenceDisplay.style.display = 'flex';
        this.dom.sequenceDisplay.innerHTML = '';
        
        this.memoryState = {
            sequence: challenge.sequence,
            showing: true,
            playerInput: [],
            currentStep: 0
        };
        
        // Mostrar secuencia
        challenge.sequence.forEach((arrow, i) => {
            const btn = document.createElement('div');
            btn.className = 'sequence-btn';
            btn.textContent = arrow;
            btn.dataset.index = i;
            this.dom.sequenceDisplay.appendChild(btn);
        });
        
        // Animar secuencia
        this.animateSequence(0);
    },

    animateSequence(index) {
        if (index >= this.memoryState.sequence.length) {
            setTimeout(() => {
                this.showMemoryInput();
            }, 500);
            return;
        }
        
        const btns = this.dom.sequenceDisplay.querySelectorAll('.sequence-btn');
        btns[index].classList.add('active');
        
        setTimeout(() => {
            btns[index].classList.remove('active');
            this.animateSequence(index + 1);
        }, 500);
    },

    showMemoryInput() {
        this.memoryState.showing = false;
        this.dom.sequenceButtons.style.display = 'grid';
        this.dom.sequenceButtons.innerHTML = '';
        
        const arrows = ['↑', '→', '↓', '←'];
        arrows.forEach(arrow => {
            const btn = document.createElement('button');
            btn.className = 'seq-btn';
            btn.textContent = arrow;
            btn.dataset.arrow = arrow;
            btn.addEventListener('click', () => this.handleMemoryInput(arrow));
            this.dom.sequenceButtons.appendChild(btn);
        });
    },

    handleMemoryInput(arrow) {
        if (this.memoryState.showing) return;
        
        this.memoryState.playerInput.push(arrow);
        this.memoryState.currentStep++;
        
        // Feedback visual
        const expected = this.memoryState.sequence[this.memoryState.currentStep - 1];
        const correct = arrow === expected;
        
        // Mostrar en display
        const btns = this.dom.sequenceDisplay.querySelectorAll('.sequence-btn');
        if (btns[this.memoryState.currentStep - 1]) {
            btns[this.memoryState.currentStep - 1].textContent = arrow;
            btns[this.memoryState.currentStep - 1].style.borderColor = correct ? '#00FF00' : '#FF3333';
        }
        
        if (this.memoryState.currentStep >= this.memoryState.sequence.length) {
            setTimeout(() => {
                const success = JSON.stringify(this.memoryState.playerInput) === JSON.stringify(this.memoryState.sequence);
                this.checkChallengeResult(success);
            }, 300);
        }
    },

    submitChallengeAnswer() {
        if (!this.currentChallenge) return;
        
        let answer, success = false;
        
        switch (this.currentChallenge.challengeType) {
            case 'trivia':
                answer = this.selectedMCAnswer;
                success = answer !== undefined && ChallengesDB.checkAnswer(this.currentChallenge, answer);
                break;
                
            case 'math':
            case 'pattern':
                answer = parseFloat(this.dom.numberInput.value);
                success = !isNaN(answer) && ChallengesDB.checkAnswer(this.currentChallenge, answer);
                break;
                
            case 'riddle':
                answer = this.dom.numberInput.value.trim();
                success = answer && ChallengesDB.checkAnswer(this.currentChallenge, answer);
                break;
        }
        
        if (this.currentChallenge.challengeType === 'trivia' && this.selectedMCAnswer === undefined) {
            this.showChallengeFeedback('¡Selecciona una opción!', false);
            return;
        }
        
        if (this.currentChallenge.challengeType !== 'trivia' && (answer === undefined || isNaN(answer) || answer === '')) {
            this.showChallengeFeedback('¡Escribe una respuesta!', false);
            return;
        }
        
        this.checkChallengeResult(success);
    },

    checkChallengeResult(success) {
        this.dom.challengeModal.classList.remove('active');
        
        if (success) {
            this.showChallengeFeedback('¡CORRECTO! 🎉', true);
            this.state.player.state = 'celebrate';
            this.state.player.frame = 0;
            this.spawnParticles(
                this.state.player.x - this.state.distance + 16,
                this.state.player.y,
                'gold', 12
            );
            // Bonus: reducir vergüenza
            this.state.shameLevel = Math.max(0, this.state.shameLevel - 10);
        } else {
            this.showChallengeFeedback('INCORRECTO 😤', false);
            this.state.player.state = 'shame';
            this.state.player.frame = 0;
            
            // Roast por fallar desafío
            const roast = RoastsDB.getByChallengeType(this.currentChallenge.challengeType);
            this.showRoast(roast,
                this.state.player.x - this.state.distance + 16,
                this.state.player.y - 60);
            
            // Daño
            this.takeDamage(roast);
        }
        
        this.resumeGame();
    },

    giveUpChallenge() {
        this.dom.challengeModal.classList.remove('active');
        
        const roast = RoastsDB.getGiveUp();
        this.showRoast(roast,
            this.state.player.x - this.state.distance + 16,
            this.state.player.y - 60);
        
        // Penalty extra por rendirse
        this.takeDamage(roast);
        this.state.shameLevel = Math.min(100, this.state.shameLevel + 20);
        
        this.resumeGame();
    },

    showChallengeFeedback(text, success) {
        this.dom.challengeFeedback.textContent = text;
        this.dom.challengeFeedback.className = `challenge-feedback ${success ? 'feedback-success' : 'feedback-fail'}`;
    },

    resumeGame() {
        this.state.paused = false;
        this.currentChallenge = null;
        this.selectedMCAnswer = undefined;
        this.hideAllChallengeInputs();
        this.updateHUD();
    },

    // ========================================
    // GAME OVER / VICTORY
    // ========================================
    triggerGameOver() {
        this.state.running = false;
        this.state.gameOver = true;
        cancelAnimationFrame(this.state.animationFrame);
        
        const roast = RoastsDB.getGameOver();
        this.dom.gameOverText.textContent = roast;
        
        this.dom.finalStats.innerHTML = `
            <div>Distancia: ${Math.floor(this.state.distance / 100)}m</div>
            <div>Roasts recibidos: ${this.state.roastsReceived}</div>
            <div>Nivel alcanzado: ${this.state.level}</div>
        `;
        
        this.dom.gameOverModal.classList.add('active');
    },

    triggerVictory() {
        this.state.running = false;
        this.state.victory = true;
        cancelAnimationFrame(this.state.animationFrame);
        
        const roast = RoastsDB.getVictory();
        this.dom.victoryText.textContent = roast;
        
        this.state.player.state = 'celebrate';
        this.state.player.frame = 0;
        
        this.dom.victoryStats.innerHTML = `
            <div>Distancia: ${Math.floor(this.state.distance / 100)}m</div>
            <div>Roasts recibidos: ${this.state.roastsReceived}</div>
            <div>Vidas restantes: ${this.state.lives}</div>
            <div>Nivel final: ${this.state.level}</div>
        `;
        
        this.dom.victoryModal.classList.add('active');
    },

    restartGame() {
        this.hideAllModals();
        this.startGame();
    },

    hideAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    },

    // ========================================
    // UTILIDADES
    // ========================================
    showRoast(text, x, y) {
        const bubble = this.dom.roastBubble;
        bubble.textContent = text;
        bubble.style.left = `${Math.max(20, Math.min(x, this.config.canvasWidth - 270))}px`;
        bubble.style.top = `${Math.max(20, y)}px`;
        bubble.style.animation = 'none';
        bubble.offsetHeight; // reflow
        bubble.style.animation = 'roastPop 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), roastFloat 3s ease-out forwards';
    }
};

// Iniciar juego al cargar
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});

// Exportar para debug
window.Game = Game;
/**
 * SPRITE GENERATOR - Ardorin Ameijeiras Teucro & Obstáculos
 * Genera sprites pixel art mediante Canvas drawing
 */

const SpriteSheet = {
    // Paleta de colores estilo 16-bit
    colors: {
        // Ardorin
        skin: '#F5D6A8',
        skinDark: '#D4B896',
        hair: '#2D2D2D',
        hairLight: '#4A4A4A',
        cape: '#8B0000',
        capeLight: '#A52A2A',
        capeDark: '#5C0000',
        gold: '#FFD700',
        goldDark: '#CCA300',
        white: '#FFFFFF',
        black: '#1A1A2E',
        outline: '#0D0D1A',
        
        // Obstáculos
        spike: '#FF3333',
        spikeDark: '#CC0000',
        spikeLight: '#FF6666',
        hole: '#0A0A12',
        holeEdge: '#1A1A2E',
        trapdoor: '#4A3728',
        trapdoorDark: '#2D1F14',
        trapdoorLight: '#6B4F3A',
        fakeBlock: '#555555',
        fakeBlockDark: '#333333',
        
        // Efectos
        particleGold: '#FFD700',
        particleRed: '#FF3333',
        dust: '#888888'
    },

    // Canvas offscreen para generar sprites
    cache: new Map(),

    getCanvas(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    },

    // ========================================
    // ARDORIN - 32x32 base, escalable
    // ========================================
    generateArdorin(frame = 0, state = 'idle', scale = 1) {
        const key = `ardorin_${state}_${frame}_${scale}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const baseSize = 32;
        const size = baseSize * scale;
        const canvas = this.getCanvas(size, size);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.scale(scale, scale);

        const c = this.colors;
        const f = frame % 4;

        // Helper para dibujar pixel
        const px = (x, y, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        };

        const rect = (x, y, w, h, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        };

        // ===== FRAMES DE ANIMACIÓN =====
        // Idle: respiración sutil (frames 0-3)
        // Walk: 4 frames ciclo
        // Jump: frame único
        // Fall: frame único
        // Hurt: parpadeo
        // Shame: cabeza agachada
        // Celebrate: brazos arriba

        const drawHead = (offsetY = 0) => {
            // Cabeza (14x12 aprox)
            const hx = 9, hy = 2 + offsetY;
            
            // Sombra cabeza
            for (let y = 0; y < 12; y++) {
                for (let x = 0; x < 14; x++) {
                    if ((x === 0 || x === 13) && (y < 3 || y > 8)) continue;
                    if ((x === 1 || x === 12) && y === 0) continue;
                    px(hx + x, hy + y, c.skin);
                }
            }
            
            // Pelo
            for (let x = 1; x < 13; x++) {
                px(hx + x, hy, c.hair);
                px(hx + x, hy + 1, c.hair);
            }
            // Mechón frontal
            px(hx + 5, hy - 1, c.hair);
            px(hx + 6, hy - 1, c.hair);
            px(hx + 7, hy - 1, c.hair);
            
            // Ojos
            const eyeY = hy + 4 + (state === 'shame' ? 1 : 0);
            px(hx + 4, eyeY, c.outline);
            px(hx + 9, eyeY, c.outline);
            if (state !== 'hurt' && state !== 'shame') {
                px(hx + 4, eyeY, c.white);
                px(hx + 9, eyeY, c.white);
            } else {
                // Ojos cerrados / vergüenza
                px(hx + 4, eyeY, c.outline);
                px(hx + 5, eyeY, c.outline);
                px(hx + 8, eyeY, c.outline);
                px(hx + 9, eyeY, c.outline);
            }
            
            // Boca
            if (state === 'hurt') {
                px(hx + 6, hy + 8, c.outline);
                px(hx + 7, hy + 8, c.outline);
            } else if (state === 'shame') {
                px(hx + 6, hy + 9, c.outline);
            } else {
                px(hx + 6, hy + 8, c.outline);
                px(hx + 7, hy + 8, c.outline);
            }
        };

        const drawBody = (offsetY = 0, armState = 'down') => {
            const bx = 7, by = 14 + offsetY;
            
            // Capa (detrás)
            for (let y = 0; y < 14; y++) {
                const width = y < 4 ? 18 : 16;
                const startX = bx - (width - 16) / 2;
                for (let x = 0; x < width; x++) {
                    if (y < 3 && (x < 2 || x > width - 3)) continue;
                    px(startX + x, by + y, c.cape);
                }
            }
            // Detalles capa
            px(bx + 2, by + 2, c.capeLight);
            px(bx + 13, by + 2, c.capeLight);
            
            // Cuerpo (debajo de capa)
            rect(bx + 4, by + 3, 8, 10, c.capeDark);
            
            // Cinturón dorado
            rect(bx + 3, by + 10, 10, 1, c.gold);
            px(bx + 7, by + 10, c.goldDark);
            
            // Piernas
            const legOffset = (state === 'walk') ? (f < 2 ? 0 : 1) : 0;
            // Pierna izq
            rect(bx + 5, by + 11 + legOffset, 3, 5 - legOffset, c.capeDark);
            // Pierna der
            rect(bx + 10, by + 11 + (legOffset === 0 ? 1 : 0), 3, 5 - (legOffset === 0 ? 1 : 0), c.capeDark);
            
            // Botas
            px(bx + 5, by + 15, c.gold);
            px(bx + 6, by + 15, c.gold);
            px(bx + 7, by + 15, c.gold);
            px(bx + 10, by + 15, c.gold);
            px(bx + 11, by + 15, c.gold);
            px(bx + 12, by + 15, c.gold);
            
            // Brazos según estado
            if (armState === 'up') {
                // Brazos arriba (celebrate)
                for (let y = 0; y < 8; y++) {
                    px(bx + 2, by + y - 2, c.skin);
                    px(bx + 15, by + y - 2, c.skin);
                }
                // Puños
                rect(bx + 1, by - 4, 3, 2, c.skin);
                rect(bx + 14, by - 4, 3, 2, c.skin);
            } else if (armState === 'forward') {
                // Brazo adelante (jump/fall)
                for (let y = 0; y < 6; y++) {
                    px(bx + 2, by + y + 1, c.skin);
                }
                rect(bx + 14, by + 1, 3, 5, c.cape); // Otro brazo junto al cuerpo
            } else {
                // Brazos abajo (idle/walk)
                for (let y = 0; y < 8; y++) {
                    px(bx + 2, by + y + 1, c.skin);
                    px(bx + 15, by + y + 1, c.skin);
                }
                // Manos
                rect(bx + 1, by + 8, 3, 2, c.skin);
                rect(bx + 14, by + 8, 3, 2, c.skin);
            }
        };

        // ===== ESTADOS =====
        switch (state) {
            case 'idle':
                const breathe = f < 2 ? 0 : -1;
                drawHead(breathe);
                drawBody(breathe, 'down');
                break;
                
            case 'walk':
                const bob = f < 2 ? 0 : -1;
                drawHead(bob);
                drawBody(bob, f % 2 === 0 ? 'down' : 'down');
                break;
                
            case 'jump':
                drawHead(-2);
                drawBody(-2, 'forward');
                break;
                
            case 'fall':
                drawHead(1);
                drawBody(1, 'forward');
                break;
                
            case 'hurt':
                drawHead(0);
                drawBody(0, 'down');
                // Estrellitas alrededor
                ctx.fillStyle = c.particleGold;
                ctx.font = '8px Arial';
                ctx.fillText('★', 2, 8);
                ctx.fillText('★', 28, 6);
                ctx.fillText('★', 4, 24);
                break;
                
            case 'shame':
                drawHead(2); // Cabeza agachada
                drawBody(2, 'down');
                // Gotita de sudor
                ctx.fillStyle = c.white;
                ctx.beginPath();
                ctx.arc(24, 8, 2, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'celebrate':
                drawHead(-1);
                drawBody(-1, 'up');
                break;
        }

        this.cache.set(key, canvas);
        return canvas;
    },

    // ========================================
    // OBSTÁCULOS TROLL
    // ========================================
    
    // Pinchos - 32x32
    generateSpikes(phase = 0, scale = 1) {
        const key = `spikes_${phase}_${scale}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const size = 32 * scale;
        const canvas = this.getCanvas(size, size);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.scale(scale, scale);

        const c = this.colors;
        const retracted = phase > 0.5; // Fase de retracción

        // Suelo base
        ctx.fillStyle = c.holeEdge;
        ctx.fillRect(0, 28, 32, 4);

        // Pinchos (5 pinchos de 6px ancho cada uno)
        for (let i = 0; i < 5; i++) {
            const x = 2 + i * 6;
            const h = retracted ? 0 : 16;
            const tipY = 28 - h;
            
            if (h > 0) {
                // Cuerpo pincho
                ctx.fillStyle = c.spike;
                ctx.beginPath();
                ctx.moveTo(x, 28);
                ctx.lineTo(x + 3, tipY);
                ctx.lineTo(x + 6, 28);
                ctx.fill();
                
                // Brillo
                ctx.fillStyle = c.spikeLight;
                ctx.beginPath();
                ctx.moveTo(x + 1, 26);
                ctx.lineTo(x + 3, tipY + 2);
                ctx.lineTo(x + 3, tipY + 4);
                ctx.fill();
                
                // Sombra
                ctx.fillStyle = c.spikeDark;
                ctx.beginPath();
                ctx.moveTo(x + 3, tipY);
                ctx.lineTo(x + 5, 26);
                ctx.lineTo(x + 5, 28);
                ctx.fill();
            }
        }

        this.cache.set(key, canvas);
        return canvas;
    },

    // Agujero secreto - 64x32
    generateHole(width = 64, phase = 0, scale = 1) {
        const key = `hole_${width}_${phase}_${scale}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const w = width * scale;
        const h = 32 * scale;
        const canvas = this.getCanvas(w, h);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.scale(scale, scale);

        const c = this.colors;
        const expanded = phase > 0.3; // Se ensancha
        const actualWidth = expanded ? width + 16 : width;

        // Fondo del agujero (negro profundo)
        ctx.fillStyle = c.hole;
        ctx.fillRect((64 - actualWidth) / 2, 0, actualWidth, 32);

        // Bordes del agujero
        ctx.fillStyle = c.holeEdge;
        // Izquierdo
        ctx.fillRect((64 - actualWidth) / 2 - 4, 0, 4, 32);
        // Derecho
        ctx.fillRect((64 + actualWidth) / 2, 0, 4, 32);
        
        // Detalle de "dientes" en los bordes
        for (let y = 0; y < 32; y += 4) {
            ctx.fillRect((64 - actualWidth) / 2 - 6, y, 2, 2);
            ctx.fillRect((64 + actualWidth) / 2 + 4, y, 2, 2);
        }

        this.cache.set(key, canvas);
        return canvas;
    },

    // Tapa/trampa - 48x16
    generateTrapdoor(isOpen = false, scale = 1) {
        const key = `trapdoor_${isOpen}_${scale}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const w = 48 * scale;
        const h = 16 * scale;
        const canvas = this.getCanvas(w, h);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.scale(scale, scale);

        const c = this.colors;

        if (isOpen) {
            // Hueco abierto
            ctx.fillStyle = c.hole;
            ctx.fillRect(0, 0, 48, 16);
            // Bordes
            ctx.fillStyle = c.trapdoorDark;
            ctx.fillRect(0, 0, 48, 3);
            ctx.fillRect(0, 13, 48, 3);
        } else {
            // Tapa cerrada (madera)
            ctx.fillStyle = c.trapdoor;
            ctx.fillRect(0, 0, 48, 16);
            
            // Vetillas de madera
            ctx.fillStyle = c.trapdoorDark;
            for (let y = 2; y < 14; y += 3) {
                ctx.fillRect(0, y, 48, 1);
            }
            ctx.fillStyle = c.trapdoorLight;
            for (let y = 3; y < 14; y += 3) {
                ctx.fillRect(0, y, 48, 1);
            }
            
            // Bisagras
            ctx.fillStyle = c.goldDark;
            ctx.fillRect(2, 2, 4, 2);
            ctx.fillRect(42, 2, 4, 2);
            ctx.fillRect(2, 12, 4, 2);
            ctx.fillRect(42, 12, 4, 2);
            
            // Cerradura
            ctx.fillStyle = c.outline;
            ctx.fillRect(22, 6, 4, 4);
            ctx.fillStyle = c.hole;
            ctx.fillRect(23, 7, 2, 2);
        }

        this.cache.set(key, canvas);
        return canvas;
    },

    // Bloque fake - 32x32
    generateFakeBlock(phase = 0, scale = 1) {
        const key = `fakeblock_${phase}_${scale}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const size = 32 * scale;
        const canvas = this.getCanvas(size, size);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.scale(scale, scale);

        const c = this.colors;
        const alpha = 1 - phase; // Se desvanece

        // Bloque estilo piedra
        ctx.fillStyle = c.fakeBlock;
        ctx.fillRect(0, 0, 32, 32);
        
        // Detalles
        ctx.fillStyle = c.fakeBlockDark;
        for (let y = 0; y < 32; y += 8) {
            for (let x = 0; x < 32; x += 8) {
                ctx.fillRect(x, y, 8, 1);
                ctx.fillRect(x, y, 1, 8);
            }
        }

        // Aplicar transparencia si se está desvaneciendo
        if (phase > 0) {
            ctx.globalCompositeOperation = 'destination-in';
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fillRect(0, 0, 32, 32);
            ctx.globalCompositeOperation = 'source-over';
        }

        this.cache.set(key, canvas);
        return canvas;
    },

    // Partículas
    generateParticle(type = 'gold', scale = 1) {
        const key = `particle_${type}_${scale}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const size = 8 * scale;
        const canvas = this.getCanvas(size, size);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.scale(scale, scale);

        const c = this.colors;
        const color = type === 'gold' ? c.particleGold : c.particleRed;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(4, 4, 3, 0, Math.PI * 2);
        ctx.fill();

        // Brillo
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(3, 3, 1, 0, Math.PI * 2);
        ctx.fill();

        this.cache.set(key, canvas);
        return canvas;
    },

    // Fondo parallax - genera capas
    generateBackground(layer, width, height) {
        const key = `bg_${layer}_${width}_${height}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const canvas = this.getCanvas(width, height);
        const ctx = canvas.getContext('2d');

        switch (layer) {
            case 'sky':
                // Gradiente cielo
                const grad = ctx.createLinearGradient(0, 0, 0, height);
                grad.addColorStop(0, '#0D1B2A');
                grad.addColorStop(0.5, '#1B2A4A');
                grad.addColorStop(1, '#2D3A5E');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);
                
                // Estrellas
                ctx.fillStyle = '#FFFFFF';
                for (let i = 0; i < 100; i++) {
                    const x = Math.random() * width;
                    const y = Math.random() * height * 0.7;
                    const s = Math.random() * 2;
                    ctx.fillRect(x, y, s, s);
                }
                break;

            case 'mountains':
                // Montañas lejanas
                ctx.fillStyle = '#1A2A4A';
                ctx.beginPath();
                ctx.moveTo(0, height);
                for (let x = 0; x <= width; x += 20) {
                    const y = height * 0.6 + Math.sin(x * 0.01) * 30 + Math.sin(x * 0.03) * 15;
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(width, height);
                ctx.closePath();
                ctx.fill();
                break;

            case 'hills':
                // Colinas medias
                ctx.fillStyle = '#2D3A5E';
                ctx.beginPath();
                ctx.moveTo(0, height);
                for (let x = 0; x <= width; x += 15) {
                    const y = height * 0.75 + Math.sin(x * 0.02) * 20;
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(width, height);
                ctx.closePath();
                ctx.fill();
                break;

            case 'ground':
                // ========================================
                // PASARELA / PLATAFORMA PRINCIPAL (estilo 16-bit)
                // ========================================
                const groundY = height - 60;
                const groundH = 60;
                const tileW = 32;
                
                // 1. SOMBRA PROFUNDA (debajo de la pasarela)
                ctx.fillStyle = '#1A1010';
                ctx.fillRect(0, groundY + 4, width, groundH - 4);
                
                // 2. BASE DE LA PASARELA (madera/piedra oscura)
                ctx.fillStyle = '#2D1F1A';
                ctx.fillRect(0, groundY, width, groundH);
                
                // 3. TABLONES / LOSAS DE LA PASARELA (patrón visible)
                for (let x = 0; x < width; x += tileW) {
                    // Alternar colores de tablones
                    const isEven = Math.floor(x / tileW) % 2 === 0;
                    ctx.fillStyle = isEven ? '#4A3728' : '#3D2A1F';
                    ctx.fillRect(x, groundY, tileW, groundH);
                    
                    // Bordes entre tablones (líneas oscuras)
                    ctx.fillStyle = '#1A0F0A';
                    ctx.fillRect(x + tileW - 1, groundY, 2, groundH);
                    
                    // Textura de madera/piedra en cada tablón
                    ctx.fillStyle = isEven ? '#5D4A35' : '#4A3528';
                    for (let tx = 0; tx < tileW; tx += 8) {
                        for (let ty = 0; ty < groundH; ty += 8) {
                            if ((tx + ty + Math.floor(x/tileW)*10) % 16 === 0) {
                                ctx.fillRect(x + tx, groundY + ty, 4, 4);
                            }
                        }
                    }
                    
                    // Clavos/tornillos en las esquinas de tablones
                    ctx.fillStyle = '#8B6B4A';
                    ctx.fillRect(x + 2, groundY + 4, 2, 2);
                    ctx.fillRect(x + tileW - 4, groundY + 4, 2, 2);
                    ctx.fillRect(x + 2, groundY + groundH - 6, 2, 2);
                    ctx.fillRect(x + tileW - 4, groundY + groundH - 6, 2, 2);
                }
                
                // 4. BORDE SUPERIOR BRILLANTE (donde pisa el jugador) - MÁS VISIBLE
                const highlightY = groundY;
                // Línea principal dorada/marrón claro
                const grad = ctx.createLinearGradient(0, highlightY, 0, highlightY + 3);
                grad.addColorStop(0, '#D4A574');
                grad.addColorStop(0.5, '#B8956A');
                grad.addColorStop(1, '#8B7355');
                ctx.fillStyle = grad;
                ctx.fillRect(0, highlightY, width, 3);
                
                // Línea blanca muy sutil arriba del todo (edge highlight)
                ctx.fillStyle = '#E8D5C0';
                ctx.fillRect(0, highlightY, width, 1);
                
                // 5. BORDE INFERIOR (sombra del borde)
                ctx.fillStyle = '#1A0F0A';
                ctx.fillRect(0, groundY + groundH - 2, width, 2);
                
                // 6. POSTES / BARANDALES cada cierto intervalo (decoración)
                for (let x = 16; x < width; x += 128) {
                    // Poste vertical
                    ctx.fillStyle = '#3D2A1F';
                    ctx.fillRect(x, groundY - 20, 6, 24);
                    // Capuchón del poste
                    ctx.fillStyle = '#5D4A35';
                    ctx.fillRect(x - 2, groundY - 22, 10, 4);
                    // Cadena/cuerda entre postes
                    if (x > 16) {
                        ctx.strokeStyle = '#4A3728';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(x - 112, groundY - 16);
                        ctx.quadraticCurveTo(x - 56, groundY - 24, x, groundY - 16);
                        ctx.stroke();
                    }
                }
                
                // 7. DETALLES: Grietas, musgo, manchas aleatorias
                ctx.fillStyle = '#3D2A1F';
                for (let i = 0; i < 30; i++) {
                    const rx = Math.random() * width;
                    const ry = groundY + Math.random() * groundH;
                    const rw = Math.random() * 6 + 2;
                    const rh = Math.random() * 4 + 1;
                    ctx.globalAlpha = 0.3;
                    ctx.fillRect(rx, ry, rw, rh);
                    ctx.globalAlpha = 1;
                }
                
                break;
        }

        this.cache.set(key, canvas);
        return canvas;
    },

    // ========================================
    // LoL CHAMPIONS - Sprites pixel art 64x64
    // ========================================
    generateLoLChampion(championId, scale = 1) {
        const key = `lol_${championId}_${scale}`;
        if (this.cache.has(key)) return this.cache.get(key);

        const baseSize = 64;
        const size = baseSize * scale;
        const canvas = this.getCanvas(size, size);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.scale(scale, scale);

        // Definir datos de cada campeón
        const champions = {
            ahri: { colors: { primary: '#E8B4E8', secondary: '#FFD700', skin: '#FFE4C4', eyes: '#00FFFF', outfit: '#8B008B', accent: '#FF69B4' }, draw: this.drawAhri.bind(this) },
            jinx: { colors: { primary: '#00FFFF', secondary: '#FF1493', skin: '#FFE4C4', eyes: '#FF1493', outfit: '#1A1A2E', accent: '#FFD700' }, draw: this.drawJinx.bind(this) },
            yasuo: { colors: { primary: '#FFFFFF', secondary: '#FFD700', skin: '#D4B896', eyes: '#000000', outfit: '#2D2D2D', accent: '#FF4444' }, draw: this.drawYasuo.bind(this) },
            lux: { colors: { primary: '#FFD700', secondary: '#FFFFFF', skin: '#FFE4C4', eyes: '#00BFFF', outfit: '#4169E1', accent: '#FFD700' }, draw: this.drawLux.bind(this) },
            thresh: { colors: { primary: '#1A1A2E', secondary: '#00FFFF', skin: '#0D0D1A', eyes: '#00FFFF', outfit: '#2D1B1B', accent: '#FFD700' }, draw: this.drawThresh.bind(this) },
            garen: { colors: { primary: '#C0C0C0', secondary: '#FFD700', skin: '#D4B896', eyes: '#0000FF', outfit: '#C0C0C0', accent: '#000080' }, draw: this.drawGaren.bind(this) },
            miss_fortune: { colors: { primary: '#FF4444', secondary: '#FFD700', skin: '#FFE4C4', eyes: '#00FFFF', outfit: '#8B0000', accent: '#000000' }, draw: this.drawMissFortune.bind(this) },
            zed: { colors: { primary: '#1A1A1A', secondary: '#FF3333', skin: '#2D2D2D', eyes: '#FF3333', outfit: '#1A1A1A', accent: '#444444' }, draw: this.drawZed.bind(this) },
            jhin: { colors: { primary: '#FFFFFF', secondary: '#FFD700', skin: '#1A1A1A', eyes: '#FF3333', outfit: '#1A1A1A', accent: '#FFD700' }, draw: this.drawJhin.bind(this) },
            vi: { colors: { primary: '#FF69B4', secondary: '#FFD700', skin: '#FFE4C4', eyes: '#FFD700', outfit: '#1A1A2E', accent: '#00FFFF' }, draw: this.drawVi.bind(this) },
            teemo: { colors: { primary: '#8FBC8F', secondary: '#FFD700', skin: '#8FBC8F', eyes: '#FFD700', outfit: '#228B22', accent: '#FF4444' }, draw: this.drawTeemo.bind(this) },
            darius: { colors: { primary: '#8B0000', secondary: '#C0C0C0', skin: '#D4B896', eyes: '#FF0000', outfit: '#8B0000', accent: '#FFD700' }, draw: this.drawDarius.bind(this) },
            soraka: { colors: { primary: '#E6E6FA', secondary: '#FFD700', skin: '#E6E6FA', eyes: '#00FFFF', outfit: '#9370DB', accent: '#FFFFFF' }, draw: this.drawSoraka.bind(this) },
            rengar: { colors: { primary: '#FFA500', secondary: '#FFFFFF', skin: '#FF8C00', eyes: '#FFD700', outfit: '#8B4513', accent: '#FF0000' }, draw: this.drawRengar.bind(this) },
            leona: { colors: { primary: '#FFD700', secondary: '#FF4444', skin: '#FFE4C4', eyes: '#FFD700', outfit: '#FFD700', accent: '#FF8C00' }, draw: this.drawLeona.bind(this) }
        };

        const champ = champions[championId];
        if (!champ) return this.generateLoLChampion('ahri', scale); // Fallback

        const c = champ.colors;
        const px = (x, y, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        };
        const rect = (x, y, w, h, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        };

        // Llamar a la función de dibujo específica
        champ.draw(ctx, c, px, rect);

        this.cache.set(key, canvas);
        return canvas;
    },

    // Generar versión "zoom/crop" para el quiz
    generateLoLChampionCrop(championId, cropRegion = null, scale = 1) {
        const fullSprite = this.generateLoLChampion(championId, scale);
        const baseSize = 64 * scale;
        
        // Si no se especifica región, elegir una aleatoria interesante
        if (!cropRegion) {
            const regions = [
                { x: 16, y: 8, w: 32, h: 32, name: 'cara' },      // Cara
                { x: 8, y: 20, w: 24, h: 24, name: 'ojo' },       // Ojo
                { x: 20, y: 35, w: 24, h: 20, name: 'arma' },     // Arma/mano
                { x: 12, y: 5, w: 40, h: 20, name: 'pelo' },      // Pelo/cabeza
                { x: 24, y: 45, w: 16, h: 16, name: 'detalle' },  // Detalle único
            ];
            cropRegion = regions[Math.floor(Math.random() * regions.length)];
        }

        const cropCanvas = this.getCanvas(cropRegion.w * scale, cropRegion.h * scale);
        const cropCtx = cropCanvas.getContext('2d');
        cropCtx.imageSmoothingEnabled = false;
        cropCtx.scale(scale, scale);
        cropCtx.drawImage(fullSprite, cropRegion.x, cropRegion.y, cropRegion.w, cropRegion.h, 0, 0, cropRegion.w, cropRegion.h);

        return { canvas: cropCanvas, region: cropRegion };
    },

    // ========================================
    // FUNCIONES DE DIBUJO POR CAMPEÓN
    // ========================================
    drawAhri(ctx, c, px, rect) {
        // Pelo y orejas de zorro
        for (let y = 5; y < 18; y++) {
            for (let x = 14; x < 50; x++) {
                if (y < 10 && (x < 18 || x > 46)) continue; // Huecos orejas
                px(x, y, c.primary);
            }
        }
        // Orejas
        for (let y = 2; y < 10; y++) {
            const w = 6 - (y - 2);
            for (let x = 0; x < w; x++) {
                px(16 + x, y, c.primary);
                px(42 - x, y, c.primary);
            }
            // Punta blanca
            if (y === 3) { px(16, y, c.secondary); px(47, y, c.secondary); }
        }
        // Colas (sugeridas atrás)
        for (let i = 0; i < 9; i++) {
            const tx = 8 + (i % 3) * 16;
            const ty = 50 + Math.floor(i / 3) * 4;
            px(tx, ty, c.secondary);
            px(tx + 1, ty, c.secondary);
        }
        // Cara
        for (let y = 18; y < 35; y++) {
            for (let x = 18; x < 46; y++) {
                px(x, y, c.skin);
            }
        }
        // Ojos
        rect(24, 24, 4, 4, c.eyes);
        rect(36, 24, 4, 4, c.eyes);
        px(26, 25, '#FFFFFF'); px(38, 25, '#FFFFFF'); // Brillo
        // Orbita
        for (let i = 0; i < 6; i++) {
            px(31 + i, 16, c.accent);
        }
        // Ropa
        rect(16, 35, 32, 25, c.outfit);
    },

    drawJinx(ctx, c, px, rect) {
        // Pelo azul loco (dos coletas)
        for (let y = 2; y < 20; y++) {
            for (let x = 18; x < 46; x++) {
                if ((x < 28 && y < 10) || (x > 36 && y < 10)) continue; // Separación coletas
                px(x, y, c.primary);
            }
        }
        // Coletas
        for (let y = 20; y < 50; y++) {
            // Coleta izq
            for (let x = 18; x < 28; x++) px(x, y, c.primary);
            // Coleta der
            for (let x = 36; x < 46; x++) px(x, y, c.primary);
        }
        // Cara
        rect(20, 18, 24, 15, c.skin);
        // Ojos locos (diferentes)
        rect(24, 22, 4, 5, c.eyes);
        rect(36, 22, 5, 4, c.eyes);
        px(25, 23, '#FFFFFF'); px(38, 23, '#FFFFFF');
        // Dientes
        px(30, 30, c.accent); px(31, 30, c.accent); px(32, 30, c.accent);
        // Cohete (brazo der)
        rect(46, 25, 12, 6, c.outfit);
        rect(50, 27, 8, 4, c.secondary);
        // Ropa
        rect(16, 35, 32, 25, c.outfit);
    },

    drawYasuo(ctx, c, px, rect) {
        // Pelo blanco al viento
        for (let y = 5; y < 20; y++) {
            const offset = Math.sin(y * 0.3) * 4;
            for (let x = 18 + offset; x < 46 + offset; x++) {
                if (x >= 18 && x < 46) px(x, y, c.primary);
            }
        }
        // Cinturón
        rect(18, 32, 28, 2, c.secondary);
        // Espada (katana)
        for (let y = 15; y < 55; y++) {
            px(48, y, c.secondary);
            px(49, y, '#FFFFFF');
        }
        // Guardamanos
        rect(46, 14, 4, 2, c.accent);
        // Cara
        rect(20, 18, 24, 15, c.skin);
        // Cicatriz
        for (let x = 28; x < 36; x++) px(x, 24, c.accent);
        // Ojos cerrados/serios
        rect(24, 24, 4, 1, c.eyes);
        rect(36, 24, 4, 1, c.eyes);
        // Ropa
        rect(16, 35, 32, 25, c.outfit);
    },

    drawLux(ctx, c, px, rect) {
        // Pelo dorado con coleta
        for (let y = 5; y < 18; y++) {
            for (let x = 18; x < 46; x++) px(x, y, c.primary);
        }
        // Coleta
        for (let y = 18; y < 40; y++) {
            for (let x = 40; x < 48; x++) px(x, y, c.primary);
        }
        // Luz/bastón
        for (let y = 10; y < 50; y++) {
            const w = 2 + Math.sin(y * 0.2) * 1;
            for (let x = 0; x < w; x++) {
                px(10 + x, y, c.secondary);
            }
        }
        // Cara
        rect(20, 18, 24, 15, c.skin);
        // Ojos azules brillantes
        rect(24, 24, 4, 4, c.eyes);
        rect(36, 24, 4, 4, c.eyes);
        px(26, 25, '#FFFFFF'); px(38, 25, '#FFFFFF');
        // Armadura
        rect(16, 35, 32, 25, c.outfit);
        // Detalles dorados
        rect(20, 36, 24, 1, c.accent);
    },

    drawThresh(ctx, c, px, rect) {
        // Calavera/cabeza
        rect(20, 10, 24, 20, c.primary);
        // Ojos huecos brillantes
        rect(24, 16, 4, 6, c.eyes);
        rect(36, 16, 4, 6, c.eyes);
        // Mandíbula
        rect(24, 28, 16, 2, c.primary);
        // Cadenas
        for (let y = 30; y < 55; y += 4) {
            rect(12, y, 4, 2, c.secondary);
            rect(48, y, 4, 2, c.secondary);
        }
        // Lintern
        rect(50, 20, 8, 12, c.secondary);
        rect(51, 22, 6, 8, c.accent);
        // Humo
        for (let i = 0; i < 10; i++) {
            px(10 + Math.random() * 44, 5 + Math.random() * 20, c.secondary);
        }
    },

    drawGaren(ctx, c, px, rect) {
        // Casco
        rect(18, 5, 28, 15, c.primary);
        rect(20, 3, 24, 4, c.accent); // Pluma
        // Visera
        rect(22, 12, 20, 3, c.eyes);
        // Hombreras
        rect(10, 20, 44, 8, c.primary);
        rect(12, 20, 40, 2, c.secondary);
        // Espada gigante
        for (let y = 25; y < 55; y++) {
            const w = y < 35 ? 6 : 4;
            for (let x = 0; x < w; x++) {
                px(50 + x, y, c.secondary);
            }
        }
        // Detalle hoja
        for (let y = 25; y < 50; y++) px(52, y, '#FFFFFF');
        // Capa
        for (let y = 20; y < 50; y++) {
            for (let x = 0; x < 12; x++) {
                px(6 + x, y, c.accent);
            }
        }
        // Armadura cuerpo
        rect(18, 28, 28, 32, c.primary);
        rect(22, 30, 20, 2, c.secondary);
    },

    drawMissFortune(ctx, c, px, rect) {
        // Sombrero
        rect(14, 2, 36, 6, c.accent);
        rect(18, 0, 28, 4, c.accent);
        rect(22, -2, 20, 2, c.secondary); // Pluma
        // Pelo rojo
        for (let y = 8; y < 22; y++) {
            for (let x = 16; x < 48; x++) px(x, y, c.primary);
        }
        // Coleta lateral
        for (let y = 22; y < 45; y++) {
            for (let x = 44; x < 52; x++) px(x, y, c.primary);
        }
        // Cara
        rect(20, 18, 24, 15, c.skin);
        // Ojos
        rect(24, 24, 4, 4, c.eyes);
        rect(36, 24, 4, 4, c.eyes);
        // Pistolas (ambas manos)
        rect(6, 30, 10, 4, c.secondary); // Izq
        rect(48, 30, 10, 4, c.secondary); // Der
        rect(8, 31, 6, 2, c.outfit); // Cañón
        rect(50, 31, 6, 2, c.outfit);
        // Ropa
        rect(16, 35, 32, 25, c.outfit);
        rect(20, 35, 24, 2, c.secondary); // Cinturón
    },

    drawZed(ctx, c, px, rect) {
        // Máscara
        rect(16, 6, 32, 18, c.primary);
        // Ojos de la máscara
        rect(22, 10, 6, 6, c.eyes);
        rect(36, 10, 6, 6, c.eyes);
        // Shurikens en la espalda
        for (let i = 0; i < 3; i++) {
            const x = 48 + i * 4;
            const y = 15 + i * 6;
            rect(x, y, 4, 4, c.accent);
            px(x + 1, y + 1, c.secondary);
        }
        // Traje
        rect(16, 25, 32, 35, c.outfit);
        // Guantes
        rect(12, 35, 6, 15, c.primary);
        rect(46, 35, 6, 15, c.primary);
        // Energía sombra
        for (let i = 0; i < 8; i++) {
            px(8 + Math.random() * 48, 25 + Math.random() * 30, c.secondary);
        }
    },

    drawJhin(ctx, c, px, rect) {
        // Máscara blanca
        rect(18, 6, 28, 18, c.primary);
        // Ojo de la máscara (único visible)
        rect(28, 10, 8, 8, c.eyes);
        px(31, 12, '#FFFFFF');
        // Rosa en la máscara
        rect(20, 18, 4, 4, '#FF69B4');
        // Rifle
        for (let x = 48; x < 62; x++) {
            for (let y = 20; y < 28; y++) {
                if (y === 23 || y === 24) px(x, y, c.secondary);
                else if (x > 50) px(x, y, c.outfit);
            }
        }
        // Guantes blancos
        rect(14, 35, 6, 10, c.primary);
        rect(44, 35, 6, 10, c.primary);
        // Traje
        rect(16, 25, 32, 35, c.outfit);
        // Detalles dorados
        rect(24, 28, 16, 1, c.accent);
    },

    drawVi(ctx, c, px, rect) {
        // Pelo rosa corto
        for (let y = 6; y < 18; y++) {
            for (let x = 16; x < 48; x++) px(x, y, c.primary);
        }
        // Gafas
        rect(20, 12, 10, 6, c.accent);
        rect(34, 12, 10, 6, c.accent);
        rect(28, 13, 8, 4, '#000000'); // Puente
        // Cara
        rect(20, 18, 24, 15, c.skin);
        // Ojos
        rect(24, 24, 4, 4, c.eyes);
        rect(36, 24, 4, 4, c.eyes);
        // Guantes Hextech (GRANDES)
        rect(8, 30, 18, 20, c.secondary);
        rect(38, 30, 18, 20, c.secondary);
        // Detalles hextech
        for (let y = 32; y < 48; y += 4) {
            rect(10, y, 14, 2, c.accent);
            rect(40, y, 14, 2, c.accent);
        }
        // Tatuaje "VI" en mejilla
        px(44, 20, c.accent); px(45, 20, c.accent);
        px(44, 21, c.accent); px(45, 22, c.accent);
        // Traje
        rect(16, 35, 32, 25, c.outfit);
    },

    drawTeemo(ctx, c, px, rect) {
        // Sombrero
        rect(18, 0, 28, 6, c.outfit);
        rect(14, 2, 36, 4, c.outfit);
        // Orejas
        for (let y = 6; y < 14; y++) {
            for (let x = 0; x < 4; x++) px(14 + x, y, c.primary);
            for (let x = 0; x < 4; x++) px(46 - x, y, c.primary);
        }
        // Cara (pequeña)
        rect(22, 14, 20, 12, c.skin);
        // Ojos grandes
        rect(26, 18, 4, 4, c.eyes);
        rect(34, 18, 4, 4, c.eyes);
        px(27, 19, '#FFFFFF'); px(35, 19, '#FFFFFF');
        // Pistola
        rect(48, 25, 12, 4, c.secondary);
        // Cuerpo
        rect(16, 28, 32, 30, c.outfit);
        // Hongos en el suelo
        for (let i = 0; i < 3; i++) {
            const mx = 10 + i * 20;
            rect(mx, 55, 8, 4, c.accent);
            rect(mx + 2, 52, 4, 4, '#8FBC8F');
        }
    },

    drawDarius(ctx, c, px, rect) {
        // Casco con cuernos
        rect(20, 2, 24, 12, c.primary);
        // Cuernos
        for (let y = 0; y < 8; y++) {
            const w = 3 - Math.floor(y / 3);
            for (let x = 0; x < w; x++) {
                px(22 + x, y, c.primary);
                px(39 - x, y, c.primary);
            }
        }
        // Cara
        rect(20, 14, 24, 12, c.skin);
        // Barba
        for (let y = 24; y < 30; y++) {
            for (let x = 22; x < 42; x++) {
                if (Math.random() > 0.3) px(x, y, '#4A3728');
            }
        }
        // Ojos rojos
        rect(24, 18, 4, 3, c.eyes);
        rect(36, 18, 4, 3, c.eyes);
        // Hacha ENORME
        // Mango
        for (let y = 15; y < 55; y++) px(50, y, '#8B4513');
        // Hoja
        for (let y = 15; y < 35; y++) {
            const w = 12 - Math.floor((y - 15) / 2);
            for (let x = 0; x < w; x++) {
                px(48 - x, y, c.secondary);
            }
        }
        // Filo
        for (let y = 15; y < 35; y++) px(48 - (12 - Math.floor((y - 15) / 2)), y, '#FFFFFF');
        // Armadura
        rect(16, 30, 32, 30, c.primary);
        rect(18, 32, 28, 2, c.accent);
        // Capa
        for (let y = 30; y < 55; y++) {
            for (let x = 0; x < 8; x++) {
                px(8 + x, y, c.accent);
            }
        }
    },

    drawSoraka(ctx, c, px, rect) {
        // Cuerno central
        for (let y = 0; y < 15; y++) {
            const w = 3 - Math.floor(y / 5);
            for (let x = 0; x < w; x++) {
                px(31 + x, y, c.secondary);
            }
        }
        // Pelo lavanda
        for (let y = 8; y < 22; y++) {
            for (let x = 16; x < 48; x++) px(x, y, c.primary);
        }
        // Cola (sugerida)
        for (let y = 40; y < 55; y++) {
            px(50, y, c.primary);
            px(51, y, c.primary);
        }
        // Cara
        rect(20, 18, 24, 15, c.skin);
        // Ojos
        rect(24, 24, 4, 4, c.eyes);
        rect(36, 24, 4, 4, c.eyes);
        // Bastón con estrella
        for (let y = 10; y < 50; y++) px(10, y, c.secondary);
        // Estrella en el bastón
        for (let i = -2; i <= 2; i++) {
            px(10, 12 + i, c.accent);
            px(8 + i, 12, c.accent);
        }
        // Ropa
        rect(16, 35, 32, 25, c.outfit);
        // Pezuñas (pies)
        rect(20, 55, 10, 5, c.secondary);
        rect(34, 55, 10, 5, c.secondary);
    },

    drawRengar(ctx, c, px, rect) {
        // Melena
        for (let y = 2; y < 20; y++) {
            for (let x = 10; x < 54; x++) {
                if (y < 8 && (x < 18 || x > 46)) continue; // Orejas
                px(x, y, c.primary);
            }
        }
        // Orejas gato
        for (let y = 0; y < 8; y++) {
            const w = 5 - Math.floor(y / 2);
            for (let x = 0; x < w; x++) {
                px(16 + x, y, c.primary);
                px(43 - x, y, c.primary);
            }
        }
        // Cara
        rect(20, 18, 24, 15, c.skin);
        // Ojos depredadores
        rect(24, 22, 4, 5, c.eyes);
        rect(36, 22, 4, 5, c.eyes);
        // Cicatrices
        for (let i = 0; i < 3; i++) {
            const x = 22 + i * 8;
            for (let y = 0; y < 3; y++) px(x, 20 + y, c.accent);
        }
        // Garra (mano der)
        for (let i = 0; i < 4; i++) {
            px(50 + i, 30 + i, c.secondary);
            px(50 + i, 31 + i, c.secondary);
            px(50 + i, 32 + i, c.secondary);
        }
        // Armadura cuero
        rect(16, 35, 32, 25, c.outfit);
    },

    drawLeona(ctx, c, px, rect) {
        // Casco solar
        rect(18, 2, 28, 12, c.primary);
        // Rayos solares
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            for (let r = 14; r < 22; r++) {
                const x = 32 + Math.cos(angle) * r;
                const y = 8 + Math.sin(angle) * r;
                if (x >= 0 && x < 64 && y >= 0 && y < 64) px(Math.floor(x), Math.floor(y), c.accent);
            }
        }
        // Visera
        rect(22, 6, 20, 4, c.eyes);
        // Armadura dorada completa
        rect(14, 20, 36, 40, c.primary);
        // Detalles
        rect(20, 22, 24, 2, c.secondary); // Pecho
        rect(20, 30, 24, 1, c.secondary);
        rect(20, 38, 24, 1, c.secondary);
        // Escudo solar (brazo izq)
        rect(4, 25, 14, 20, c.primary);
        for (let r = 0; r < 10; r++) {
            for (let a = 0; a < 360; a += 45) {
                const x = 11 + Math.cos(a * Math.PI / 180) * r;
                const y = 35 + Math.sin(a * Math.PI / 180) * r;
                if (x >= 4 && x < 18 && y >= 25 && y < 45) px(Math.floor(x), Math.floor(y), c.accent);
            }
        }
        // Espada (brazo der)
        for (let y = 25; y < 50; y++) {
            px(50, y, c.secondary);
            px(51, y, '#FFFFFF');
        }
        // Capa
        for (let y = 20; y < 50; y++) {
            for (let x = 0; x < 10; x++) {
                px(4 + x, y, c.secondary);
            }
        }
    },

    // Limpiar cache
    clear() {
        this.cache.clear();
    }
};

// Exportar para uso global
window.SpriteSheet = SpriteSheet;
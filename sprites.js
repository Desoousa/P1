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
                // Suelo principal
                ctx.fillStyle = '#3D2A2A';
                ctx.fillRect(0, height - 60, width, 60);
                
                // Textura suelo
                ctx.fillStyle = '#4A3535';
                for (let x = 0; x < width; x += 8) {
                    for (let y = height - 60; y < height; y += 8) {
                        if ((x + y) % 16 === 0) {
                            ctx.fillRect(x, y, 4, 4);
                        }
                    }
                }
                break;
        }

        this.cache.set(key, canvas);
        return canvas;
    },

    // Limpiar cache
    clear() {
        this.cache.clear();
    }
};

// Exportar para uso global
window.SpriteSheet = SpriteSheet;
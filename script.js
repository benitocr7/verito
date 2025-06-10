// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createFallingHearts();
});

// Función principal de inicialización
function initializeApp() {
    // Agregar event listeners a los elementos del menú
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });

    // Agregar efectos de hover a los elementos del menú
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Función para mostrar una sección específica
function showSection(sectionName) {
    // Ocultar el menú principal
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.style.display = 'none';
    
    // Ocultar todas las secciones
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // Animación de entrada
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            targetSection.style.transition = 'all 0.5s ease';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Función para volver al menú principal
function showMenu() {
    // Ocultar todas las secciones
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar el menú principal
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.style.display = 'grid';
    
    // Animación de entrada del menú
    menuContainer.style.opacity = '0';
    menuContainer.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        menuContainer.style.transition = 'all 0.5s ease';
        menuContainer.style.opacity = '1';
        menuContainer.style.transform = 'scale(1)';
    }, 50);
}

// Función para crear corazones cayendo
function createFallingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💘', '💝'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Posición aleatoria en el eje X
        heart.style.left = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 15 + 15; // Entre 15px y 30px
        heart.style.fontSize = size + 'px';
        
        // Duración aleatoria de la animación
        const duration = Math.random() * 3 + 2; // Entre 2s y 5s
        heart.style.animationDuration = duration + 's';
        
        // Delay aleatorio
        const delay = Math.random() * 2;
        heart.style.animationDelay = delay + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remover el corazón después de que termine la animación
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, (duration + delay) * 1000);
    }
    
    // Crear corazones continuamente
    setInterval(createHeart, 800); // Un nuevo corazón cada 800ms
    
    // Crear algunos corazones iniciales
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 200);
    }
}

// Variables para el juego del botón "No"
let noButtonClickCount = 0;
let noButtonMoving = false;

// Función para manejar la respuesta "Sí"
function handleYesResponse() {
    // Ocultar los botones
    document.getElementById('responseButtons').style.display = 'none';
    
    // Ocultar el contenido de la declaración
    document.getElementById('declarationContent').style.display = 'none';
    
    // Mostrar el mensaje de bienvenida
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.style.display = 'block';
    
    // Crear celebración de corazones
    createCelebrationHearts();
    
    // Crear confeti de corazones
    createHeartConfetti();
    
    // Reproducir animación especial
    setTimeout(() => {
        createLoveExplosion();
    }, 500);
}

// Función para manejar la respuesta "No"
function handleNoResponse() {
    noButtonClickCount++;
    
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    
    // Hacer que el botón "No" sea cada vez más pequeño y difícil de presionar
    const newScale = Math.max(0.5, 1 - (noButtonClickCount * 0.1));
    noBtn.style.transform = `scale(${newScale})`;
    
    // Hacer que el botón "Sí" sea más grande y atractivo
    const yesScale = 1 + (noButtonClickCount * 0.1);
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.background = `linear-gradient(45deg, #ff69b4, #ff1493, #ff69b4)`;
    
    // Mover el botón "No" a una posición aleatoria
    moveNoButton();
    
    // Cambiar el texto del botón "Sí" para que sea más convincente
    const yesTexts = [
        "Sí ❤️",
        "¡Sí! ❤️",
        "¡Por favor, Sí! 💕",
        "¡Vamos, di que Sí! 💖",
        "¡Sabes que quieres decir Sí! 💘",
        "¡El Sí te está esperando! 💝"
    ];
    
    if (noButtonClickCount <= yesTexts.length - 1) {
        yesBtn.textContent = yesTexts[noButtonClickCount];
    }
    
    // Después de 5 intentos, hacer que el botón "No" desaparezca
    if (noButtonClickCount >= 5) {
        noBtn.style.display = 'none';
        yesBtn.textContent = "¡Ya sabes la respuesta! ❤️";
        yesBtn.style.transform = 'scale(1.3)';
        
        // Agregar mensaje de que no hay escapatoria
        const declaration = document.querySelector('.declaration-text');
        const noEscapeMsg = document.createElement('p');
        noEscapeMsg.textContent = "¡No hay escapatoria! Solo queda una opción... 😏💕";
        noEscapeMsg.style.color = '#ff69b4';
        noEscapeMsg.style.fontStyle = 'italic';
        noEscapeMsg.style.marginTop = '20px';
        declaration.appendChild(noEscapeMsg);
    }
}

// Función para mover el botón "No" a una posición aleatoria
function moveNoButton() {
    if (noButtonMoving) return;
    
    noButtonMoving = true;
    const noBtn = document.getElementById('noBtn');
    
    // Generar posición aleatoria
    const maxX = 200;
    const maxY = 100;
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    // Aplicar transformación
    noBtn.style.transform += ` translate(${randomX}px, ${randomY}px)`;
    
    // Agregar vibración
    noBtn.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        noBtn.style.animation = '';
        noButtonMoving = false;
    }, 500);
}

// Función para crear corazones de celebración
function createCelebrationHearts() {
    const container = document.getElementById('celebrationHearts');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.style.position = 'absolute';
            heart.style.fontSize = '2rem';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.animation = 'floatUp 3s ease-out forwards';
            heart.style.opacity = '0';
            
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }, i * 100);
    }
}

// Función para crear confeti de corazones
function createHeartConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff69b4', '#ffc0cb', '#ff91a4'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = '❤️';
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-50px';
            confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s ease-out forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }, i * 50);
    }
}

// Función para crear explosión de amor
function createLoveExplosion() {
    const messages = [
        "¡Te amo! 💕",
        "¡Eres perfecta! 🌟",
        "¡Mi amor! 💖",
        "¡Felicidad! 🎉",
        "¡Por siempre! 💍"
    ];
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            const msgElement = document.createElement('div');
            msgElement.textContent = message;
            msgElement.style.position = 'fixed';
            msgElement.style.left = '50%';
            msgElement.style.top = '50%';
            msgElement.style.transform = 'translate(-50%, -50%)';
            msgElement.style.fontSize = '2rem';
            msgElement.style.color = '#ff69b4';
            msgElement.style.fontWeight = 'bold';
            msgElement.style.pointerEvents = 'none';
            msgElement.style.zIndex = '1001';
            msgElement.style.animation = 'loveExplosion 2s ease-out forwards';
            
            document.body.appendChild(msgElement);
            
            setTimeout(() => {
                if (msgElement.parentNode) {
                    msgElement.parentNode.removeChild(msgElement);
                }
            }, 2000);
        }, index * 400);
    });
}

// Función para crear explosión de corazones
function createHeartExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        document.body.appendChild(heart);
        
        // Animación de explosión
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        heart.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    }
}

// Agregar efectos de parallax suave al scroll
function addParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hearts = document.querySelectorAll('.heart');
        
        hearts.forEach(heart => {
            const speed = 0.5;
            heart.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Función para agregar efectos de sonido (opcional)
function addSoundEffects() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Aquí puedes agregar efectos de sonido si lo deseas
            // Por ejemplo: playSound('click.mp3');
        });
    });
}

// Función para manejar la navegación con teclado
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Presionar Escape para volver al menú
        if (event.key === 'Escape') {
            showMenu();
        }
        
        // Presionar números 1-4 para navegar directamente
        const numberKeys = ['1', '2', '3', '4'];
        const sections = ['carta', 'cancion', 'porque', 'declaracion'];
        
        if (numberKeys.includes(event.key)) {
            const index = parseInt(event.key) - 1;
            if (sections[index]) {
                showSection(sections[index]);
            }
        }
    });
}

// Inicializar efectos adicionales
setTimeout(() => {
    addDeclarationEffects();
    addParallaxEffect();
    addKeyboardNavigation();
}, 1000);

// Función para optimizar el rendimiento
function optimizePerformance() {
    // Limitar el número de corazones en pantalla
    setInterval(() => {
        const hearts = document.querySelectorAll('.heart');
        if (hearts.length > 20) {
            // Remover los corazones más antiguos si hay demasiados
            for (let i = 0; i < hearts.length - 20; i++) {
                if (hearts[i].parentNode) {
                    hearts[i].parentNode.removeChild(hearts[i]);
                }
            }
        }
    }, 5000);
}

// Inicializar optimización
optimizePerformance();

// Funciones adicionales para mejorar la experiencia
function addTouchEffects() {
    // Efectos especiales para dispositivos táctiles
    if ('ontouchstart' in window) {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

// Inicializar efectos táctiles
addTouchEffects();
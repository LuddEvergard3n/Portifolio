/* Windows XP Portfolio - Scripts */

// ==================== BOOT SCREEN ====================
function initBootScreen() {
    var bootScreen = document.getElementById('boot-screen');
    if (bootScreen) {
        setTimeout(function() {
            bootScreen.classList.add('fade-out');
        }, 2500);
        
        setTimeout(function() {
            bootScreen.classList.add('hidden');
        }, 3000);
    }
}

// ==================== START MENU ====================
function toggleStartMenu() {
    var startMenu = document.getElementById('start-menu');
    var startButton = document.querySelector('.start-button');
    
    if (startMenu.classList.contains('active')) {
        startMenu.classList.remove('active');
        startButton.classList.remove('active');
    } else {
        startMenu.classList.add('active');
        startButton.classList.add('active');
    }
}

function closeStartMenu() {
    var startMenu = document.getElementById('start-menu');
    var startButton = document.querySelector('.start-button');
    startMenu.classList.remove('active');
    startButton.classList.remove('active');
}

// Close start menu when clicking outside
document.addEventListener('click', function(e) {
    var startMenu = document.getElementById('start-menu');
    var startButton = document.querySelector('.start-button');
    
    if (startMenu && startMenu.classList.contains('active')) {
        if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
            closeStartMenu();
        }
    }
});

// ==================== NAVIGATION ====================
function showSection(id, e) {
    var sections = document.querySelectorAll('.section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.add('hidden');
    }
    document.getElementById(id).classList.remove('hidden');
    
    var tabs = document.querySelectorAll('.nav-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    if (e && e.target) {
        var tab = e.target.closest('.nav-tab');
        if (tab) tab.classList.add('active');
    }
    
    var currentLang = document.querySelector('.lang-switch button.active');
    var lang = currentLang ? (currentLang.textContent === 'PT' ? 'pt' : 'en') : 'pt';
    
    var urls = { 
        about: lang === 'pt' ? 'http://ludd.portfolio/sobre' : 'http://ludd.portfolio/about',
        projects: lang === 'pt' ? 'http://ludd.portfolio/projetos' : 'http://ludd.portfolio/projects',
        contact: lang === 'pt' ? 'http://ludd.portfolio/contato' : 'http://ludd.portfolio/contact'
    };
    document.getElementById('address').value = urls[id] || '';
}

// ==================== LANGUAGE SWITCH ====================
function setLang(lang, e) {
    var langElements = document.querySelectorAll('.lang');
    for (var i = 0; i < langElements.length; i++) {
        langElements[i].classList.add('hidden');
    }
    
    var targetLang = document.querySelectorAll('.lang.' + lang);
    for (var i = 0; i < targetLang.length; i++) {
        targetLang[i].classList.remove('hidden');
    }
    
    var buttons = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    if (e && e.target) {
        e.target.classList.add('active');
    }
    
    // Update address bar
    var currentSection = document.querySelector('.section:not(.hidden)');
    if (currentSection) {
        var sectionId = currentSection.id;
        var urls = { 
            about: lang === 'pt' ? 'http://ludd.portfolio/sobre' : 'http://ludd.portfolio/about',
            projects: lang === 'pt' ? 'http://ludd.portfolio/projetos' : 'http://ludd.portfolio/projects',
            contact: lang === 'pt' ? 'http://ludd.portfolio/contato' : 'http://ludd.portfolio/contact'
        };
        document.getElementById('address').value = urls[sectionId] || '';
    }
}

// ==================== WINDOW MANAGEMENT ====================
function openWindow() {
    var win = document.querySelector('.window');
    win.style.display = 'block';
    win.classList.add('active');
    document.querySelector('.taskbar-item').classList.add('active');
}

function closeWindow() {
    var win = document.querySelector('.window');
    win.style.display = 'none';
    win.classList.remove('active');
    document.querySelector('.taskbar-item').classList.remove('active');
}

function minimizeWindow() {
    var win = document.querySelector('.window');
    win.style.display = 'none';
}

function toggleWindow() {
    var win = document.querySelector('.window');
    if (win.style.display === 'none') {
        win.style.display = 'block';
        document.querySelector('.taskbar-item').classList.add('active');
    }
}

function maximizeWindow() {
    var win = document.querySelector('.window');
    if (win.dataset.maximized === 'true') {
        win.style.top = win.dataset.prevTop || '50px';
        win.style.left = win.dataset.prevLeft || '100px';
        win.style.width = win.dataset.prevWidth || '850px';
        win.style.maxWidth = 'calc(100vw - 120px)';
        win.style.maxHeight = 'calc(100vh - 100px)';
        win.dataset.maximized = 'false';
    } else {
        win.dataset.prevTop = win.style.top || '50px';
        win.dataset.prevLeft = win.style.left || '100px';
        win.dataset.prevWidth = win.style.width || '850px';
        win.style.top = '0';
        win.style.left = '0';
        win.style.width = '100vw';
        win.style.maxWidth = '100vw';
        win.style.maxHeight = 'calc(100vh - 30px)';
        win.dataset.maximized = 'true';
    }
}

// ==================== DRAGGABLE WINDOW ====================
function initDraggableWindow() {
    var titleBar = document.querySelector('.title-bar');
    var win = document.querySelector('.window');
    
    var isDragging = false;
    var startX, startY, startLeft, startTop;
    
    titleBar.addEventListener('mousedown', function(e) {
        if (e.target.closest('.window-controls')) return;
        if (win.dataset.maximized === 'true') return;
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = win.offsetLeft;
        startTop = win.offsetTop;
        
        document.body.style.userSelect = 'none';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        var deltaX = e.clientX - startX;
        var deltaY = e.clientY - startY;
        
        var newLeft = startLeft + deltaX;
        var newTop = startTop + deltaY;
        
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 100));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - 100));
        
        win.style.left = newLeft + 'px';
        win.style.top = newTop + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        document.body.style.userSelect = '';
    });
    
    // Touch support
    titleBar.addEventListener('touchstart', function(e) {
        if (e.target.closest('.window-controls')) return;
        if (win.dataset.maximized === 'true') return;
        
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startLeft = win.offsetLeft;
        startTop = win.offsetTop;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        var deltaX = e.touches[0].clientX - startX;
        var deltaY = e.touches[0].clientY - startY;
        
        var newLeft = startLeft + deltaX;
        var newTop = startTop + deltaY;
        
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 100));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - 100));
        
        win.style.left = newLeft + 'px';
        win.style.top = newTop + 'px';
    }, { passive: true });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
}

// ==================== REAL-TIME CLOCK ====================
function updateClock() {
    var now = new Date();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var timeStr = hours + ':' + minutes;
    
    var clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = timeStr;
    }
}

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

// ==================== WINDOW BUTTONS ====================
function initWindowButtons() {
    document.querySelector('.btn-close').addEventListener('click', closeWindow);
    document.querySelector('.btn-minimize').addEventListener('click', minimizeWindow);
    document.querySelector('.btn-maximize').addEventListener('click', maximizeWindow);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', function() {
    initBootScreen();
    initDraggableWindow();
    initClock();
    initWindowButtons();
});

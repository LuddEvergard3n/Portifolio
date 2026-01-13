/**
 * WINDOW MODULE
 * 
 * Gerencia janelas: abrir, fechar, minimizar, maximizar, arrastar, redimensionar
 */

const WindowManager = {
  windows: {},
  
  /**
   * Registra uma janela para gerenciamento
   * @param {string} id - ID da janela
   */
  register(id) {
    const windowElement = document.querySelector(`[data-window-id="${id}"]`);
    if (!windowElement) {
      console.warn(`Janela ${id} não encontrada`);
      return;
    }
    
    this.windows[id] = {
      element: windowElement,
      isMaximized: false,
      isMinimized: false,
      prevState: {
        top: windowElement.style.top || '50px',
        left: windowElement.style.left || '100px',
        width: windowElement.style.width || '850px',
        height: windowElement.style.height || 'auto'
      }
    };
    
    this.initDrag(id);
    this.initResize(id);
    this.initButtons(id);
  },
  
  /**
   * Abre uma janela
   * @param {string} id - ID da janela
   */
  open(id) {
    const win = this.windows[id];
    if (!win) return;
    
    win.element.style.display = 'flex';
    win.element.classList.add('active');
    win.isMinimized = false;
    
    // Atualizar taskbar
    const taskbarItem = document.querySelector(`[data-window-id="${id}"].taskbar-item`);
    if (taskbarItem) {
      taskbarItem.classList.add('active');
    }
  },
  
  /**
   * Fecha uma janela
   * @param {string} id - ID da janela
   */
  close(id) {
    const win = this.windows[id];
    if (!win) return;
    
    win.element.style.display = 'none';
    win.element.classList.remove('active');
    
    // Atualizar taskbar
    const taskbarItem = document.querySelector(`[data-window-id="${id}"].taskbar-item`);
    if (taskbarItem) {
      taskbarItem.classList.remove('active');
    }
  },
  
  /**
   * Minimiza uma janela
   * @param {string} id - ID da janela
   */
  minimize(id) {
    const win = this.windows[id];
    if (!win) return;
    
    win.element.style.display = 'none';
    win.isMinimized = true;
    
    // Manter taskbar item ativo mas não destacado
    const taskbarItem = document.querySelector(`[data-window-id="${id}"].taskbar-item`);
    if (taskbarItem) {
      taskbarItem.classList.remove('active');
    }
  },
  
  /**
   * Alterna entre maximizado e normal
   * @param {string} id - ID da janela
   */
  toggleMaximize(id) {
    const win = this.windows[id];
    if (!win) return;
    
    if (win.isMaximized) {
      this.restore(id);
    } else {
      this.maximize(id);
    }
  },
  
  /**
   * Maximiza uma janela
   * @param {string} id - ID da janela
   */
  maximize(id) {
    const win = this.windows[id];
    if (!win) return;
    
    // Salvar estado atual
    win.prevState = {
      top: win.element.style.top,
      left: win.element.style.left,
      width: win.element.style.width,
      height: win.element.style.height
    };
    
    // Maximizar
    win.element.style.top = '0';
    win.element.style.left = '0';
    win.element.style.width = '100vw';
    win.element.style.height = `calc(100vh - ${getComputedStyle(document.documentElement).getPropertyValue('--taskbar-height')})`;
    
    win.isMaximized = true;
  },
  
  /**
   * Restaura uma janela para o estado normal
   * @param {string} id - ID da janela
   */
  restore(id) {
    const win = this.windows[id];
    if (!win) return;
    
    win.element.style.top = win.prevState.top;
    win.element.style.left = win.prevState.left;
    win.element.style.width = win.prevState.width;
    win.element.style.height = win.prevState.height;
    
    win.isMaximized = false;
  },
  
  /**
   * Alterna visibilidade (para clique na taskbar)
   * @param {string} id - ID da janela
   */
  toggle(id) {
    const win = this.windows[id];
    if (!win) return;
    
    const isVisible = win.element.style.display !== 'none';
    
    if (isVisible && !win.isMinimized) {
      this.minimize(id);
    } else {
      this.open(id);
    }
  },
  
  /**
   * Inicializa funcionalidade de arrastar
   * @param {string} id - ID da janela
   */
  initDrag(id) {
    const win = this.windows[id];
    if (!win) return;
    
    const titleBar = win.element.querySelector('.title-bar');
    if (!titleBar) return;
    
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    const onMouseDown = (e) => {
      // Não arrastar se clicar nos controles
      if (e.target.closest('.window-controls')) return;
      if (win.isMaximized) return;
      
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = win.element.offsetLeft;
      startTop = win.element.offsetTop;
      
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'move';
    };
    
    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newLeft = startLeft + deltaX;
      let newTop = startTop + deltaY;
      
      // Limites da tela
      const maxLeft = window.innerWidth - 100;
      const maxTop = window.innerHeight - 100;
      
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));
      
      win.element.style.left = `${newLeft}px`;
      win.element.style.top = `${newTop}px`;
    };
    
    const onMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
    
    titleBar.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    
    // Touch support
    titleBar.addEventListener('touchstart', (e) => {
      if (e.target.closest('.window-controls')) return;
      if (win.isMaximized) return;
      
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startLeft = win.element.offsetLeft;
      startTop = win.element.offsetTop;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;
      
      let newLeft = startLeft + deltaX;
      let newTop = startTop + deltaY;
      
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 100));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - 100));
      
      win.element.style.left = `${newLeft}px`;
      win.element.style.top = `${newTop}px`;
    }, { passive: true });
    
    document.addEventListener('touchend', onMouseUp);
  },
  
  /**
   * Inicializa funcionalidade de redimensionamento
   * @param {string} id - ID da janela
   */
  initResize(id) {
    const win = this.windows[id];
    if (!win) return;
    
    // Criar handles de redimensionamento
    const handles = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'];
    
    handles.forEach(position => {
      const handle = document.createElement('div');
      handle.className = `window-resize-handle ${position}`;
      win.element.appendChild(handle);
      
      let isResizing = false;
      let startX, startY, startWidth, startHeight, startLeft, startTop;
      
      const onMouseDown = (e) => {
        if (win.isMaximized) return;
        
        e.preventDefault();
        isResizing = true;
        
        startX = e.clientX;
        startY = e.clientY;
        startWidth = win.element.offsetWidth;
        startHeight = win.element.offsetHeight;
        startLeft = win.element.offsetLeft;
        startTop = win.element.offsetTop;
        
        document.body.style.userSelect = 'none';
        document.body.style.cursor = getComputedStyle(handle).cursor;
      };
      
      const onMouseMove = (e) => {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;
        
        // Calcular novas dimensões baseado no handle
        if (position.includes('e')) {
          newWidth = startWidth + deltaX;
        }
        if (position.includes('w')) {
          newWidth = startWidth - deltaX;
          newLeft = startLeft + deltaX;
        }
        if (position.includes('s')) {
          newHeight = startHeight + deltaY;
        }
        if (position.includes('n')) {
          newHeight = startHeight - deltaY;
          newTop = startTop + deltaY;
        }
        
        // Aplicar dimensões mínimas
        const minWidth = 600;
        const minHeight = 400;
        
        if (newWidth >= minWidth) {
          win.element.style.width = `${newWidth}px`;
          if (position.includes('w')) {
            win.element.style.left = `${newLeft}px`;
          }
        }
        
        if (newHeight >= minHeight) {
          win.element.style.height = `${newHeight}px`;
          if (position.includes('n')) {
            win.element.style.top = `${newTop}px`;
          }
        }
      };
      
      const onMouseUp = () => {
        isResizing = false;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };
      
      handle.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  },
  
  /**
   * Inicializa botões de controle da janela
   * @param {string} id - ID da janela
   */
  initButtons(id) {
    const win = this.windows[id];
    if (!win) return;
    
    const closeBtn = win.element.querySelector('.btn-close');
    const minimizeBtn = win.element.querySelector('.btn-minimize');
    const maximizeBtn = win.element.querySelector('.btn-maximize');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close(id));
    }
    
    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => this.minimize(id));
    }
    
    if (maximizeBtn) {
      maximizeBtn.addEventListener('click', () => this.toggleMaximize(id));
    }
  },
  
  /**
   * Inicializa todas as janelas
   */
  init() {
    // Registrar janela principal
    this.register('main');
    
    // Abrir janela principal
    this.open('main');
  }
};

// Exportar para uso global
window.WindowManager = WindowManager;

// Funções globais para compatibilidade com onclick
function openWindow(id = 'main') {
  WindowManager.open(id);
  if (window.StartMenu) StartMenu.close();
}

function closeWindow(id = 'main') {
  WindowManager.close(id);
}

function minimizeWindow(id = 'main') {
  WindowManager.minimize(id);
}

function maximizeWindow(id = 'main') {
  WindowManager.toggleMaximize(id);
}

function toggleWindow(id = 'main') {
  WindowManager.toggle(id);
}

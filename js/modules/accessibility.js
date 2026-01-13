/**
 * MÓDULO DE ACESSIBILIDADE
 * 
 * Gerencia navegação por teclado e outros recursos de acessibilidade
 */

const Accessibility = {
  /**
   * Inicializa recursos de acessibilidade
   */
  init() {
    this.initKeyboardNavigation();
    this.initFocusManagement();
    this.initAriaLiveRegions();
  },
  
  /**
   * Configura navegação por teclado
   */
  initKeyboardNavigation() {
    // Atalhos globais
    document.addEventListener('keydown', (e) => {
      // ESC fecha janela ativa
      if (e.key === 'Escape') {
        this.handleEscape();
      }
      
      // Alt + F4 fecha janela ativa
      if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        this.handleEscape();
      }
      
      // Enter ativa elemento focado
      if (e.key === 'Enter' && e.target.classList.contains('desktop-icon')) {
        e.preventDefault();
        e.target.click();
      }
      
      // Setas navegam pelos ícones do desktop
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        this.handleArrowNavigation(e);
      }
    });
    
    // Adicionar listeners de teclado aos ícones
    document.querySelectorAll('.desktop-icon').forEach(icon => {
      icon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          icon.click();
        }
      });
    });
  },
  
  /**
   * Lida com tecla ESC para fechar janelas
   */
  handleEscape() {
    const activeWindow = document.querySelector('.window.active');
    if (activeWindow) {
      const windowId = activeWindow.dataset.windowId;
      if (windowId && window.WindowManager) {
        window.WindowManager.close(windowId);
      }
    }
    
    // Fechar Clippy se estiver aberto
    const clippy = document.getElementById('clippy');
    if (clippy && clippy.style.display !== 'none') {
      if (window.Clippy) {
        window.Clippy.toggle();
      }
    }
    
    // Fechar Minesweeper se estiver aberto
    const minesweeper = document.getElementById('minesweeper');
    if (minesweeper && minesweeper.style.display !== 'none') {
      if (window.Minesweeper) {
        window.Minesweeper.toggle();
      }
    }
  },
  
  /**
   * Navegação por setas entre ícones do desktop
   * @param {KeyboardEvent} e - Evento de teclado
   */
  handleArrowNavigation(e) {
    const focusedElement = document.activeElement;
    if (!focusedElement.classList.contains('desktop-icon')) return;
    
    const icons = Array.from(document.querySelectorAll('.desktop-icon'));
    const currentIndex = icons.indexOf(focusedElement);
    
    if (currentIndex === -1) return;
    
    let newIndex;
    
    switch (e.key) {
      case 'ArrowDown':
        newIndex = currentIndex + 1;
        break;
      case 'ArrowUp':
        newIndex = currentIndex - 1;
        break;
      case 'ArrowRight':
        // Desktop icons estão em coluna, então right/left não fazem nada
        // a menos que você queira implementar navegação em grade
        return;
      case 'ArrowLeft':
        return;
    }
    
    if (newIndex >= 0 && newIndex < icons.length) {
      e.preventDefault();
      icons[newIndex].focus();
    }
  },
  
  /**
   * Gerencia foco de elementos
   */
  initFocusManagement() {
    // Quando janela abre, foca no primeiro elemento focável
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains('window') && node.classList.contains('active')) {
            this.focusFirstElement(node);
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  },
  
  /**
   * Foca no primeiro elemento focável de uma janela
   * @param {HTMLElement} windowElement - Elemento da janela
   */
  focusFirstElement(windowElement) {
    const focusableElements = windowElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      // Pequeno delay para garantir que a janela foi renderizada
      setTimeout(() => {
        focusableElements[0].focus();
      }, 100);
    }
  },
  
  /**
   * Configura regiões ARIA live para anúncios de screen reader
   */
  initAriaLiveRegions() {
    // Criar região live para anúncios
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'aria-live-region';
    document.body.appendChild(liveRegion);
  },
  
  /**
   * Anuncia mensagem para screen readers
   * @param {string} message - Mensagem a ser anunciada
   */
  announce(message) {
    const liveRegion = document.getElementById('aria-live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      
      // Limpar após 1 segundo
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }
};

// Exportar para uso global
window.Accessibility = Accessibility;

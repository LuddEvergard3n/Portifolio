/**
 * START MENU MODULE
 * 
 * Gerencia a abertura/fechamento do menu Iniciar
 */

const StartMenu = {
  /**
   * Alterna a visibilidade do menu Iniciar
   */
  toggle() {
    const startMenu = document.getElementById('start-menu');
    const startButton = document.querySelector('.start-button');
    
    if (!startMenu || !startButton) return;
    
    const isActive = startMenu.classList.contains('active');
    
    if (isActive) {
      this.close();
    } else {
      this.open();
    }
  },
  
  /**
   * Abre o menu Iniciar
   */
  open() {
    const startMenu = document.getElementById('start-menu');
    const startButton = document.querySelector('.start-button');
    
    if (!startMenu || !startButton) return;
    
    startMenu.classList.add('active');
    startButton.classList.add('active');
  },
  
  /**
   * Fecha o menu Iniciar
   */
  close() {
    const startMenu = document.getElementById('start-menu');
    const startButton = document.querySelector('.start-button');
    
    if (!startMenu || !startButton) return;
    
    startMenu.classList.remove('active');
    startButton.classList.remove('active');
  },
  
  /**
   * Verifica se o menu está aberto
   */
  isOpen() {
    const startMenu = document.getElementById('start-menu');
    return startMenu && startMenu.classList.contains('active');
  },
  
  /**
   * Inicializa o módulo do menu Iniciar
   */
  init() {
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (e) => {
      const startMenu = document.getElementById('start-menu');
      const startButton = document.querySelector('.start-button');
      
      if (!startMenu || !startButton) return;
      
      if (this.isOpen()) {
        // Se clicou fora do menu e do botão, fechar
        if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
          this.close();
        }
      }
    });
  }
};

// Exportar para uso global
window.StartMenu = StartMenu;

// Função global para compatibilidade com onclick
function toggleStartMenu() {
  StartMenu.toggle();
}

/**
 * CLOCK MODULE
 * 
 * Gerencia o relógio em tempo real na taskbar
 */

const Clock = {
  intervalId: null,
  
  /**
   * Atualiza o display do relógio
   */
  update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    const clockElement = document.getElementById('clock');
    if (clockElement) {
      clockElement.textContent = timeStr;
    }
  },
  
  /**
   * Inicializa o relógio
   */
  init() {
    this.update();
    this.intervalId = setInterval(() => this.update(), 1000);
  },
  
  /**
   * Para o relógio (útil para cleanup)
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};

// Exportar para uso global
window.Clock = Clock;

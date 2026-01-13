/**
 * BOOT SCREEN MODULE
 * 
 * Gerencia a animação de inicialização do Windows XP
 */

const BootScreen = {
  /**
   * Inicializa a tela de boot
   */
  init() {
    const bootScreen = document.getElementById('boot-screen');
    if (!bootScreen) return;
    
    // Tentar tocar som de boot imediatamente
    this.playStartupSound();
    
    // Fallback: tocar ao primeiro clique se falhar
    const tryPlayOnClick = () => {
      this.playStartupSound();
      document.removeEventListener('click', tryPlayOnClick);
    };
    
    // Adicionar listener para primeiro clique
    setTimeout(() => {
      document.addEventListener('click', tryPlayOnClick, { once: true });
    }, 100);
    
    // Fade out após 2.5 segundos
    setTimeout(() => {
      bootScreen.classList.add('fade-out');
    }, 2500);
    
    // Remover do DOM após 3 segundos
    setTimeout(() => {
      bootScreen.classList.add('hidden');
    }, 3000);
  },
  
  /**
   * Toca o som de inicialização do Windows XP
   */
  playStartupSound() {
    try {
      const audio = new Audio('img/windows-xp-startup.mp3');
      audio.volume = 0.5; // 50% do volume
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('🔊 Som de boot tocando!');
          })
          .catch(err => {
            console.log('⚠️ Som bloqueado. Clique em qualquer lugar para ouvir.');
            // Mostrar dica visual
            this.showAudioHint();
          });
      }
    } catch (error) {
      console.error('Erro ao carregar som:', error);
    }
  },
  
  /**
   * Mostra dica visual de que o som está bloqueado
   */
  showAudioHint() {
    const hint = document.createElement('div');
    hint.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #003399;
      color: white;
      padding: 12px 20px;
      border-radius: 5px;
      font-family: 'Tahoma', sans-serif;
      font-size: 12px;
      z-index: 10000;
      box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
      cursor: pointer;
      animation: fadeIn 0.3s;
    `;
    hint.innerHTML = '🔊 Clique para ouvir o som de boot';
    hint.onclick = () => {
      this.playStartupSound();
      hint.remove();
    };
    
    document.body.appendChild(hint);
    
    // Remover após 5 segundos
    setTimeout(() => {
      if (hint.parentNode) {
        hint.style.animation = 'fadeOut 0.3s';
        setTimeout(() => hint.remove(), 300);
      }
    }, 5000);
  }
};

// Exportar para uso global
window.BootScreen = BootScreen;

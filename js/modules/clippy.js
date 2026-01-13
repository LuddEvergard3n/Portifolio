/**
 * CLIPPY MODULE (Easter Egg)
 * 
 * Adiciona o famoso assistente Clippy com frases aleatórias
 * Ativação: Ctrl + Shift + C (três vezes seguidas em 2 segundos)
 */

const Clippy = {
  isActive: false,
  container: null,
  balloon: null,
  activationCount: 0,
  activationTimer: null,
  currentMessageIndex: 0,
  
  messages: {
    pt: [
      "Olá! Parece que você está explorando um portfólio. Posso ajudar?",
      "Sabia que este site foi feito com HTML, CSS e JavaScript vanilla?",
      "Dica: Você pode jogar Campo Minado clicando no ícone do desktop!",
      "Nostálgico, não é? Sinto falta dos anos 2000...",
      "Você pode arrastar e redimensionar esta janela!",
      "Psiu... Existem easter eggs escondidos no desktop!",
      "Eu costumava ser irritante, mas agora sou apenas nostálgico.",
      "Clique nos projetos para ver trabalhos incríveis!",
      "Tente trocar o idioma usando os botões PT/EN!",
      "Parece que você está procurando ajuda. Deseja ver o código-fonte?"
    ],
    en: [
      "Hello! It looks like you're exploring a portfolio. Can I help?",
      "Did you know this site was made with vanilla HTML, CSS and JavaScript?",
      "Tip: You can play Minesweeper by clicking the desktop icon!",
      "Nostalgic, isn't it? I miss the 2000s...",
      "You can drag and resize this window!",
      "Psst... There are easter eggs hidden on the desktop!",
      "I used to be annoying, but now I'm just nostalgic.",
      "Click on projects to see amazing work!",
      "Try switching languages using the PT/EN buttons!",
      "Looks like you're looking for help. Want to see the source code?"
    ]
  },
  
  /**
   * Cria a estrutura HTML do Clippy
   */
  createHTML() {
    // Container principal
    this.container = document.createElement('div');
    this.container.className = 'clippy-container';
    this.container.id = 'clippy';
    
    // Personagem
    const character = document.createElement('img');
    character.src = 'img/Clippy.webp';
    character.alt = 'Clippy';
    character.className = 'clippy-character';
    character.addEventListener('click', () => this.showMessage());
    
    // Balão de fala
    this.balloon = document.createElement('div');
    this.balloon.className = 'clippy-balloon';
    
    const balloonText = document.createElement('p');
    balloonText.id = 'clippy-message';
    
    const balloonActions = document.createElement('div');
    balloonActions.className = 'clippy-balloon-actions';
    
    const nextBtn = document.createElement('button');
    const lang = Language.getCurrent();
    nextBtn.textContent = lang === 'pt' ? 'Próxima' : 'Next';
    nextBtn.addEventListener('click', () => this.showMessage());
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'OK';
    closeBtn.addEventListener('click', () => this.hideBalloon());
    
    balloonActions.appendChild(nextBtn);
    balloonActions.appendChild(closeBtn);
    
    this.balloon.appendChild(balloonText);
    this.balloon.appendChild(balloonActions);
    
    // Botão de fechar Clippy
    const closeClippy = document.createElement('div');
    closeClippy.className = 'clippy-close';
    closeClippy.textContent = '×';
    closeClippy.addEventListener('click', () => this.hide());
    
    this.container.appendChild(this.balloon);
    this.container.appendChild(character);
    this.container.appendChild(closeClippy);
    
    document.body.appendChild(this.container);
  },
  
  /**
   * Mostra o Clippy
   */
  show() {
    if (this.isActive) return;
    
    if (!this.container) {
      this.createHTML();
    }
    
    this.container.classList.add('active');
    this.isActive = true;
    
    // Mostrar primeira mensagem após um delay
    setTimeout(() => {
      this.showMessage();
    }, 500);
  },
  
  /**
   * Esconde o Clippy
   */
  hide() {
    if (!this.isActive) return;
    
    this.container.classList.remove('active');
    this.isActive = false;
    this.hideBalloon();
  },
  
  /**
   * Mostra uma mensagem no balão
   */
  showMessage() {
    const lang = Language.getCurrent();
    const messages = this.messages[lang];
    
    const message = messages[this.currentMessageIndex % messages.length];
    
    const messageElement = document.getElementById('clippy-message');
    if (messageElement) {
      messageElement.textContent = message;
    }
    
    this.balloon.classList.add('active');
    this.currentMessageIndex++;
  },
  
  /**
   * Esconde o balão
   */
  hideBalloon() {
    this.balloon.classList.remove('active');
  },
  
  /**
   * Alterna visibilidade do Clippy
   */
  toggle() {
    if (this.isActive) {
      this.hide();
    } else {
      this.show();
    }
  },
  
  /**
   * Detecta sequência de ativação (Ctrl + Shift + C três vezes)
   */
  detectActivation(e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') {
      this.activationCount++;
      
      if (this.activationTimer) {
        clearTimeout(this.activationTimer);
      }
      
      this.activationTimer = setTimeout(() => {
        this.activationCount = 0;
      }, 2000);
      
      if (this.activationCount >= 3) {
        this.toggle();
        this.activationCount = 0;
      }
    }
  },
  
  /**
   * Inicializa o módulo Clippy
   */
  init() {
    // Detectar sequência de ativação
    document.addEventListener('keydown', (e) => this.detectActivation(e));
  }
};

// Exportar para uso global
window.Clippy = Clippy;

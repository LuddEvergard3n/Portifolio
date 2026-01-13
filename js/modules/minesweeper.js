/**
 * MINESWEEPER MODULE (Easter Egg)
 * 
 * Jogo Campo Minado funcional
 * Ativação: Ctrl + Shift + M (três vezes seguidas em 2 segundos)
 */

const Minesweeper = {
  isActive: false,
  container: null,
  grid: [],
  rows: 9,
  cols: 9,
  mines: 10,
  revealed: 0,
  flags: 0,
  gameOver: false,
  activationCount: 0,
  activationTimer: null,
  
  /**
   * Cria a estrutura HTML do jogo
   */
  createHTML() {
    this.container = document.createElement('div');
    this.container.className = 'minesweeper-container';
    this.container.id = 'minesweeper';
    
    const window = document.createElement('div');
    window.className = 'minesweeper-window';
    
    // Barra de título
    const titleBar = document.createElement('div');
    titleBar.className = 'minesweeper-title-bar';
    
    const title = document.createElement('div');
    title.className = 'minesweeper-title';
    const lang = Language.getCurrent();
    title.textContent = lang === 'pt' ? 'Campo Minado' : 'Minesweeper';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'minesweeper-close-btn';
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => this.hide());
    
    titleBar.appendChild(title);
    titleBar.appendChild(closeBtn);
    
    // Conteúdo
    const content = document.createElement('div');
    content.className = 'minesweeper-content';
    
    // Cabeçalho (contador de minas e face)
    const header = document.createElement('div');
    header.className = 'minesweeper-header';
    
    const mineCounter = document.createElement('div');
    mineCounter.className = 'minesweeper-counter';
    mineCounter.id = 'mine-counter';
    mineCounter.textContent = String(this.mines).padStart(3, '0');
    
    const face = document.createElement('div');
    face.className = 'minesweeper-face';
    face.id = 'minesweeper-face';
    face.textContent = '🙂';
    face.addEventListener('click', () => this.reset());
    
    const timer = document.createElement('div');
    timer.className = 'minesweeper-counter';
    timer.id = 'minesweeper-timer';
    timer.textContent = '000';
    
    header.appendChild(mineCounter);
    header.appendChild(face);
    header.appendChild(timer);
    
    // Grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'minesweeper-grid';
    gridContainer.id = 'minesweeper-grid';
    gridContainer.style.gridTemplateColumns = `repeat(${this.cols}, 24px)`;
    
    content.appendChild(header);
    content.appendChild(gridContainer);
    
    window.appendChild(titleBar);
    window.appendChild(content);
    
    this.container.appendChild(window);
    
    // Tornar janela arrastável
    this.makeDraggable(titleBar, window);
    
    document.body.appendChild(this.container);
  },
  
  /**
   * Torna a janela arrastável
   */
  makeDraggable(handle, element) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    handle.addEventListener('mousedown', (e) => {
      if (e.target === handle || e.target.closest('.minesweeper-title')) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = element.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        document.body.style.userSelect = 'none';
      }
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      element.style.position = 'fixed';
      element.style.left = `${startLeft + deltaX}px`;
      element.style.top = `${startTop + deltaY}px`;
      element.style.transform = 'none';
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.style.userSelect = '';
    });
  },
  
  /**
   * Inicializa o grid do jogo
   */
  initGrid() {
    this.grid = [];
    this.revealed = 0;
    this.flags = 0;
    this.gameOver = false;
    
    // Criar grid vazio
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0
        };
      }
    }
    
    // Colocar minas aleatoriamente
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      
      if (!this.grid[row][col].isMine) {
        this.grid[row][col].isMine = true;
        minesPlaced++;
      }
    }
    
    // Calcular número de minas vizinhas
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (!this.grid[i][j].isMine) {
          this.grid[i][j].neighborMines = this.countNeighborMines(i, j);
        }
      }
    }
  },
  
  /**
   * Conta minas vizinhas de uma célula
   */
  countNeighborMines(row, col) {
    let count = 0;
    
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        
        const newRow = row + i;
        const newCol = col + j;
        
        if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
          if (this.grid[newRow][newCol].isMine) {
            count++;
          }
        }
      }
    }
    
    return count;
  },
  
  /**
   * Renderiza o grid visualmente
   */
  renderGrid() {
    const gridContainer = document.getElementById('minesweeper-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';
    
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = document.createElement('div');
        cell.className = 'minesweeper-cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        
        const cellData = this.grid[i][j];
        
        if (cellData.isRevealed) {
          cell.classList.add('revealed');
          if (cellData.isMine) {
            cell.textContent = '💣';
            cell.classList.add('mine');
          } else if (cellData.neighborMines > 0) {
            cell.textContent = cellData.neighborMines;
            cell.dataset.count = cellData.neighborMines;
          }
        } else if (cellData.isFlagged) {
          cell.classList.add('flagged');
          cell.textContent = '🚩';
        }
        
        cell.addEventListener('click', () => this.revealCell(i, j));
        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          this.toggleFlag(i, j);
        });
        
        gridContainer.appendChild(cell);
      }
    }
    
    // Atualizar contador
    const counter = document.getElementById('mine-counter');
    if (counter) {
      counter.textContent = String(this.mines - this.flags).padStart(3, '0');
    }
  },
  
  /**
   * Revela uma célula
   */
  revealCell(row, col) {
    if (this.gameOver) return;
    
    const cell = this.grid[row][col];
    
    if (cell.isRevealed || cell.isFlagged) return;
    
    cell.isRevealed = true;
    this.revealed++;
    
    if (cell.isMine) {
      this.gameOver = true;
      this.revealAllMines();
      this.setFace('😵');
      return;
    }
    
    // Se não tem minas vizinhas, revelar vizinhos recursivamente
    if (cell.neighborMines === 0) {
      this.revealNeighbors(row, col);
    }
    
    this.renderGrid();
    
    // Verificar vitória
    if (this.revealed === (this.rows * this.cols - this.mines)) {
      this.gameOver = true;
      this.setFace('😎');
    }
  },
  
  /**
   * Revela células vizinhas recursivamente
   */
  revealNeighbors(row, col) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        
        const newRow = row + i;
        const newCol = col + j;
        
        if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
          const neighbor = this.grid[newRow][newCol];
          
          if (!neighbor.isRevealed && !neighbor.isFlagged) {
            neighbor.isRevealed = true;
            this.revealed++;
            
            if (neighbor.neighborMines === 0) {
              this.revealNeighbors(newRow, newCol);
            }
          }
        }
      }
    }
  },
  
  /**
   * Alterna bandeira em uma célula
   */
  toggleFlag(row, col) {
    if (this.gameOver) return;
    
    const cell = this.grid[row][col];
    
    if (cell.isRevealed) return;
    
    cell.isFlagged = !cell.isFlagged;
    this.flags += cell.isFlagged ? 1 : -1;
    
    this.renderGrid();
  },
  
  /**
   * Revela todas as minas (fim de jogo)
   */
  revealAllMines() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j].isMine) {
          this.grid[i][j].isRevealed = true;
        }
      }
    }
    this.renderGrid();
  },
  
  /**
   * Define a expressão do rosto
   */
  setFace(emoji) {
    const face = document.getElementById('minesweeper-face');
    if (face) {
      face.textContent = emoji;
    }
  },
  
  /**
   * Reseta o jogo
   */
  reset() {
    this.initGrid();
    this.renderGrid();
    this.setFace('🙂');
  },
  
  /**
   * Mostra o jogo
   */
  show() {
    if (this.isActive) return;
    
    if (!this.container) {
      this.createHTML();
    }
    
    this.container.classList.add('active');
    this.isActive = true;
    this.reset();
  },
  
  /**
   * Esconde o jogo
   */
  hide() {
    if (!this.isActive) return;
    
    this.container.classList.remove('active');
    this.isActive = false;
  },
  
  /**
   * Alterna visibilidade
   */
  toggle() {
    if (this.isActive) {
      this.hide();
    } else {
      this.show();
    }
  },
  
  /**
   * Detecta sequência de ativação (Ctrl + Shift + M três vezes)
   */
  detectActivation(e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'm') {
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
   * Inicializa o módulo
   */
  init() {
    document.addEventListener('keydown', (e) => this.detectActivation(e));
  }
};

// Exportar para uso global
window.Minesweeper = Minesweeper;

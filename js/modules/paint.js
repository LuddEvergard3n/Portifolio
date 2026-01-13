/**
 * PAINT MODULE
 * 
 * Paint nostálgico do Windows XP - versão simplificada
 */

const Paint = {
  canvas: null,
  ctx: null,
  isDrawing: false,
  currentTool: 'pencil',
  currentColor: '#000000',
  currentSize: 2,
  lastX: 0,
  lastY: 0,
  history: [],
  historyStep: -1,
  
  // Paleta de cores do Windows XP
  colors: [
    '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
    '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000', '#FFFFFF', '#C0C0C0',
    '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80',
    '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
  ],
  
  /**
   * Inicializa o Paint
   */
  init() {
    this.canvas = document.getElementById('paint-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.setupEventListeners();
    this.saveState();
    
    console.log('🎨 Paint inicializado');
  },
  
  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Desenho no canvas
    this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.stopDrawing());
    this.canvas.addEventListener('mouseout', () => this.stopDrawing());
    
    // Ferramentas
    document.querySelectorAll('.paint-tool').forEach(tool => {
      tool.addEventListener('click', (e) => {
        const toolType = e.currentTarget.dataset.tool;
        this.selectTool(toolType);
      });
    });
    
    // Cores
    document.querySelectorAll('.paint-color').forEach(colorBtn => {
      colorBtn.addEventListener('click', (e) => {
        this.currentColor = e.currentTarget.dataset.color;
        document.getElementById('paint-color-primary').style.backgroundColor = this.currentColor;
      });
      
      // Clique direito para cor secundária
      colorBtn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const secondaryColor = e.currentTarget.dataset.color;
        document.getElementById('paint-color-secondary').style.backgroundColor = secondaryColor;
      });
    });
    
    // Tamanho do pincel
    const sizeInput = document.getElementById('paint-size');
    if (sizeInput) {
      sizeInput.addEventListener('input', (e) => {
        this.currentSize = parseInt(e.target.value);
      });
    }
    
    // Botões da toolbar
    document.getElementById('paint-clear')?.addEventListener('click', () => this.clear());
    document.getElementById('paint-save')?.addEventListener('click', () => this.save());
    
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('paint-window').classList.contains('active')) return;
      
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        this.undo();
      }
    });
  },
  
  /**
   * Seleciona uma ferramenta
   */
  selectTool(tool) {
    this.currentTool = tool;
    
    // Atualizar UI
    document.querySelectorAll('.paint-tool').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tool="${tool}"]`)?.classList.add('active');
    
    // Atualizar cursor
    this.canvas.className = 'paint-canvas cursor-' + tool;
  },
  
  /**
   * Inicia o desenho
   */
  startDrawing(e) {
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
    
    // Para ferramentas que precisam só de um clique
    if (this.currentTool === 'fill') {
      this.floodFill(Math.floor(this.lastX), Math.floor(this.lastY));
      this.isDrawing = false;
      this.saveState();
      return;
    }
    
    // Iniciar desenho para lápis/pincel
    if (this.currentTool === 'pencil' || this.currentTool === 'brush') {
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY);
    }
  },
  
  /**
   * Desenha no canvas
   */
  draw(e) {
    if (!this.isDrawing) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.ctx.strokeStyle = this.currentColor;
    this.ctx.fillStyle = this.currentColor;
    this.ctx.lineWidth = this.currentSize;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    
    switch (this.currentTool) {
      case 'pencil':
      case 'brush':
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        break;
        
      case 'eraser':
        const eraserSize = this.currentSize * 2;
        this.ctx.clearRect(
          x - eraserSize / 2,
          y - eraserSize / 2,
          eraserSize,
          eraserSize
        );
        break;
    }
    
    this.lastX = x;
    this.lastY = y;
  },
  
  /**
   * Para o desenho
   */
  stopDrawing() {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.saveState();
    }
  },
  
  /**
   * Balde de tinta (flood fill) - versão simplificada
   */
  floodFill(x, y) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const targetColor = this.getPixelColor(imageData, x, y);
    const fillColor = this.hexToRgb(this.currentColor);
    
    // Se a cor é a mesma, não faz nada
    if (this.colorsMatch(targetColor, fillColor)) return;
    
    const stack = [[Math.floor(x), Math.floor(y)]];
    const visited = new Set();
    
    while (stack.length > 0) {
      const [px, py] = stack.pop();
      const key = `${px},${py}`;
      
      if (visited.has(key)) continue;
      if (px < 0 || px >= this.canvas.width || py < 0 || py >= this.canvas.height) continue;
      
      const currentColor = this.getPixelColor(imageData, px, py);
      if (!this.colorsMatch(currentColor, targetColor)) continue;
      
      visited.add(key);
      this.setPixelColor(imageData, px, py, fillColor);
      
      // Adicionar pixels adjacentes (limitar para evitar estouro)
      if (visited.size < 10000) {
        stack.push([px + 1, py]);
        stack.push([px - 1, py]);
        stack.push([px, py + 1]);
        stack.push([px, py - 1]);
      }
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  },
  
  /**
   * Pega a cor de um pixel
   */
  getPixelColor(imageData, x, y) {
    const index = (Math.floor(y) * imageData.width + Math.floor(x)) * 4;
    return {
      r: imageData.data[index],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
      a: imageData.data[index + 3]
    };
  },
  
  /**
   * Define a cor de um pixel
   */
  setPixelColor(imageData, x, y, color) {
    const index = (Math.floor(y) * imageData.width + Math.floor(x)) * 4;
    imageData.data[index] = color.r;
    imageData.data[index + 1] = color.g;
    imageData.data[index + 2] = color.b;
    imageData.data[index + 3] = 255;
  },
  
  /**
   * Verifica se duas cores são iguais
   */
  colorsMatch(c1, c2) {
    return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b;
  },
  
  /**
   * Converte hex para RGB
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  },
  
  /**
   * Salva estado para undo
   */
  saveState() {
    this.historyStep++;
    if (this.historyStep < this.history.length) {
      this.history.length = this.historyStep;
    }
    this.history.push(this.canvas.toDataURL());
    
    // Limitar histórico a 20 estados
    if (this.history.length > 20) {
      this.history.shift();
      this.historyStep--;
    }
  },
  
  /**
   * Desfazer
   */
  undo() {
    if (this.historyStep > 0) {
      this.historyStep--;
      const img = new Image();
      img.src = this.history[this.historyStep];
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0);
      };
    }
  },
  
  /**
   * Limpar canvas
   */
  clear() {
    // Criar popup estilo XP
    const popup = this.createXPPopup(
      'Limpar todo o desenho?',
      'Paint',
      ['OK', 'Cancelar']
    );
    
    popup.onConfirm = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.saveState();
    };
  },
  
  /**
   * Cria popup estilo Windows XP
   */
  createXPPopup(message, title, buttons) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const popup = document.createElement('div');
    popup.style.cssText = `
      width: 320px;
      background: #ECE9D8;
      border: 3px solid;
      border-color: #0054E3 #0054E3 #0054E3 #0054E3;
      box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
      font-family: Tahoma, sans-serif;
    `;
    
    // Title bar
    const titleBar = document.createElement('div');
    titleBar.style.cssText = `
      background: linear-gradient(180deg, #0058ee 0%, #3a93ff 8%, #288eff 40%, #0058ee 88%, #002c9b 93%, #003bcd 95%, #1070ff 100%);
      padding: 3px 5px;
      color: white;
      font-weight: bold;
      font-size: 11px;
      display: flex;
      align-items: center;
      gap: 5px;
    `;
    titleBar.innerHTML = `<img src="img/Paint.png" style="width: 16px; height: 16px;"> ${title}`;
    
    // Content
    const content = document.createElement('div');
    content.style.cssText = `
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 15px;
    `;
    
    // Icon
    const icon = document.createElement('div');
    icon.style.cssText = `
      font-size: 32px;
      flex-shrink: 0;
    `;
    icon.textContent = '❓';
    
    // Message
    const msg = document.createElement('div');
    msg.style.cssText = `
      font-size: 11px;
      color: #000;
    `;
    msg.textContent = message;
    
    content.appendChild(icon);
    content.appendChild(msg);
    
    // Buttons
    const btnContainer = document.createElement('div');
    btnContainer.style.cssText = `
      padding: 10px 20px 20px;
      display: flex;
      justify-content: center;
      gap: 10px;
    `;
    
    const result = { onConfirm: null };
    
    buttons.forEach((btnText, index) => {
      const btn = document.createElement('button');
      btn.textContent = btnText;
      btn.style.cssText = `
        width: 75px;
        height: 23px;
        background: linear-gradient(180deg, #fff 0%, #ddd 100%);
        border: 1px solid #003c74;
        font-family: Tahoma, sans-serif;
        font-size: 11px;
        cursor: pointer;
        box-shadow: 1px 1px 0px rgba(255,255,255,0.8) inset;
      `;
      
      btn.addEventListener('mouseover', () => {
        btn.style.background = 'linear-gradient(180deg, #e8f4fc 0%, #c4e0f9 100%)';
      });
      
      btn.addEventListener('mouseout', () => {
        btn.style.background = 'linear-gradient(180deg, #fff 0%, #ddd 100%)';
      });
      
      btn.addEventListener('click', () => {
        if (index === 0 && result.onConfirm) {
          result.onConfirm();
        }
        document.body.removeChild(overlay);
      });
      
      btnContainer.appendChild(btn);
    });
    
    popup.appendChild(titleBar);
    popup.appendChild(content);
    popup.appendChild(btnContainer);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    return result;
  },
  
  /**
   * Salvar como PNG
   */
  save() {
    const link = document.createElement('a');
    link.download = 'paint-' + Date.now() + '.png';
    link.href = this.canvas.toDataURL();
    link.click();
  }
};

// Exportar para uso global
window.Paint = Paint;

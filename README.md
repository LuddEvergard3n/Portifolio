#  Windows XP Portfolio

Portfólio pessoal com tema nostálgico do Windows XP, desenvolvido com HTML, CSS e JavaScript vanilla. Inclui funcionalidades interativas, suporte a múltiplos idiomas (PT/EN) e easter eggs.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

##  Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Arquitetura](#-arquitetura)
- [Configuração](#-configuração)
- [Easter Eggs](#-easter-eggs)
- [Desempenho](#-desempenho)
- [Responsividade](#-responsividade)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

##  Características

### Funcionalidades Principais
- **Tela de Boot**: Animação autêntica do Windows XP na inicialização
- **Janelas Arrastáveis**: Arraste janelas pela barra de título
- **Redimensionamento**: Redimensione janelas pelos cantos e bordas
- **Maximizar/Minimizar**: Controles totalmente funcionais
- **Menu Iniciar**: Menu com design fiel ao Windows XP
- **Barra de Tarefas**: Com relógio em tempo real
- **Múltiplos Idiomas**: Suporte para Português e Inglês
- **Separação de Projetos**: Organizado em "Sites" e "Projetos"

### Easter Eggs
- **Clippy**: Assistente nostálgico do Office
- **Campo Minado**: Jogo completamente funcional

### Otimizações
- CSS modularizado com variáveis
- JavaScript modular e reutilizável
- Animações suaves com transições CSS
- Sem dependências externas
- Configuração centralizada para fácil manutenção

## 🛠 Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Variáveis CSS, Flexbox, Grid, Animações
- **JavaScript (ES6+)**: Módulos, Classes, Arrow Functions
- **Sem Frameworks**: Vanilla JS puro

##  Estrutura do Projeto

```
portfolio/
│
├── index.html              # HTML principal
│
├── css/                    # Estilos modulares
│   ├── variables.css      # Variáveis CSS (cores, tamanhos, etc)
│   ├── boot.css           # Tela de inicialização
│   ├── desktop.css        # Desktop, ícones, taskbar, menu
│   ├── window.css         # Janelas e controles
│   ├── content.css        # Conteúdo (projetos, skills, contato)
│   └── eastereggs.css     # Clippy e Minesweeper
│
├── js/                     # JavaScript modular
│   ├── config.js          # Configurações (projetos, dados pessoais)
│   ├── main.js            # Inicializador principal
│   │
│   └── modules/           # Módulos organizados
│       ├── boot.js        # Gerencia tela de boot
│       ├── clock.js       # Relógio da taskbar
│       ├── language.js    # Troca de idiomas
│       ├── startMenu.js   # Menu Iniciar
│       ├── navigation.js  # Navegação entre seções
│       ├── window.js      # Gerenciamento de janelas
│       ├── clippy.js      # Easter egg: Clippy
│       └── minesweeper.js # Easter egg: Campo Minado
│
└── img/                    # Imagens
    ├── bliss.jpg          # Wallpaper Windows XP
    ├── windows-logo.png   # Logo Windows
    ├── ie-icon.png        # Ícone IE
    ├── folder.png         # Ícone pasta
    ├── my-computer.png    # Ícone computador
    ├── recycle-bin.png    # Ícone lixeira
    └── Clippy.webp        # Clippy animado
```

##  Instalação

### Opção 1: Clone do Repositório

```bash
git clone https://github.com/LuddEvergard3n/portfolio-xp.git
cd portfolio-xp
```

### Opção 2: Download Direto

Baixe o arquivo ZIP do repositório e extraia.

### Executar Localmente

Não é necessário servidor web para desenvolvimento, mas é recomendado:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server -p 8000

# Com PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

##  Uso

### Navegação Básica

1. Aguarde a tela de boot (3 segundos)
2. Use o menu Iniciar ou clique nos ícones do desktop
3. Arraste janelas pela barra de título
4. Redimensione pelas bordas e cantos
5. Troque idiomas com os botões PT/EN

### Adicionar Novos Projetos

Edite o arquivo `js/config.js`:

```javascript
sites: {
  pt: [
    {
      name: 'Novo Site',
      description: 'Descrição do site',
      url: 'https://exemplo.com',
      tags: ['HTML', 'CSS', 'JS']
    }
    // ... adicione mais sites
  ],
  en: [
    // ... versão em inglês
  ]
}
```

### Personalizar Skills

Também em `js/config.js`:

```javascript
about: {
  pt: {
    skills: [
      {
        category: 'Nova Categoria',
        items: [
          'Skill 1 - Descrição',
          'Skill 2 - Descrição'
        ]
      }
    ]
  }
}
```

##  Arquitetura

### Padrão de Design

O projeto segue uma arquitetura modular com separação de responsabilidades:

```
Camada de Apresentação (HTML/CSS)
    ↓
Camada de Lógica (JavaScript Modules)
    ↓
Camada de Dados (config.js)
```

### Módulos JavaScript

Cada módulo é independente e exporta suas funcionalidades:

```javascript
const ModuleName = {
  // Estado privado
  property: value,
  
  // Métodos públicos
  init() { /* ... */ },
  method() { /* ... */ }
};

window.ModuleName = ModuleName;
```

### Fluxo de Inicialização

1. `DOMContentLoaded` event
2. `main.js` carrega configuração
3. Módulos são inicializados em ordem:
   - BootScreen → Clock → Language → StartMenu → Navigation → WindowManager → Easter Eggs
4. Conteúdo dinâmico é renderizado
5. Event listeners são registrados

### Gerenciamento de Estado

Estado é mantido em cada módulo sem framework:

```javascript
const WindowManager = {
  windows: {},  // Estado das janelas
  
  register(id) {
    this.windows[id] = {
      element: el,
      isMaximized: false,
      prevState: {}
    };
  }
};
```

##  Configuração

### Variáveis CSS

Todas as cores e tamanhos estão centralizados em `css/variables.css`:

```css
:root {
  --xp-blue-primary: #0058ee;
  --taskbar-height: 30px;
  --transition-normal: 0.3s ease;
  /* ... */
}
```

### Personalização Rápida

**Mudar cores do tema:**
```css
/* css/variables.css */
--xp-blue-primary: #ff0000;  /* Azul → Vermelho */
```

**Ajustar tamanho da janela:**
```css
--window-min-width: 800px;
--window-min-height: 500px;
```

**Modificar animações:**
```css
--transition-normal: 0.5s ease;  /* Mais lento */
```

##  Easter Eggs

### Clippy

- Assistente animado com frases nostálgicas
- Mensagens contextuais em PT/EN
- Clique no Clippy para trocar mensagens
- Fechar com botão X no canto

### Campo Minado

- Jogo completamente funcional
- Grade 9×9 com 10 minas
- Clique esquerdo para revelar
- Clique direito para colocar bandeira
- Clique no rosto para reiniciar

## ⚡ Desempenho

### Otimizações Implementadas

- **CSS**: Uso de `transform` e `opacity` para animações (GPU-accelerated)
- **JavaScript**: Event delegation onde possível
- **Imagens**: WebP para Clippy, PNG otimizado para ícones
- **Sem reflow**: Mudanças de estilo em batch
- **Lazy rendering**: Conteúdo renderizado sob demanda

### Métricas

- **First Contentful Paint**: ~0.5s
- **Time to Interactive**: ~1.0s
- **Total Bundle Size**: ~150KB (sem compressão)

##  Responsividade

### Breakpoints

```css
/* Tablet */
@media (max-width: 900px) {
  .window { width: calc(100vw - 20px); }
}

/* Mobile */
@media (max-width: 600px) {
  .window { 
    top: 10px;
    bottom: 40px;
    left: 5px;
    right: 5px;
  }
}
```

### Adaptações Mobile

- Taskbar responsiva (oculta textos)
- Menu Iniciar em largura total
- Touch events para drag/resize
- Grid de projetos adaptativo

##  Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

### Convenções de Código

- **CSS**: BEM methodology para classes
- **JavaScript**: camelCase para variáveis, PascalCase para módulos
- **Commits**: Conventional Commits (feat:, fix:, docs:, etc)

##  Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

##  Roadmap

### v2.1.0 (Próxima)
- [ ] Múltiplas janelas simultâneas
- [ ] Histórico de navegação funcional
- [ ] Animações de minimizar para taskbar
- [ ] Tema modo escuro (High Contrast)

### v3.0.0 (Futuro)
- [ ] PWA com offline support
- [ ] Mais jogos (Solitaire, Pinball)
- [ ] Sistema de arquivos simulado
- [ ] Paint clone interativo

---

##  Contato

**Ludd**
- Email: hbrslud@gmail.com
- GitHub: [@LuddEvergard3n](https://github.com/LuddEvergard3n)
- LinkedIn: [herbertbr-sorg-ludka](https://www.linkedin.com/in/herbertbr-sorg-ludka/)

---

<div align="center">
  <p>Feito com nostalgia dos anos 2000</p>
  <p>Windows XP © Microsoft Corporation</p>
</div>

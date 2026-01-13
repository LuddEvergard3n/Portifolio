/**
 * MÓDULO DE INTERNACIONALIZAÇÃO (i18n)
 * 
 * Sistema centralizado de traduções para evitar duplicação de conteúdo.
 * Todas as strings traduzíveis são definidas aqui uma única vez.
 */

const i18n = {
  currentLanguage: 'pt',
  
  // Definição de todas as traduções
  translations: {
    pt: {
      // Sobre
      'about.title': 'Sobre Mim',
      'about.description': 'Desenvolvedor com experiência em desenvolvimento web, softwares e engenharia de prompts para LLM\'s.',
      
      // Categorias de skills
      'skills.programming': 'Linguagens de Programação',
      'skills.web': 'Desenvolvimento Web',
      'skills.ai': 'Inteligência Artificial',
      
      // Skills individuais
      'skill.c': 'C - Programação de sistemas, manipulação de memória e estruturas de dados de baixo nível',
      'skill.cobol': 'COBOL - Sistemas legados, processamento de dados financeiros',
      'skill.java': 'Java - Desenvolvimento orientado a objetos, aplicações enterprise',
      'skill.javascript': 'JavaScript - Desenvolvimento web full-stack, Node.js, manipulação DOM',
      'skill.python': 'Python - Scripts de automação, análise de dados, integração com LLMs',
      'skill.html5': 'HTML5 - Estruturação semântica, acessibilidade',
      'skill.css3': 'CSS3 - Layouts responsivos, animações, design systems',
      'skill.wasm': 'WebAssembly (WASM) - Otimização de performance, portar código C/C++ para web',
      'skill.prompt': 'Engenharia de Prompts para LLMs - Claude, GPT, modelos open-source',
      'skill.llm-integration': 'Integração de LLMs em aplicações web',
      'skill.llm-optimization': 'Otimização de contexto e fine-tuning de respostas',
      
      // Projetos
      'project.computabilis': 'Computabilis',
      'project.computabilis.desc': 'Sistema de gestão financeira pessoal fácil.',
      'project.studium': 'Studium',
      'project.studium.desc': 'Ferramenta de auxílio na concentração para estudar.',
      'project.atlas': 'ATLAS',
      'project.atlas.desc': 'Dashboard e laboratório técnico para gestão de investimentos e patrimônio.',
      'project.fastlog': 'Fastlog Analyzer',
      'project.fastlog.desc': 'Ferramenta de análise de logs em tempo real com processamento eficiente.',
      'project.ares': 'ARES',
      'project.ares.desc': 'Sistema básico de gestão de dados financeiros.',
      
      // Sites
      'site.law': 'Landing Advocacia Exemplo',
      'site.law.desc': 'Landing page para escritório de advocacia.',
      
      // UI Elements
      'desktop.myComputer': 'Meu Computador',
      'desktop.myDocuments': 'Meus Documentos',
      'desktop.recycleBin': 'Lixeira',
      'desktop.officeHelp': 'Ajuda Office',
      'desktop.minesweeper': 'Campo Minado',
      'desktop.paint': 'Paint',
      'desktop.portfolio': 'Portfólio'
    },
    
    en: {
      // About
      'about.title': 'About Me',
      'about.description': 'Developer with experience in web development, software and prompt engineering for LLM\'s.',
      
      // Skill categories
      'skills.programming': 'Programming Languages',
      'skills.web': 'Web Development',
      'skills.ai': 'Artificial Intelligence',
      
      // Individual skills
      'skill.c': 'C - Systems programming, memory manipulation, and low-level data structures',
      'skill.cobol': 'COBOL - Legacy systems, financial data processing',
      'skill.java': 'Java - Object-oriented development, enterprise applications',
      'skill.javascript': 'JavaScript - Full-stack web development, Node.js, DOM manipulation',
      'skill.python': 'Python - Automation scripts, data analysis, LLM integration',
      'skill.html5': 'HTML5 - Semantic structure, accessibility',
      'skill.css3': 'CSS3 - Responsive layouts, animations, design systems',
      'skill.wasm': 'WebAssembly (WASM) - Performance optimization, porting C/C++ code to web',
      'skill.prompt': 'Prompt Engineering for LLMs - Claude, GPT, open-source models',
      'skill.llm-integration': 'LLM integration in web applications',
      'skill.llm-optimization': 'Context optimization and response fine-tuning',
      
      // Projects
      'project.computabilis': 'Computabilis',
      'project.computabilis.desc': 'Easy personal financial management system.',
      'project.studium': 'Studium',
      'project.studium.desc': 'Tool to help concentration while studying.',
      'project.atlas': 'ATLAS',
      'project.atlas.desc': 'Dashboard and technical laboratory for investment and asset management.',
      'project.fastlog': 'Fastlog Analyzer',
      'project.fastlog.desc': 'Real-time log analysis tool with efficient processing.',
      'project.ares': 'ARES',
      'project.ares.desc': 'Basic financial data management system.',
      
      // Sites
      'site.law': 'Law Firm Landing Example',
      'site.law.desc': 'Landing page for law firm.',
      
      // UI Elements
      'desktop.myComputer': 'My Computer',
      'desktop.myDocuments': 'My Documents',
      'desktop.recycleBin': 'Recycle Bin',
      'desktop.officeHelp': 'Office Help',
      'desktop.minesweeper': 'Minesweeper',
      'desktop.paint': 'Paint',
      'desktop.portfolio': 'Portfolio'
    }
  },
  
  /**
   * Traduz uma chave para o idioma atual
   * @param {string} key - Chave de tradução (ex: 'about.title')
   * @param {string} lang - Idioma (opcional, usa o atual se não especificado)
   * @returns {string} Texto traduzido
   */
  t(key, lang = null) {
    const language = lang || this.currentLanguage;
    return this.translations[language][key] || key;
  },
  
  /**
   * Define o idioma atual
   * @param {string} lang - Código do idioma ('pt' ou 'en')
   */
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
    }
  },
  
  /**
   * Retorna o idioma atual
   * @returns {string} Código do idioma
   */
  getLanguage() {
    return this.currentLanguage;
  },
  
  /**
   * Constrói a estrutura de skills usando traduções
   * @param {string} lang - Idioma
   * @returns {Array} Array de skills estruturadas
   */
  getSkills(lang = null) {
    const language = lang || this.currentLanguage;
    return [
      {
        category: this.t('skills.programming', language),
        items: [
          this.t('skill.c', language),
          this.t('skill.cobol', language),
          this.t('skill.java', language),
          this.t('skill.javascript', language),
          this.t('skill.python', language)
        ]
      },
      {
        category: this.t('skills.web', language),
        items: [
          this.t('skill.html5', language),
          this.t('skill.css3', language),
          this.t('skill.wasm', language)
        ]
      },
      {
        category: this.t('skills.ai', language),
        items: [
          this.t('skill.prompt', language),
          this.t('skill.llm-integration', language),
          this.t('skill.llm-optimization', language)
        ]
      }
    ];
  },
  
  /**
   * Retorna dados sobre a página "Sobre Mim"
   * @param {string} lang - Idioma
   * @returns {Object} Objeto com título, descrição e skills
   */
  getAboutData(lang = null) {
    const language = lang || this.currentLanguage;
    return {
      title: this.t('about.title', language),
      description: this.t('about.description', language),
      skills: this.getSkills(language)
    };
  },
  
  /**
   * Retorna lista de projetos
   * @param {string} lang - Idioma
   * @returns {Array} Array de projetos
   */
  getProjects(lang = null) {
    const language = lang || this.currentLanguage;
    return [
      {
        name: this.t('project.computabilis', language),
        description: this.t('project.computabilis.desc', language),
        url: 'https://luddevergard3n.github.io/Computabilis/',
        tags: ['HTML', 'CSS', 'JavaScript']
      },
      {
        name: this.t('project.studium', language),
        description: this.t('project.studium.desc', language),
        url: 'https://luddevergard3n.github.io/Studium/',
        tags: ['JavaScript', 'CSS', 'HTML']
      },
      {
        name: this.t('project.atlas', language),
        description: this.t('project.atlas.desc', language),
        url: 'https://luddevergard3n.github.io/atlas-lite/',
        tags: ['JavaScript', 'CSS', 'C', 'HTML']
      },
      {
        name: this.t('project.fastlog', language),
        description: this.t('project.fastlog.desc', language),
        url: 'https://github.com/LuddEvergard3n/fastlog-analyzer',
        tags: ['Python', 'Java', 'C']
      },
      {
        name: this.t('project.ares', language),
        description: this.t('project.ares.desc', language),
        url: 'https://github.com/LuddEvergard3n/Ares',
        tags: ['Java', 'C', 'COBOL']
      }
    ];
  },
  
  /**
   * Retorna lista de sites
   * @param {string} lang - Idioma
   * @returns {Array} Array de sites
   */
  getSites(lang = null) {
    const language = lang || this.currentLanguage;
    return [
      {
        name: this.t('site.law', language),
        description: this.t('site.law.desc', language),
        url: 'https://luddevergard3n.github.io/Landing-Advocacia/',
        tags: ['HTML', 'CSS', 'JavaScript']
      }
    ];
  }
};

// Exportar para uso global
window.i18n = i18n;

/**
 * CONFIGURAÇÃO DO PORTFÓLIO
 * 
 * Este arquivo centraliza todos os dados editáveis do portfólio.
 * Para adicionar novos projetos ou sites, basta editar os arrays abaixo.
 */

const CONFIG = {
  // ==================== DADOS PESSOAIS ====================
  personal: {
    name: 'Ludd',
    email: 'hbrslud@gmail.com',
    phone: '+55 (47) 9 9963-3905',
    github: 'https://github.com/LuddEvergard3n',
    linkedin: 'https://www.linkedin.com/in/herbertbr-sorg-ludka/'
  },

  // ==================== SOBRE MIM ====================
  about: {
    pt: {
      title: 'Sobre Mim',
      description: 'Desenvolvedor com experiência em desenvolvimento web, C e Java, com projetos open source e com foco em otimização e desempenho.',
      
      skills: [
        {
          category: 'Linguagens de Programação',
          items: [
            'C - Programação de sistemas, manipulação de memória e estruturas de dados de baixo nível',
            'Java - Desenvolvimento orientado a objetos, aplicações enterprise',
            'JavaScript - Desenvolvimento web full-stack, Node.js, manipulação DOM',
            'Python - Scripts de automação, análise de dados, integração com LLMs'
          ]
        },
        {
          category: 'Desenvolvimento Web',
          items: [
            'HTML5 - Estruturação semântica, acessibilidade',
            'CSS3 - Layouts responsivos, animações, design systems',
            'WebAssembly (WASM) - Otimização de performance, portar código C/C++ para web'
          ]
        },
        {
          category: 'Inteligência Artificial',
          items: [
            'Engenharia de Prompts para LLMs - Claude, GPT, modelos open-source',
            'Integração de LLMs em aplicações web',
            'Otimização de contexto e fine-tuning de respostas'
          ]
        }
      ]
    },
    en: {
      title: 'About Me',
      description: 'Developer with experience in web development, C and Java, with open source projects and focus on optimization and performance.',
      
      skills: [
        {
          category: 'Programming Languages',
          items: [
            'C - Systems programming, memory manipulation, and low-level data structures',
            'Java - Object-oriented development, enterprise applications',
            'JavaScript - Full-stack web development, Node.js, DOM manipulation',
            'Python - Automation scripts, data analysis, LLM integration'
          ]
        },
        {
          category: 'Web Development',
          items: [
            'HTML5 - Semantic structure, accessibility',
            'CSS3 - Responsive layouts, animations, design systems',
            'WebAssembly (WASM) - Performance optimization, porting C/C++ code to web'
          ]
        },
        {
          category: 'Artificial Intelligence',
          items: [
            'Prompt Engineering for LLMs - Claude, GPT, open-source models',
            'LLM integration in web applications',
            'Context optimization and response fine-tuning'
          ]
        }
      ]
    }
  },

  // ==================== SITES (Landing Pages) ====================
  sites: {
    pt: [
      {
        name: 'Landing Advocacia Exemplo',
        description: 'Landing page para escritório de advocacia.',
        url: 'https://luddevergard3n.github.io/Landing-Advocacia/',
        tags: ['HTML', 'CSS', 'JavaScript']
      }
    ],
    en: [
      {
        name: 'Law Firm Landing Example',
        description: 'Landing page for law firm.',
        url: 'https://luddevergard3n.github.io/Landing-Advocacia/',
        tags: ['HTML', 'CSS', 'JavaScript']
      }
    ]
  },

  // ==================== PROJETOS ====================
  projects: {
    pt: [
      {
        name: 'Computabilis',
        description: 'Sistema de gestão financeira pessoal fácil.',
        url: 'https://luddevergard3n.github.io/Computabilis/',
        tags: ['HTML', 'CSS', 'JavaScript']
      },
      {
        name: 'Studium',
        description: 'Ferramenta de auxílio na concentração para estudar.',
        url: 'https://luddevergard3n.github.io/Studium/',
        tags: ['JavaScript', 'CSS', 'HTML']
      },
      {
        name: 'ATLAS',
        description: 'Dashboard e laboratório técnico para gestão de investimentos e patrimônio.',
        url: 'https://luddevergard3n.github.io/atlas-lite/',
        tags: ['JavaScript', 'CSS', 'C', 'HTML']
      },
      {
        name: 'Fastlog Analyzer',
        description: 'Ferramenta de análise de logs em tempo real com processamento eficiente.',
        url: 'https://github.com/LuddEvergard3n/fastlog-analyzer',
        tags: ['Python', 'Java', 'C']
      },
      {
        name: 'ARES',
        description: 'Sistema básico de gestão de dados financeiros.',
        url: 'https://github.com/LuddEvergard3n/Ares',
        tags: ['Java', 'C', 'COBOL']
      }
    ],
    en: [
      {
        name: 'Computabilis',
        description: 'Easy personal financial management system.',
        url: 'https://luddevergard3n.github.io/Computabilis/',
        tags: ['HTML', 'CSS', 'JavaScript']
      },
      {
        name: 'Studium',
        description: 'Tool to help concentration while studying.',
        url: 'https://luddevergard3n.github.io/Studium/',
        tags: ['JavaScript', 'CSS', 'HTML']
      },
      {
        name: 'ATLAS',
        description: 'Dashboard and technical laboratory for investment and asset management.',
        url: 'https://luddevergard3n.github.io/atlas-lite/',
        tags: ['JavaScript', 'CSS', 'C', 'HTML']
      },
      {
        name: 'Fastlog Analyzer',
        description: 'Real-time log analysis tool with efficient processing.',
        url: 'https://github.com/LuddEvergard3n/fastlog-analyzer',
        tags: ['Python', 'Java', 'C']
      },
      {
        name: 'ARES',
        description: 'Basic financial data management system.',
        url: 'https://github.com/LuddEvergard3n/Ares',
        tags: ['Java', 'C', 'COBOL']
      }
    ]
  }
};

// Exportar para uso global (compatibilidade sem módulos ES6)
window.PORTFOLIO_CONFIG = CONFIG;

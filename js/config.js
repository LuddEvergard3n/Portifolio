/**
 * CONFIGURAÇÃO DO PORTFÓLIO
 * 
 * Este arquivo centraliza dados pessoais e URLs dos projetos.
 * As traduções agora são gerenciadas pelo módulo i18n.js
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
  // Agora usa i18n.getAboutData(lang)
  about: {
    get pt() {
      return window.i18n ? window.i18n.getAboutData('pt') : this._fallback;
    },
    get en() {
      return window.i18n ? window.i18n.getAboutData('en') : this._fallback;
    },
    _fallback: {
      title: 'About',
      description: '',
      skills: []
    }
  },

  // ==================== SITES (Landing Pages) ====================
  // Agora usa i18n.getSites(lang)
  sites: {
    get pt() {
      return window.i18n ? window.i18n.getSites('pt') : [];
    },
    get en() {
      return window.i18n ? window.i18n.getSites('en') : [];
    }
  },

  // ==================== PROJETOS ====================
  // Agora usa i18n.getProjects(lang)
  projects: {
    get pt() {
      return window.i18n ? window.i18n.getProjects('pt') : [];
    },
    get en() {
      return window.i18n ? window.i18n.getProjects('en') : [];
    }
  }
};

// Exportar para uso global (compatibilidade sem módulos ES6)
window.PORTFOLIO_CONFIG = CONFIG;


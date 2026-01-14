/**
 * LANGUAGE MODULE
 * 
 * Gerencia a troca de idiomas (PT/EN)
 */

const Language = {
  currentLang: 'pt',
  
  /**
   * Obtém o idioma atual
   */
  getCurrent() {
    return this.currentLang;
  },
  
  /**
   * Define o idioma e atualiza a interface
   * @param {string} lang - Código do idioma ('pt' ou 'en')
   * @param {Event} event - Evento do clique (opcional)
   */
  set(lang, event) {
    if (lang !== 'pt' && lang !== 'en') {
      console.warn(`Idioma inválido: ${lang}`);
      return;
    }
    
    this.currentLang = lang;
    
    // Atualizar i18n
    if (window.i18n) {
      window.i18n.setLanguage(lang);
    }
    
    // Ocultar todos os elementos de idioma
    document.querySelectorAll('.lang').forEach(el => {
      el.classList.add('hidden');
    });
    
    // Mostrar elementos do idioma selecionado
    document.querySelectorAll(`.lang.${lang}`).forEach(el => {
      el.classList.remove('hidden');
    });
    
    // Atualizar botões
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.remove('active');
    });
    
    if (event && event.target) {
      event.target.classList.add('active');
    } else {
      // Se não houver evento, atualizar manualmente
      const btn = document.querySelector(`.lang-switch button[onclick*="${lang}"]`);
      if (btn) btn.classList.add('active');
    }
    
    // Resetar paginação e re-renderizar
    if (window.Pagination) {
      Pagination.reset();
      
      // Re-renderizar a aba ativa
      const activeTab = document.querySelector('.project-tab-content.active');
      if (activeTab) {
        if (activeTab.id.includes('sites')) {
          Pagination.renderSites('sites-list-' + lang);
        } else if (activeTab.id.includes('projects')) {
          Pagination.renderProjects('projects-list-' + lang);
        }
      }
    }
    
    // Atualizar barra de endereço
    this.updateAddressBar();
  },
  
  /**
   * Atualiza a barra de endereço com base na seção e idioma atuais
   */
  updateAddressBar() {
    const currentSection = document.querySelector('.section:not(.hidden)');
    if (!currentSection) return;
    
    const sectionId = currentSection.id;
    const urls = {
      about: {
        pt: 'http://ludd.portfolio/sobre',
        en: 'http://ludd.portfolio/about'
      },
      projects: {
        pt: 'http://ludd.portfolio/projetos',
        en: 'http://ludd.portfolio/projects'
      },
      contact: {
        pt: 'http://ludd.portfolio/contato',
        en: 'http://ludd.portfolio/contact'
      }
    };
    
    const addressInput = document.getElementById('address');
    if (addressInput && urls[sectionId]) {
      addressInput.value = urls[sectionId][this.currentLang] || '';
    }
  },
  
  /**
   * Inicializa o módulo de idiomas
   */
  init() {
    // Definir idioma padrão
    this.set('pt');
  }
};

// Exportar para uso global
window.Language = Language;

// Função global para compatibilidade com onclick
function setLang(lang, event) {
  Language.set(lang, event);
}

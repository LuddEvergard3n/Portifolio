/**
 * NAVIGATION MODULE
 * 
 * Gerencia a navegação entre seções (Sobre, Projetos, Contato)
 * e entre as abas de projetos (Sites, Projetos)
 */

const Navigation = {
  /**
   * Mostra uma seção específica
   * @param {string} sectionId - ID da seção a ser mostrada
   * @param {Event} event - Evento do clique (opcional)
   */
  showSection(sectionId, event) {
    // Ocultar todas as seções
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('hidden');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }
    
    // Atualizar abas de navegação
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    
    if (event && event.target) {
      const tab = event.target.closest('.nav-tab');
      if (tab) tab.classList.add('active');
    }
    
    // Atualizar barra de endereço
    Language.updateAddressBar();
  },
  
  /**
   * Mostra uma aba de projeto (Sites ou Projetos)
   * @param {string} tabId - ID da aba ('sites' ou 'projects')
   * @param {Event} event - Evento do clique (opcional)
   */
  showProjectTab(tabId, event) {
    // Obter idioma atual
    const lang = Language.getCurrent();
    
    // Ocultar todas as abas de conteúdo do idioma atual
    const langContainer = document.querySelector(`#projects .lang.${lang}`);
    if (langContainer) {
      langContainer.querySelectorAll('.project-tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Mostrar aba selecionada
      const targetContent = langContainer.querySelector(`#tab-${tabId}-${lang}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
      
      // Atualizar botões de aba
      langContainer.querySelectorAll('.project-tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      if (event && event.target) {
        event.target.classList.add('active');
      }
    }
  },
  
  /**
   * Renderiza os projetos dinamicamente com base no CONFIG
   */
  renderProjects() {
    const config = window.PORTFOLIO_CONFIG;
    if (!config) {
      console.error('Configuração não encontrada');
      return;
    }
    
    // Renderizar Sites
    this.renderProjectList('sites-list-pt', config.sites.pt);
    this.renderProjectList('sites-list-en', config.sites.en);
    
    // Renderizar Projetos
    this.renderProjectList('projects-list-pt', config.projects.pt);
    this.renderProjectList('projects-list-en', config.projects.en);
  },
  
  /**
   * Renderiza uma lista de projetos
   * @param {string} containerId - ID do container onde renderizar
   * @param {Array} projects - Array de projetos
   */
  renderProjectList(containerId, projects) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!projects || projects.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>Nenhum projeto disponível no momento.</p></div>';
      return;
    }
    
    projects.forEach(project => {
      const projectElement = this.createProjectCard(project);
      container.appendChild(projectElement);
    });
  },
  
  /**
   * Cria um card de projeto
   * @param {Object} project - Dados do projeto
   * @returns {HTMLElement} - Elemento do card
   */
  createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project';
    
    // Título
    const title = document.createElement('h3');
    title.textContent = project.name;
    card.appendChild(title);
    
    // Descrição
    const description = document.createElement('p');
    description.textContent = project.description;
    card.appendChild(description);
    
    // Tags (se existirem)
    if (project.tags && project.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'project-tags';
      
      project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'project-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
      });
      
      card.appendChild(tagsContainer);
    }
    
    // Link
    const link = document.createElement('a');
    link.href = project.url;
    link.className = 'project-link';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    const lang = Language.getCurrent();
    link.textContent = lang === 'pt' ? 'Ver projeto' : 'View project';
    
    card.appendChild(link);
    
    return card;
  },
  
  /**
   * Renderiza as skills dinamicamente com base no CONFIG
   */
  renderSkills() {
    const config = window.PORTFOLIO_CONFIG;
    if (!config) return;
    
    // Renderizar skills em PT
    this.renderSkillsList('skills-container-pt', config.about.pt.skills);
    
    // Renderizar skills em EN
    this.renderSkillsList('skills-container-en', config.about.en.skills);
  },
  
  /**
   * Renderiza lista de skills
   * @param {string} containerId - ID do container
   * @param {Array} skills - Array de categorias de skills
   */
  renderSkillsList(containerId, skills) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    skills.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'skill-category';
      
      const title = document.createElement('h3');
      title.textContent = category.category;
      categoryDiv.appendChild(title);
      
      const list = document.createElement('ul');
      category.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
      
      categoryDiv.appendChild(list);
      container.appendChild(categoryDiv);
    });
  },
  
  /**
   * Inicializa o módulo de navegação
   */
  init() {
    // Renderizar conteúdo dinâmico
    this.renderProjects();
    this.renderSkills();
    
    // Mostrar primeira aba de projetos
    this.showProjectTab('sites');
  }
};

// Exportar para uso global
window.Navigation = Navigation;

// Funções globais para compatibilidade com onclick
function showSection(id, event) {
  Navigation.showSection(id, event);
}

function showProjectTab(id, event) {
  Navigation.showProjectTab(id, event);
}

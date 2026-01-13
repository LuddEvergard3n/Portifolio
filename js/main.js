/**
 * MAIN.JS
 * 
 * Arquivo principal que inicializa todos os módulos do portfólio
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🖥️ Windows XP Portfolio inicializando...');
  
  // Inicializar módulos na ordem correta
  try {
    // 1. Boot Screen (tela de inicialização)
    if (window.BootScreen) {
      BootScreen.init();
      console.log('✅ Boot Screen inicializado');
    }
    
    // 2. Clock (relógio da taskbar)
    if (window.Clock) {
      Clock.init();
      console.log('✅ Clock inicializado');
    }
    
    // 3. Language (gerenciamento de idiomas)
    if (window.Language) {
      Language.init();
      console.log('✅ Language inicializado');
    }
    
    // 4. Start Menu (menu iniciar)
    if (window.StartMenu) {
      StartMenu.init();
      console.log('✅ Start Menu inicializado');
    }
    
    // 5. Navigation (navegação entre seções)
    if (window.Navigation) {
      Navigation.init();
      console.log('✅ Navigation inicializado');
    }
    
    // 6. Window Manager (gerenciamento de janelas)
    if (window.WindowManager) {
      WindowManager.init();
      console.log('✅ Window Manager inicializado');
    }
    
    // 7. Easter Eggs
    if (window.Clippy) {
      Clippy.init();
      console.log('✅ Clippy (Easter Egg) inicializado');
      console.log('💡 Dica: Ctrl + Shift + C (3x) para ativar Clippy');
    }
    
    if (window.Minesweeper) {
      Minesweeper.init();
      console.log('✅ Minesweeper (Easter Egg) inicializado');
      console.log('💡 Dica: Ctrl + Shift + M (3x) para ativar Minesweeper');
    }
    
    console.log('🎉 Windows XP Portfolio carregado com sucesso!');
    console.log('');
    console.log('📋 Comandos disponíveis:');
    console.log('  - Ctrl + Shift + C (3x) = Ativar Clippy');
    console.log('  - Ctrl + Shift + M (3x) = Ativar Minesweeper');
    console.log('');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar:', error);
  }
});

// Prevenir menu de contexto padrão em toda a página (para funcionar o clique direito no Minesweeper)
document.addEventListener('contextmenu', (e) => {
  if (e.target.closest('.minesweeper-cell')) {
    e.preventDefault();
  }
});

// Adicionar informações de debug no console
console.log('%c👋 Bem-vindo ao meu portfólio!', 'font-size: 20px; color: #0058ee; font-weight: bold;');
console.log('%cDesenvolvido com HTML, CSS e JavaScript vanilla', 'font-size: 14px; color: #666;');
console.log('%cGitHub: https://github.com/LuddEvergard3n', 'font-size: 12px; color: #0066cc;');
console.log('');

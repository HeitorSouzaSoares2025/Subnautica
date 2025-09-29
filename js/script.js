// Espera o carregamento completo do DOM para executar o código
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona a seção principal com o conteúdo principal (onde ficam os cards)
  const mainSection = document.getElementById("mainContent");

  // Seleciona todos os cards que possuem o atributo data-target (que indica a seção a abrir)
  const cards = document.querySelectorAll(".card[data-target]");

  // Seleciona todas as seções de tópicos que serão exibidas/ocultadas
  const topicSections = document.querySelectorAll(".topic-section");

  // Seleciona todos os botões de voltar das seções de tópicos
  const backButtons = document.querySelectorAll(".back-button");

  // Função que esconde todas as seções de tópicos, removendo classe active e display:block
  function hideAllTopicSections() {
    topicSections.forEach((section) => {
      section.classList.remove("active");   // Remove classe que indica seção ativa
      section.style.display = "none";       // Oculta a seção via CSS
    });
  }

  // Função para abrir uma seção específica a partir do id
  function openSectionById(id) {
    const targetSection = document.getElementById(id); // Procura a seção pelo id

    if (targetSection) {
      // Oculta a seção principal (cards)
      mainSection.classList.remove("active");
      mainSection.style.display = "none";

      // Esconde todas as outras seções de tópico
      hideAllTopicSections();

      // Exibe a seção desejada e adiciona a classe active
      targetSection.classList.add("active");
      targetSection.style.display = "block";

      // Rola suavemente para o topo da seção aberta
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Adiciona evento de clique para cada card
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const targetId = card.getAttribute("data-target"); // Pega o id da seção alvo

      openSectionById(targetId);                         // Abre a seção correspondente

      // Atualiza o histórico do navegador para refletir o hash da seção atual (URL com #id)
      history.replaceState(null, null, "#" + targetId);
    });
  });

  // Adiciona evento de clique para todos os botões "voltar"
  backButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Esconde todas as seções de tópico
      hideAllTopicSections();

      // Exibe novamente a seção principal com os cards
      mainSection.classList.add("active");
      mainSection.style.display = "block";

      // Atualiza o histórico para remover o hash da URL
      history.replaceState(null, null, " ");

      // Rola suavemente até o topo da seção principal
      mainSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Aguarda um pouco após carregamento para verificar se existe hash na URL
  setTimeout(() => {
    const hash = window.location.hash.substring(1); // Remove o caractere '#' do hash

    // Se existir um hash, abre a seção correspondente automaticamente
    if (hash) {
      openSectionById(hash);
    }
  }, 100); // Pequeno delay para garantir DOM totalmente pronto
});

// Seleciona o overlay usado para transições visuais
const overlay = document.getElementById("transitionOverlay");

// Seleciona todos os links com a classe "menu-button" (links de menu)
document.querySelectorAll("a.menu-button").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault(); // Impede o comportamento padrão de navegação imediata

    const href = this.getAttribute("href"); // Pega o destino do link

    // Ativa a classe 'active' no overlay para exibir a transição visual
    overlay.classList.add("active");

    // Após 800ms (tempo da animação de transição), realiza a navegação para o link desejado
    setTimeout(() => {
      window.location.href = href;
    }, 800);
  });
});

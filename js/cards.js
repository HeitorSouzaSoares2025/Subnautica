document.addEventListener("DOMContentLoaded", () => {
  // Espera o DOM estar totalmente carregado antes de rodar o script

  // Pega elementos importantes da página para manipulação
  const mainSection = document.getElementById("mainContent"); // seção principal
  const cards = document.querySelectorAll(".card[data-target]"); // cards clicáveis que têm data-target
  const topicSections = document.querySelectorAll(".topic-section"); // seções de tópicos escondidas
  const backButtons = document.querySelectorAll(".back-button"); // botões para voltar à seção principal
  const overlay = document.getElementById("transitionOverlay"); // overlay de transição

  // Função para esconder todas as seções de tópico
  function hideAllTopicSections() {
    topicSections.forEach((section) => {
      section.classList.remove("active"); // remove classe que marca como ativa
      section.style.display = "none"; // esconde visualmente
    });
  }

  // Função que abre uma seção específica pelo id, com efeito de transição
  function openSectionById(id) {
    const targetSection = document.getElementById(id); // pega a seção alvo
    if (targetSection) {
      overlay.classList.add("active"); // ativa o overlay de transição (deixa tela escurecida)
      
      setTimeout(() => { // espera 800ms para o efeito da transição
        mainSection.classList.remove("active"); // esconde a seção principal
        mainSection.style.display = "none";
        hideAllTopicSections(); // esconde todas as seções de tópico
        targetSection.classList.add("active"); // mostra a seção alvo
        targetSection.style.display = "block";
        targetSection.scrollIntoView({ behavior: "smooth" }); // rola suavemente até ela
        overlay.classList.remove("active"); // desativa o overlay (tela volta ao normal)
      }, 800);
    }
  }

  // Configura evento de clique para cada card
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const targetId = card.getAttribute("data-target"); // pega o id da seção alvo do card
      openSectionById(targetId); // abre essa seção
      history.replaceState(null, null, "#" + targetId); // muda o hash da URL sem recarregar
    });
  });

  // Evento para os botões de voltar — volta para a seção principal com transição
  backButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      overlay.classList.add("active"); // ativa overlay para transição
      setTimeout(() => {
        hideAllTopicSections(); // esconde tópicos abertos
        mainSection.classList.add("active"); // mostra a seção principal
        mainSection.style.display = "block";
        history.replaceState(null, null, " "); // limpa hash da URL
        mainSection.scrollIntoView({ behavior: "smooth" }); // rola para topo principal
        overlay.classList.remove("active"); // desativa overlay
      }, 800);
    });
  });

  // Se página abrir já com hash na URL, abre a seção correspondente automaticamente
  setTimeout(() => {
    const hash = window.location.hash.substring(1); // pega hash (sem #)
    if (hash) {
      openSectionById(hash);
    }
  }, 100);

  // Controle do áudio ambiente

  const audio = document.getElementById("ambientAudio"); // elemento <audio>
  const audioToggleBtn = document.getElementById("audioToggle"); // botão que liga/desliga o áudio

  audio.volume = 0.5; // volume médio
  audio.loop = true; // áudio fica em loop infinito

  // Tenta tocar o áudio automaticamente, mas pode ser bloqueado pelo navegador
  audio.play().catch(() => {
    console.log("Autoplay bloqueado, aguarde interação do usuário.");
  });

  // Atualiza o ícone do botão de áudio conforme estado do som (mudo ou tocando)
  function updateAudioButton() {
    audioToggleBtn.textContent = audio.paused ? "🔇" : "🔈";
  }

  updateAudioButton(); // inicializa ícone certo

  // Ao clicar no botão, alterna entre tocar e pausar o áudio
  audioToggleBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    updateAudioButton(); // atualiza o ícone conforme estado atual
  });
});

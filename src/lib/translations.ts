
export type Language = 'en' | 'pt' | 'es';

export const translations = {
  en: {
    welcome: {
      tagline: "Technological Art Experience",
      title: "VISART",
      quote: '"An artistic experience where your gaze draws over the image."',
      description: "VISART transforms the viewer’s gaze into visual traces, creating an interactive artwork in real time. A performative installation that bridges the gap between vision and digital canvas.",
      startBtn: "Start Experience",
      conceptTitle: "Concept",
      conceptDesc: "VISART transforms your vision into a creative brush. By simply looking, you generate dynamic traces and expressive marks on digital artworks.",
      interactionTitle: "Interaction",
      interactionDesc: "Quick calibration enables real-time performance. Choose from diverse styles like neon paths, watercolor stains, or particle systems.",
      ethicalTitle: "Ethical Art",
      ethicalDesc: "Designed with privacy as a priority. All gaze processing happens locally in your browser. No webcam data ever leaves your device."
    },
    calibration: {
      title: "Gaze Calibration",
      subtitle: "Maintain your head still and look directly at each pulsing target.",
      progress: "Progress",
      clicks: "CLICKS",
      readyBtn: "I'm Ready",
      howToTitle: "How to Calibrate",
      howToDesc: "Visual art starts with precise vision. To calibrate your gaze, please click on each pulsing target {n} times while looking directly at it.",
      successTitle: "Precision Set",
      successDesc: "Your gaze is now mapped to the digital space. Prepare to express yourself through vision.",
      beginBtn: "Begin Interaction"
    },
    artwork: {
      subTitle: "Technological Art Platform",
      preview: "Preview",
      view: "View",
      controlPanel: "Control Panel",
      trackingStatus: "Tracking Status",
      visualStyle: "Visual Style",
      sampleArtworks: "Sample Artworks",
      selectCamera: "Select Camera",
      thickness: "Thickness",
      opacity: "Opacity",
      actions: "Actions",
      clearCanvas: "Clear Canvas",
      changeImage: "Change Image",
      exportPng: "Export PNG",
      start: "Start",
      pause: "Pause",
      recalibrate: "Recalibrate",
      styles: {
        "red-line": "Red Line",
        "neon": "Neon Glow",
        "dotted": "Dotted Trail",
        "soft-brush": "Watercolor",
        "particles": "Particle Flow",
        "heatmap": "Heat Intensity",
        "ghost": "Ghost Trace",
        "random": "Expressive"
      },
      carousel: {
        title: "Carousel Mode",
        start: "Start Carousel",
        running: "Carousel Running...",
        finish: "Sequence Finished",
        saveAll: "Save All Records",
        runAgain: "Run Again",
        desc: "Images switch automatically every 5 seconds."
      }
    },
    privacy: {
      title: "Experimental Research Disclaimer",
      content: "This project is for experimental research purposes only. VISART uses the webcam locally in the browser to estimate gaze direction. No images or gaze data are stored or sent to servers. Tracking is approximate and the experience is purely artistic, experimental, and part of an ongoing scientific investigation."
    },
    footer: {
      institutions: "Participating institutions",
      collab: "A collaboration between {uepa}, {unifesspa}, and {medialab}.",
      copyright: "VISART © 2026 • Experimental Technological Art Platform",
      uepaName: "UEPA",
      uepaSub: "State University of Pará",
      uepaFull: "Universidade do Estado do Pará (UEPA)",
      unifesspaName: "Unifesspa",
      unifesspaSub: "Federal University of Southern and Southeastern Pará",
      unifesspaFull: "Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA)",
      medialabName: "Media Lab",
      medialabSub: "Iberoamerica",
      medialabFull: "Media Lab/Iberoamerica"
    }
  },
  pt: {
    welcome: {
      tagline: "Experiência de Arte Tecnológica",
      title: "VISART",
      quote: '"Uma experiência artística onde seu olhar desenha sobre a imagem."',
      description: "O VISART transforma o olhar do espectador em traços visuais, criando uma obra de arte interativa em tempo real. Uma instalação performática que une a visão e a tela digital.",
      startBtn: "Começar Experiência",
      conceptTitle: "Conceito",
      conceptDesc: "O VISART transforma sua visão em um pincel criativo. Apenas olhando, você gera traços dinâmicos e marcas expressivas em obras digitais.",
      interactionTitle: "Interação",
      interactionDesc: "Uma calibração rápida permite performance em tempo real. Escolha entre diversos estilos como caminhos neon, manchas de aquarela ou sistemas de partículas.",
      ethicalTitle: "Arte Ética",
      ethicalDesc: "Projetado com a privacidade como prioridade. Todo o processamento do olhar acontece localmente no seu navegador. Dados da webcam nunca saem do seu dispositivo.",
    },
    calibration: {
      title: "Calibração de Olhar",
      subtitle: "Mantenha a cabeça parada e olhe diretamente para cada alvo pulsante.",
      progress: "Progresso",
      clicks: "CLIQUES",
      readyBtn: "Estou Pronto",
      howToTitle: "Como Calibrar",
      howToDesc: "A arte visual começa com uma visão precisa. Para calibrar seu olhar, clique em cada alvo pulsante {n} vezes enquanto olha diretamente para ele.",
      successTitle: "Precisão Definida",
      successDesc: "Seu olhar agora está mapeado para o espaço digital. Prepare-se para se expressar através da visão.",
      beginBtn: "Iniciar Interação"
    },
    artwork: {
      subTitle: "Plataforma de Arte Tecnológica",
      preview: "Prévia",
      view: "Ver",
      controlPanel: "Painel de Controle",
      trackingStatus: "Status de Rastreamento",
      visualStyle: "Estilo Visual",
      sampleArtworks: "Obras de Exemplo",
      selectCamera: "Selecionar Câmera",
      thickness: "Espessura",
      opacity: "Opacidade",
      actions: "Ações",
      clearCanvas: "Limpar Tela",
      changeImage: "Trocar Imagem",
      exportPng: "Exportar PNG",
      start: "Iniciar",
      pause: "Pausar",
      recalibrate: "Recalibrar",
      styles: {
        "red-line": "Linha Vermelha",
        "neon": "Brilho Neon",
        "dotted": "Trilha Pontilhada",
        "soft-brush": "Aquarela",
        "particles": "Fluxo de Partículas",
        "heatmap": "Heat Intensity",
        "ghost": "Traço Fantasma",
        "random": "Expressivo"
      },
      carousel: {
        title: "Modo Carrossel",
        start: "Iniciar Carrossel",
        running: "Carrossel Ativo...",
        finish: "Sequência Finalizada",
        saveAll: "Salvar Todas as Obras",
        runAgain: "Executar Novamente",
        desc: "As imagens mudam automaticamente a cada 5 segundos."
      }
    },
    privacy: {
      title: "Aviso de Pesquisa Experimental",
      content: "Este projeto é apenas para fins de pesquisa experimental. O VISART usa a webcam localmente no navegador para estimar a direção do olhar. Nenhuma imagem da câmera ou dados de olhar são armazenados ou enviados para servidores. O rastreamento é aproximado e a experiência é puramente artística, experimental e parte de uma investigação científica em andamento."
    },
    footer: {
      institutions: "Instituições participantes",
      collab: "Uma colaboração entre a {uepa}, a {unifesspa} e o {medialab}.",
      copyright: "VISART © 2026 • Plataforma de Arte Tecnológica Experimental",
      uepaName: "UEPA",
      uepaSub: "Universidade do Estado do Pará",
      uepaFull: "Universidade do Estado do Pará (UEPA)",
      unifesspaName: "Unifesspa",
      unifesspaSub: "Universidade Federal do Sul e Sudeste do Pará",
      unifesspaFull: "Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA)",
      medialabName: "Media Lab",
      medialabSub: "Iberoamerica",
      medialabFull: "Media Lab/Iberoamerica"
    }
  },
  es: {
    welcome: {
      tagline: "Experiencia de Arte Tecnológico",
      title: "VISART",
      quote: '"Una experiencia artística donde tu mirada dibuja sobre la imagen."',
      description: "VISART transforma la mirada del espectador en trazos visuales, creando una obra de arte interactiva en tiempo real. Una instalación performática que une la visión y el lienzo digital.",
      startBtn: "Comenzar Experiencia",
      conceptTitle: "Concepto",
      conceptDesc: "VISART transforma tu visión en un pincel creativo. Con solo mirar, generas trazos dinámicos y marcas expressivas en obras digitales.",
      interactionTitle: "Interacción",
      interactionDesc: "Una calibración rápida permite un rendimiento en tiempo real. Elige entre diversos estilos como caminos de neón, manchas de acuarela o sistemas de partículas.",
      ethicalTitle: "Arte Ético",
      ethicalDesc: "Diseñado con la privacidad como prioridad. Todo el procesamiento de la mirada ocurre localmente en tu navegador. Los datos de la cámara nunca salen de tu dispositivo.",
    },
    calibration: {
      title: "Calibración de la Mirada",
      subtitle: "Mantén la cabeza quieta y mira directamente a cada objetivo pulsante.",
      progress: "Progreso",
      clicks: "CLICS",
      readyBtn: "Estoy Listo",
      howToTitle: "Cómo Calibrar",
      howToDesc: "El arte visual comienza con una visión precisa. Para calibrar tu mirada, haz clic en cada objetivo pulsante {n} veces mientras lo miras directamente.",
      successTitle: "Precisión Establecida",
      successDesc: "Tu mirada ahora está mapeada al espacio digital. Prepárate para expresarte a través de la visión.",
      beginBtn: "Iniciar Interacción"
    },
    artwork: {
      subTitle: "Plataforma de Arte Tecnológico",
      preview: "Previa",
      view: "Ver",
      controlPanel: "Panel de Control",
      trackingStatus: "Estado de Seguimiento",
      visualStyle: "Estilo Visual",
      sampleArtworks: "Obras de Ejemplo",
      selectCamera: "Seleccionar Cámara",
      thickness: "Grosor",
      opacity: "Opacidad",
      actions: "Acciones",
      clearCanvas: "Limpar Lienzo",
      changeImage: "Cambiar Imagen",
      exportPng: "Exportar PNG",
      start: "Iniciar",
      pause: "Pausar",
      recalibrate: "Recalibrar",
      styles: {
        "red-line": "Línea Roja",
        "neon": "Brillo Neón",
        "dotted": "Rastro Punteado",
        "soft-brush": "Acuarela",
        "particles": "Flujo de Partículas",
        "heatmap": "Intensidad de Calor",
        "ghost": "Trazo Fantasma",
        "random": "Expresivo"
      },
      carousel: {
        title: "Modo Carrusel",
        start: "Iniciar Carrusel",
        running: "Carrusel Ativo...",
        finish: "Secuencia Finalizada",
        saveAll: "Guardar Todas las Obras",
        runAgain: "Ejecutar de Nuevo",
        desc: "Las imágenes cambian automáticamente cada 5 segundos."
      }
    },
    privacy: {
      title: "Aviso de Investigación Experimental",
      content: "Este proyecto tiene únicamente fines de investigación experimental. VISART utiliza la cámara web localmente en el navegador para estimar la dirección de la mirada. No se almacenan ni envían imágenes ni datos de la mirada a servidores. El seguimiento es aproximado y la experiencia es puramente artística, experimental y parte de una investigación científica en curso."
    },
    footer: {
      institutions: "Instituciones participantes",
      collab: "Una colaboración entre {uepa}, {unifesspa} y {medialab}.",
      copyright: "VISART © 2026 • Plataforma de Arte Tecnológica Experimental",
      uepaName: "UEPA",
      uepaSub: "Universidade del Estado de Pará",
      uepaFull: "Universidade do Estado do Pará (UEPA)",
      unifesspaName: "Unifesspa",
      unifesspaSub: "Universidad Federal del Sur y Sudeste de Pará",
      unifesspaFull: "Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA)",
      medialabName: "Media Lab",
      medialabSub: "Iberoamérica",
      medialabFull: "Media Lab/Iberoamérica"
    }
  }
};

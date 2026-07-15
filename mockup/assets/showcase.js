const rawCatalog = JSON.parse(document.getElementById("showcase-catalog")?.textContent || "[]");
const catalog = rawCatalog.map((item) => ({ ...item, ...(window.showcaseContracts?.[item.id] || {}) }));
const sections = document.querySelector("[data-showcase-sections]");
const navigation = document.querySelector("[data-showcase-navigation]");
const themeButton = document.querySelector("[data-showcase-theme]");

const guideComponents = new Set(["layout", "theming", "icons", "charts", "js-foundation"]);
const relatedDocs = {
  carousel: ["button", "accessibility"],
  datatable: ["table", "pagination"],
  combobox: ["select", "accessibility"],
  modal: ["alert-dialog", "accessibility"],
  "file-upload": ["file-drop", "accessibility"],
};

const useGuides = {
  layout: ["dashboard com colunas, landing page e formulário em duas colunas", "Não use grid para alterar a ordem semântica; prefira DOM lógico e CSS responsivo."],
  theming: ["preferência claro/escuro, white-label e área administrativa", "Não use cores literais por componente; use tokens semânticos."],
  icons: ["botão de fechar, ação de editar e indicador de arquivo", "Não use ícone sem rótulo como única instrução para ação ambígua."],
  divider: ["grupos de filtros, ações de toolbar e seções curtas", "Não use como substituto de heading, borda de layout ou separação de seções semânticas."],
  "js-foundation": ["modal com auto-init, tabela interativa e navegação expansível", "Não use JavaScript para tornar conteúdo básico compreensível."],
  button: ["salvar formulário, confirmar exclusão e abrir painel", "Não use para navegação; use link para mudar de página ou âncora."],
  badge: ["status de pedido, contagem de notificações e tipo de plano", "Não use para mensagem longa ou estado crítico comunicado somente por cor."],
  alert: ["erro após envio, aviso de permissão e confirmação persistente", "Não use para feedback transitório; use Toast quando a mensagem não precisa permanecer."],
  tag: ["filtro aplicado, categoria de artigo e pessoa selecionada", "Não use como botão primário ou para texto longo; use Button ou conteúdo comum."],
  "empty-state": ["primeiro acesso, busca sem resultado e lista sem dados", "Não use durante carregamento; use Skeleton ou Spinner enquanto há espera."],
  skeleton: ["card carregando, tabela aguardando dados e perfil em carregamento", "Não use para espera longa sem status; ofereça mensagem de progresso."],
  progress: ["upload de arquivo, importação e processamento com percentual", "Não use barra sem valor conhecido; use Spinner para espera indeterminada."],
  input: ["nome de conta, e-mail de contato e comentário curto", "Não use para opções fechadas; use Select, Radio ou Combobox."],
  select: ["país, prioridade e status com poucas opções", "Não use para lista longa pesquisável; use Combobox."],
  "input-group": ["valor monetário, URL com domínio e busca com botão", "Não agrupe controles sem relação direta com o mesmo valor."],
  "check-radio-switch": ["aceitar termos, escolher plano e ativar notificação", "Não use Switch para ação que exige confirmação; use Button ou Checkbox."],
  range: ["volume, limite de orçamento e intensidade visual", "Não use quando a precisão numérica for essencial; use Input numérico."],
  "segmented-control": ["modo lista/grade, período curto e visualização de dados", "Não use para muitas opções ou navegação com painéis complexos; use Tabs ou Select."],
  rating: ["avaliação de atendimento, satisfação e qualidade de conteúdo", "Não use para métrica precisa ou escala desconhecida sem rótulo textual."],
  datepicker: ["data de entrega, horário de reunião e período permitido", "Não use campo textual livre quando o valor precisa de validação de calendário."],
  combobox: ["buscar cliente, selecionar cidade e atribuir responsável", "Não use para poucas opções estáveis; use Select nativo."],
  "file-upload": ["anexar documentos, enviar imagens e importar planilha", "Não use fluxo avançado para um único arquivo simples; use File drop."],
  "file-drop": ["anexo único em formulário, currículo e imagem de perfil", "Não use quando precisar de fila, progresso ou múltiplos arquivos; use File upload."],
  navbar: ["navegação principal, área autenticada e portal de produto", "Não use para ações locais de uma seção; use Toolbar ou Button group."],
  breadcrumb: ["detalhe dentro de catálogo, hierarquia de documentos e configurações profundas", "Não use em fluxo linear ou página de primeiro nível sem hierarquia."],
  pagination: ["resultados de busca, histórico de pedidos e catálogo longo", "Não use para poucas entradas ou feed contínuo; use lista simples ou carregamento progressivo."],
  accordion: ["FAQ, configurações agrupadas e detalhes de política", "Não use para conteúdo que precisa ser comparado simultaneamente; mostre seções abertas."],
  tabs: ["detalhes de produto, perfis de conta e visões de relatório", "Não use para etapas sequenciais ou muitas abas; use Stepper ou navegação lateral."],
  collapse: ["mostrar critérios, detalhes técnicos e trecho adicional", "Não use para agrupar múltiplos tópicos relacionados; use Accordion."],
  stepper: ["andamento de pedido, onboarding e solicitação em etapas", "Não use como navegação livre entre painéis; use Tabs."],
  "nested-menu": ["menu de configurações, categorias e destinos secundários", "Não use para mais de poucos níveis ou tarefas frequentes; exponha atalhos diretos."],
  "tree-view": ["arquivos, permissões e taxonomia de categorias", "Não use para lista plana ou seleção simples; use List, Select ou Combobox."],
  dropdown: ["ações secundárias de item, menu de perfil e opções de tabela", "Não esconda ação principal ou destrutiva crítica sem contexto."],
  tooltip: ["explicar ícone, abreviação e atalho de teclado", "Não use para instrução essencial ou conteúdo interativo; use texto visível ou Popover."],
  "hover-card": ["prévia de pessoa, cartão de link e contexto de item", "Não use para ação obrigatória ou conteúdo extenso; use Popover ou Modal."],
  popover: ["filtro compacto, ajuda contextual e ações curtas", "Não use para formulário extenso ou tarefa que exige foco total; use Modal."],
  offcanvas: ["filtros de catálogo, navegação móvel e painel de detalhes", "Não use para confirmação crítica; use Modal ou Alert dialog."],
  modal: ["formulário curto, confirmação e detalhe concentrado", "Não use para informação que pode existir na página ou fluxo longo de várias etapas."],
  "alert-dialog": ["confirmar exclusão, descartar edição e ação irreversível", "Não use para notificações informativas ou confirmação trivial."],
  "command-palette": ["atalhos de produto, busca de comandos e navegação avançada", "Não use como única navegação; mantenha menus e ações visíveis."],
  toast: ["item salvo, cópia concluída e atualização breve", "Não use para erro que exige ação, conteúdo longo ou decisão do usuário."],
  "notification-center": ["histórico de alertas, menções e atualizações de conta", "Não use para uma confirmação única; use Toast ou Alert contextual."],
  card: ["produto em grade, resumo de projeto e resultado de busca", "Não use para lista densa repetitiva; use Tile ou Table."],
  tile: ["arquivo recente, preferência e membro de equipe", "Não use para descrição longa ou várias ações; use Card."],
  carousel: ["destaques complementares, histórias de clientes e galeria curta", "Não use para conteúdo essencial, preço ou instrução; use seção estática, Card ou Alert."],
  timeline: ["histórico de pedido, auditoria e progresso de entrega", "Não use para navegação sequencial; use Stepper."],
  charts: ["evolução mensal, comparação de séries e composição de dados", "Não use quando uma tabela simples responde melhor ou valores exatos são essenciais."],
  table: ["comparar planos, pedidos e permissões em linhas e colunas", "Não use para layout ou conteúdo de leitura; use Card, Tile ou Grid."],
  datatable: ["operar usuários, transações e arquivos com busca e ordenação", "Não use para poucos itens ou paginação no servidor ainda não implementada."],
};

const detailedUseProfiles = {
  button: [
    {
      label: "Cenários reais",
      text: "Use botões quando a pessoa precisa executar uma ação na própria tela. Eles funcionam bem em formulários, como “Salvar alterações” ou “Enviar pedido”; em mensagens de confirmação, como “Tentar novamente”; e em áreas de configuração, como “Adicionar membro”. O botão deve deixar claro o que acontecerá depois do clique, sem exigir que a pessoa adivinhe.",
    },
    {
      label: "Objetivo de UX",
      text: "O objetivo do botão é oferecer um ponto de ação visível e previsível. Ele ajuda a pessoa a concluir uma tarefa, dando prioridade ao próximo passo mais importante e diferenciando ações principais de ações secundárias. Uma página pode ter vários botões, mas normalmente apenas um deles deve receber mais destaque visual por seção ou formulário.",
    },
    {
      label: "Limites",
      text: "Não use botão apenas para levar a pessoa a outra página, abrir uma URL ou navegar para uma seção já existente: nesses casos, use um link. Também evite usar vários botões com o mesmo destaque visual no mesmo bloco, pois isso dificulta decidir qual ação tomar. Para escolhas contínuas, como ativar uma preferência, use Switch; para opções de formulário, use Checkbox ou Radio.",
    },
    {
      label: "Exemplos concretos",
      text: "Formulário de perfil: “Salvar alterações” e “Cancelar”. Tela de pagamentos: “Confirmar pagamento”. Lista de projetos: “Criar projeto” e “Ver todos os projetos”.",
    },
  ],
  badge: [
    {
      label: "Cenários reais",
      text: "Use Badge para complementar um item que já está visível na tela com uma informação curta e fácil de consultar. Ele é adequado ao lado do nome de um pedido para mostrar “Em análise”, junto de uma caixa de entrada para informar “3 notificações” e em uma lista de planos para destacar “Mais escolhido”. O badge deve ficar próximo do conteúdo que explica, pois sozinho ele não conta a história completa.",
    },
    {
      label: "Objetivo de UX",
      text: "O objetivo do Badge é ajudar a pessoa a localizar rapidamente uma categoria, contagem ou situação sem precisar abrir cada item. Ele cria uma pista visual de baixa prioridade: chama atenção para o que mudou, mas não interrompe a leitura nem compete com a ação principal da tela. Por isso, seu texto deve ser curto, direto e compreensível mesmo quando a pessoa ignora a cor usada.",
    },
    {
      label: "Limites",
      text: "Não use Badge como botão, filtro ou única forma de explicar um erro importante. Para uma ação, use Button; para um filtro que a pessoa pode alterar, use Tag removível, Checkbox ou botão; para um aviso que exige leitura, use Alert. Também evite encaixar frases longas dentro do badge: quando a informação precisa de contexto, mostre-a como texto comum perto do item.",
    },
    {
      label: "Exemplos concretos",
      text: "Pedido: “Em análise”. Caixa de entrada: “3 não lidas”. Plano de assinatura: “Mais escolhido”. Perfil de acesso: “Administrador”.",
    },
  ],
};

const detailedAccessibilityProfiles = {
  button: [
    {
      label: "Semântica correta",
      text: "Use o elemento HTML <button> quando o controle executa uma ação na própria tela, como salvar um formulário, abrir um painel ou confirmar uma escolha. Use <a href> quando o objetivo é levar a pessoa para outra página, arquivo ou seção. Um botão comum não precisa de um role ARIA adicional: o HTML já informa corretamente sua função para leitores de tela.",
    },
    {
      label: "Nome acessível",
      text: "O texto visível do botão normalmente é o nome que um leitor de tela anuncia, por isso ele deve explicar o resultado da ação, como “Salvar alterações” em vez de apenas “Continuar”. Quando houver somente um ícone, como uma lixeira ou uma seta, inclua aria-label com uma frase clara, por exemplo “Excluir projeto”. Não repita o mesmo nome no ícone e no botão: o ícone pode ficar como decorativo com aria-hidden=\"true\".",
    },
    {
      label: "Teclado e foco",
      text: "A pessoa deve conseguir chegar ao botão usando a tecla Tab e enxergar onde o foco está. Em um <button> nativo, Enter e Espaço já executam a ação; não é necessário criar esse comportamento com JavaScript. Depois de abrir um painel ou diálogo, o foco deve seguir para o novo conteúdo quando isso ajudar a continuar a tarefa e retornar ao botão ao fechar, para que ninguém perca o ponto em que estava.",
    },
    {
      label: "Estados anunciados",
      text: "Use o estado nativo disabled quando a ação realmente não puder ser usada. Se um botão alterna algo, como pausar e retomar uma reprodução, aria-pressed informa se ele está ligado ou desligado. Para abrir e fechar regiões, aria-expanded comunica o estado atual. Quando a ação inicia um carregamento, mantenha uma mensagem de status compreensível próxima ou em uma região aria-live; não use apenas uma cor, um spinner ou uma mudança de ícone para explicar o que está acontecendo.",
    },
    {
      label: "Conteúdo não visual",
      text: "Ícones, cores e posição na tela são apenas apoio visual. A instrução principal precisa estar no texto do botão, no seu nome acessível ou em uma mensagem próxima. Se o botão mostrar um erro, sucesso ou confirmação, descreva o resultado com palavras simples, como “Não foi possível salvar. Verifique os campos destacados”, para que a mensagem continue clara mesmo sem enxergar cores ou ilustrações.",
    },
    {
      label: "Movimento e tempo",
      text: "Um botão não deve exigir rapidez para ser usado. Se ele iniciar uma animação, carregamento ou conteúdo que muda automaticamente, respeite a preferência de reduzir movimento do sistema e dê tempo suficiente para a pessoa ler a resposta e agir. Evite substituir o rótulo por uma animação rápida sem explicação; durante uma espera, informe de forma estável que a ação está sendo processada.",
    },
  ],
  badge: [
    {
      label: "Semântica correta",
      text: "Um Badge comum é uma informação curta e estática, portanto pode usar um elemento simples como <span> dentro do conteúdo que ele complementa. A classe .cl-badge altera apenas a aparência; ela não transforma o elemento em ação, filtro ou anúncio automático. Se a pessoa puder clicar para mudar um filtro ou abrir uma lista, use um <button> com o badge dentro dele, em vez de adicionar role=\"button\" a um <span> apenas para parecer interativo.",
    },
    {
      label: "Nome acessível",
      text: "O texto do badge deve trazer o significado completo do estado ou da contagem. “3 notificações”, “Pedido em análise” e “Administrador” são compreensíveis; apenas “3”, “Novo” ou um ponto colorido deixam o leitor de tela — e muitas pessoas olhando a tela — sem contexto. Quando o badge estiver ao lado de um título que já explica o assunto, mantenha os dois próximos no HTML para que sejam lidos na mesma sequência.",
    },
    {
      label: "Estados anunciados",
      text: "A variante visual .cl-badge-success, .cl-badge-warning ou .cl-badge-danger não é uma mensagem acessível por si só. Escreva o estado no conteúdo, como “Pagamento aprovado”, “Aguardando confirmação” ou “Falha no envio”. Se uma contagem ou status mudar depois de uma ação sem a pessoa ter solicitado a leitura, anuncie a alteração na região adequada com aria-live; não transforme cada badge estático em uma região live.",
    },
    {
      label: "Conteúdo não visual",
      text: "Cor, posição e tamanho pequeno são apenas apoio visual. O item principal e o badge precisam continuar fazendo sentido em leitura linear, em alto contraste e sem ícones. Caso um ícone acompanhe o texto, deixe-o decorativo com aria-hidden=\"true\" quando ele repetir a mesma informação; se o ícone trouxer um significado adicional, inclua esse significado no texto visível ou em uma descrição acessível.",
    },
  ],
};

function useContract(item) {
  if (detailedUseProfiles[item.id]) return detailedUseProfiles[item.id];
  const [examples, limits] = useGuides[item.id] || [];
  const scenarios = Array.isArray(item.use)
    ? item.use.map((entry) => entry.text || entry).join(" ")
    : item.use;
  return [
    scenarios && {
      label: "Cenários reais",
      text: `Use ${item.title || item.id} quando esta necessidade aparecer no fluxo da tela: ${scenarios} Ele funciona melhor próximo do conteúdo ou da decisão a que se refere, com rótulos que deixem clara sua finalidade para quem está usando a interface pela primeira vez.`,
    },
    item.description && {
      label: "Objetivo de UX",
      text: `${item.description} O objetivo é reduzir esforço e incerteza: a pessoa deve entender rapidamente o que está vendo, o que pode fazer ou qual será o próximo passo, sem depender apenas da aparência visual.`,
    },
    limits && {
      label: "Limites",
      text: `${limits} Escolher a alternativa correta evita controles duplicados, reduz escolhas desnecessárias e torna a tarefa mais previsível para todas as pessoas.`,
    },
    examples && {
      label: "Exemplos concretos",
      text: examples,
    },
  ].filter(Boolean);
}

const accessibilityContexts = {
  layout: ["Use landmarks como <header>, <main>, <aside> e <footer>; a grade só organiza a aparência.", "Headings devem nomear cada região; não use colunas vazias como instrução.", "A ordem de Tab deve seguir o DOM, mesmo quando as colunas se reorganizam.", "A mudança de breakpoint não deve ocultar ações ou alterar a ordem de leitura.", "Gutters, divisores e alinhamento são decorativos e não substituem títulos.", "Reflow responsivo não deve exigir zoom, arraste ou tempo para leitura."],
  theming: ["O tema é uma preferência visual aplicada em <html> ou no contêiner, sem trocar a semântica do HTML.", "O botão de tema precisa dizer qual opção será aplicada, por exemplo “Usar tema escuro”.", "O seletor de tema deve receber foco e funcionar com Enter e Espaço.", "Informe o tema ativo por texto ou aria-pressed; cor sozinha não comunica a escolha.", "Valide texto, ícones, foco e gráficos em cada tema, inclusive com alto contraste.", "Não anime a troca de tema de modo intenso; respeite prefers-reduced-motion."],
  icons: ["Use SVG decorativo com aria-hidden=\"true\"; um ícone que executa ação deve estar dentro de <button> ou <a>.", "Um botão só de ícone precisa de aria-label, como “Fechar menu”.", "Ícones interativos seguem o teclado do botão ou link que os contém.", "Não use apenas cor, rotação ou troca de ícone para anunciar erro ou seleção.", "Todo ícone informativo precisa de texto equivalente; ícones decorativos devem ser ignorados.", "Evite animação contínua de ícones e reduza movimentos não essenciais."],
  divider: ["Use <hr> quando houver mudança temática real; para separação visual simples, use um elemento decorativo.", null, null, null, "A relação entre áreas deve ser explicada por headings e texto, não pela linha.", null],
  "js-foundation": ["JavaScript deve aprimorar HTML que já é compreensível, nunca substituir <button>, <a> ou formulários nativos.", "Todo gatilho criado por JavaScript precisa manter um nome acessível claro.", "Inicialização não pode remover foco, teclado ou ações nativas caso o script falhe.", "Sincronize atributos ARIA quando o script abrir, selecionar, carregar ou desabilitar algo.", "Mensagens inseridas dinamicamente precisam de região aria-live quando forem relevantes.", "Transições controladas por JavaScript devem respeitar prefers-reduced-motion."],
  badge: ["Use texto comum, como <span>, para status curto; badge não é botão por si só.", "O texto deve incluir o significado, como “3 notificações” ou “Status: ativo”.", "Badges estáticos não entram no Tab; se forem filtro, use um botão nomeado.", "Alterações de status importantes precisam ser anunciadas fora da cor do badge.", "Não dependa de verde, amarelo ou vermelho sem um rótulo textual.", "Não use pulsação contínua como único aviso de novidade."],
  alert: ["Use uma região de mensagem; role=alert é reservado para avisos urgentes e role=status para atualizações calmas.", "O título e o texto devem explicar o problema e a próxima ação.", "Não mova foco para alertas comuns; leve-o ao erro apenas quando isso ajudar a corrigir um formulário.", "Erro, sucesso e aviso precisam de texto; aria-live deve ter a urgência adequada.", "Ícones de alerta são apoio: a mensagem não pode depender deles ou de cor.", "Alertas persistem até leitura; não desaparecem automaticamente antes da ação."],
  tag: ["Uma tag estática pode ser <span>; uma tag removível precisa ter <button> separado para remover.", "O botão deve dizer o que remove, como aria-label=\"Remover Design\".", "A remoção é alcançada por Tab e ativada por Enter ou Espaço.", "Depois de remover, informe o filtro alterado e mantenha foco em posição previsível.", "A cor da tag não basta para explicar categoria, seleção ou erro.", "Evite animação rápida ao adicionar ou remover; preserve tempo para perceber a mudança."],
  "empty-state": ["Use uma seção com heading e texto; não trate ausência de dados como diálogo ou alerta automático.", "O título deve nomear a situação, como “Nenhum projeto criado”.", "Apenas a ação disponível entra no Tab; ilustrações são decorativas com alt=\"\".", "Diferencie vazio, erro e carregamento com texto, não só com imagem.", "Explique o próximo passo e o motivo de não haver conteúdo.", "Não use animação contínua na ilustração; se estiver carregando, use Skeleton ou Spinner."],
  skeleton: ["Skeleton é decorativo e deve usar aria-hidden=\"true\"; o conteúdo real continua sendo uma região separada.", null, null, "Anuncie carregamento e término em texto ou aria-live, sem anunciar cada bloco.", "Mantenha o espaço aproximado do resultado para evitar salto de layout.", "Desative ou simplifique o shimmer com prefers-reduced-motion e não use espera sem informação."],
  progress: ["Use role=progressbar apenas para avanço mensurável; use role=status para spinner indeterminado.", "Nomeie a tarefa, como “Enviando relatório”, e não apenas a porcentagem.", "Controles para cancelar ou pausar precisam ser botões alcançáveis por Tab.", "Em progressbar, informe aria-valuenow, aria-valuemin e aria-valuemax; erros devem ter texto.", "Mostre percentual e etapa atual quando forem úteis, sem depender da barra colorida.", "Não esconda progresso longo; permita pausar ou cancelar quando o fluxo suportar."],
  input: ["Use <input> ou <textarea> com <label> associado; placeholder não substitui rótulo.", "O label deve explicar o dado pedido e aria-describedby pode ligar ajuda ou erro.", "Tab chega ao campo; teclado nativo edita o valor sem comportamento customizado.", "Use required, aria-invalid e mensagem de erro associada quando houver validação.", "Máscaras e exemplos devem indicar formato em texto, não apenas por cor.", "Não apague erro cedo demais nem limite indevidamente o tempo de preenchimento."],
  select: ["Prefira <select> nativo para lista curta e conhecida.", "O <label> explica o que será escolhido; a opção inicial não substitui esse nome.", "O controle usa Tab, setas e seleção nativos do navegador.", "Use disabled apenas quando indisponível e descreva erro ou obrigatoriedade em texto.", "Não diferencie opções somente por cor ou ícone.", "Não feche nem altere a escolha automaticamente antes da confirmação da pessoa."],
  "input-group": ["O campo interno continua sendo <input> com <label>; prefixo e sufixo não substituem sua finalidade.", "Nomeie botões do grupo, como “Pesquisar”, mesmo que tenham só ícone.", "Tab deve seguir campo e ação; addons informativos não entram no foco.", "Validação pertence ao campo e deve usar aria-invalid e aria-describedby quando necessário.", "Moeda, unidade ou domínio devem ser compreensíveis também fora do layout visual.", "Não mova foco de forma automática entre controles durante a digitação."],
  "check-radio-switch": ["Use checkbox para opções independentes, radio dentro de <fieldset> para escolha única e switch para preferência imediata.", "Cada controle precisa de <label>; <legend> nomeia o grupo relacionado.", "Tab chega ao grupo e Espaço altera o controle nativo; não exija clique no indicador.", "checked, indeterminate e disabled devem ter rótulo ou contexto que explique o efeito.", "Não use posição ou cor do interruptor como única indicação de ligado e desligado.", "Uma mudança de switch não deve disparar animação excessiva nem ação irreversível sem aviso."],
  range: ["Use <input type=\"range\"> para valor aproximado; para precisão, ofereça também entrada numérica.", "O <label> deve dizer o que muda e aria-valuetext traduz valores como “Volume: 60%”.", "Tab chega ao controle e setas alteram o valor; Home e End podem ir aos extremos.", "Informe mínimo, máximo, step e valor atual de forma compreensível.", "Mostre o número ou descrição da escala, não apenas a posição do cursor.", "Atualizações visuais em tempo real devem ser suaves e respeitar redução de movimento."],
  "segmented-control": ["Use radios nativos para modos exclusivos; use Tabs apenas quando cada opção revelar um painel associado.", "O rótulo do grupo e de cada opção deve indicar o modo que será aplicado.", "Setas mudam a opção dentro do grupo e Tab avança para fora, seguindo o padrão de radio.", "A opção selecionada deve ser exposta por checked e não apenas pelo fundo destacado.", "Ícones de visualização precisam de texto ou aria-label que explique lista, grade ou período.", "A troca de modo não deve gerar animação que esconda a atualização do conteúdo."],
  rating: ["Use radios agrupados para permitir uma avaliação discreta, em vez de estrelas clicáveis sem semântica.", "O grupo precisa explicar a escala, por exemplo “Avalie de 1 a 5 estrelas”.", "Tab alcança a avaliação e setas permitem trocar a nota como em radios.", "A nota atual deve ser anunciada por checked ou texto, inclusive quando estiver desabilitada.", "Não mostre somente estrelas preenchidas: apresente o valor numérico ou textual.", "Não exija avaliação em tempo curto nem use animação como confirmação exclusiva."],
  datepicker: ["Prefira <input type=\"date\"> e <input type=\"time\">; eles preservam semântica e teclado da plataforma.", "O <label> identifica o evento e ajuda textual explica formato apenas quando necessário.", "Tab chega ao campo e o seletor nativo mantém o padrão de teclado do sistema.", "Min, max, required e erro precisam ser comunicados por texto associado ao campo.", "Não use somente cor para indicar data bloqueada, obrigatória ou inválida.", null],
  card: ["Use <article> quando o cartão for uma unidade de conteúdo independente; links e ações permanecem elementos nativos.", "O heading do cartão deve identificar seu conteúdo; imagens informativas precisam de alt útil.", "Ações internas recebem Tab individualmente; não crie um cartão clicável com controles aninhados.", "Seleção, favorito ou indisponibilidade precisam de texto ou atributos próprios.", "Resumo, preço e status não podem depender somente da imagem ou da cor.", null],
  tile: ["Use <article> ou <li> conforme a coleção; a aparência em bloco não define um papel ARIA.", "Nomeie o arquivo, pessoa ou preferência representada pelo tile.", "Links e botões do tile seguem Tab sem transformar a área inteira em foco duplicado.", "Estado selecionado ou indisponível deve ser exposto por texto ou atributo adequado.", "Miniaturas decorativas usam alt=\"\"; miniaturas informativas precisam de descrição.", null],
  carousel: ["Use uma região agrupada com aria-roledescription=\"carousel\" e controles em <button>.", "O contêiner precisa de aria-label descritivo; anterior, próximo e pausa precisam de nomes claros.", "Tab alcança os controles; setas no contêiner navegam sem capturar teclas iniciadas em controles filhos.", "aria-current identifica o slide; aria-live fica polite quando pausado e off durante autoplay.", "Legendas e indicadores devem explicar o slide sem depender só da imagem ou do ponto ativo.", "Autoplay respeita pausa explícita, hover, foco, aba oculta e prefers-reduced-motion."],
  timeline: ["Use <ol> para eventos em sequência; Stepper é mais adequado quando há etapas de uma tarefa.", "Cada evento deve ter título, data e descrição compreensíveis na leitura linear.", null, "Status como concluído ou atrasado precisam de texto além da cor do marcador.", "A linha e os ícones são decorativos; a ordem e o significado estão no texto.", null],
  charts: ["Use <figure> com título e uma alternativa textual ou tabela para valores relevantes.", "A legenda e a descrição devem dizer o que cada série representa.", "Se houver filtros ou tooltip interativo, eles precisam operar por teclado e ter foco visível.", "Destaques, séries ocultas e filtros ativos precisam ter estado textual acessível.", "Não dependa de cor: use rótulos, padrões ou tabela de dados para distinguir séries.", "Reduza animações de entrada e atualização quando prefers-reduced-motion estiver ativo."],
  table: ["Use <table>, <caption>, <thead>, <th scope> e <tbody> para dados tabulares reais.", "Cabeçalhos devem descrever coluna e linha; caption resume o assunto da tabela.", "A tabela estática não cria foco extra; ações dentro de células seguem Tab normalmente.", "Ordenação ou seleção, se existirem, devem comunicar estado no cabeçalho ou controle.", "Não esconda unidade, status ou relação entre células apenas por cor ou posição.", null],
  datatable: ["Mantenha <table> para os dados e use controles nativos para busca, filtro e paginação.", "Nomeie busca, filtros, tabela e ações de linha de forma específica.", "Tab percorre filtros e ações; ordenação deve ser ativável por teclado.", "Informe coluna ordenada, filtros ativos, seleção e quantidade de resultados em texto ou ARIA.", "Uma tabela alternativa ou leitura linear deve manter dados essenciais disponíveis.", "Atualizações de filtro devem preservar foco e anunciar resultado sem animação excessiva."],
  navbar: ["Envolva destinos globais em <nav> com aria-label quando houver mais de uma navegação na página.", "Marca, links e botão de menu precisam de nomes que indiquem seus destinos e efeito.", "O botão compacto usa Tab, Enter e Espaço; Escape fecha o menu e devolve foco ao gatilho.", "aria-current=\"page\" marca o destino atual e aria-expanded informa o menu compacto.", "Não esconda navegação essencial apenas atrás de ícones sem nome.", "A abertura do menu deve respeitar redução de movimento."],
  breadcrumb: ["Use <nav aria-label=\"Breadcrumb\"> contendo uma lista ordenada de níveis.", "O último item deve indicar a página atual com aria-current=\"page\".", "Somente níveis navegáveis recebem foco; a página atual normalmente não é link.", "Não há estado interativo além da página atual.", "Separadores visuais são decorativos e não devem poluir a leitura do caminho.", null],
  pagination: ["Use <nav aria-label=\"Paginação\"> com lista de links ou botões de página.", "Anterior, próxima e páginas precisam de rótulos como aria-label=\"Página 3\".", "Tab chega a cada página disponível; Enter ativa links e Espaço ativa botões.", "A página atual usa aria-current=\"page\" e limites indisponíveis usam disabled ou aria-disabled coerente.", "Não comunique a página atual apenas por cor ou preenchimento.", "Ao trocar página, preserve foco em posição previsível e anuncie os novos resultados."],
  accordion: ["Use <button> para cada cabeçalho e uma região associada para seu painel.", "O texto do cabeçalho nomeia o painel; aria-controls relaciona gatilho e conteúdo.", "Tab chega aos cabeçalhos; Enter e Espaço expandem ou recolhem o painel.", "aria-expanded informa aberto ou fechado; data-multiple define se vários podem ficar abertos.", "O ícone de seta é decorativo porque o estado deve ser anunciado.", "A animação de altura deve respeitar prefers-reduced-motion."],
  tabs: ["Use role=tablist, role=tab e role=tabpanel apenas para painéis de mesmo contexto.", "Cada aba precisa nomear seu painel por aria-controls e o painel por aria-labelledby.", "Setas movem entre abas; Home e End vão aos extremos e Tab segue para o painel.", "aria-selected, tabindex e painel oculto devem acompanhar a aba ativa.", "Não use só cor ou sublinhado para mostrar a aba selecionada.", "A troca de painel deve ser imediata ou respeitar redução de movimento."],
  collapse: ["Use <button> com aria-controls para revelar uma única região adicional.", "O rótulo do gatilho deve explicar o conteúdo, como “Mostrar critérios”.", "Tab chega ao gatilho e Enter ou Espaço alternam o painel.", "aria-expanded comunica se o conteúdo está visível.", "A seta é apoio visual; o texto e o estado ARIA explicam a ação.", "A transição de altura deve respeitar prefers-reduced-motion."],
  stepper: ["Use <ol> para comunicar etapas; não use role=tab quando as etapas não forem navegação livre.", "Cada etapa deve informar nome e status, como “Pagamento concluído”.", null, "Atual, concluída, pendente e com erro precisam de texto, não só de cor ou ícone.", "Número e conectores são apoio; inclua instrução de progresso compreensível.", null],
  "nested-menu": ["Use <nav> ou lista hierárquica; gatilhos de submenu devem ser <button>.", "Cada botão deve nomear o submenu que abre.", "Tab chega aos gatilhos; Enter/Espaço expandem e Escape fecha devolvendo o foco.", "aria-expanded deve acompanhar o submenu aberto ou fechado.", "Indentação visual não basta: títulos e rótulos devem explicar a hierarquia.", "Movimento de abertura deve respeitar prefers-reduced-motion."],
  "tree-view": ["Use lista aninhada para árvore simples ou o padrão role=tree completo quando houver navegação avançada.", "Cada nó precisa de rótulo; o botão de expansão deve dizer qual ramo controla.", "Setas navegam a árvore quando o padrão role=tree é usado; Tab não deve percorrer cada nó.", "Nós expansíveis expõem aria-expanded e itens selecionados informam seleção.", "Nível, expansão e seleção não podem ser indicados só por recuo, cor ou ícone.", "A expansão não deve usar animações que desorientem a leitura."],
  dropdown: ["Use <button> para o gatilho e uma lista de links ou botões para as ações do menu.", "O gatilho precisa dizer que menu abre; cada item deve nomear sua ação.", "Tab chega ao gatilho; Enter/Espaço abrem, Escape fecha e o foco retorna ao gatilho.", "aria-expanded informa visibilidade; itens indisponíveis precisam de estado e explicação.", "Não esconda a única ação importante sob ícone ou menu sem nome.", "A abertura e o fechamento respeitam prefers-reduced-motion."],
  tooltip: ["Tooltip complementa um controle já existente; não é substituto de <label> ou instrução essencial.", "O gatilho precisa ter nome próprio; o tooltip apenas adiciona contexto curto.", "A dica aparece por foco e hover, pode ser fechada com Escape e não prende o foco.", "Não use tooltip para estado crítico, erro ou confirmação.", "Informação indispensável deve estar visível ou disponível por outro meio.", "Evite atrasos longos e animações que dificultem ler a dica."],
  "hover-card": ["Use um gatilho nativo e uma região de prévia; se houver ações internas, prefira Popover.", "O link ou botão que abre a prévia precisa ter finalidade clara sem depender do cartão.", "A prévia deve aparecer por foco; se contiver ação, o foco precisa poder alcançá-la e sair dela.", "Visibilidade e conteúdo carregado devem ser anunciados quando alterarem a tarefa.", "Não esconda informação obrigatória somente no hover.", "Atraso, fechamento e movimento devem respeitar redução de movimento."],
  popover: ["Use <button> para conteúdo ou ações breves acionadas explicitamente; use Modal para tarefa longa.", "O gatilho deve nomear a informação ou ação disponível no popover.", "Enter/Espaço abrem, Escape fecha e foco retorna ao botão; conteúdo interativo precisa ser alcançável.", "aria-expanded comunica visibilidade e controles internos devem informar seus próprios estados.", "Não use popover como única forma de mostrar instrução essencial.", "Posicionamento e abertura devem respeitar prefers-reduced-motion."],
  offcanvas: ["Use painel lateral com semântica de diálogo quando bloquear a interação com a página.", "O título do painel deve nomear seu contexto e o botão de fechar precisa de aria-label.", "Ao abrir, foco vai ao painel, fica contido nele e retorna ao gatilho ao fechar; Escape fecha.", "Backdrop, abertura e fechamento devem manter aria-hidden e visibilidade sincronizados.", "O painel deve manter título, instruções e ações compreensíveis sem depender do lado visual.", "O deslizamento lateral deve respeitar prefers-reduced-motion."],
  modal: ["Use role=dialog, aria-modal=\"true\" e título associado para uma tarefa temporária que exige atenção.", "aria-labelledby aponta para o título e aria-describedby pode apontar para a explicação.", "Ao abrir, foco vai ao diálogo, permanece nele e retorna ao gatilho ao fechar; Escape fecha quando permitido.", "Estado aberto, validação e carregamento do formulário precisam de mensagens acessíveis.", "Botões de confirmar e cancelar devem explicar consequência; ícones não substituem texto.", "A transição do modal deve respeitar prefers-reduced-motion e não encerrar antes da leitura."],
  "alert-dialog": ["Use role=alertdialog apenas para confirmação crítica; título e descrição devem explicar a consequência.", "aria-labelledby e aria-describedby precisam apontar para o motivo e o impacto da ação.", "Foco inicial vai para a opção mais segura; foco fica no diálogo e retorna ao gatilho ao fechar.", "Ação destrutiva, erro e confirmação devem ser informados em texto; Escape só fecha quando for seguro.", "Não use cor vermelha ou ícone de alerta como única explicação da decisão.", "Não use fechamento automático nem animação que pressione uma decisão."],
  "command-palette": ["Use diálogo com campo de busca e lista de comandos; preserve menus visíveis como alternativa.", "O diálogo, a busca e cada comando precisam de nomes específicos e resultados devem ser legíveis.", "Atalho abre a paleta, setas percorrem resultados, Enter executa e Escape fecha retornando foco.", "Informe resultado ativo, quantidade filtrada e comando desabilitado com atributos e texto adequados.", "Atalhos visuais, ícones e categorias precisam de rótulo textual.", "A paleta não deve fechar enquanto a pessoa lê resultados ou depender de animação intensa."],
  toast: ["Use uma região de status para confirmação breve; erro que exige ação deve permanecer no contexto do problema.", "A mensagem precisa dizer o que aconteceu e, se houver botão, nomear a ação como “Desfazer”.", "Toast não recebe foco automaticamente; o botão de fechar ou desfazer entra no Tab quando existir.", "Use aria-live com urgência proporcional e não anuncie várias mensagens irrelevantes de uma vez.", "Não comunique sucesso ou erro apenas por cor, ícone ou posição da tela.", "Dê tempo de leitura, permita fechar manualmente e pause auto-fechamento quando houver interação."],
  "notification-center": ["Use botão para abrir o painel e uma lista para notificações; não trate o histórico como alerta automático.", "O botão deve informar a contagem, como “Notificações, 3 não lidas”, e cada item precisa de título.", "Tab chega ao botão e às ações do painel; Escape fecha e devolve foco ao gatilho.", "aria-expanded informa o painel aberto; lida, não lida e seleção em lote devem ter estado textual.", "Contagem, prioridade e tipo não podem depender apenas de badge, ponto ou cor.", "Atualizações novas devem ser anunciadas com moderação e sem interromper a tarefa."],
};

function accessibilityContract(item) {
  if (detailedAccessibilityProfiles[item.id]) return detailedAccessibilityProfiles[item.id];
  const context = accessibilityContexts[item.id];
  if (!context) return item.a11y;
  const labels = ["Semântica correta", "Nome acessível", "Teclado e foco", "Estados anunciados", "Conteúdo não visual", "Movimento e tempo"];
  const complements = [
    "Essa estrutura permite que navegadores e tecnologias assistivas reconheçam a função do componente sem precisar interpretar seu desenho.",
    "Assim, a informação continua compreensível para quem usa leitor de tela, ampliação ou navega sem se orientar pela posição visual.",
    "O comportamento deve permanecer previsível para quem não usa mouse ou toque, com foco visível durante toda a interação.",
    "A mudança precisa ser entendida mesmo quando cores, ícones ou animações não forem percebidos pela pessoa usuária.",
    "Esse cuidado também mantém a mensagem clara em alto contraste, em leitura linear e quando recursos visuais não estiverem disponíveis.",
    "Dessa forma, a interface não impõe velocidade, movimento ou uma forma específica de interação para concluir a tarefa.",
  ];
  return labels
    .map((label, index) => context[index] && ({ label, text: `${context[index]} ${complements[index]}` }))
    .filter((entry) => entry && entry.text);
}

function documentationPath(item) {
  return guideComponents.has(item.id)
    ? `../docs/guides/${item.id === "js-foundation" ? "javascript" : item.id}.md`
    : `../docs/components/${item.id}.md`;
}

function apiCategory(entry) {
  const label = entry.label || "";
  if (/data-|aria-|\[data-/.test(label)) return "Atributos de configuração";
  if (/Clarus\.|\(\)|API JS/.test(label)) return "API JavaScript";
  if (/\.is-|active|disabled|loading|error/i.test(label)) return "Estados internos";
  if (/outline|sm|lg|fade|side|stacked|multiple|horizontal|vertical|placement|variant/i.test(label)) return "Variações";
  return "Estrutura e classes";
}

function tokenKind(token) {
  return token.startsWith("<") ? "html" : "css";
}

function appendFormattedText(target, text) {
  const tokenPattern = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|“[^”]*”|<\/?[a-z][^>]*>|--cl-[\w-]+|\.[a-z][\w-]*|(?:aria|data)-[\w-]+|\b(?:role|disabled|required|readonly|checked|selected|value|min|max|step|href|type|alt|title|id|class)\b)/gi;
  let cursor = 0;
  String(text).replace(tokenPattern, (match, _capture, offset) => {
    target.append(document.createTextNode(String(text).slice(cursor, offset)));
    const token = document.createElement("span");
    const isQuotedExample = /^(?:"|'|“)/.test(match);
    token.className = isQuotedExample
      ? "showcase-token showcase-token-example"
      : `showcase-token showcase-token-${tokenKind(match)}`;
    token.textContent = match;
    target.append(token);
    cursor = offset + match.length;
    return match;
  });
  target.append(document.createTextNode(String(text).slice(cursor)));
}

const apiExtensions = {
  button: [
    { label: ".cl-btn", code: true, text: "classe-base aplicada a <button>; use <a href> apenas quando a ação for navegação." },
    { label: ".cl-btn-primary / -secondary / -success / -warning / -danger / -info", code: true, text: "escolhem a ênfase semântica da ação." },
    { label: ".cl-btn-outline-* / .cl-btn-sm / .cl-btn-lg / disabled", code: true, text: "criam variante contornada, alteram densidade e impedem acionamento nativo." },
    { label: ".cl-btn-close", code: true, text: "botão somente de ícone usado para dispensar Card, Modal, Toast e Tag; sempre informe aria-label." },
  ],
  badge: [
    { label: ".cl-badge", code: true, text: "rótulo-base para status curto ou contagem." },
    { label: ".cl-badge-{primary|secondary|success|warning|danger|info}", code: true, text: "define a cor semântica; acompanhe-a de texto que explique o estado." },
    { label: ".cl-badge-soft-{cor} / .cl-badge-outline-{cor} / .cl-badge-sm / .cl-badge-lg", code: true, text: "criam aparência suave, contornada ou alteram a densidade do rótulo." },
    { label: ".cl-badge-dot / .cl-badge-count / .cl-badge-split", code: true, text: "adicionam ponto, algarismos tabulares ou rótulo e valor conectados; split exige .cl-badge-split-label e .cl-badge-split-value." },
  ],
  alert: [
    { label: ".cl-alert", code: true, text: "contêiner da mensagem persistente." },
    { label: ".cl-alert-{primary|secondary|success|warning|danger|info}", code: true, text: "seleciona a intenção visual da mensagem." },
    { label: ".cl-alert-heading / .cl-alert-link", code: true, text: "destacam título e link contextual dentro do alerta." },
  ],
  tag: [
    { label: ".cl-tag", code: true, text: "estrutura base para filtro, categoria ou seleção curta." },
    { label: ".cl-tag-{primary|secondary|success|warning|danger|info}", code: true, text: "aplica a variante semântica." },
    { label: ".cl-tag-icon / .cl-tag-label / .cl-tag-truncate / .cl-tag-group", code: true, text: "organizam ícone, texto, truncamento e grupos de tags." },
    { label: ".cl-tag-protected / .cl-tag-lock / .cl-tag-overflow", code: true, text: "criam tag protegida, seu indicador e o botão para revelar itens excedentes." },
    { label: "data-cl=\"tag\" / data-cl-dismiss=\"tag\" / .is-loading / aria-busy", code: true, text: "inicializam a remoção, identificam o botão de dispensa e expõem carregamento; Tag.getInstance(el).dismiss() e setLoading(true) são as APIs públicas." },
  ],
  "empty-state": [
    { label: ".cl-empty-state", code: true, text: "contêiner centralizado para ausência de conteúdo." },
    { label: ".cl-empty-state-icon / -title / -text / -action", code: true, text: "organizam ícone decorativo, mensagem, explicação e CTA opcional." },
  ],
  skeleton: [
    { label: ".cl-skeleton", code: true, text: "bloco-base de espaço reservado durante carregamento." },
    { label: ".cl-skeleton-text / -avatar / -button / -card", code: true, text: "simulam formas previsíveis de conteúdo; aplique aria-hidden à decoração." },
  ],
  progress: [
    { label: ".cl-spinner / .cl-spinner-sm / .cl-spinner-lg", code: true, text: "indicador indeterminado; use texto de status fora do ícone quando necessário." },
    { label: ".cl-progress > .cl-progress-bar", code: true, text: "trilha e preenchimento de progresso mensurável." },
    { label: "role=\"progressbar\" + aria-valuemin/max/now", code: true, text: "expõe o valor atual quando a barra representa avanço conhecido." },
  ],
  card: [
    { label: ".cl-card-title / .cl-card-subtitle / .cl-card-text", code: true, text: "tipografia de título, contexto secundário e corpo; use dentro do header ou body conforme a hierarquia." },
    { label: ".cl-card-sm / .cl-card-lg", code: true, text: "reduzem ou ampliam a densidade interna; não alteram a largura do card." },
  ],
  tile: [
    { label: ".cl-tile-title / .cl-tile-subtitle", code: true, text: "título e contexto secundário; ambos truncam visualmente quando não há espaço." },
    { label: ".cl-tile-actions", code: true, text: "envolve botões, badge ou switch na extremidade da linha." },
    { label: ".cl-tile-sm / .cl-tile-lg", code: true, text: "reduzem ou ampliam a densidade do item." },
  ],
  timeline: [
    { label: ".cl-timeline-marker / .cl-timeline-content", code: true, text: "formam o marcador e o bloco de informação de cada evento." },
    { label: ".cl-timeline-title / .cl-timeline-text / .cl-timeline-time", code: true, text: "título, descrição e data/hora de cada evento; texto e horário são opcionais." },
  ],
  table: [
    { label: ".cl-table-{primary|secondary|success|warning|danger|info}", code: true, text: "tingem a tabela inteira com uma cor semântica; use somente quando o significado não depender apenas da cor." },
  ],
  datatable: [
    { label: ".cl-datatable-toolbar", code: true, text: "agrupa busca e controles acima da tabela; é opcional." },
    { label: "[data-cl-datatable-pagination]", code: true, text: "define onde o navegador deve inserir a paginação; se ausente, o componente cria um nav ao final." },
    { label: "[data-cl-datatable-loading] / [data-cl-datatable-error-message]", code: true, text: "identificam o painel de carregamento e o local em que setError() escreve a mensagem." },
  ],
  input: [
    { label: ".cl-form-control / .cl-form-label / .cl-form-text", code: true, text: "estilizam campo, rótulo persistente e texto de ajuda associado." },
    { label: ".is-valid / .is-invalid / .cl-valid-feedback / .cl-invalid-feedback", code: true, text: "aplicam e descrevem validação; associe a mensagem ao campo com aria-describedby." },
    { label: "disabled / readonly / required / aria-describedby", code: true, text: "mantêm os comportamentos nativos de disponibilidade, obrigatoriedade e ajuda/erro." },
  ],
  select: [
    { label: ".cl-select / .cl-form-label / .cl-form-text", code: true, text: "aplicam acabamento ao <select> nativo e ao seu contexto de formulário." },
    { label: "required / disabled / multiple / size", code: true, text: "configuram seleção obrigatória, indisponível, múltipla e lista visível nativa." },
  ],
  "input-group": [
    { label: ".cl-input-group / .cl-input-group-text / .cl-input-group-sm / .cl-input-group-lg", code: true, text: "agrupam campo, prefixo, sufixo ou ação e ajustam sua densidade." },
  ],
  "check-radio-switch": [
    { label: ".cl-check / .cl-check-input / .cl-check-label / .cl-radio", code: true, text: "estruturam checkbox e radio nativos com rótulo associado." },
    { label: ".cl-switch / .cl-switch-input / .cl-switch-label / .cl-switch-sm / .cl-switch-lg", code: true, text: "estruturam a preferência em interruptor e suas variações de tamanho." },
    { label: "checked / indeterminate / disabled / required", code: true, text: "são estados nativos do controle; indeterminate é definido via JavaScript na checkbox." },
  ],
  range: [
    { label: ".cl-range / input[type=range]", code: true, text: "aplicam o acabamento Clarus ao controle nativo de faixa." },
    { label: "min / max / step / value / aria-valuetext", code: true, text: "definem limites, granularidade, valor inicial e descrição compreensível do valor." },
  ],
  "segmented-control": [
    { label: ".cl-segmented-control / .cl-segmented-control-item / .cl-segmented-control-label", code: true, text: "formam o grupo de escolhas exclusivas e seus rótulos." },
    { label: ".cl-segmented-control-sm / .cl-segmented-control-lg / input[type=radio]", code: true, text: "alteram densidade e preservam seleção exclusiva nativa." },
  ],
  rating: [
    { label: ".cl-rating / .cl-rating-input / .cl-rating-label", code: true, text: "estruturam a escala interativa com radios acessíveis." },
    { label: "data-rating / disabled / input[type=radio]", code: true, text: "definem a nota inicial, disponibilidade e a escolha nativa; Rating.getInstance(el).set(value) altera a nota." },
  ],
  datepicker: [
    { label: ".cl-datepicker / .cl-form-control / input[type=date] / input[type=time]", code: true, text: "envolvem ou estilizam controles nativos de data e hora." },
    { label: "min / max / required / disabled / data-cl=\"datepicker\"", code: true, text: "restringem intervalo e disponibilidade; o atributo data-cl ativa somente os aprimoramentos publicados." },
  ],
  combobox: [
    { label: ".cl-combobox / .cl-combobox-input / .cl-combobox-listbox / .cl-combobox-option", code: true, text: "formam campo, lista e opções pesquisáveis." },
    { label: "data-cl=\"combobox\" / data-cl-combobox-input / data-cl-combobox-listbox / data-value", code: true, text: "inicializam o componente e identificam suas partes e valores; Combobox.getInstance(el) expõe select(), clear() e dispose()." },
  ],
  "file-upload": [
    { label: ".cl-file-upload / .cl-file-input / .cl-file-label / .cl-file-label-sm|lg / .cl-file-label-dropzone / .cl-file-dropzone-hint", code: true, text: "estruturam o upload simples, tamanhos e a área de soltar arquivos." },
    { label: "accept / multiple / disabled / data-cl=\"file-drop\" / .is-dragover", code: true, text: "restringem tipos e quantidade, desabilitam o input e ativam drag-and-drop na label; FileDrop.getInstance(label).dispose() remove o comportamento." },
    { label: "data-cl=\"file-upload-advanced\" / .cl-file-upload-list / .cl-file-upload-item / .cl-file-upload-remove / .is-error", code: true, text: "ativam fila avançada, itens e remoção; FileUploadAdvanced.getInstance(el) expõe getFiles(), setProgress(), setError() e remove()." },
  ],
  "file-drop": [
    { label: ".cl-file-drop / .cl-file-drop-input / .cl-file-drop-label / .is-dragover", code: true, text: "estruturam área de arrastar, input nativo, rótulo e realce temporário." },
    { label: "accept / disabled / data-cl=\"file-drop\"", code: true, text: "restringem formatos, disponibilidade e inicializam o comportamento de drop." },
  ],
  layout: [
    { label: ".cl-container / .cl-container-fluid / .cl-row / .cl-col-{breakpoint}-{1..12}", code: true, text: "definem contêiner, linhas e colunas responsivas da grade." },
    { label: ".u-m-* / .u-p-* / .u-gap-* / .u-d-* / .u-flex-*", code: true, text: "utilitários publicados para espaçamento, display e alinhamento; combine somente o necessário." },
  ],
  theming: [
    { label: "data-theme=\"dark\" / data-brand=\"violet|corporate|vibrant\"", code: true, text: "ativam aliases de tema e marca no <html> ou em um contêiner." },
    { label: "--cl-color-* / --cl-font-* / --cl-space-* / --cl-radius-*", code: true, text: "tokens públicos para personalização sem valores literais em componentes." },
  ],
  icons: [
    { label: ".cl-icon / .cl-icon-xs / .cl-icon-sm / .cl-icon-lg / .cl-icon-xl", code: true, text: "normalizam SVG inline e definem os tamanhos publicados." },
  ],
  divider: [
    { label: ".cl-divider / .cl-divider-vertical / .cl-divider-dashed / .cl-divider-text", code: true, text: "criam divisor horizontal, vertical, tracejado ou com texto central." },
  ],
  "js-foundation": [
    { label: "Clarus.core.computePosition() / createFocusTrap() / collapse() / expand()", code: true, text: "utilitários JavaScript públicos usados pelos componentes avançados; não exigem data-cl." },
  ],
  navbar: [
    { label: ".cl-navbar / .cl-navbar-brand / .cl-navbar-nav / .cl-navbar-item / .cl-navbar-link", code: true, text: "estruturam marca e destinos da navegação principal." },
    { label: ".cl-navbar-toggler / .cl-navbar-collapse / data-cl=\"navbar\" / data-cl-target", code: true, text: "configuram o menu compacto e o destino que será aberto." },
  ],
  breadcrumb: [
    { label: ".cl-breadcrumb / .cl-breadcrumb-item / .is-active", code: true, text: "estruturam os níveis e identificam a página atual." },
    { label: "data-cl=\"breadcrumb\" / data-max-items", code: true, text: "ativam truncamento e definem quantos itens permanecem visíveis antes do colapso." },
  ],
  pagination: [
    { label: ".cl-pagination / .cl-page-item / .cl-page-link / .is-active / .is-disabled", code: true, text: "estruturam páginas, destino atual e limites indisponíveis." },
    { label: ".cl-pagination-sm / .cl-pagination-lg / aria-current=\"page\"", code: true, text: "alteram densidade e expõem a página atual." },
  ],
  accordion: [
    { label: ".cl-accordion / .cl-accordion-item / .cl-accordion-header / .cl-accordion-button / .cl-accordion-collapse / .cl-accordion-body", code: true, text: "formam a anatomia completa de cada painel." },
    { label: "data-cl=\"accordion\" / data-multiple=\"true\" / aria-expanded / aria-controls", code: true, text: "inicializam o grupo, permitem vários painéis e comunicam o estado; Accordion.getInstance(el).dispose() é a API pública." },
  ],
  tabs: [
    { label: ".cl-tabs / .cl-nav-link / .cl-tab-content / .cl-tab-pane / .is-active / .is-disabled", code: true, text: "formam abas, painéis e seus estados." },
    { label: "data-cl=\"tabs\" / data-cl-target / data-tabs-activation=\"manual\"", code: true, text: "inicializam, ligam aba ao painel e separam foco de ativação; Tabs.getInstance(el).show(tab) é a API pública." },
  ],
  collapse: [
    { label: ".cl-collapse / .is-showing / .is-shown", code: true, text: "definem painel recolhível e seus estados de transição e aberto." },
    { label: "data-cl=\"collapse\" / data-cl-target / aria-expanded", code: true, text: "identificam gatilho, destino e estado; Collapse.getInstance(el).show(), hide() e toggle() são públicos." },
  ],
  stepper: [
    { label: ".cl-stepper / .cl-step / .cl-step-label / .cl-step-content / .is-active / .is-completed / .is-error", code: true, text: "estruturam sequência, conteúdo e estados de cada etapa." },
    { label: "data-cl=\"stepper\" / data-stepper-next / data-stepper-prev / data-stepper-complete", code: true, text: "inicializam e identificam controles; Stepper.getInstance(el) expõe next(), prev(), goTo() e complete()." },
  ],
  "nested-menu": [
    { label: ".cl-nested-menu / .cl-nested-menu-item / .cl-nested-menu-link / .cl-nested-menu-submenu / .is-open", code: true, text: "estruturam a árvore de destinos e seu estado aberto." },
    { label: "data-cl=\"nested-menu\" / data-cl-nested-menu-toggle / data-cl-nested-menu-submenu", code: true, text: "inicializam e identificam gatilho e submenu; NestedMenu.getInstance(el).dispose() remove o comportamento." },
  ],
  "tree-view": [
    { label: ".cl-tree / .cl-tree-item / .cl-tree-label / .cl-tree-children / .cl-tree-toggle", code: true, text: "formam raiz, nó, rótulo, grupo filho e controle de expansão." },
    { label: "data-cl=\"tree-view\" / data-value / aria-selected / aria-expanded", code: true, text: "inicializam a árvore, fornecem valor e estado; TreeView.getInstance(el) expõe expand(), collapse(), toggle() e select()." },
  ],
  dropdown: [
    { label: ".cl-dropdown / .cl-dropdown-menu / .cl-dropdown-item / .cl-dropdown-divider / .is-open", code: true, text: "estruturam gatilho, menu, itens, separador e estado aberto." },
    { label: "data-cl=\"dropdown\" / data-cl-dropdown-toggle / data-align=\"end\" / disabled", code: true, text: "inicializam, identificam o gatilho, alinham o menu e desabilitam opções; Dropdown.getInstance(el).show(), hide() e toggle() são públicos." },
  ],
  tooltip: [
    { label: "data-cl=\"tooltip\" / title / data-title / data-placement=\"top|bottom|left|right\"", code: true, text: "inicializam a dica, fornecem seu texto e definem posicionamento; o JS gera .cl-tooltip, .cl-tooltip-arrow e .cl-tooltip-inner." },
    { label: "new Clarus.Tooltip(el, { title, placement })", code: true, text: "cria manualmente uma instância; show(), hide(), toggle() e dispose() são os métodos públicos." },
  ],
  "hover-card": [
    { label: "data-cl=\"hover-card\" / data-cl-hover-card-content / data-cl-hover-card-placement", code: true, text: "inicializam a prévia e definem conteúdo e posicionamento; o cartão é gerado pelo JavaScript." },
    { label: "HoverCard.getInstance(el).show() / hide() / dispose()", code: true, text: "métodos públicos para controlar o cartão programaticamente." },
  ],
  popover: [
    { label: "data-cl=\"popover\" / data-cl-popover-content / data-cl-popover-placement", code: true, text: "inicializam conteúdo e posicionamento da sobreposição." },
    { label: "Popover.getInstance(el).show() / hide() / toggle() / dispose()", code: true, text: "métodos públicos de controle; o popover visual é gerado pelo JavaScript." },
  ],
  offcanvas: [
    { label: ".cl-offcanvas / .cl-offcanvas-start / .cl-offcanvas-end / .cl-offcanvas-header / .cl-offcanvas-body", code: true, text: "estruturam painel, lado de entrada, cabeçalho e conteúdo." },
    { label: "data-cl=\"offcanvas\" / data-cl-target / data-cl-dismiss=\"offcanvas\" / data-backdrop=\"static\"", code: true, text: "identificam gatilho, destino, fechamento e bloqueio de backdrop; Offcanvas.getInstance(el).show(), hide() e toggle() são públicos." },
  ],
  modal: [
    { label: ".cl-modal / .cl-modal-dialog / .cl-modal-content / .cl-modal-header / .cl-modal-body / .cl-modal-footer / .cl-modal-sm|lg|xl", code: true, text: "formam diálogo, conteúdo, seções e larguras publicadas." },
    { label: "data-cl=\"modal\" / data-cl-target / data-cl-dismiss=\"modal\" / data-backdrop=\"static\"", code: true, text: "identificam gatilho, destino, fechamento e backdrop; Modal.getInstance(el).show(), hide() e toggle() são públicos." },
  ],
  "alert-dialog": [
    { label: "Clarus.confirm({ title, message, confirmText, cancelText, variant })", code: true, text: "cria o diálogo de confirmação e retorna Promise<boolean>; variant aceita uma cor de tema." },
    { label: ".cl-alert-dialog / .cl-alert-dialog-message", code: true, text: "classes geradas internamente sobre a estrutura de Modal; não é necessário escrever a marcação manualmente." },
  ],
  "command-palette": [
    { label: ".cl-command-palette / .cl-command-palette-input / .cl-command-palette-list / .cl-command-palette-item", code: true, text: "estruturam diálogo, busca, resultados e comando." },
    { label: "data-cl=\"command-palette\" / data-cl-command-palette-input / data-cl-command-palette-list / data-command", code: true, text: "inicializam e identificam partes e comandos; CommandPalette.getInstance(el).show(), hide() e toggle() são públicos." },
  ],
  toast: [
    { label: ".cl-toast-container / .cl-toast / .cl-toast-header / .cl-toast-body / .cl-toast-{cor}", code: true, text: "estruturam região, mensagem, seções e variante semântica do cabeçalho." },
    { label: "data-cl=\"toast\" / data-delay=\"4000\" / data-autohide=\"false\" / data-cl-dismiss=\"toast\"", code: true, text: "inicializam, configuram duração e fechamento; Toast.getInstance(el).show(), hide() e toggle() são públicos." },
  ],
  "notification-center": [
    { label: ".cl-notification-badge / .cl-notification-center / .cl-notification-center-header / .cl-notification-center-title / .cl-notification-list / .cl-notification-empty", code: true, text: "estruturam contagem, painel, cabeçalho, título, lista e estado vazio." },
    { label: ".cl-notification-item-{cor} / .cl-notification-item-unread / data-cl=\"notification-center\" / data-cl-target", code: true, text: "aplicam variante e não lida, inicializam o gatilho e apontam o painel." },
    { label: "data-notification=\"clear\" / data-storage=\"local\" / data-storage-key / data-toast-container", code: true, text: "limpam histórico, configuram persistência e definem o contêiner de toasts; NotificationCenter.getInstance(el) expõe push(), remove(), clear(), open(), close() e toggle()." },
  ],
};

if (new URLSearchParams(window.location.search).get("theme") === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  if (themeButton) themeButton.textContent = "Usar tema claro";
}

function createDetails(item) {
  const details = document.createElement("div");
  details.className = "cl-accordion showcase-details";
  details.setAttribute("data-cl", "accordion");
  details.setAttribute("data-multiple", "true");
  const api = Array.isArray(item.api) ? item.api : [{ text: item.api }];
  const extensions = apiExtensions[item.id] || [];
  const apiWithExtensions = [...api, ...extensions].filter((entry, index, all) =>
    !entry.label || all.findIndex((candidate) => candidate.label === entry.label) === index
  );
  const values = [
    ["Quando usar", useContract(item)],
    ["Classes e atributos", apiWithExtensions],
    ["Acessibilidade", accessibilityContract(item)],
    ["Estados e configurações", item.states],
  ];
  for (const [index, [label, value]] of values.entries()) {
    const wrapper = document.createElement("div");
    wrapper.className = "cl-accordion-item";
    const heading = document.createElement("h3");
    heading.className = "cl-accordion-header";
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "cl-accordion-button";
    trigger.setAttribute("aria-expanded", String(index === 0));
    trigger.textContent = label === "Classes e atributos" && Array.isArray(value)
      ? `${label} · ${value.length} opções`
      : label;
    const panel = document.createElement("div");
    panel.className = "cl-accordion-collapse";
    const definition = document.createElement("div");
    definition.className = "cl-accordion-body showcase-detail-body";
    if (value === null) {
      definition.dataset.showcaseExampleApi = "";
      definition.textContent = "Lendo as classes e atributos usados na demonstração…";
    } else if (Array.isArray(value)) {
      const groups = new Map();
      for (const entry of value) {
        const category = label === "Classes e atributos" ? apiCategory(entry) : null;
        if (!groups.has(category)) groups.set(category, []);
        groups.get(category).push(entry);
      }
      for (const [category, entries] of groups) {
        if (category) {
          const subtitle = document.createElement("p");
          subtitle.className = "showcase-detail-heading";
          subtitle.textContent = category;
          definition.append(subtitle);
        }
        const list = document.createElement("ul");
        list.className = "showcase-detail-list";
        for (const entry of entries) {
        const listItem = document.createElement("li");
        if (label === "Exemplos concretos") listItem.className = "showcase-detail-example";
        if (entry.label) {
          const labelElement = document.createElement(entry.code ? "code" : "strong");
          if (entry.code) labelElement.className = `showcase-token showcase-token-${tokenKind(entry.label)}`;
          labelElement.textContent = entry.label;
          listItem.append(labelElement, document.createTextNode(" — "));
          appendFormattedText(listItem, entry.text);
        } else {
          appendFormattedText(listItem, entry.text);
        }
          list.append(listItem);
        }
        definition.append(list);
      }
    } else {
      definition.textContent = value;
    }
    heading.append(trigger);
    panel.append(definition);
    wrapper.append(heading, panel);
    details.append(wrapper);
  }
  return details;
}

function renderExampleApi(section, document, source) {
  const target = section.querySelector("[data-showcase-example-api]");
  if (!target) return;
  if (!document) {
    target.replaceChildren();
    const message = target.ownerDocument.createElement("p");
    message.textContent = "O navegador isolou o iframe deste arquivo local. Consulte o exemplo executável para ver a lista de classes e atributos aplicada.";
    const link = target.ownerDocument.createElement("a");
    link.href = source;
    link.textContent = "Abrir HTML do exemplo";
    target.append(message, link);
    return;
  }

  const classes = new Set();
  const attributes = new Set();
  document.querySelectorAll("[class], *").forEach((element) => {
    element.classList?.forEach((className) => {
      if (className.startsWith("cl-") || className.startsWith("is-")) classes.add(`.${className}`);
    });
    Array.from(element.attributes).forEach((attribute) => {
      if (attribute.name.startsWith("data-") || attribute.name.startsWith("aria-")) {
        attributes.add(attribute.value ? `${attribute.name}="${attribute.value}"` : attribute.name);
      }
    });
  });

  target.replaceChildren();
  const groups = [
    ["Classes no exemplo", [...classes].sort()],
    ["Atributos no exemplo", [...attributes].sort()],
  ];
  groups.forEach(([label, values]) => {
    if (!values.length) return;
    const group = document.createElement("p");
    const heading = document.createElement("strong");
    heading.textContent = `${label}: `;
    group.append(heading);
    values.forEach((value, index) => {
      const code = document.createElement("code");
      code.textContent = value;
      group.append(code);
      if (index < values.length - 1) group.append(document.createTextNode(" "));
    });
    target.append(group);
  });
}

function copyCode(button, code, status) {
  navigator.clipboard.writeText(code.textContent).then(() => {
    button.textContent = "Código copiado";
    status.textContent = "O markup funcional foi copiado para a área de transferência.";
    window.setTimeout(() => { button.textContent = "Copiar código"; }, 1800);
  }).catch(() => {
    status.textContent = "Não foi possível copiar automaticamente. Selecione o código abaixo.";
  });
}

function createSection(item) {
  const section = document.createElement("section");
  section.className = "showcase-section";
  section.id = item.id;
  section.innerHTML = `<h2>${item.title}</h2><p class="showcase-description">${item.description}</p>`;
  const resources = document.createElement("p");
  resources.className = "showcase-resources";
  const resourcesData = [
    [documentationPath(item), "Documentação"],
    ["../docs/reference/design-tokens.md", "Tokens"],
    ["../docs/guides/accessibility.md", "Acessibilidade"],
    ...(relatedDocs[item.id] || []).map((id) => [id === "accessibility" ? "../docs/guides/accessibility.md" : `../docs/components/${id}.md`, id === "accessibility" ? "Guia de acessibilidade" : `Relacionado: ${id}`]),
  ];
  resourcesData.forEach(([href, text]) => {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    resources.append(link);
  });
  section.append(resources);
  section.append(createDetails(item));

  const frame = document.createElement("iframe");
  frame.className = "showcase-preview";
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  frame.dataset.showcaseSource = item.source;
  frame.src = `${item.source}?theme=${theme}`;
  frame.title = `Demonstração funcional: ${item.title}`;
  frame.style.minHeight = "360px";
  section.append(frame);

  const minimalHeader = document.createElement("div");
  minimalHeader.className = "showcase-code-header showcase-minimal-header";
  minimalHeader.innerHTML = "<h3>Estrutura essencial</h3>";
  const minimalCopy = document.createElement("button");
  minimalCopy.type = "button";
  minimalCopy.className = "showcase-copy";
  minimalCopy.textContent = "Copiar estrutura";
  minimalHeader.append(minimalCopy);
  const minimalCode = document.createElement("code");
  const minimalPre = document.createElement("pre");
  minimalPre.className = "showcase-code showcase-minimal-code";
  minimalPre.append(minimalCode);
  section.append(minimalHeader, minimalPre);

  const header = document.createElement("div");
  header.className = "showcase-code-header";
  header.innerHTML = "<h3>HTML do exemplo funcional</h3>";
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "showcase-copy";
  copy.textContent = "Copiar código";
  header.append(copy);
  const code = document.createElement("code");
  const pre = document.createElement("pre");
  pre.className = "showcase-code";
  pre.append(code);
  const status = document.createElement("p");
  status.className = "showcase-status";
  status.setAttribute("aria-live", "polite");
  section.append(header, pre, status);
  copy.addEventListener("click", () => copyCode(copy, code, status));
  minimalCopy.addEventListener("click", () => copyCode(minimalCopy, minimalCode, status));
  frame.addEventListener("load", () => {
    try {
      code.textContent = frame.contentDocument.documentElement.outerHTML.trim();
      const root = frame.contentDocument.body.firstElementChild;
      minimalCode.textContent = root ? root.outerHTML.trim() : `Abra ${item.source} para consultar a estrutura essencial.`;
      frame.style.height = `${Math.max(360, frame.contentDocument.body.scrollHeight + 2)}px`;
      renderExampleApi(section, frame.contentDocument, item.source);
      status.textContent = "Código sincronizado com a demonstração acima.";
    } catch {
      code.textContent = `Abra ${item.source} para consultar o exemplo completo.`;
      minimalCode.textContent = `Abra ${item.source} para consultar a estrutura essencial.`;
      status.textContent = "O navegador isolou o documento; o arquivo de origem continua disponível no link acima.";
      renderExampleApi(section, null, item.source);
    }
  });
  return section;
}

for (const item of catalog) {
  const link = document.createElement("a");
  link.href = `#${item.id}`;
  link.textContent = item.title;
  navigation?.append(link);
  sections?.append(createSection(item));
}

themeButton?.addEventListener("click", () => {
  const dark = document.documentElement.getAttribute("data-theme") !== "dark";
  document.documentElement.toggleAttribute("data-theme", dark);
  if (dark) document.documentElement.setAttribute("data-theme", "dark");
  themeButton.textContent = dark ? "Usar tema claro" : "Usar tema escuro";
  document.querySelectorAll("iframe[data-showcase-source]").forEach((frame) => {
    frame.src = `${frame.dataset.showcaseSource}?theme=${dark ? "dark" : "light"}`;
  });
});

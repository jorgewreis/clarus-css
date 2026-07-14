const catalog = JSON.parse(document.getElementById("showcase-catalog")?.textContent || "[]");
const sections = document.querySelector("[data-showcase-sections]");
const navigation = document.querySelector("[data-showcase-navigation]");
const themeButton = document.querySelector("[data-showcase-theme]");

if (new URLSearchParams(window.location.search).get("theme") === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  if (themeButton) themeButton.textContent = "Usar tema claro";
}

function createDetails(item) {
  const details = document.createElement("dl");
  details.className = "showcase-details";
  const values = [
    ["Quando usar", item.use],
    ["Classes e atributos", item.api],
    ["Acessibilidade", item.a11y],
    ["Estados e configurações", item.states],
  ];
  for (const [label, value] of values) {
    const wrapper = document.createElement("div");
    const term = document.createElement("dt");
    const definition = document.createElement("dd");
    term.textContent = label;
    definition.textContent = value;
    wrapper.append(term, definition);
    details.append(wrapper);
  }
  return details;
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
  section.append(createDetails(item));

  const frame = document.createElement("iframe");
  frame.className = "showcase-preview";
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  frame.dataset.showcaseSource = item.source;
  frame.src = `${item.source}?theme=${theme}`;
  frame.title = `Demonstração funcional: ${item.title}`;
  frame.style.minHeight = "360px";
  section.append(frame);

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
  frame.addEventListener("load", () => {
    try {
      code.textContent = frame.contentDocument.documentElement.outerHTML.trim();
      frame.style.height = `${Math.max(360, frame.contentDocument.body.scrollHeight + 2)}px`;
      status.textContent = "Código sincronizado com a demonstração acima.";
    } catch {
      code.textContent = `Abra ${item.source} para consultar o exemplo completo.`;
      status.textContent = "O navegador isolou o documento; o arquivo de origem continua disponível no link acima.";
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

/*
==========================================
COFFEELAB ACADEMY
Frontend App.js
==========================================
*/

/*
==========================================
URL DA API
- Em localhost: aponta para o backend local
- Em produção: usa caminho relativo (/api),
  evitando CORS e hardcode de domínio
==========================================
*/

const API_BASE =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "/api";

/*
==========================================
FORMATADORES
==========================================
*/

const brl =
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

/*
==========================================
UTILIDADES
==========================================
*/

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

}

function isValidEmail(value) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(value);

}

/*
==========================================
ELEMENTOS
==========================================
*/

const coursesGrid =
  document.getElementById("courses-grid");

const contactForm =
  document.querySelector(".contact form");

/*
==========================================
RENDERIZAR UM CARD
- Cria nós e usa textContent / setAttribute
  em vez de innerHTML com interpolação
==========================================
*/

function buildCourseCard(course) {

  const card = document.createElement("div");
  card.className = "course-card";

  const img = document.createElement("img");
  img.src = course.image || "";
  img.alt = course.title || "Curso";
  card.appendChild(img);

  const content = document.createElement("div");
  content.className = "course-content";

  const title = document.createElement("h3");
  title.textContent = course.title || "";
  content.appendChild(title);

  const desc = document.createElement("p");
  desc.textContent = course.description || "";
  content.appendChild(desc);

  const price = document.createElement("div");
  price.className = "price";
  price.textContent = brl.format(
    Number(course.price) || 0
  );
  content.appendChild(price);

  const btn = document.createElement("button");
  btn.className = "enroll-btn";
  btn.dataset.id = course.id;
  btn.dataset.title = course.title || "";
  btn.textContent = "Inscrever-se";
  content.appendChild(btn);

  card.appendChild(content);

  return card;

}

/*
==========================================
BUSCAR CURSOS
==========================================
*/

async function loadCourses() {

  try {

    coursesGrid.textContent =
      "Carregando cursos...";

    const response =
      await fetch(`${API_BASE}/courses`);

    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status} - ${response.statusText}`
      );

    }

    const courses =
      await response.json();

    coursesGrid.innerHTML = "";

    if (!Array.isArray(courses) || !courses.length) {

      const empty = document.createElement("p");
      empty.textContent =
        "Nenhum curso disponível no momento.";
      coursesGrid.appendChild(empty);
      return;

    }

    const fragment =
      document.createDocumentFragment();

    courses.forEach(course => {
      fragment.appendChild(
        buildCourseCard(course)
      );
    });

    coursesGrid.appendChild(fragment);

  } catch (error) {

    console.error("[loadCourses]", error);

    coursesGrid.innerHTML = "";
    const err = document.createElement("p");
    err.textContent =
      "Erro ao carregar cursos. Tente novamente.";
    coursesGrid.appendChild(err);

  }

}

/*
==========================================
DELEGAÇÃO DE EVENTO PARA INSCRIÇÃO
- Um único listener no grid, anexado
  apenas uma vez
==========================================
*/

if (coursesGrid) {

  coursesGrid.addEventListener("click", (e) => {

    const btn =
      e.target.closest(".enroll-btn");

    if (!btn) return;

    openEnrollModal(
      btn.dataset.id,
      btn.dataset.title
    );

  });

}

/*
==========================================
MODAL DE INSCRIÇÃO
- Substitui os prompt() encadeados
- Construído dinamicamente no DOM
- Fechável por ESC, overlay ou botão
==========================================
*/

function openEnrollModal(courseId, courseTitle) {

  const overlay = document.createElement("div");
  overlay.className = "enroll-overlay";
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  const modal = document.createElement("div");
  modal.style.cssText = `
    background: #fff;
    color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    width: min(420px, 92vw);
    box-shadow: 0 10px 30px rgba(0,0,0,.25);
    font-family: inherit;
  `;

  const heading = document.createElement("h3");
  heading.textContent = "Inscrição";
  heading.style.margin = "0 0 .5rem";
  modal.appendChild(heading);

  const subtitle = document.createElement("p");
  subtitle.textContent = courseTitle;
  subtitle.style.cssText =
    "margin: 0 0 1rem; color:#666;";
  modal.appendChild(subtitle);

  function field(labelText, type, name, autocomplete) {

    const wrap = document.createElement("label");
    wrap.style.cssText =
      "display:block; margin-bottom:.75rem;";

    const span = document.createElement("span");
    span.textContent = labelText;
    span.style.cssText =
      "display:block; font-size:.9rem; margin-bottom:.25rem;";
    wrap.appendChild(span);

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.required = true;
    if (autocomplete) input.autocomplete = autocomplete;
    input.style.cssText = `
      width: 100%;
      padding: .55rem .65rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font: inherit;
      box-sizing: border-box;
    `;
    wrap.appendChild(input);

    return { wrap, input };

  }

  const nameField =
    field("Nome", "text", "name", "name");
  const emailField =
    field("E-mail", "email", "email", "email");
  const phoneField =
    field("Telefone", "tel", "phone", "tel");

  modal.appendChild(nameField.wrap);
  modal.appendChild(emailField.wrap);
  modal.appendChild(phoneField.wrap);

  const errorBox = document.createElement("p");
  errorBox.style.cssText =
    "color:#c0392b; margin:.25rem 0 .75rem; min-height:1.2em; font-size:.9rem;";
  modal.appendChild(errorBox);

  const actions = document.createElement("div");
  actions.style.cssText =
    "display:flex; gap:.5rem; justify-content:flex-end;";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancelar";
  cancelBtn.style.cssText =
    "padding:.5rem .9rem; border:1px solid #ccc; background:#fff; border-radius:6px; cursor:pointer;";

  const submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.textContent = "Confirmar inscrição";
  submitBtn.style.cssText =
    "padding:.5rem .9rem; border:0; background:#7a4a2b; color:#fff; border-radius:6px; cursor:pointer;";

  actions.appendChild(cancelBtn);
  actions.appendChild(submitBtn);
  modal.appendChild(actions);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  nameField.input.focus();

  function close() {
    document.removeEventListener("keydown", onKey);
    overlay.remove();
  }

  function onKey(e) {
    if (e.key === "Escape") close();
  }

  document.addEventListener("keydown", onKey);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  cancelBtn.addEventListener("click", close);

  submitBtn.addEventListener("click", async () => {

    const name = nameField.input.value.trim();
    const email = emailField.input.value.trim();
    const phone = phoneField.input.value.trim();

    if (!name || !email || !phone) {
      errorBox.textContent =
        "Preencha todos os campos.";
      return;
    }

    if (!isValidEmail(email)) {
      errorBox.textContent =
        "Informe um e-mail válido.";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
    errorBox.textContent = "";

    try {

      const response = await fetch(
        `${API_BASE}/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            course_id: courseId,
            student_name: name,
            student_email: email,
            student_phone: phone
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      close();
      alert(
        `Inscrição confirmada em:\n\n${courseTitle}\n\nEntraremos em contato.`
      );

    } catch (error) {

      console.error("[enroll]", error);
      errorBox.textContent =
        "Erro ao realizar inscrição. Tente novamente.";
      submitBtn.disabled = false;
      submitBtn.textContent =
        "Confirmar inscrição";

    }

  });

}

/*
==========================================
FORMULÁRIO DE CONTATO
- Lê campos via FormData (depende de
  os inputs terem atributo name no HTML)
==========================================
*/

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const data = new FormData(contactForm);

      const name =
        (data.get("name") || "").toString().trim();
      const email =
        (data.get("email") || "").toString().trim();
      const message =
        (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        alert("Preencha todos os campos.");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Informe um e-mail válido.");
        return;
      }

      const submitBtn =
        contactForm.querySelector(
          'button[type="submit"], button'
        );

      if (submitBtn) {
        submitBtn.disabled = true;
      }

      try {

        const response = await fetch(
          `${API_BASE}/contact`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name,
              email,
              message
            })
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        alert("Mensagem enviada com sucesso!");
        contactForm.reset();

      } catch (error) {

        console.error("[contact]", error);
        alert(
          "Erro ao enviar mensagem. Tente novamente."
        );

      } finally {

        if (submitBtn) {
          submitBtn.disabled = false;
        }

      }

    }
  );

}

/*
==========================================
SCROLL SUAVE MENU
- Ignora href="#" puro para evitar erro
  em querySelector
==========================================
*/

document
  .querySelectorAll("nav a")
  .forEach(link => {

    link.addEventListener("click", (e) => {

      const href = link.getAttribute("href");

      if (
        !href ||
        !href.startsWith("#") ||
        href.length <= 1
      ) {
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth"
        });
      }

    });

  });

/*
==========================================
INICIAR APP
==========================================
*/

document.addEventListener(
  "DOMContentLoaded",
  () => {
    loadCourses();
  }
);
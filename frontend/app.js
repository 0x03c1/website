/*
==========================================
COFFEELAB ACADEMY
Frontend App.js
==========================================
*/

/*
==========================================
URL DA API
==========================================
*/

const API_BASE =
  "https://SEU_BACKEND.netlify.app/api";

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
BUSCAR CURSOS
==========================================
*/

async function loadCourses() {

  try {

    coursesGrid.innerHTML =
      "<p>Carregando cursos...</p>";

    const response =
      await fetch(`${API_BASE}/courses`);

    if (!response.ok) {

      throw new Error(
        "Erro ao carregar cursos"
      );

    }

    const courses =
      await response.json();

    coursesGrid.innerHTML = "";

    if (!courses.length) {

      coursesGrid.innerHTML = `
        <p>
          Nenhum curso disponível no momento.
        </p>
      `;

      return;

    }

    courses.forEach(course => {

      const card = document.createElement("div");

      card.className = "course-card";

      card.innerHTML = `

        <img
          src="${course.image}"
          alt="${course.title}"
        />

        <div class="course-content">

          <h3>
            ${course.title}
          </h3>

          <p>
            ${course.description}
          </p>

          <div class="price">
            R$ ${Number(course.price).toFixed(2)}
          </div>

          <button
            data-id="${course.id}"
            data-title="${course.title}"
            class="enroll-btn"
          >
            Inscrever-se
          </button>

        </div>

      `;

      coursesGrid.appendChild(card);

    });

    initEnrollButtons();

  } catch (error) {

    console.error(error);

    coursesGrid.innerHTML = `
      <p>
        Erro ao carregar cursos.
      </p>
    `;

  }

}

/*
==========================================
BOTÕES DE INSCRIÇÃO
==========================================
*/

function initEnrollButtons() {

  const buttons =
    document.querySelectorAll(".enroll-btn");

  buttons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const courseId =
          button.dataset.id;

        const courseTitle =
          button.dataset.title;

        enrollCourse(
          courseId,
          courseTitle
        );

      }
    );

  });

}

/*
==========================================
INSCRIÇÃO
==========================================
*/

async function enrollCourse(
  courseId,
  courseTitle
) {

  const studentName =
    prompt("Digite seu nome:");

  if (!studentName) return;

  const studentEmail =
    prompt("Digite seu e-mail:");

  if (!studentEmail) return;

  const studentPhone =
    prompt("Digite seu telefone:");

  try {

    const response =
      await fetch(
        `${API_BASE}/enroll`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            course_id: courseId,

            student_name: studentName,

            student_email: studentEmail,

            student_phone: studentPhone

          })

        }
      );

    if (!response.ok) {

      throw new Error(
        "Erro na inscrição"
      );

    }

    alert(
      `
Você se inscreveu em:

${courseTitle}

Entraremos em contato.
      `
    );

  } catch (error) {

    console.error(error);

    alert(
      "Erro ao realizar inscrição."
    );

  }

}

/*
==========================================
FORMULÁRIO DE CONTATO
==========================================
*/

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const name =
        contactForm
          .querySelector(
            'input[type="text"]'
          )
          .value
          .trim();

      const email =
        contactForm
          .querySelector(
            'input[type="email"]'
          )
          .value
          .trim();

      const message =
        contactForm
          .querySelector(
            "textarea"
          )
          .value
          .trim();

      if (
        !name ||
        !email ||
        !message
      ) {

        alert(
          "Preencha todos os campos."
        );

        return;

      }

      try {

        const response =
          await fetch(
            `${API_BASE}/contact`,
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
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
            "Erro ao enviar mensagem"
          );

        }

        alert(
          "Mensagem enviada com sucesso!"
        );

        contactForm.reset();

      } catch (error) {

        console.error(error);

        alert(
          "Erro ao enviar mensagem."
        );

      }

    }
  );

}

/*
==========================================
SCROLL SUAVE MENU
==========================================
*/

document
  .querySelectorAll("nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      e => {

        const href =
          link.getAttribute("href");

        if (
          href &&
          href.startsWith("#")
        ) {

          e.preventDefault();

          const target =
            document.querySelector(href);

          if (target) {

            target.scrollIntoView({
              behavior: "smooth"
            });

          }

        }

      }
    );

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
```md
# ☕ CoffeeLab Academy

Plataforma de cursos de barista com frontend estático (Netlify), backend Node.js e banco MySQL no FreeSQLDatabase.

---

# 🚀 Tecnologias

- HTML, CSS, JavaScript (Frontend)
- Node.js + Express (Backend API)
- MySQL (FreeSQLDatabase)
- Netlify (Deploy frontend + functions)
- GitHub Actions (CI/CD)
- Environment Variables (Secrets)

---

# 📁 Estrutura do projeto

```

coffeelab-academy/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── .env (local apenas)
│
├── netlify.toml
└── README.md

````

---

# 🧠 1. Criar banco de dados (FreeSQLDatabase)

Acesse:
https://www.freesqldatabase.com/

### Crie o banco e copie:

- Host
- User
- Password
- Database name

---

## 📦 Executar SQL inicial

No painel MySQL, rode:

```sql
CREATE DATABASE coffeelab;

USE coffeelab;

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120),
  slug VARCHAR(140),
  description VARCHAR(500),
  price DECIMAL(10,2),
  image TEXT,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  student_name VARCHAR(120),
  student_email VARCHAR(150),
  student_phone VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120),
  email VARCHAR(150),
  message VARCHAR(1000),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
````

---

# ⚙️ 2. Configurar backend (Node.js)

## Instalar dependências

```bash
npm init -y
npm install express mysql2 cors dotenv serverless-http
```

---

## 📄 db.js (conexão MySQL com secrets)

```js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 5
});

module.exports = pool;
```

---

## 📄 server.js (API)

Endpoints:

* GET /courses
* POST /enroll
* POST /contact

---

# 🌐 3. Frontend (Netlify)

## app.js

Configure API:

```js
const API_BASE =
  "https://SEU-SITE.netlify.app/api";
```

---

## index.html

* Cursos carregam dinamicamente
* Formulário de contato conectado
* Inscrição via API

---

# 🔐 4. Environment Variables (SECRETS)

## GitHub Secrets

Vá em:

```
GitHub → Settings → Secrets → Actions
```

Crie:

* MYSQL_HOST
* MYSQL_USER
* MYSQL_PASSWORD
* MYSQL_DATABASE
* MYSQL_PORT

---

## Netlify Environment Variables

```
Netlify → Site settings → Environment variables
```

Adicionar:

```
MYSQL_HOST
MYSQL_USER
MYSQL_PASSWORD
MYSQL_DATABASE
MYSQL_PORT
```

---

# 🚀 5. Deploy no Netlify (CI/CD)

## Passo a passo:

1. Suba código no GitHub
2. Vá no Netlify
3. Clique "Add new site"
4. Conecte GitHub
5. Escolha repo
6. Configure:

```
Build command: (vazio ou npm install)
Publish directory: frontend
Functions directory: functions
```

---

# 🔁 6. Netlify Functions (API)

Crie:

```
/netlify/functions/api.js
```

E conecte Express com serverless:

```js
const serverless = require("serverless-http");
const app = require("../../backend/server");

module.exports.handler = serverless(app);
```

---

# 🔗 7. Rotas finais

Frontend chama:

```
/api/courses
/api/enroll
/api/contact
```

Netlify redireciona automaticamente.

---

# 📊 8. Limite de 5MB (otimização)

Para não estourar o banco:

✔ Não armazenar imagens no banco
✔ Usar URLs externas (Unsplash)
✔ Limitar textos (VARCHAR 500)
✔ Remover logs antigos
✔ Usar índices leves

---

# 🧪 9. Testes locais

Backend:

```bash
node backend/server.js
```

Frontend:

```bash
abrir index.html no navegador
```

---

# 🛡️ 10. Segurança

✔ Nunca commitar .env
✔ Usar GitHub Secrets
✔ Validar inputs no backend
✔ Usar CORS corretamente

---

# 📦 11. Fluxo final

```
Usuário (Netlify Frontend)
        ↓
Netlify Function (API)
        ↓
Node.js Express
        ↓
MySQL FreeSQLDatabase
```

---

# ☕ Resultado

Você terá:

✔ Site profissional de cursos
✔ Backend escalável
✔ Banco leve (5MB)
✔ Deploy automático GitHub → Netlify
✔ API funcionando em produção

---

# 📌 Futuras melhorias

* Login de alunos
* Dashboard admin
* Pagamentos (Stripe / Pix)
* Certificados PDF
* Área do aluno

```

---

Se quiser, posso te entregar a próxima evolução desse projeto:

👉 painel admin completo  
👉 sistema de login JWT  
👉 checkout Pix  
👉 área do aluno com aulas  

Só me fala o próximo passo.
```

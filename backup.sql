CREATE DATABASE IF NOT EXISTS coffeelab_academy
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE coffeelab_academy;

-- ==========================================
-- CURSOS
-- ==========================================

CREATE TABLE courses (

  id INT AUTO_INCREMENT PRIMARY KEY,

  title VARCHAR(120) NOT NULL,

  slug VARCHAR(140) UNIQUE NOT NULL,

  description VARCHAR(500) NOT NULL,

  price DECIMAL(10,2) NOT NULL,

  image VARCHAR(500) NOT NULL,

  active TINYINT(1) DEFAULT 1,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================
-- INSCRIÇÕES
-- ==========================================

CREATE TABLE enrollments (

  id INT AUTO_INCREMENT PRIMARY KEY,

  course_id INT NOT NULL,

  student_name VARCHAR(120) NOT NULL,

  student_email VARCHAR(150) NOT NULL,

  student_phone VARCHAR(30),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_course
    FOREIGN KEY (course_id)
    REFERENCES courses(id)
    ON DELETE CASCADE

);

-- ==========================================
-- CONTATOS
-- ==========================================

CREATE TABLE contacts (

  id INT AUTO_INCREMENT PRIMARY KEY,

  name VARCHAR(120) NOT NULL,

  email VARCHAR(150) NOT NULL,

  message VARCHAR(1000) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================
-- ADMIN
-- ==========================================

CREATE TABLE admins (

  id INT AUTO_INCREMENT PRIMARY KEY,

  name VARCHAR(100) NOT NULL,

  email VARCHAR(150) UNIQUE NOT NULL,

  password_hash VARCHAR(255) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================
-- DADOS INICIAIS
-- ==========================================

INSERT INTO courses
(title, slug, description, price, image)
VALUES

(
'Curso de Barista Profissional',
'curso-barista-profissional',
'Aprenda moagem, espresso e vaporização.',
497.00,
'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200'
),

(
'Workshop Latte Art',
'workshop-latte-art',
'Técnicas avançadas de latte art.',
297.00,
'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200'
),

(
'Gestão de Cafeteria',
'gestao-de-cafeteria',
'Administração completa de cafeterias.',
697.00,
'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200'
);
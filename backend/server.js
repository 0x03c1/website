require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/*
==========================================
CURSOS
==========================================
*/

app.get("/courses", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM courses WHERE active = 1 ORDER BY id DESC"
        );

        res.json(rows);

    } catch (err) {

        res.status(500).json(err);

    }

});

/*
==========================================
CONTATO
==========================================
*/

app.post("/contact", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        await db.query(
            `
      INSERT INTO contacts
      (name, email, message)
      VALUES (?, ?, ?)
      `,
            [name, email, message]
        );

        res.json({
            success: true
        });

    } catch (err) {

        res.status(500).json(err);

    }

});

/*
==========================================
INSCRIÇÃO
==========================================
*/

app.post("/enroll", async (req, res) => {

    try {

        const {
            course_id,
            student_name,
            student_email,
            student_phone
        } = req.body;

        await db.query(
            `
      INSERT INTO enrollments
      (
        course_id,
        student_name,
        student_email,
        student_phone
      )
      VALUES (?, ?, ?, ?)
      `,
            [
                course_id,
                student_name,
                student_email,
                student_phone
            ]
        );

        res.json({
            success: true
        });

    } catch (err) {

        res.status(500).json(err);

    }

});

app.listen(3000, () => {
    console.log("Servidor rodando");
});
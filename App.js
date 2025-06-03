const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
app.use(express.json());
const porta = 3000;

const db_config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "lojaSneakers",
};

app.get("/marca", async (request, response) => {
    try {
      const conn = await mysql.createConnection(db_config);
      const [rows] = await conn.execute(
        `SELECT 
              * FROM modelo mo LEFT JOIN marca ma ON ma.marcaid = mo.marcaid
              `
      );
      await conn.end();
    
    response.json(Object.values(rows));
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ error: "Erro ao conectar com o banco de dados" });
  }
});

app.put("/marca/:marcaid", async (request, response) => {
    try {
      const { marcaid } = request.params;
      const { marcanome } = request.body;
  
      if (!marcanome) {
        return response.status(400).json({
          error: "A marca não foi digitada",
        });
      }
      const conn = await mysql.createConnection(db_config);
      const [result] = await conn.execute(
        `UPDATE marca SET nome = ? WHERE id = ?`,
        [marcanome, marcaid]
      );
  
      await conn.end();
  
      if (result.affectedRows === 0) {
        return response
          .status(404)
          .json({ error: "Marca não encontrada" });
      }
      response.json({ message: "Marca atualizada com sucesso!", updated: marcaid });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro ao conectar com o banco de dados",
      });
    }
  });

  app.delete("/marca/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const conn = await mysql.createConnection(db_config);
      const [result] = await conn.execute(`DELETE FROM marca WHERE marcaid = ?`, [
        id,
      ]);
  
      await conn.end();
  
      if (result.affectedRows === 0) {
        return response
          .status(404)
          .json({ error: "Marca não encontrada" });
      }
      response.json({ message: "Marca deletada com sucesso!", deleted:id });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro ao conectar com o banco de dados",
      });
    }
  });

  app.post("/marca/", async (request, response) => {
    try {
      const { nome } = request.body;
      const conn = await mysql.createConnection(db_config);
  
      if (!nome) {
        return response.status(400).json({
          error: "Insira o nome no campo de texto",
        });
      }
  
      const [result] = await conn.execute(
        `INSERT INTO marca (marcanome) VALUES (?)`,
        [nome]
      );
      await conn.end();
  
      if (result.affectedRows === 0) {
        return response
          .status(404)
          .json({ error: "Marca não encontrado" });
      }
      response.json({
        message: "Marca inserido com sucesso!",
        marca: {
          id: result.insertId,
          nome,
        },
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro ao conectar com o banco de dados",
      });
    }
  });

  app.listen(porta, () => {
    console.log(
      `Servidor rodando na porta ${porta} em http://localhost:${porta}/marca`
    );
  });
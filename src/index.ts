import express from "express";
import path from "node:path";
import { clientesRouter } from "./clientes/routes.js";
import { comerciantesRouter } from "./comerciantes/routes.js";
import { vendedoresRouter } from "./vendedor/routes.js";
import { initDatabase } from "./database/connector.js";
import { comerciantes } from "./comerciantes.js";
import { ComercianteRepository } from "./database/repositories/comerciante-repository.js";
import { ProdutoRepository } from "./database/repositories/produto-repository.js";

const db = initDatabase();

const produtoRepository = new ProdutoRepository(db);
const comercianteRepository = new ComercianteRepository(db, produtoRepository);

// Adiciona os valores iniciais no banco de dados
for (const comerciante of comerciantes) {
  comercianteRepository.criar(comerciante);
}

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (_, res) => {
  res.render("identificacao");
});

app.get("/cadastro", (_, res) => {
  res.render("cadastro");
});

// app.get("/cliente", (_, res) => {
//   res.render("cliente");
// });

app.use("/cliente", clientesRouter);
app.use("/comerciante", comerciantesRouter);
app.use("/vendedor", vendedoresRouter);

app.listen("3000", () => {
  console.log("Servidor rodando em http://localhost:3000/");
});


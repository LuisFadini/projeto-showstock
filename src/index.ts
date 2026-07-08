import express from "express";
import path from "node:path";
import { createClientesRoutes } from "./clientes/routes.js";
import { createVendedoresRoutes } from "./vendedor/routes.js";
import { initDatabase } from "./database/connector.js";
import { comerciantes } from "./comerciantes.js";
import { ComercianteRepository } from "./database/repositories/comerciante-repository.js";
import { ProdutoRepository } from "./database/repositories/produto-repository.js";
import { createComerciantesRoutes } from "./comerciantes/routes.js";
import { ComerciantesController } from "./comerciantes/controller.js";
import { ClientesController } from "./clientes/controller.js";
import { VendedoresController } from "./vendedor/controller.js";

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


const comerciantesController = new ComerciantesController(comercianteRepository, produtoRepository);
app.use("/comerciante", createComerciantesRoutes(comerciantesController));


const clientesController = new ClientesController(comercianteRepository);
app.use("/cliente", createClientesRoutes(clientesController));


const vendedoresController = new VendedoresController(comercianteRepository, produtoRepository);
app.use("/vendedor", createVendedoresRoutes(vendedoresController));

app.listen("3000", () => {
  console.log("Servidor rodando em http://localhost:3000/");
});


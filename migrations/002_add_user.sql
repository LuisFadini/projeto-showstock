CREATE TABLE
  usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL,
    telefone TEXT,
    endereco TEXT,
    sobre TEXT,
    foto TEXT NOT NULL DEFAULT 'perfil.png'
  );
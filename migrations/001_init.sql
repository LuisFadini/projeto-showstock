CREATE TABLE
  comerciantes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sobre TEXT,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    imagem TEXT NOT NULL DEFAULT 'placeholder.jpg',
    relevancia INTEGER DEFAULT 0,
    data TEXT,
    categorias TEXT NOT NULL DEFAULT '[]'
  );

CREATE TABLE
  produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comerciante_id INTEGER NOT NULL,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL CHECK (preco > 0),
    quantidade INTEGER NOT NULL CHECK (quantidade >= 0),
    marca TEXT NOT NULL,
    categoria TEXT NOT NULL,
    imagem TEXT NOT NULL DEFAULT 'placeholder.jpg',
    FOREIGN KEY (comerciante_id) REFERENCES comerciantes (id) ON DELETE CASCADE
  );
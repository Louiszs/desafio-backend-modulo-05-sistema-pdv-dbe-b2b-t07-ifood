create table
  usuarios (
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null
  );

create table
  categorias (id serial primary key, descricao text);

insert into categorias (descricao) values
  ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games');

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    valor FLOAT NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id) NOT NULL
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    cep VARCHAR(10),
    rua VARCHAR(255),
    numero VARCHAR(20),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(100)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id integer,
    observacao TEXT,
    valor_total NUMERIC
);

CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id integer REFERENCES pedidos(id),
    produto_id integer references produtos(id),
    quantidade_produto INTEGER,
    valor_produto NUMERIC
);

CREATE TABLE produto_imagem (
    id SERIAL PRIMARY KEY,
    produto_imagem text
);

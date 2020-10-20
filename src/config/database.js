const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('data.db');



const LIVROS_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL, 
    preco REAL NOT NULL,
    descricao TEXT DEFAULT ('') NOT NULL
)
`;

const INSERIR_LIVRO_1 = 
`
INSERT INTO livros (
    titulo,
    preco,
    descricao
) SELECT 'Livro teste', 30.0, 'Testando Crud.' WHERE NOT EXISTS (SELECT * FROM livros WHERE titulo = 'Livro teste')
`;

const INSERIR_LIVRO_2 = 
`
INSERT INTO livros (
    titulo, 
    preco,
    descricao
) SELECT 'Livro teste2', 40.0, 'Testando crud2' WHERE NOT EXISTS (SELECT * FROM livros WHERE titulo = 'Livro teste2')
`;

bd.serialize(() => {
    bd.run("PRAGMA foreign_keys=ON");
    bd.run(LIVROS_SCHEMA);
    bd.run(INSERIR_LIVRO_1);
    bd.run(INSERIR_LIVRO_2);

});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = bd;
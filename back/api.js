// DEPENDENCIA A SEREM INSTALADAS
//npm init 
//npm i express cors mysql
//npm install body-parser => Faz a analise de dados conoidos no corpoda requisição,disponibilizando as propriedades em req.query
//comando pra rodar o servidor é o 'node api.js'

//DECLARANDO AS BIBLIOTECAS (NÃO FUNCIONA SEM ELAS)
const express = require('express');
const porta = 3000;
const url = 'http://localhost:3000/';
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');


//CONECTAR COM O BANCO DE DADOS 'node api.js
const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'academia'
})


const create = (req, res) => {
    //DECALARAR OS CAMPOS NECESSARIOS
    let nome = req.body.nome;
    let rg = req.body.rg;
    let cpf = req.body.cpf;
    let tel = req.body.tel;
    let endereco = req.body.endereco;
    let formadepagamento = req.body.formadepagamento;

    //CONEXÃO COM O BANCO DE DADOS
    let query = `INSERT INTO cadastro (nome, rg, cpf, tel, endereco, formadepagamento) VALUE`
    query += `('${nome}', '${rg}','${cpf}','${tel}','${endereco}','${formadepagamento}');`;

    con.query(query, (err, result) => {
        if (err) {
            res.redirect("http://127.0.0.1:5500/front/index.htmlv")
        } else {
            res.redirect("http://127.0.0.1:5500/front/index.html")
        }
    })
}


const read = (req, res) => {
    con.query("SELECT * FROM cadastro", (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    })
}

//ESSE TESTE IRA APARECER NA PAGINA WEB
const teste = (req, res) => {
    res.send("Api respondendo");
}

//CONFIGURAÇÃO DE SAIDA PRO FRONT 
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

//ROTAS DE SAIDA
app.get("/", teste);
app.post("/cadastro", create);
app.get("/cadastro", read);

//TESTE NO CONSOLE
app.listen(3000, () => {
    console.log("Sevidor respondendo na porta: ", porta);

})
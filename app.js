const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Produtos = require("./models/Produtos")
app.use(express.json())
//app.use(express.urlencoded({extended:true}))

//Configurar BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/cadastro",function(req,res){
    Produtos.create({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao
    }).then(function(){
        res.send("Produto cadastrado com sucesso!");
    }).catch(function(erro){
        res.send("Erro ao cadastrar o produto " + erro);
    });
});
//app.get("/",function(req,res){
//    res.send("Seja bem vindo ao nosso site")
//});
//app.get("/artigos/:id/:data",function(req,res){  
//    if(req.params.id == "1" && req.params.data == "18-04-2025"){
//        res.send("1 - Como criar aplicativos android e iOS")
//    }else if(req.params.id == "2"){
//        res.send("2 - Como usar o Node.js")
//    }else{
//       res.send("Nenhum artigo foi encontrado")
//    } 
//});
//app.get("/contato",function(req,res){
//    res.send("Deixe seu contato")
//})

app.get("/", function(req,res){
    Produtos.findAll().then(function(produtos){
        res.send({produtos})
    }).catch(function(erro){
        res.send("Erro ao buscar os dados " + erro);
    })
});

/*app.get("/:nome",function(req,res){
    Produtos.findAll({where: {"nome": req.params.nome}}).then(function(produto){
        res.send("aaaa" && produto );
        
    }).catch(function(erro){
        res.send("Produto não existe na base de dados " +erro);
    });
});
*/

app.get("/:nome", function (req, res) {
    Produtos.findAll({
        where: { nome: req.params.nome }
    })
    .then(function (produtos) {
        if (produtos.length === 0) {
            // Nenhum produto encontrado
            return res.status(404).send("Produto não encontrado.");
        }
        // Retorna mensagem + dados
        res.json({
            mensagem: "Produtos encontrados",
            dados: produtos
        });
    })
    .catch(function (erro) {
        console.error("Erro ao buscar produto:", erro);
        res.status(500).send("Erro no servidor: " + erro.message);
    });
});

app.patch("/atualizar/:id",function(req,res){
    Produtos.update({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao},
        {where:{"id": req.params.id}}
    ).then(function(){
        res.send("Sucesso ao atualizar os dados do produto!");
    }).catch(function(erro){
        res.send("Erro ao atualizar os dados do produto " + erro);
    });
});

app.delete("/deletar/:id",function(req,res){
    Produtos.destroy({where: {"id": req.params.id}}).then(function(){
        res.send("Produto deletado com sucesso!");
    }).catch(function(erro){
        res.send("Erro ao deletar produto" + erro);
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT,"0.0.0.0",function(){
    console.log("Servidor está rodando..");
});
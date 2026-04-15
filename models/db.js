const Sequelize = require ("sequelize")
const sequelize = new Sequelize(
    "cadastro",
    "root",
    "senai",
    {
        host: "localhost",
        dialect: "mysql"
    }
);
sequelize.authenticate().then((function(){
console.log ("Banco de dados conectado com sucesso!")
})).
catch (function(erro){
    console.log ("Erro so se conectar com o banco de dados" + erro)
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};
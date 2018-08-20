const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './data_base.sqlite',
    define: {
        freezeTableName: false, // true para desabilitar o plural
        timestamps: true, // false para remover as colunas de data
    },
})

const Usuario = sequelize.define('usuario', {
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    nascimento: Sequelize.DATEONLY,
    email: {
        type: Sequelize.STRING(200),
        unique: true,
    }
})

module.exports = {
    sequelize,
    Usuario
};

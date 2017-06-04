module.exports = (Sequelize, sequelize) => {
    return sequelize.define('genre', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        genre: Sequelize.STRING
    });    
};
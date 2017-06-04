module.exports = (Sequelize, sequelize) => {
    return sequelize.define('artist', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        website: Sequelize.STRING
    });    
};
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('profile', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: Sequelize.STRING,
        password: Sequelize.STRING
    });    
};
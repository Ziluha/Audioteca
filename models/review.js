module.exports = (Sequelize, sequelize) => {
    return sequelize.define('review', {
        text: Sequelize.TEXT
    });    
};
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('rating', {
        rate: Sequelize.INTEGER
    });    
};
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('track', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        playcount: Sequelize.INTEGER,
        duration: Sequelize.INTEGER,
        annotation: Sequelize.TEXT,
        img: Sequelize.STRING
    });    
};
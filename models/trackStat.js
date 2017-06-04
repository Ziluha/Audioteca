module.exports = (Sequelize, sequelize) => {
    return sequelize.define('trackstat', {
        status: Sequelize.INTEGER
    });    
};
//1 - not reading
//2 - reading
//3 - want to read
//4 - stoped
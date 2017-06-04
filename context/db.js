module.exports = (Sequelize, config) => {
    const options = {
        host: config.host,
        dialect: config.dialect,
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: { $eq: null }
                }
            }
        }
    };

    const sequelize = new Sequelize(config.name, config.user, config.password, options); 
    const Profile = require('../models/profile')(Sequelize, sequelize);
    const Track = require('../models/tracks')(Sequelize, sequelize);
    const Genre = require('../models/genre')(Sequelize, sequelize);
    const Artist = require('../models/artists')(Sequelize, sequelize);
    const TrackArtist = require('../models/trackArtists')(Sequelize, sequelize);
    const TrackGenres = require('../models/trackGenres')(Sequelize, sequelize);
    const TrackStat = require('../models/trackStat')(Sequelize, sequelize);
    const Review = require('../models/review')(Sequelize, sequelize);
    const Rating = require('../models/rating')(Sequelize, sequelize);

    Track.belongsToMany(Artist, {as: 'trackartist', through: TrackArtist,
     timestamps: true, foreignKey: 'trackId'});
    Artist.belongsToMany(Track, {as: 'trackartist', through: TrackArtist,
     timestamps: true, foreignKey: 'artistId'});

    Track.belongsToMany(Genre, {as: 'trackgenre', through: TrackGenres,
     timestamps: true, foreignKey: 'trackId'});
    Genre.belongsToMany(Track, {as: 'trackgenre', through: TrackGenres,
     timestamps: true, foreignKey: 'genreId'});

    Track.belongsToMany(Profile, {as: 'trackstat', through: TrackStat,
     timestamps: true, foreignKey: 'trackId'});
    Profile.belongsToMany(Track, {as: 'trackstat', through: TrackStat,
     timestamps: true, foreignKey: 'profileId'});

    Track.belongsToMany(Profile, {as: 'trackreview', through: Review,
     timestamps: true, foreignKey: 'trackId'});
    Profile.belongsToMany(Track, {as: 'trackreview', through: Review,
     timestamps: true, foreignKey: 'profileId'});

    Track.belongsToMany(Profile, {as: 'trackrating', through: Rating,
     timestamps: true, foreignKey: 'trackId'});
    Profile.belongsToMany(Track, {as: 'trackrating', through: Rating,
     timestamps: true, foreignKey: 'profileId'});

     return {
        profile: Profile,
        track: Track,
        genre: Genre,
        artist: Artist,
        trackatrist: TrackArtist,
        trackgenre: TrackGenres,
        trackstat: TrackStat,
        review: Review,
        rating: Rating,
        sequelize: sequelize
    };
};
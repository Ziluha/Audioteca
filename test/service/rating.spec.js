let rating = [
    {
        trackId: 1,
        profileId:1,
        playcount: 5
    },
    {
        trackId: 2,
        profileId:2,
        playcount: 5
    }
];

let mockRating = require('./../mock/repository') (rating);
let serviceRating = require('../../services/rating') (mockRating);

describe('rating', () => {
     it('return promise', () => {
        expect(serviceRating.deleteplaycount({body:{trackid:1}},{locals:{user:{id:1}}}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await serviceRating.deleteplaycount({body:{trackid:1}},{locals:{user:{id:1}}});
        expect(mockRating.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data": 1
                                });
    });
     it('updated test', async () => {
        let record = await serviceRating.changeplaycount({body:{trackid:1}, params:{playcount: 4}},{locals:{user:{id:1}}});
        expect(mockRating.update).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data":[1,{"playcount":4}]
                                });
    });

});


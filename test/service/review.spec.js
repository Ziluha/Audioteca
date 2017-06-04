let review = [
    {
        trackId: 1,
        profileId:1,
        text: "text"
    },
    {
        trackId: 2,
        artistId:2,
        text: "text"
    }
];

let mockReview = require('./../mock/repository') (review);
let serviceReview = require('../../services/review') (mockReview);

describe('review', () => {
     it('return promise', () => {
        expect(serviceReview.deleteReview({body:{trackid:1}},{locals:{user:{id:1}}}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await serviceReview.deleteReview({body:{trackid:1}},{locals:{user:{id:1}}});
        expect(mockReview.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data": 1
                                });
    });
    it('updated test', async () => {
        let record = await serviceReview.changeReview({body:{trackid:1, review: "new text"}},{locals:{user:{id:1}}});
        expect(mockReview.update).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data":[1,{"text":"new text"}]
                                });
    });


});

let trackshelf = [
    {
        trackId: 1,
        profileId: 1,
        status: 1
    },
    {
        trackId: 2,
        profileId: 2,
        status: 2
    }
];

let mocktrackshelf = require('./../mock/repository') (trackshelf);
let servicetrackshelf = require('../../services/trackstat') (mocktrackshelf);

describe('trackshelf', () => {
     it('return promise', () => {
        expect(servicetrackshelf.deleteTrack({params:{trackid:1}},{locals:{user:{id:1}}}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await servicetrackshelf.deleteTrack({params:{trackid:1}}, {locals:{user:{id:1}}});
        expect(mocktrackshelf.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data":1
                                });
    });
    it('updated test', async () => {
        let record = await servicetrackshelf.changeStatus({body:{trackid:1}, params: {status: 2}}, {locals:{user:{id:1}}});
        expect(mocktrackshelf.update).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data":[1,{"status": 2}],
                                "newStatus": 2
                                });
    });

});

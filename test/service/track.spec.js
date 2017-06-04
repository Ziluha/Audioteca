let track = [
    {
        id: 1,
        name: "Filth",
        playcount: 5,
        duration: 332,
        annotation: "good track",
        img: "link to source"
    },
    {
        id: 2,
        name: "Three friends",
        playcount: 5,
        duration: 432,
        annotation: "wery good track",
        img: "link to source"
    }
];

let mocktrack = require('./../mock/repository') (track);
let servicetrack = require('../../services/tracks') (mocktrack);

describe('track', () => {
     it('return promise', () => {
        expect(servicetrack.deleteFromDb({params:{trackid:1}},{}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await servicetrack.deleteFromDb({params:{trackid:1}},{});
        expect(mocktrack.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data": 1
                                });
    });
     it('get track test', async () => {
        let record = await servicetrack.gettrack({params:{trackid:5}},{});
        expect(mocktrack.findOne).toHaveBeenCalled();
        expect(record).toEqual({"track":null, "success": true});
    });
    it('get track by playcount test', async () => {
        let record = await servicetrack.gettracksByplaycount({params:{playcount:9}},{});
        expect(mocktrack.findAll).toHaveBeenCalled();
        expect(record).toEqual({"track":null, "success": true});
    });
});

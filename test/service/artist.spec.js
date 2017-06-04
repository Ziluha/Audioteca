let artist = [
    {
        id: 1,
        name: "Gerbert Frank",
        website: "http://blabla"
    },
    {
        id: 2,
        name: "Misha Veller",
        website: "http://blabla"
    }
];

let mockartist = require('./../mock/repository') (artist);
let serviceartist = require('../../services/artists') (mockartist);

describe('artist', () => {
     it('return promise', () => {
        expect(serviceartist.deleteartist({params:{artistid:1}},{}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await serviceartist.deleteartist({params:{artistid:1}},{});
        expect(mockartist.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data": 1
                                });
    });

});

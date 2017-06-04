
'use strict';

module.exports = (data) => {
    const mock = {
        findAll: jest.fn((params) => Promise.resolve(data)),
        findById: jest.fn((id) => Promise.resolve(data[id])),
        create: jest.fn((data) => Promise.resolve(data)),
        update: jest.fn((data) => Promise.resolve([1, data])),
        destroy: jest.fn((params) => Promise.resolve(1)),
        findOne: jest.fn((params) => Promise.resolve(null)),
        findOrCreate:jest.fn((params) => Promise.resolve(null)),
        findAll:jest.fn((params) => Promise.resolve(null))
    };

    mock.mockClear = () => {
        mock.findAll.mockClear();
        mock.findById.mockClear();
        mock.create.mockClear();
        mock.destroy.mockClear();
    };

    return mock;
};
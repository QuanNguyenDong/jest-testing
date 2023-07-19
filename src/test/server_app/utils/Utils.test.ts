import { getRequestBody } from "../../../app/server_app/utils/Utils";
import { IncomingMessage } from "http";

const requestMock = {
    on: jest.fn(),
};

const someObjecct = {
    name: "John",
    age: 30,
    city: "Paris",
};

const someObjectAsString = JSON.stringify(someObjecct);

describe("getRequestBody test suite", () => {
    it("should return object for valid JSON", async () => {
        requestMock.on.mockImplementation((event, cb) => {
            if (event == "data") {
                cb(someObjectAsString);
            } else {
                cb();
            }
        });

        const actual = await getRequestBody(
            requestMock as any as IncomingMessage
        );

        expect(actual).toEqual(someObjecct);
    });

    it("should throw error for invalid JSON", async () => {
        requestMock.on.mockImplementation((event, cb) => {
            if (event == "data") {
                cb("a" + someObjectAsString);
            } else {
                cb();
            }
        });

        await expect(getRequestBody(requestMock as any)).rejects.toThrow(
            "Unexpected token 'a', \"a{\"name\":\"\"... is not valid JSON"
        );
    });

    it("should throw error for unexpected error", async () => {
        const someError = new Error('Something went wrong!')
        requestMock.on.mockImplementation((event, cb) => {
            if (event == "error") {
                cb(someError);
            }
        });
        await expect(getRequestBody(requestMock as any)).rejects.toThrow(
            someError.message
        );
    });
});

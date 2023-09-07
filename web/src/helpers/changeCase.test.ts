import { AxiosResponse } from "axios";
import { changeRequestCase, changeResponseCase } from "./changeCase";

describe("helpers.changeCase", () => {
  describe("changeRequestCase", () => {
    describe("when the request has keys in snake case", () => {
      it("returns the keys as snake case", () => {
        const request = {
          data: {
            first_name: "John",
            last_name: "Doe",
          },
        };
        const expected = {
          first_name: "John",
          last_name: "Doe",
        };
        expect(changeRequestCase(request)).toEqual(expected);
      });
    });

    describe("when the request has keys in camel case", () => {
      it("returns the keys as snake case", () => {
        const request = {
          data: {
            firstName: "John",
            lastName: "Doe",
          },
        };
        const expected = {
          first_name: "John",
          last_name: "Doe",
        };
        expect(changeRequestCase(request)).toEqual(expected);
      });
    });

    describe("when the request has keys in pascal case", () => {
      it("returns the keys as snake case", () => {
        const request = {
          data: {
            FirstName: "John",
            LastName: "Doe",
          },
        };
        const expected = {
          first_name: "John",
          last_name: "Doe",
        };
        expect(changeRequestCase(request)).toEqual(expected);
      });
    });
  });

  describe("changeResponseCase", () => {
    describe("when the response has keys in snake case", () => {
      it("returns the keys as camel case", () => {
        const response = {
          data: {
            first_name: "John",
            last_name: "Doe",
          },
        };
        const expected = {
          firstName: "John",
          lastName: "Doe",
        };
        expect(changeResponseCase(response as AxiosResponse)).toEqual(expected);
      });
    });

    describe("when the response has keys in camel case", () => {
      it("returns the keys as camel case", () => {
        const response = {
          data: {
            firstName: "John",
            lastName: "Doe",
          },
        };
        const expected = {
          firstName: "John",
          lastName: "Doe",
        };
        expect(changeResponseCase(response as AxiosResponse)).toEqual(expected);
      });
    });

    describe("when the response has keys in pascal case", () => {
      it("returns the keys as camel case", () => {
        const response = {
          data: {
            FirstName: "John",
            LastName: "Doe",
          },
        };
        const expected = {
          firstName: "John",
          lastName: "Doe",
        };
        expect(changeResponseCase(response as AxiosResponse)).toEqual(expected);
      });
    });
  });
});

import { decryptToken } from "./decryptToken";

describe("decryptToken", () => {
  describe("when token is valid", () => {
    it("returns a valid object", () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.DjwRE2jZhren2Wt37t5hlVru6Myq4AhpGLiiefF69u8";
      const expected = {
        name: "John Doe",
      };

      expect(decryptToken(token)).toEqual(expected);
    });
  });

  describe('when token is invalid', () => {
    it('returns null', () => {
      const token = 'invalid.token'
      const expected = null

      expect(decryptToken(token)).toEqual(expected)
    })
  })
});

import api from "@/constants/api";

describe("api constants", () => {
  it("CONFIGURATION", () => {
    expect(api.CONFIGURATION()).toMatchSnapshot();
  });

  it("NOW_PLAYING", () => {
    expect(api.NOW_PLAYING("en_GB")).toMatchSnapshot();
  });

  it("GENRES_LIST", () => {
    expect(api.GENRES_LIST("en_GB")).toMatchSnapshot();
  });

  it("IMAGE", () => {
    expect(api.IMAGE("https:test.com/", "w100", "/test.jpg")).toMatchSnapshot();
  });
});

require("@testing-library/jest-dom/extend-expect");

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: jest.fn(),
});

// define import.meta.env variables
global.import = {
  meta: {
    env: {
      VITE_OPEN_AI_KEY: 'testKey',
      // any other variables you need to mock
    },
  },
};

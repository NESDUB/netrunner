// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock for Three.js and React Three Fiber
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }) => <div data-testid="canvas-mock">{children}</div>,
  useFrame: jest.fn(),
  useThree: jest.fn()
}));

jest.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls-mock" />,
  PerspectiveCamera: () => <div data-testid="camera-mock" />
}));

// Mock for IntersectionObserver
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe(element) {
    this.callback([{ isIntersecting: true, target: element }]);
  }
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserverMock;

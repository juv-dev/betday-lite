import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        jsx: "react-jsx",
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss)$": "<rootDir>/tests/mocks/styleMock.ts",
    "^next/image$": "<rootDir>/tests/mocks/next-image.tsx",
    "^next-auth/react$": "<rootDir>/tests/mocks/next-auth-react.ts",
    "^framer-motion$": "<rootDir>/tests/mocks/framer-motion.tsx",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  collectCoverageFrom: [
    "src/lib/**/*.ts",
    "src/components/**/*.tsx",
    "!src/**/*.d.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;

import devConfigs from "./dev";
import mockConfigs from "./mock";

// Mock
let currentConfigs = mockConfigs;

switch (import.meta.env.MODE) {
  case "development":
    currentConfigs = devConfigs;
    break;
  case "production":
    currentConfigs = devConfigs; // TODO: config prod
    break;
}

export const configs = { ...currentConfigs };

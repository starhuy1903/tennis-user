import devConfigs from "./dev";
import mockConfigs from "./mock";
import prodConfigs from "./prod";

export interface EnvConfig {
  apiUrl: string;
}

let currentConfigs = mockConfigs;

if (import.meta.env.MODE === "dev") {
  currentConfigs = devConfigs;
} else if (import.meta.env.MODE === "prod") {
  currentConfigs = prodConfigs;
} else if (import.meta.env.MODE === "mock") {
  currentConfigs = mockConfigs;
}

export const configs: EnvConfig = { ...currentConfigs };

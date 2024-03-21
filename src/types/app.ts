export type Service = {
  id: string;
  name: string;
  description: string;
  path: string;
};

export type AppConfigType = {
  services: Service[];
};

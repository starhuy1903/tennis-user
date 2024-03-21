export type Service = {
  id: string;
  name: string;
  description: string;
};

export type AppConfigType = {
  services: Service[];
};

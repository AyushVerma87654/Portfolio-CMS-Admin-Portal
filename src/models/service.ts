export type Service = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Services = Record<string, Service>;
export type ServiceMap = Service[];

export type AddServicePayload = {
  title: string;
  description: string;
  imageUrl: string;
};

export type UpdateServicePayload = AddServicePayload & {
  id: string;
};

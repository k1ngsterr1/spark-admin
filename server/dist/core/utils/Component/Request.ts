// Типы запросов для компонентов

export type NewComponentRequest = {
  userId: number;
  elementType: string;
  content: string;
  attributes: object;
  url: string;
  name: string;
  text: string;
  blockId: number;
};

export type SaveComponentRequest = {
  userId: number;
  componentId: number;
  elementType: string;
  content: string;
  attributes: object;
  url: string;
  name: string;
  text: string;
  blockId: number;
};

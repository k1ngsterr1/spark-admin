// Типы запросов для компонентов

export type NewComponentRequest = {
  userId: number;
  pageId: number;
  elementType: string;
  content: string;
  attributes: string;
  url: string;
  name: string;
  text: string;
  blockId: number;
};

export type SaveComponentRequest = {
  userId: number;
  pageId: number;
  elementType: string;
  content: string;
  attributes: string;
  name: string;
  text: string;
  blockId: number;
};

export interface IContentManipulator {
  manipulate(content: string, baseUrl: string): string;
}

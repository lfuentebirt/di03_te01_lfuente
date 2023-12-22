export interface RootObject {
    status: string;
    totalResults: number;
    articles: IArticulo[];
  }
  
export interface IArticulo {
    source: Source;
    author?: string;
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
}
  
export interface Source {
    id?: string;
    name: string;
}

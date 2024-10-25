// Define the source structure
interface Source {
  id: string | null;
  name: string;
}

// Define the structure of each article
export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
  category?: string;
}

// Define the structure of the entire API response
export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
  category?: string;
}

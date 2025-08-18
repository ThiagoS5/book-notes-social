import { Book, BookStatus } from '@/types';

interface GoogleBookVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
}



export async function searchBooks(query: string): Promise<Book[]> {
  if (!query) {
    return [];
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  if (!apiKey) {
    console.error('API Key do Google Books não foi configurada.');
    throw new Error('API Key não configurada');
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&langRestrict=pt-BR&orderBy=relevance&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Falha ao buscar livros');
    }

    const data = await response.json();
    {console.log('Dados recebidos da API do Google Books:', data);}
    const items: GoogleBookVolume[] = data.items || [];

    const formattedBooks: Book[] = items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor desconhecido',
      coverUrl: item.volumeInfo.imageLinks?.thumbnail,
      status: 'TO_READ', 
    }));

    return formattedBooks;
  } catch (error) {
    console.error('Erro ao buscar na API do Google Books:', error);
    return [];
  }
}
import { useCallback, useState } from "react";
import axios from "axios";
import { Book } from "../types/api/book";
import { useMessage } from "./useMessage";

export const useAllBooks = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Array<Book>>([]);
  /*const data = {
    method: 'GET',
    headers: this.getJsonHeaders(headers),
  }*/
  const getBooks = useCallback(() => {
    
    setLoading(true);

    axios
      .get<Array<Book>>("https://script.google.com/macros/s/AKfycbyMcjxKY1xdpcmQ7f5ZQjeoH-hmUt0-cNmV5oT-sqEmLsC318-nzr2piWmlo1k2m2Yd/exec",
      {method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then(res => setBooks(res.data))
      .catch(() =>
        showMessage({ title: "書籍一覧取得に失敗しました", status: "error" })
      )
      .finally(() => setLoading(false));
      
  }, []);

  return { getBooks, loading, books };
};

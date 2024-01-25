import { useCallback, useState } from "react";
import axios from "axios";

import { Book } from "../types/api/book";
import { useMessage } from "./useMessage";

export const useAllBooks = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Array<Book>>([]);

  const getBooks = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<Book>>("https://api.sssapi.app/08lvYLdiw64gq0FljZLrA")
      .then(res => setBooks(res.data))
      .catch(() =>
        showMessage({ title: "書籍一覧取得に失敗しました", status: "error" })
      )
      .finally(() => setLoading(false));
  }, []);

  return { getBooks, loading, books };
};

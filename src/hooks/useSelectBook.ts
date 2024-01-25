import { useCallback, useState } from "react";

import { Book } from "../types/api/book";
import { useMessage } from "./useMessage";

type Props = {
  isbn: number;
  books: Array<Book>;
  onOpen: () => void;
};

// 選択した書籍情報を特定しモーダルを表示するカスタムフック
export const useSelectBook = () => {
  const { showMessage } = useMessage();

  const [selectedBook, setSelectedBook] = useState<Book>();

  const onSelectBook = useCallback((props: Props) => {
    const { isbn, books, onOpen } = props;
    const targetBook = books.find(obj => obj.isbn === isbn);
    if (!targetBook) {
      showMessage({ title: "書籍が見つかりません", status: "error" });
      return;
    } else {
      setSelectedBook(targetBook);
      onOpen();
    }
  }, []);
  return { onSelectBook, selectedBook };
};

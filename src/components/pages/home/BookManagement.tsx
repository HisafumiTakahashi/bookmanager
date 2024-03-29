/*
書籍管理アプリのbody部分。
書籍を一覧表示。
*/
import { ChangeEvent, memo, useCallback, useEffect,useState, VFC } from "react";
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem,
  Checkbox
} from "@chakra-ui/react";

import { BookCard } from "../../organisms/user/BookCard";
import { useAllBooks } from "../../../hooks/useAllBooks";
import { BookDetailModal } from "../../organisms/modal/BookDetailModal";
import { useSelectBook } from "../../../hooks/useSelectBook";

export const BookManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getBooks, loading, books } = useAllBooks();
  const { onSelectBook, selectedBook } = useSelectBook();

  useEffect(() => getBooks(), [getBooks]);

  const onClickBook = useCallback(
    (isbn: number) => {
      onSelectBook({ isbn, books, onOpen });
    },
    [books, onSelectBook, onOpen]
  );

  const [isForRentOnly, setIsForRentOnly] = useState(false);
  //チェックボックスがついていたら貸出可能図書のみ表示するよう判定
  const onCangeCheckbox = () =>
  setIsForRentOnly(!isForRentOnly);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner color="teal.200" />
        </Center>
      ) : (
        <>
          <Wrap ml="10" mt="5">
            {/*チェンジボックスの設定*/}
            <Checkbox 
              size='md' 
              colorScheme='green'
              onChange={onCangeCheckbox}
              >
              貸出可能な書籍のみ表示
            </Checkbox>
          </Wrap>
          <Wrap p={{ base: 4, md: 10 }}>
            {/*貸出可能図書か判定*/}
            {isForRentOnly ? (
              <>
              　{/*貸出中ではない図書を一覧表示*/}
                {books.filter(obj => !obj.isLending)
                      .map(obj => (
                <WrapItem key={obj.isbn} mx="auto">
                  <BookCard
                    isbn={obj.isbn}
                    imageUrl={obj.imageUrl}
                    title={obj.title}
                    author={obj.author}
                    isLending={obj.isLending}
                    onClick={onClickBook}
                  />
                </WrapItem>
                ))}
              </>
            ) : (
              <>
                {/*貸出中問わず一覧表示*/}
                {books.map(obj => (
                <WrapItem key={obj.isbn} mx="auto">
                  <BookCard
                    isbn={obj.isbn}
                    imageUrl={obj.imageUrl}
                    title={obj.title}
                    author={obj.author}
                    isLending={obj.isLending}
                    onClick={onClickBook}
                  />
                </WrapItem>
                ))}
              </>
            )}
          </Wrap>
        </>
      )}
      <BookDetailModal
        isOpen={isOpen}
        onClose={onClose}
        book={selectedBook}
      />
    </>
  );
});

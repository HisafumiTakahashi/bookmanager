/*
書籍詳細情報ダイアログについて定義
*/
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import axios from "axios";
import { useMessage } from "../../../hooks/useMessage";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from "@chakra-ui/react";

import { Book } from "../../../types/api/book";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
  book: Book | undefined;
  isOpen: boolean;
  onClose: () => void;
};

export const BookDetailModal: VFC<Props> = memo(props => {
  const { isOpen, onClose, book } = props;

  const [isbn,setIsbn] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isLending, setIsLending] = useState(false);
  const [lender, setLender] = useState("");
  const [lendingYMD, setLendingYMD] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();
  

  useEffect(() => {
    setIsbn(book?.isbn ?? 0);
    setTitle(book?.title ?? "");
    setAuthor(book?.author ?? "");
    setPublisher(book?.publisher ?? "");
    setIsLending(book?.isLending ?? false);
    setLender(book?.lender ?? "");
    setLendingYMD(book?.lendingYMD ?? new Date());
  }, [book]);

  const onChangeLender = (e: ChangeEvent<HTMLInputElement>) =>
  setLender(e.target.value);

  /*const onClickLend = () => {
    console.log(title);
    alert(title + " を貸し出しを登録しました")
  };*/
  const onClickLend = () => {
    console.log(title);
    setLoading(true);
    const params = new URLSearchParams;
    params.append('isbn',JSON.stringify(isbn));
    params.append('lender',JSON.stringify(lender));

    axios
      .post("https://script.google.com/macros/s/AKfycbyMcjxKY1xdpcmQ7f5ZQjeoH-hmUt0-cNmV5oT-sqEmLsC318-nzr2piWmlo1k2m2Yd/exec",
            params,{
              headers: {
              Accept: 'application/json',
             'Content-Type': 'application/x-www-form-urlencoded',
              }
            })
      .then(() => alert(title + " を貸し出しを登録しました"))
      .catch(() =>
        alert({ title: "書籍貸出登録に失敗しました", status: "error" })
      )
      .finally(() => setLoading(false));
  };
          


  //書籍詳細情報ダイアログを返す
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>書籍詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={6}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>タイトル</FormLabel>
              <Input
                value={title}
              />
            </FormControl>
            <FormControl>
              <FormLabel>著者</FormLabel>
              <Input
                value={author}
              />
            </FormControl>
            <FormControl>
              <FormLabel>出版社</FormLabel>
              <Input
                type="publisher"
                value={publisher}
               />
            </FormControl>

            <FormControl>
             <FormLabel>借用者名</FormLabel>
             <Input  
              type="lender" 
              value={lender}
              isReadOnly={book && book.isLending}
              onChange={onChangeLender}
             />
            </FormControl>

          </Stack>
        </ModalBody>
        <ModalFooter>
          {!isLending && (
            <PrimaryButton onClick={onClickLend}>貸出</PrimaryButton>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

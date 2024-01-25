import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
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

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isLending, setIsLending] = useState(false);
  const [lender, setLender] = useState("");
  

  useEffect(() => {
    setTitle(book?.title ?? "");
    setAuthor(book?.author ?? "");
    setPublisher(book?.publisher ?? "");
    setIsLending(book?.isLending ?? false);
    setLender(book?.lender ?? "");
  }, [book]);

  const onChangeLender = (e: ChangeEvent<HTMLInputElement>) =>
  setLender(e.target.value);

  const onClickLend = () => {
    console.log(title);
    alert(title + " を貸し出しを登録しました")
  };

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

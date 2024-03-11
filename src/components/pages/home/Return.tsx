import { memo, VFC, useEffect, useState } from "react";
import axios from "axios";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import {
  Center,
  Spinner,
  Wrap,
  WrapItem,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";

import { LendingCard } from "../../organisms/user/LendingCard";
import { useAllBooks } from "../../../hooks/useAllBooks";

export const Return: VFC = memo(() => {
  const { getBooks, books } = useAllBooks();
  const [loading, setLoading] = useState(false);

  useEffect(() => getBooks(), [getBooks]);

  const onClickReturn = (props: {
    isbn: number;
    title: string;
    lender: string;
    lendingYMD: Date;
  }) => {
    const params = new URLSearchParams();
    params.append("isbn", JSON.stringify(props.isbn));
    params.append("lender", JSON.stringify(props.lender));
    params.append("lendingYMD", JSON.stringify(props.lendingYMD));
    console.log(props.title);
    setLoading(true);

    axios
      .post(
        "https://script.google.com/macros/s/AKfycbyMcjxKY1xdpcmQ7f5ZQjeoH-hmUt0-cNmV5oT-sqEmLsC318-nzr2piWmlo1k2m2Yd/exec",
        params,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(() => alert(props.title + " を返却しました"))
      .catch(() => alert({ title: "書籍返却に失敗しました", status: "error" }))
      .finally(() => {
        setLoading(false);
        window.location.reload();
      });
  };

  return (
    <>
      <Wrap p={{ base: 2, md: 5 }}>
      <WrapItem>
        <Box w="500px" h="70px" shadow="md" bgColor='white' p={4}>
          <Stack textAlign="center">
            <Text fontSize="md">書籍名</Text>
          </Stack>
        </Box>

        <Box w="250px" h="70px" shadow="md" bgColor='white'p={4}>
          <Stack textAlign="center">
            <Text fontSize="md">借用者名</Text>
          </Stack>
        </Box>

        <Box w="250px" h="70px" shadow="md" bgColor='white'p={4}>
          <Stack textAlign="center">
            <Text fontSize="md">貸出日</Text>
          </Stack>
        </Box>
        </WrapItem>
      </Wrap>

      {loading ? (
        <Center h="100vh">
          <Spinner color="teal.200" />
        </Center>
      ) : (
        <Wrap p={{ base: 2, md: 5 }}>
          <>
            {/*貸出中の図書を一覧表示*/}
            {books
              .filter((obj) => obj.isLending)
              .map((obj) => (
                <WrapItem key={obj.isbn}>
                  <LendingCard
                    isbn={obj.isbn}
                    title={obj.title}
                    isLending={obj.isLending}
                    lender={obj.lender}
                    lendingYMD={obj.lendingYMD}
                  />
                  <Box p={4}>
                    <PrimaryButton onClick={() => onClickReturn(obj)}>
                      返却
                    </PrimaryButton>
                  </Box>
                </WrapItem>
              ))}
          </>
        </Wrap>
      )}
    </>
  );
});

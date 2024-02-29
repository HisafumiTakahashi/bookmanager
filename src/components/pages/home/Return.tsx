import { memo, VFC, useEffect } from "react";
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
  const { getBooks, loading, books } = useAllBooks();

  useEffect(() => getBooks(), [getBooks]);

  return (
    <>
      <Wrap p={{ base: 2, md: 5 }}>
        <Box w="500px" h="70px" shadow="md" p={4}>
          <Stack textAlign="center">
            <Text fontSize="md">書籍名</Text>
          </Stack>
        </Box>

        <Box w="250px" h="70px" shadow="md" p={4}>
          <Stack textAlign="center">
            <Text fontSize="md">氏名</Text>
          </Stack>
        </Box>

        <Box w="250px" h="70px" shadow="md" p={4}>
          <Stack textAlign="center">
            <Text fontSize="md">貸出日</Text>
          </Stack>
        </Box>
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
                </WrapItem>
              ))}
          </>
        </Wrap>
      )}
    </>
  );
});

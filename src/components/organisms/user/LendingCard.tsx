/*
貸出中の書籍情報項目を実装。
*/
import { memo, VFC } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

type Props = {
  isbn: number;
  title: string;
  isLending: boolean;
  lender: string;
  lendingYMD: Date;
};

export const LendingCard: VFC<Props> = memo((props) => {
  const { title, lender, lendingYMD } = props;

  let LendingYMD = lendingYMD.toString();
  LendingYMD =
    LendingYMD.substring(0, 4) +
    "/" +
    LendingYMD.substring(4, 6) +
    "/" +
    LendingYMD.substring(6, 8);

  return (
    <>
      <Box w="500px" h="70px" shadow="md" bgColor='white' p={4}>
        <Stack textAlign="center">
          <Text fontSize="md">{title}</Text>
        </Stack>
      </Box>

      <Box w="250px" h="70px" shadow="md" bgColor='white' p={4}>
        <Stack textAlign="center">
          <Text fontSize="md">{lender}</Text>
        </Stack>
      </Box>

      <Box w="250px" h="70px" shadow="md" bgColor='white' p={4}>
        <Stack textAlign="center">
          <Text fontSize="md">{LendingYMD}</Text>
        </Stack>
      </Box>
    </>
  );
});

import { memo, VFC } from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";

type Props = {
  isbn: number;
  imageUrl: string;
  title: string;
  author: string;
  isLending: boolean;
  onClick: (isbn: number) => void;
};

export const BookCard: VFC<Props> = memo(props => {
  const { isbn, imageUrl, title, author, isLending, onClick } = props;

  return (
    <Box
      w="280px"
      h="400px"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(isbn)}
      bg={isLending ? "silver" : "white"}
    >
      <Stack textAlign="center">
        <Image
          src={imageUrl}
          alt={title}
          m="auto"
          height={"250px"}
        />
        <Text fontSize="md" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray">
          {author}
        </Text>
      </Stack>
    </Box>
  );
});

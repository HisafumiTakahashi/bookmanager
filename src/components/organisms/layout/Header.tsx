import React, { memo, useCallback, VFC } from "react";
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const onClickUserManagement = useCallback(
    () => navigate("/book_management"),
    []
  );
  const onClickReturn = useCallback(() => navigate("/return"), []);

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickUserManagement}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            書籍管理アプリ
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          display={{ base: "none", md: "flex" }}
          flexGrow={2}
        >
          <Box pr={4}>
            <Link onClick={onClickUserManagement}>書籍一覧</Link>
          </Box>
          <Box>
            <Link onClick={onClickReturn}>返却</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickUserManagement={onClickUserManagement}
        onClickReturn={onClickReturn}
      />
    </>
  );
});

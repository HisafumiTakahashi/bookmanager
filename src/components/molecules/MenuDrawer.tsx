import { VFC, memo } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickUserManagement: () => void;
  onClickReturn: () => void;
};

export const MenuDrawer: VFC<Props> = memo(props => {
  const {
    isOpen,
    onClose,
    onClickUserManagement,
    onClickReturn
  } = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody as="nav" p={0} bg="gray.100">
            <Button w="100%" onClick={onClickUserManagement}>
              書籍一覧
            </Button>
            <Button w="100%" onClick={onClickReturn}>
              返却
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});

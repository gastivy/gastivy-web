import { Button, Flex, Modal, Text } from "astarva-ui";
import React from "react";

interface ConfirmDeleteModalProps {
  isVisible: boolean;
  categoryName: string;
  onClose: () => void;
  onDelete: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isVisible,
  categoryName,
  onDelete,
  onClose,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      verticalCentered
      padding="1.25rem"
      width="17.5rem"
      onClose={onClose}
    >
      <Flex flexDirection="column" gap=".75rem">
        <Text textAlign="center">Are you sure want to delete</Text>
        <Text
          weight="medium"
          textAlign="center"
          variant="small"
          color="black500"
        >
          {categoryName}?
        </Text>

        <Flex
          flexDirection="column"
          gap=".5rem"
          width="15rem"
          marginTop="2.5rem"
        >
          <Button
            variant="primary"
            size="small"
            shape="semi-round"
            isBlock
            backgroundColor="blue400"
            backgroundColorHover="red700"
            onClick={onDelete}
          >
            Yes, Delete it!
          </Button>
          <Button
            variant="secondary"
            size="small"
            shape="semi-round"
            isBlock
            backgroundColor="blue400"
            backgroundColorHover="red700"
            onClick={onClose}
          >
            {`No, Don't delete it!`}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

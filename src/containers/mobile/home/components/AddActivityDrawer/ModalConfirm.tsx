import { Button, Flex, Modal, Text } from "astarva-ui";
import React from "react";

interface ModalConfirmProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isVisible,
  onCancel,
  onOk,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      verticalCentered
      padding="1.25rem"
      width="17.5rem"
      height="200px"
    >
      <Flex flexDirection="column" justifyContent="space-between">
        <Flex flexDirection="column" gap=".75rem">
          <Text
            variant="medium"
            color="black800"
            weight="semi-bold"
            textAlign="center"
          >
            Hey, Watch Out!
          </Text>
          <Text color="black400" variant="small" textAlign="center">
            Do you want to exit without saving the activity time data?
          </Text>
        </Flex>
        <Flex flexDirection="column" gap=".75rem">
          <Button
            size="small"
            shape="semi-round"
            isBlock
            backgroundColor="red400"
            backgroundColorHover="red700"
            onClick={onOk}
          >
            Yes, I don't wanna save
          </Button>
          <Button size="small" shape="semi-round" isBlock onClick={onCancel}>
            No, I'll think about it again
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

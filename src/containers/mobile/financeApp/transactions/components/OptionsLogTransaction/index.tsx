import { Drawer, Flex, Icon, Text } from "astarva-ui";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  onUpdate: () => void;
}

export const OptionsLogTransaction: React.FC<Props> = ({
  isVisible,
  onClose,
  onConfirmDelete,
  onUpdate,
}) => {
  const options = [
    {
      title: "Edit",
      key: "edit",
      onClick: () => {
        onClose();
        onUpdate();
      },
    },
    {
      title: "Delete",
      key: "delete",
      onClick: () => {
        onClose();
        onConfirmDelete();
      },
    },
  ];

  return (
    <Drawer
      isVisible={isVisible}
      height="max-content"
      borderTopLeftRadius="1.25rem"
      borderTopRightRadius="1.25rem"
      padding="1.25rem"
      flexDirection="column"
    >
      <Flex justifyContent="flex-end" flex={1}>
        <Icon name="Close-solid" onClick={onClose} />
      </Flex>
      <Flex flexDirection="column">
        {options.map((item) => {
          return (
            <Flex padding=".75rem 0" key={item.key} onClick={item.onClick}>
              <Text>{item.title}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Drawer>
  );
};

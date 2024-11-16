import Drawer from "@/components/base/Drawer";
import { Flex, Icon, Text } from "astarva-ui";

interface Props {
  isVisible?: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export const OptionsLogActivity: React.FC<Props> = ({
  isVisible,
  onClose,
  onConfirmDelete,
}) => {
  const options = [
    { title: "Edit", key: "edit" },
    {
      title: "Delete",
      key: "delete",
      onClick: () => {
        onClose();
        onConfirmDelete();
      },
    },
  ];

  if (!isVisible) return null;

  return (
    <Drawer
      height="max-content"
      borderTopLeftRadius="1.25rem"
      borderTopRightRadius="1.25rem"
      padding="1.25rem"
      flexDirection="column"
    >
      <Flex justifyContent="flex-end" flex={1}>
        <Icon icon="Close-solid" onClick={onClose} />
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

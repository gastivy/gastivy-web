import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Modal, Text } from "astarva-ui";

import { Loading } from "@/components/base/Loading";
import { useDeleteTransaction } from "@/modules/financeApp/transactions/hooks/useTransaction";
import { Transactions } from "@/modules/financeApp/transactions/models";
import { dateTime } from "@/utils/dateTime";
import { formatter } from "@/utils/formatter";

interface ConfirmDeleteModalProps {
  isVisible: boolean;
  transactionSelected?: Transactions;
  onClose: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isVisible,
  transactionSelected,
  onClose,
}) => {
  const {
    category_name,
    date,
    id,
    money,
    name,
    from_wallet_name,
    to_wallet_name,
  } = transactionSelected || {};

  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteTransaction({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onClose();
    },
  });

  const handleDelete = () => {
    if (id) mutate(id);
  };

  if (isPending) return <Loading />;

  return (
    <Modal
      isVisible={isVisible}
      verticalCentered
      padding="1.25rem"
      width="17.5rem"
      boxSizing="content-box"
      onClose={onClose}
    >
      <Flex flex={1} flexDirection="column" alignItems="center">
        <Text>Are you sure want to delete</Text>
        <Text weight="semi-bold">{name}?</Text>

        <Flex
          flex={1}
          width="15rem"
          flexDirection="column"
          gap=".5rem"
          padding="2rem 0"
        >
          <Flex gap=".5rem" justifyContent="space-between" alignItems="center">
            <Text variant="extra-small" color="black400">
              Date
            </Text>
            <Text variant="extra-small" color="black400">
              {dateTime.getDate(
                date ? new Date(String(date)) : new Date(),
                "en-GB",
                {
                  dateStyle: "long",
                }
              )}
            </Text>
          </Flex>

          <Flex gap=".5rem" justifyContent="space-between" alignItems="center">
            <Text variant="extra-small" color="black400">
              Money
            </Text>
            <Text variant="extra-small" color="black400">
              {formatter.currency(money)}
            </Text>
          </Flex>

          <Flex gap=".5rem" justifyContent="space-between" alignItems="center">
            <Text variant="extra-small" color="black400">
              Category
            </Text>
            <Text variant="extra-small" color="black400">
              {category_name}
            </Text>
          </Flex>

          {from_wallet_name && (
            <Flex
              gap=".5rem"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text variant="extra-small" color="black400">
                Origin Wallet
              </Text>
              <Text variant="extra-small" color="black400">
                {from_wallet_name}
              </Text>
            </Flex>
          )}

          {to_wallet_name && (
            <Flex
              gap=".5rem"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text variant="extra-small" color="black400">
                Destination Wallet
              </Text>
              <Text variant="extra-small" color="black400">
                {to_wallet_name}
              </Text>
            </Flex>
          )}
        </Flex>

        <Flex
          flexDirection="column"
          gap=".5rem"
          width="17.5rem"
          marginTop="1.25rem"
        >
          <Button
            variant="primary"
            size="small"
            shape="semi-round"
            isBlock
            backgroundColor="red400"
            backgroundColorHover="red700"
            onClick={handleDelete}
          >
            Yes, Delete it!
          </Button>
          <Button
            variant="secondary"
            size="small"
            shape="semi-round"
            isBlock
            backgroundColor="red400"
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

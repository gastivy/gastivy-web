import {
  Button,
  Colors,
  DatePicker,
  Drawer,
  Flex,
  ScrollBar,
  Text,
} from "astarva-ui";
import React, { useState } from "react";

import { Navbar } from "@/components/mobile/Navbar";
import { useGetCategoryTransaction } from "@/modules/financeApp/category/hooks/useCategoryTransaction";
import { useGetWallet } from "@/modules/financeApp/wallet/hooks/useWallet";
import { dateTime, RangeDate } from "@/utils/dateTime";

interface FilterDrawerProps {
  isVisible: boolean;
  idCategories: string[];
  idWallet: string[];
  currentRange?: Partial<RangeDate>;
  onClose: () => void;
  onRefetch: () => void;
  onSelectIdWallet: (ids: string[]) => void;
  onSetCurrentRange: (range: RangeDate) => void;
  onSelectIdCategory: (ids: string[]) => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isVisible,
  currentRange,
  idCategories,
  idWallet,
  onClose,
  onSetCurrentRange,
  onSelectIdWallet,
  onSelectIdCategory,
}) => {
  const [idsCategory, setIdsCategory] = useState<string[]>(idCategories);
  const [idsWallet, setIdsWallet] = useState<string[]>(idWallet);
  const [startDate, setStartDate] = useState<Date | null>(
    currentRange?.start_date ? new Date(currentRange.start_date) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    currentRange?.end_date ? new Date(currentRange.end_date) : null
  );

  const { data, isLoading } = useGetCategoryTransaction({
    enabled: isVisible,
    queryKey: ["category-transaction"],
  });

  const { data: dataWallet, isLoading: isLoadingWallet } = useGetWallet();

  const handleChangeRange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSelectCategoryTransaction = (id: string) => {
    const ids = idsCategory.filter((item) => item !== id);

    if (idsCategory.includes(id)) {
      setIdsCategory([...ids]);
      return;
    }

    setIdsCategory([...ids, id]);
  };

  const handleSelectWallet = (id: string) => {
    const ids = idsWallet.filter((item) => item !== id);

    if (idsWallet.includes(id)) {
      setIdsWallet([...ids]);
      return;
    }

    setIdsWallet([...ids, id]);
  };

  const handleSubmit = () => {
    onSelectIdCategory(idsCategory);
    onSelectIdWallet(idsWallet);

    if (startDate && endDate) {
      onSetCurrentRange({
        start_date: dateTime.formatDate(startDate),
        end_date: dateTime.formatDate(endDate),
      });
    }
    onClose();
  };

  return (
    <Drawer isVisible={isVisible} isFullHeight gap="1rem">
      <Navbar title="Filter Transactions" onBack={onClose} />

      <ScrollBar
        overflowY="auto"
        flexDirection="column"
        gap="1.5rem"
        height="100vh"
        paddingTop="5rem"
      >
        <DatePicker
          label="Date Range"
          selectsRange
          startDate={startDate || undefined}
          endDate={endDate || undefined}
          onChange={handleChangeRange}
        />

        <Flex flexDirection="column" gap=".75rem">
          <Text>Category Transaction</Text>
          <Flex flexWrap="wrap" gap=".5rem" rowGap=".625rem">
            {isLoading && <Text>Loading...</Text>}

            {!isLoading &&
              data?.data.map((item) => {
                const isActive = idsCategory.includes(item.id);
                return (
                  <Flex
                    key={item.id}
                    justifyContent="center"
                    alignItems="center"
                    gap=".5rem"
                    border={`.0625rem solid ${Colors.blue400}`}
                    maxWidth="max-content"
                    padding=".25rem .5rem"
                    borderRadius="1.25rem"
                    minWidth="3.75rem"
                    backgroundColor={isActive ? "blue400" : "white"}
                    onClick={() => handleSelectCategoryTransaction(item.id)}
                  >
                    <Text
                      variant="extra-small"
                      color={isActive ? "white" : "blue400"}
                    >
                      {item.name}
                    </Text>
                  </Flex>
                );
              })}
          </Flex>
        </Flex>

        <Flex flexDirection="column" gap=".75rem">
          <Text>Wallet</Text>
          <Flex flexWrap="wrap" gap=".5rem" rowGap=".625rem">
            {isLoadingWallet && <Text>Loading...</Text>}
            {!isLoadingWallet &&
              dataWallet?.data?.map((item) => {
                const isActive = idsWallet.includes(item.id);
                return (
                  <Flex
                    key={item.id}
                    justifyContent="center"
                    alignItems="center"
                    gap=".5rem"
                    border={`.0625rem solid ${Colors.blue400}`}
                    maxWidth="max-content"
                    padding=".25rem .5rem"
                    borderRadius="1.25rem"
                    minWidth="3.75rem"
                    backgroundColor={isActive ? "blue400" : "white"}
                    onClick={() => handleSelectWallet(item.id)}
                  >
                    <Text
                      variant="extra-small"
                      color={isActive ? "white" : "blue400"}
                    >
                      {item.name}
                    </Text>
                  </Flex>
                );
              })}
          </Flex>
        </Flex>
      </ScrollBar>

      <Button isBlock size="small" shape="semi-round" onClick={handleSubmit}>
        Submit
      </Button>
    </Drawer>
  );
};

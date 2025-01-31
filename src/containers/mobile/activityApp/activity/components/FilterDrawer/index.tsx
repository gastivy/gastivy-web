import {
  Button,
  Colors,
  DatePicker,
  Drawer,
  Flex,
  ScrollBar,
  Text,
} from "astarva-ui";
import { useState } from "react";

import { Navbar } from "@/components/mobile/Navbar";
import { useGetCategory } from "@/modules/activityApp/category/hooks/useCategory";
import { dateTime, RangeDate } from "@/utils/dateTime";

interface FilterDrawerProps {
  isVisible: boolean;
  currentRange?: RangeDate;
  idCategories: string[];
  onClose: () => void;
  onSetCurrentRange: (range: RangeDate) => void;
  onSelectIdCategory: (ids: string[]) => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isVisible,
  currentRange,
  idCategories,
  onClose,
  onSetCurrentRange,
  onSelectIdCategory,
}) => {
  const [idsCategory, setIdsCategory] = useState<string[]>(idCategories);
  const [startDate, setStartDate] = useState<Date | null>(
    currentRange?.start_date ? new Date(currentRange.start_date) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    currentRange?.end_date ? new Date(currentRange.end_date) : null
  );

  const { data, isLoading } = useGetCategory(
    {},
    {
      enabled: isVisible,
      queryKey: ["all-category"],
    }
  );

  const handleChangeRange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSelect = (id: string) => {
    const ids = idsCategory.filter((item) => item !== id);

    if (idsCategory.includes(id)) {
      setIdsCategory([...ids]);
      return;
    }

    setIdsCategory([...ids, id]);
  };

  const handleSubmit = () => {
    onSelectIdCategory(idsCategory);

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
      <Navbar title="Filter Activity" onBack={onClose} />

      <ScrollBar
        overflowY="auto"
        flexDirection="column"
        gap="1rem"
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
          <Text>Category Activity</Text>

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
                    onClick={() => handleSelect(item.id)}
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

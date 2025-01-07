import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Flex,
  ScrollBar,
  Text,
} from "astarva-ui";
import { useEffect, useState } from "react";

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
    setIdsCategory(ids);
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

  useEffect(() => {
    const ids = data?.data?.map((item) => item.id) || [];
    setIdsCategory(ids);
  }, [isVisible, data?.data]);

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

        <Flex flexDirection="column" gap=".5rem">
          {isLoading && <Text>Loading...</Text>}

          {!isLoading &&
            idsCategory.length &&
            data?.data.map((item) => {
              return (
                <Flex key={item.id} alignItems="center" gap=".5rem">
                  <Checkbox
                    checked={idsCategory.includes(item.id)}
                    onChange={() => handleSelect(item.id)}
                  />
                  <Text>{item.name}</Text>
                </Flex>
              );
            })}
        </Flex>
      </ScrollBar>

      <Button isBlock size="small" shape="semi-round" onClick={handleSubmit}>
        Submit
      </Button>
    </Drawer>
  );
};

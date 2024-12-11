import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Colors,
  DatePicker,
  Disclosure,
  Drawer,
  Flex,
  Icon,
  Input,
  ScrollBar,
  Select,
  Text,
} from "astarva-ui";
import React, { useMemo } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { useDisclosureProps } from "@/hooks/useDisclosure";
import { useGetCategoryTransaction } from "@/modules/financeApp/category/hooks/useCategoryTransaction";
// import { CategoryTransactionRequest } from "@/modules/financeApp/category/models";
import { schemaTransaction } from "@/modules/financeApp/category/schema/category";
import { useCreateTransactions } from "@/modules/financeApp/transactions/hooks/useTransaction";
import { CreateTransactionRequest } from "@/modules/financeApp/transactions/models";
import { dateTime } from "@/utils/dateTime";
import { formatter } from "@/utils/formatter";

interface Props {
  isVisible: boolean;
  // refetch: () => void;
  onBack: () => void;
}

export const AddTransactionsDrawer: React.FC<Props> = ({
  isVisible,
  // refetch,
  onBack,
}) => {
  const { data } = useGetCategoryTransaction();
  const { mutate } = useCreateTransactions();

  const categoryTransactionOptions = useMemo(() => {
    return (
      data?.data.map((transaction) => ({
        label: transaction.name,
        value: transaction.id,
      })) || []
    );
  }, [data?.data]);

  // const { isPending, mutate } = useCreateCategoryTransaction({
  //   onSuccess: () => {
  //     onBack();
  //     // refetch();
  //   },
  // });

  const defaultTransaction = {
    category_id: "",
    money: 0,
    date: new Date(),
    description: undefined,
    name: "",
  };

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaTransaction),
    defaultValues: {
      transactions: [
        {
          category_id: "",
          money: 0,
          date: new Date(),
          description: undefined,
          name: "",
        },
      ],
    },
  });

  const { append, remove } = useFieldArray({
    control,
    name: "transactions",
  });

  const fields = watch("transactions");

  const handleSave: SubmitHandler<CreateTransactionRequest> = (form) => {
    mutate(form);
  };

  return (
    <Drawer
      isFullHeight
      padding="0"
      gap="1rem"
      isVisible={isVisible}
      onClose={onBack}
    >
      <Flex justifyContent="space-between" alignItems="center" padding="1rem">
        <Flex
          justifyContent="center"
          alignItems="center"
          padding=".25rem"
          borderRadius=".5rem"
          boxShadow="0 .0625rem .625rem 0 rgba(50, 132, 255, 0.25)"
          onClick={onBack}
        >
          <Icon name="Left-outline" size="1.25rem" />
        </Flex>
        <Text textAlign="center" weight="medium">
          Add Transactions
        </Text>
        <Button size="small" shape="rounded" onClick={handleSubmit(handleSave)}>
          Save
        </Button>
      </Flex>

      <ScrollBar
        overflowY="auto"
        flexDirection="column"
        gap="1rem"
        padding="1rem"
      >
        {fields?.map((field, index) => {
          return (
            <Disclosure defaultOpen key={index}>
              {({ isOpen, onToggle }: useDisclosureProps) => (
                <Flex
                  flexDirection="column"
                  gap="1.5rem"
                  width="100%"
                  backgroundColor="white"
                  boxShadow="0 .0625rem .625rem 0px rgba(131, 133, 132, 0.25)"
                  borderRadius=".625rem"
                >
                  <Flex
                    flexDirection="column"
                    gap="1rem"
                    padding="24px 16px 0"
                    borderBottom={`.0625rem solid ${Colors.black100}`}
                    borderRadius=".625rem"
                    onClick={onToggle}
                  >
                    <Flex justifyContent="space-between">
                      <Text variant="small">{field.name || "-"}</Text>
                      <Text variant="small">
                        {formatter.currency(field.money)}
                      </Text>
                      <Text variant="small">
                        {dateTime.getDate(field.date)}
                      </Text>
                    </Flex>
                    <Flex justifyContent="center" paddingBottom=".5rem">
                      <Icon name="Up-outline" />
                    </Flex>
                  </Flex>

                  {isOpen && (
                    <Flex
                      flexDirection="column"
                      gap="1.5rem"
                      width="100%"
                      padding="1rem"
                    >
                      <Input
                        size="small"
                        // disabled={isPending}
                        placeholder="Input Title"
                        autoComplete="off"
                        _label={{ variant: "small" }}
                        isError={Boolean(
                          errors.transactions?.[index]?.name?.message
                        )}
                        error={errors.transactions?.[index]?.name?.message}
                        {...register(`transactions.${index}.name`)}
                      />
                      <Controller
                        name={`transactions.${index}.money`}
                        control={control}
                        rules={{ required: "Money is Required" }}
                        render={({ field }) => (
                          <Input.Number
                            value={String(field.value || 0)}
                            size="small"
                            prefix={
                              <Text variant="extra-small" weight="medium">
                                Rp.
                              </Text>
                            }
                            placeholder="Input Money"
                            onChange={(value) => field.onChange(value)}
                          />
                        )}
                      />
                      <Controller
                        name={`transactions.${index}.category_id`}
                        control={control}
                        rules={{ required: "Category is Required" }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            size="small"
                            isError={Boolean(
                              errors.transactions?.[index]?.category_id?.message
                            )}
                            error={
                              errors.transactions?.[index]?.category_id?.message
                            }
                            options={categoryTransactionOptions}
                            onSelect={(option) => field.onChange(option.value)}
                          />
                        )}
                      />
                      <Controller
                        name={`transactions.${index}.date`}
                        control={control}
                        rules={{ required: "Date is Required" }}
                        render={({ field }) => {
                          const currentDate = field.value
                            ? new Date(field.value)
                            : new Date();

                          return (
                            <DatePicker
                              selected={currentDate}
                              onSelect={(val) => field.onChange(val)}
                            />
                          );
                        }}
                      />
                      <Input
                        size="small"
                        // disabled={isPending}
                        placeholder="Input Description"
                        _label={{ variant: "small" }}
                        isError={Boolean(
                          errors.transactions?.[index]?.description?.message
                        )}
                        error={
                          errors.transactions?.[index]?.description?.message
                        }
                        {...register(`transactions.${index}.description`)}
                      />

                      {(fields?.length || 0) > 1 && (
                        <Button
                          backgroundColor="red400"
                          backgroundColorHover="red700"
                          // disabled={isPending}
                          isBlock
                          shape="semi-round"
                          size="medium"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      )}
                    </Flex>
                  )}
                </Flex>
              )}
            </Disclosure>
          );
        })}

        <Flex justifyContent="center" paddingY="1rem">
          <Button
            size="medium"
            variant="secondary"
            shape="semi-round"
            onClick={() => append(defaultTransaction)}
          >
            <Icon name="Plus-solid" size="1rem" />
            Add Transaction
          </Button>
        </Flex>
      </ScrollBar>
    </Drawer>
  );
};

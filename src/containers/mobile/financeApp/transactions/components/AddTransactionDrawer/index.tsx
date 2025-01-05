import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
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
  TextArea,
} from "astarva-ui";
import React, { useMemo } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { Loading } from "@/components/base/Loading";
import { useDisclosureProps } from "@/hooks/useDisclosure";
import { useGetCategoryTransaction } from "@/modules/financeApp/category/hooks/useCategoryTransaction";
import { TypesTransactions } from "@/modules/financeApp/category/models";
import { schemaTransaction } from "@/modules/financeApp/category/schema/category";
import { useCreateTransactions } from "@/modules/financeApp/transactions/hooks/useTransaction";
import { CreateTransactionRequest } from "@/modules/financeApp/transactions/models";
import { useGetWallet } from "@/modules/financeApp/wallet/hooks/useWallet";
import { dateTime } from "@/utils/dateTime";
import { formatter } from "@/utils/formatter";

interface Props {
  isVisible: boolean;
  typeTransaction?: TypesTransactions;
  onRefetch?: () => void;
  onBack: () => void;
}

export const AddTransactionsDrawer: React.FC<Props> = ({
  isVisible,
  typeTransaction = 0,
  onBack,
  onRefetch,
}) => {
  const queryClient = useQueryClient();
  const { data } = useGetCategoryTransaction();
  const { data: wallets } = useGetWallet();
  const { mutate, isPending } = useCreateTransactions({
    onSuccess: () => {
      reset();
      onBack();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      onRefetch?.();
    },
  });

  const categoryTransactionOptions = useMemo(() => {
    if (typeTransaction) {
      return (
        data?.data
          .filter((item) => item.type === typeTransaction)
          .map((transaction) => ({
            label: transaction.name,
            value: transaction.id,
          })) || []
      );
    }
    return (
      data?.data
        .filter((item) => item.type !== TypesTransactions.FEE_TRANSFER)
        .map((transaction) => ({
          label: transaction.name,
          value: transaction.id,
        })) || []
    );
  }, [data?.data]);

  const originWallet = [
    TypesTransactions.EXPENSES,
    TypesTransactions.TRANSFER,
    TypesTransactions.PROFIT,
    TypesTransactions.PROFIT,
  ];

  const destinationWallet = [
    TypesTransactions.INCOME,
    TypesTransactions.TRANSFER,
  ];

  const walletData = wallets?.data || [];
  const walletOptions = walletData.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const defaultTransaction = {
    category_id: "",
    name: "",
    description: undefined,
    from_wallet: "",
    to_wallet: "",
    money: 0,
    fee: 0,
    type: 0,
    date: new Date(),
  };

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaTransaction),
    defaultValues: {
      transactions: [
        {
          category_id: "",
          name: "",
          description: undefined,
          from_wallet: "",
          to_wallet: "",
          money: 0,
          fee: 0,
          type: 0,
          date: new Date(),
        },
      ],
    },
  });

  const { append, remove } = useFieldArray({
    control,
    name: "transactions",
  });

  const fields = watch("transactions");

  const handleResetFieldByIndex = (index: number) => {
    resetField(`transactions.${index}.name`);
    resetField(`transactions.${index}.description`);
    resetField(`transactions.${index}.from_wallet`);
    resetField(`transactions.${index}.to_wallet`);
    resetField(`transactions.${index}.fee`);
    resetField(`transactions.${index}.money`);
    setValue(`transactions.${index}.date`, new Date());
  };

  const getTypeTransaction = (categoryId: string) => {
    return data?.data.find((category) => category.id === categoryId)?.type || 0;
  };

  const handleSave: SubmitHandler<CreateTransactionRequest> = (form) => {
    const payload = form.transactions.map((item) => ({
      category_id: item.category_id,
      name: item.name,
      description: item.description,
      money: item.money,
      date: item.date,
      ...(item.fee && {
        fee: item.fee,
      }),
      ...(item.from_wallet && {
        from_wallet: item.from_wallet,
      }),
      ...(item.to_wallet && {
        to_wallet: item.to_wallet,
      }),
    }));
    mutate({ transactions: payload });
  };

  return (
    <Drawer
      isFullHeight
      padding="0"
      gap="1rem"
      isVisible={isVisible}
      onClose={onBack}
    >
      {isPending && <Loading />}

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
        {fields?.map((transaction, index) => {
          const type = getTypeTransaction(transaction.category_id);
          return (
            <Disclosure defaultOpen key={index}>
              {({ isOpen, onToggle }: useDisclosureProps) => (
                <Flex
                  flexDirection="column"
                  gap="1.5rem"
                  width="100%"
                  backgroundColor="white"
                  boxShadow="0 .0625rem .625rem 0 rgba(131, 133, 132, 0.25)"
                  borderRadius=".625rem"
                >
                  <Flex
                    flexDirection="column"
                    gap="1rem"
                    padding="1.5rem 1rem 0"
                    borderBottom={`.0625rem solid ${Colors.black100}`}
                    borderRadius=".625rem"
                    onClick={onToggle}
                  >
                    <Flex justifyContent="space-between">
                      <Text variant="small">{transaction.name || "-"}</Text>
                      <Text variant="small">
                        {formatter.currency(transaction.money)}
                      </Text>
                      <Text variant="small">
                        {dateTime.getDate(transaction.date)}
                      </Text>
                    </Flex>
                    <Flex justifyContent="center" paddingBottom=".5rem">
                      <Icon name={isOpen ? "Down-outline" : "Up-outline"} />
                    </Flex>
                  </Flex>

                  {isOpen && (
                    <Flex
                      flexDirection="column"
                      gap="1.5rem"
                      width="100%"
                      padding="1rem"
                    >
                      <Controller
                        name={`transactions.${index}.category_id`}
                        control={control}
                        rules={{ required: "Category is Required" }}
                        render={({ field }) => (
                          <Select
                            label="Category Transaction"
                            value={field.value}
                            placeholder="Category Transaction"
                            size="small"
                            isError={Boolean(
                              errors.transactions?.[index]?.category_id?.message
                            )}
                            error={
                              errors.transactions?.[index]?.category_id?.message
                            }
                            options={categoryTransactionOptions}
                            onSelect={(option) => {
                              handleResetFieldByIndex(index);
                              setValue(
                                `transactions.${index}.type`,
                                getTypeTransaction(option.value as string)
                              );
                              field.onChange(option.value);
                            }}
                          />
                        )}
                      />

                      {originWallet.includes(type as TypesTransactions) && (
                        <Controller
                          name={`transactions.${index}.from_wallet`}
                          control={control}
                          rules={{
                            required: "Origin Wallet is Required",
                          }}
                          render={({ field }) => (
                            <Select
                              label="Origin Wallet"
                              value={field.value || ""}
                              size="small"
                              placeholder="Select Origin Wallet"
                              isError={Boolean(
                                errors.transactions?.[index]?.from_wallet
                                  ?.message
                              )}
                              error={
                                errors.transactions?.[index]?.from_wallet
                                  ?.message
                              }
                              options={walletOptions.filter(
                                (item) => item.value !== transaction.to_wallet
                              )}
                              onSelect={(option) => {
                                field.onChange(option.value);
                              }}
                            />
                          )}
                        />
                      )}

                      {destinationWallet.includes(
                        type as TypesTransactions
                      ) && (
                        <Controller
                          name={`transactions.${index}.to_wallet`}
                          control={control}
                          rules={{
                            required: "Destination Wallet is Required",
                          }}
                          render={({ field }) => (
                            <Select
                              label="Destination Wallet"
                              value={field.value || ""}
                              size="small"
                              placeholder="Select Destination Wallet"
                              isError={Boolean(
                                errors.transactions?.[index]?.to_wallet?.message
                              )}
                              error={
                                errors.transactions?.[index]?.to_wallet?.message
                              }
                              options={walletOptions.filter(
                                (item) => item.value !== transaction.from_wallet
                              )}
                              onSelect={(option) =>
                                field.onChange(option.value)
                              }
                            />
                          )}
                        />
                      )}

                      <Input
                        label="Note"
                        size="small"
                        placeholder="Input Note"
                        autoComplete="off"
                        maxLength={30}
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
                            label="Money"
                            value={String(field.value || 0)}
                            size="small"
                            prefix={
                              <Text variant="extra-small" weight="medium">
                                Rp.
                              </Text>
                            }
                            isError={Boolean(
                              errors.transactions?.[index]?.money?.message
                            )}
                            error={errors.transactions?.[index]?.money?.message}
                            placeholder="Input Money"
                            onChange={(value) => field.onChange(value)}
                          />
                        )}
                      />

                      {type === TypesTransactions.TRANSFER && (
                        <Controller
                          name={`transactions.${index}.fee`}
                          control={control}
                          rules={{ required: "Fee Transfer is Required" }}
                          render={({ field }) => (
                            <Input.Number
                              label="Fee Transfer"
                              value={String(field.value || 0)}
                              size="small"
                              prefix={
                                <Text variant="extra-small" weight="medium">
                                  Rp.
                                </Text>
                              }
                              isError={Boolean(
                                errors.transactions?.[index]?.fee?.message
                              )}
                              error={errors.transactions?.[index]?.fee?.message}
                              placeholder="Input Fee Transfer"
                              onChange={(value) => field.onChange(value)}
                            />
                          )}
                        />
                      )}

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
                              label="Date"
                              selected={currentDate}
                              onSelect={(val) => field.onChange(val)}
                            />
                          );
                        }}
                      />
                      <TextArea
                        label="Description"
                        placeholder="Input Description"
                        maxLength={2000}
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

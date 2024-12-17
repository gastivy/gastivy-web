import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Drawer,
  Flex,
  Icon,
  Input,
  ScrollBar,
  Select,
  Text,
  TextArea,
} from "astarva-ui";
import React, { useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Loading } from "@/components/base/Loading";
import { useGetCategoryTransaction } from "@/modules/financeApp/category/hooks/useCategoryTransaction";
import { TypesTransactions } from "@/modules/financeApp/category/models";
import { schemaUpdateTransaction } from "@/modules/financeApp/category/schema/category";
import {
  useGetDetailTransactions,
  useUpdateTransactions,
} from "@/modules/financeApp/transactions/hooks/useTransaction";
import { UpdateTransactionRequest } from "@/modules/financeApp/transactions/models";
import { useGetWallet } from "@/modules/financeApp/wallet/hooks/useWallet";

interface Props {
  isVisible: boolean;
  transactionId?: string;
  onBack: () => void;
}

export const UpdateTransactionsDrawer: React.FC<Props> = ({
  isVisible,
  transactionId = "",
  onBack,
}) => {
  const queryClient = useQueryClient();
  const { data } = useGetCategoryTransaction();
  const { data: detailTransaction, isLoading } = useGetDetailTransactions(
    transactionId,
    {
      queryKey: ["detail-transaction"],
      enabled: Boolean(transactionId) && isVisible,
    }
  );
  const { data: wallets } = useGetWallet();
  const { mutate, isPending } = useUpdateTransactions({
    onSuccess: () => {
      reset();
      onBack();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
  });

  const categoryTransactionOptions = useMemo(() => {
    return (
      data?.data.map((transaction) => ({
        label: transaction.name,
        value: transaction.id,
      })) || []
    );
  }, [data?.data]);

  const walletData = wallets?.data || [];
  const walletOptions = walletData.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    resetField,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schemaUpdateTransaction),
    defaultValues: {
      category_id: "",
      name: "",
      description: undefined,
      from_wallet: "",
      to_wallet: "",
      money: 0,
      type: 0,
      fee: 0,
      date: new Date(),
    },
  });

  const fields = watch();

  const getTypeTransaction = (categoryId: string) => {
    return data?.data.find((category) => category.id === categoryId)?.type || 0;
  };
  const type = getTypeTransaction(fields.category_id);

  const handleResetField = () => {
    resetField("name");
    resetField("description");
    resetField("from_wallet");
    resetField("to_wallet");
    resetField("fee");
    resetField("money");
    setValue("date", new Date());
  };

  const handleUpdate: SubmitHandler<UpdateTransactionRequest> = (form) => {
    const payload = {
      id: transactionId,
      category_id: form.category_id,
      name: form.name,
      description: form.description,
      money: form.money,
      date: form.date,
      ...(form.fee && {
        fee: form.fee,
      }),
      ...(form.from_wallet && {
        from_wallet: form.from_wallet,
      }),
      ...(form.to_wallet && {
        to_wallet: form.to_wallet,
      }),
    };
    mutate(payload);
  };

  const handleBack = () => {
    onBack();
    queryClient.invalidateQueries({ queryKey: ["detail-transaction"] });
  };

  useEffect(() => {
    if (detailTransaction && detailTransaction.data) {
      setValue("category_id", detailTransaction.data.category_id);
      setValue("name", detailTransaction.data.name);
      setValue("description", detailTransaction.data.description || "");
      setValue("from_wallet", detailTransaction.data.from_wallet || "");
      setValue("to_wallet", detailTransaction.data.to_wallet || "");
      setValue("money", detailTransaction.data.money);
      setValue("date", detailTransaction.data.date);
      setValue("fee", detailTransaction.data.fee);
    }
  }, [detailTransaction]);

  return (
    <Drawer isFullHeight padding="0" gap="1rem" isVisible={isVisible}>
      {(isPending || isLoading) && <Loading />}

      <Flex justifyContent="space-between" alignItems="center" padding="1rem">
        <Flex
          justifyContent="center"
          alignItems="center"
          padding=".25rem"
          borderRadius=".5rem"
          boxShadow="0 .0625rem .625rem 0 rgba(50, 132, 255, 0.25)"
          onClick={handleBack}
        >
          <Icon name="Left-outline" size="1.25rem" />
        </Flex>
        <Text textAlign="center" weight="medium">
          Update Transactions
        </Text>
        <Button
          size="small"
          shape="rounded"
          onClick={handleSubmit(handleUpdate)}
        >
          Save
        </Button>
      </Flex>

      <ScrollBar
        overflowY="auto"
        flexDirection="column"
        gap="1rem"
        padding="1rem"
      >
        <Flex
          flexDirection="column"
          gap="1.5rem"
          width="100%"
          backgroundColor="white"
          boxShadow="0 .0625rem .625rem 0 rgba(131, 133, 132, 0.25)"
          borderRadius=".625rem"
        >
          <Flex flexDirection="column" gap="1.5rem" width="100%" padding="1rem">
            <Controller
              name="category_id"
              control={control}
              rules={{ required: "Category is Required" }}
              render={({ field }) => (
                <Select
                  label="Category Transaction"
                  value={field.value}
                  placeholder="Category Transaction"
                  size="small"
                  isError={Boolean(errors.category_id?.message)}
                  error={errors.category_id?.message}
                  options={categoryTransactionOptions}
                  onSelect={(option) => {
                    handleResetField();
                    setValue(
                      "type",
                      getTypeTransaction(option.value as string)
                    );
                    field.onChange(option.value);
                  }}
                />
              )}
            />

            {[2, 3].includes(type || 0) && (
              <Controller
                name="from_wallet"
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
                    isError={Boolean(errors.from_wallet?.message)}
                    error={errors.from_wallet?.message}
                    options={walletOptions.filter(
                      (item) => item.value !== fields.to_wallet
                    )}
                    onSelect={(option) => {
                      field.onChange(option.value);
                    }}
                  />
                )}
              />
            )}

            {[1, 3].includes(type || 0) && (
              <Controller
                name="to_wallet"
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
                    isError={Boolean(errors.to_wallet?.message)}
                    error={errors.to_wallet?.message}
                    options={walletOptions.filter(
                      (item) => item.value !== fields.from_wallet
                    )}
                    onSelect={(option) => field.onChange(option.value)}
                  />
                )}
              />
            )}

            <Input
              label="Note"
              size="small"
              placeholder="Input Note"
              autoComplete="off"
              isError={Boolean(errors?.name?.message)}
              error={errors?.name?.message}
              {...register("name")}
            />

            <Controller
              name="money"
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
                  isError={Boolean(errors.money?.message)}
                  error={errors.money?.message}
                  placeholder="Input Money"
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />

            {type === TypesTransactions.TRANSFER && (
              <Controller
                name="fee"
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
                    isError={Boolean(errors.fee?.message)}
                    error={errors.fee?.message}
                    placeholder="Input Fee Transfer"
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            )}

            <Controller
              name="date"
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
              isError={Boolean(errors.description?.message)}
              error={errors.description?.message}
              {...register("description")}
            />
          </Flex>
        </Flex>
      </ScrollBar>
    </Drawer>
  );
};

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Flex, Input, Select, Text } from "astarva-ui";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Loading } from "@/components/base/Loading";
import { Navbar } from "@/components/mobile/Navbar";
import { typeWalletOptions } from "@/constants/wallets";
import {
  useGetDetailWallet,
  useUpdateWallet,
} from "@/modules/financeApp/wallet/hooks/useWallet";
import {
  UpdateWalletRequest,
  WalletsType,
} from "@/modules/financeApp/wallet/models";
import { schemaWallet } from "@/modules/financeApp/wallet/schema";

interface Props {
  isVisible: boolean;
  walletId: string;
  onBack: () => void;
}

export const UpdateWalletDrawer: React.FC<Props> = ({
  isVisible,
  walletId,
  onBack,
}) => {
  const queryClient = useQueryClient();
  const { data } = useGetDetailWallet(walletId, {
    enabled: Boolean(walletId) && isVisible,
    queryKey: ["wallet-detail"],
  });

  const { mutate, isPending } = useUpdateWallet({
    onSuccess: () => {
      reset();
      onBack();
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaWallet),
  });

  const fields = watch();

  const handleSave: SubmitHandler<UpdateWalletRequest> = (form) => {
    mutate({ ...form, id: data?.data?.id });
  };

  useEffect(() => {
    if (data?.data) {
      setValue("name", data?.data.name);
      setValue("balance", data?.data.balance);
      setValue("type", data?.data.type);
    }
  }, [data?.data]);

  if (isPending) return <Loading />;

  return (
    <Drawer isFullHeight padding="0" gap="1rem" isVisible={isVisible}>
      <Navbar title="Update Wallet" onBack={onBack}>
        <Navbar.Suffix>
          <Button
            size="small"
            shape="rounded"
            onClick={handleSubmit(handleSave)}
          >
            Update
          </Button>
        </Navbar.Suffix>
      </Navbar>

      <Flex
        flexDirection="column"
        gap="1.5rem"
        width="100%"
        backgroundColor="white"
        padding="1rem"
        paddingTop="5rem"
      >
        <Input
          label="Wallet Name"
          placeholder="Input Wallet Name"
          autoComplete="off"
          isError={Boolean(errors.name?.message)}
          error={errors.name?.message}
          {...register(`name`)}
        />

        <Controller
          name="balance"
          control={control}
          rules={{ required: "Money is Required" }}
          render={({ field }) => (
            <Input.Number
              label="Balance"
              disabled={fields.type !== WalletsType.ASSETS}
              value={String(field.value || 0)}
              prefix={
                <Text variant="extra-small" weight="medium">
                  Rp.
                </Text>
              }
              isError={Boolean(errors.balance?.message)}
              error={errors.balance?.message}
              placeholder="Input Money"
              onChange={(value) => field.onChange(value)}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          rules={{ required: "Type is Required" }}
          render={({ field }) => (
            <Select
              label="Type Wallet"
              value={field.value}
              size="small"
              isError={Boolean(errors.type?.message)}
              error={errors.type?.message}
              options={typeWalletOptions}
              onSelect={(option) => field.onChange(option.value)}
            />
          )}
        />
      </Flex>
    </Drawer>
  );
};

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Flex, Input, Text } from "astarva-ui";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Loading } from "@/components/base/Loading";
import { Navbar } from "@/components/mobile/Navbar";
import { useCreateWallet } from "@/modules/financeApp/wallet/hooks/useWallet";
import { CreateWalletRequest } from "@/modules/financeApp/wallet/models";
import { schemaWallet } from "@/modules/financeApp/wallet/schema";

interface Props {
  isVisible: boolean;
  onBack: () => void;
}

export const CreateWalletDrawer: React.FC<Props> = ({ isVisible, onBack }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateWallet({
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
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaWallet),
  });

  const handleSave: SubmitHandler<CreateWalletRequest> = (form) => {
    mutate(form);
  };

  if (isPending) return <Loading />;

  return (
    <Drawer isFullHeight padding="0" gap="1rem" isVisible={isVisible}>
      <Navbar title="Create Wallet" onBack={onBack}>
        <Navbar.Suffix>
          <Button
            size="small"
            shape="rounded"
            onClick={handleSubmit(handleSave)}
          >
            Save
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
          size="small"
          placeholder="Input Name Wallet"
          autoComplete="off"
          _label={{ variant: "small" }}
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
              value={String(field.value || 0)}
              size="small"
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
      </Flex>
    </Drawer>
  );
};

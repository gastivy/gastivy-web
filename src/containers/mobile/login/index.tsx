import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Input, Text } from "astarva-ui";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/base/Alert";
import Layout from "@/components/mobile/Layout";
import { KEY_ACCESS_TOKEN } from "@/constants/cookies";
import { route } from "@/constants/route";
import { useLogin } from "@/modules/auth/hooks/useAuth";
import { LoginRequest } from "@/modules/auth/models/Auth";
import { schemaLogin } from "@/modules/auth/schema/auth";
import { cookies } from "@/utils/cookies";

const LoginContainer: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { isPending, isError, mutate } = useLogin({
    onSuccess: ({ data }) => {
      if (data.token) {
        cookies.setCookie({ key: KEY_ACCESS_TOKEN, value: data.token });
        router.push(route.activityApp.home.path);
      }
    },
    onError: ({ response }) => {
      setErrorMessage((response?.data as AxiosError).message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin), // Use the schema for validation
  });

  const handleSubmitForm = (form: LoginRequest) => {
    mutate(form);
  };

  const handleCloseAlert = () => {
    setErrorMessage("");
  };

  return (
    <Layout
      isShowBottomBar={false}
      _flex={{ padding: "4rem 2rem", gap: "4rem" }}
    >
      <Flex flexDirection="column" gap="1.5rem" textAlign="center">
        <Text color="black900" variant="heading4">
          Login Here
        </Text>
      </Flex>

      <Flex flexDirection="column" padding="1.5rem" gap="1rem">
        {isError && errorMessage && (
          <Alert
            message={errorMessage}
            variant="error"
            onClose={handleCloseAlert}
          />
        )}

        <Input
          label="Email"
          autoComplete="new-email"
          {...register("email")}
          isError={Boolean(errors.email?.message)}
          error={errors.email?.message}
        />
        <Input.Password
          label="Password"
          {...register("password")}
          isError={Boolean(errors.password?.message)}
          error={errors.password?.message}
        />
        <Text>{errors.password?.message}</Text>
        <Button
          isBlock
          variant="primary"
          shape="semi-round"
          disabled={isPending}
          onClick={handleSubmit(handleSubmitForm)}
        >
          {isPending ? "Loading..." : "Login"}
        </Button>
      </Flex>
    </Layout>
  );
};

export default LoginContainer;

import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Flex, Input, Text } from "astarva-ui";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "@/components/mobile/Layout";
import { KEY_ACCESS_TOKEN } from "@/constants/cookies";
import { route } from "@/constants/route";
import { useLogin } from "@/modules/auth/hooks/useAuth";
import { LoginRequest } from "@/modules/auth/models/Auth";
import { schemaLogin } from "@/modules/auth/schema/auth";

const LoginContainer: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { isPending, isError, mutate } = useLogin({
    onSuccess: ({ data }) => {
      if (data.token) {
        localStorage.setItem(KEY_ACCESS_TOKEN, data.token);
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

      <Box as="form" onSubmit={handleSubmit(handleSubmitForm)}>
        <Flex flexDirection="column" padding="1.5rem" gap="3rem">
          {isError && errorMessage && (
            <Alert
              message={errorMessage}
              variant="error"
              onClose={handleCloseAlert}
            />
          )}

          <Flex flexDirection="column" gap="1rem">
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
          </Flex>

          <Flex flexDirection="column" gap="1rem">
            <Button
              type="submit"
              isBlock
              variant="primary"
              shape="semi-round"
              disabled={
                isPending ||
                (Boolean(errors.email?.message) &&
                  Boolean(errors.password?.message))
              }
            >
              {isPending ? "Loading..." : "Login"}
            </Button>

            <Flex justifyContent="center" alignItems="center" gap="4px">
              <Text color="black500">{`Don't have an account?`}</Text>
              <Link
                href={route.register.path}
                style={{ textDecoration: "none" }}
              >
                <Text color="blue500" weight="semi-bold">
                  Sign up now
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default LoginContainer;

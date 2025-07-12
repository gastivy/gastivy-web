import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Flex, Input, Text } from "astarva-ui";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "@/components/mobile/Layout";
import { route } from "@/constants/route";
import { useRegister } from "@/modules/auth/hooks/useAuth";
import { RegisterRequest } from "@/modules/auth/models/Auth";
import { schemaRegister } from "@/modules/auth/schema/auth";

const RegisterContainer = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { isPending, isError, mutate } = useRegister({
    onSuccess: () => router.push(route.login.path),
    onError: ({ response }) => {
      setErrorMessage((response?.data as AxiosError).message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister), // Use the schema for validation
  });

  const handleSubmitForm = (form: RegisterRequest) => {
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
          Register Here
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
              label="Full name"
              autoComplete="off"
              {...register("name")}
              isError={Boolean(errors.name?.message)}
              error={errors.name?.message}
            />
            <Input
              label="Email"
              autoComplete="off"
              {...register("email")}
              isError={Boolean(errors.email?.message)}
              error={errors.email?.message}
            />
            <Input.Password
              label="Password"
              autoComplete="off"
              isError={Boolean(errors.password?.message)}
              error={errors.password?.message}
              {...register("password")}
            />
          </Flex>

          <Flex flexDirection="column" gap="1rem">
            <Button
              isBlock
              variant="primary"
              type="submit"
              shape="semi-round"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Register"}
            </Button>

            <Flex justifyContent="center" alignItems="center" gap=".25rem">
              <Text color="black500">Already have an account?</Text>
              <Link href={route.login.path} style={{ textDecoration: "none" }}>
                <Text color="blue500" weight="semi-bold">
                  Sign in now
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default RegisterContainer;

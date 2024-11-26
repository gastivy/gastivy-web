import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Input, Text } from "astarva-ui";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import Layout from "@/components/mobile/Layout";
import { route } from "@/constants/route";
import { useLogin } from "@/modules/auth/hooks/useAuth";
import { LoginRequest } from "@/modules/auth/models/Auth";
import { schemaLogin } from "@/modules/auth/schema/auth";
import { cookies } from "@/utils/cookies";

const LoginContainer: React.FC = () => {
  const router = useRouter();
  const { isPending, mutate } = useLogin({
    onSuccess: ({ data }) => {
      if (data.token) {
        cookies.setCookie({ key: "GSTID", value: data.token });
        router.push(route.home.path);
      }
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

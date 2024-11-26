import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Input, Text } from "astarva-ui";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Layout from "@/components/mobile/Layout";
import { route } from "@/constants/route";
import { useRegister } from "@/modules/auth/hooks/useAuth";
import { RegisterRequest } from "@/modules/auth/models/Auth";
import { schemaRegister } from "@/modules/auth/schema/auth";

const RegisterContainer = () => {
  const router = useRouter();
  const { isPending, mutate } = useRegister({
    onSuccess: () => router.push(route.login.path),
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
      <Flex flexDirection="column" padding="1.5rem" gap="1rem">
        <Input
          label="Full name"
          {...register("name")}
          isError={Boolean(errors.name?.message)}
          error={errors.name?.message}
        />
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
          {isPending ? "Loading..." : "Register"}
        </Button>
      </Flex>
    </Layout>
  );
};

export default RegisterContainer;

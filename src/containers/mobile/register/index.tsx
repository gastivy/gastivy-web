import Layout from "@/components/Layout";
import { route } from "@/constants/route";
import { useRegister } from "@/modules/auth/hooks/useAuth";
import { RegisterRequest } from "@/modules/auth/models/Auth";
import { schemaRegister } from "@/modules/auth/schema/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Flex, Text, Button } from "astarva-ui";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

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
    <Layout _flex={{ padding: "64px 32px", gap: "64px" }}>
      <Flex flexDirection="column" gap="24px" textAlign="center">
        <Text color="black900" variant="heading4">
          Register Here
        </Text>
      </Flex>
      <Flex flexDirection="column" padding="24px" gap="16px">
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
        <Input
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

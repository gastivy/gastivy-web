import Layout from "@/components/Layout";
import { route } from "@/constants/route";
import { useLogin } from "@/modules/auth/hooks/useAuth";
import { LoginRequest } from "@/modules/auth/models/Auth";
import { schemaLogin } from "@/modules/auth/schema/auth";
import { cookies } from "@/utils/cookies";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Flex, Text, Button } from "astarva-ui";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const LoginContainer = () => {
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
    <Layout _flex={{ padding: "64px 32px", gap: "64px" }}>
      <Flex flexDirection="column" gap="24px" textAlign="center">
        <Text color="black900" variant="heading4">
          Login Here
        </Text>
      </Flex>
      <Flex flexDirection="column" padding="24px" gap="16px">
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
          {isPending ? "Loading..." : "Login"}
        </Button>
      </Flex>
    </Layout>
  );
};

export default LoginContainer;

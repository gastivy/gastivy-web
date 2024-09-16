import Layout from "@/components/Layout";
import { Box, Flex, Text } from "astarva-ui";
import Image from "next/image";

export const LoginContainer = () => {
  return (
    <Layout _flex={{ padding: "64px 32px", gap: "64px" }}>
      <Flex flexDirection="column" gap="24px" textAlign="center">
        <Text color="black900" variant="heading4">
          Login Here
        </Text>
        <Text color="black700">Welcome back you've been missed!</Text>
      </Flex>
      <Flex flexDirection="column" padding="24px">
        <Box as="p">Get started by editing&nbsp;</Box>
        <Box>
          <Box
            as="a"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
              priority
            />
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};

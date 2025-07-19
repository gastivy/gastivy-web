import {
  Colors,
  Flex,
  Icon,
  Text,
  useClickOutside,
  useDisclosure,
} from "astarva-ui";
import { useRouter } from "next/router";
import { useRef } from "react";

import { KEY_IS_LOGIN } from "@/constants/localStorage";
import { route } from "@/constants/route";
import { useLogout } from "@/modules/auth/hooks/useAuth";
import { useUser } from "@/modules/user/hooks/useUser";
import { cookies } from "@/utils/cookies";

export const Profile = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure({ open: false });

  const { data } = useUser();
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      cookies.deleteCookie(KEY_IS_LOGIN);
      router.push("/login");
    },
  });

  const { name, email } = data?.data || {};

  const sidebarMenu = [
    {
      label: "Activity App",
      onClick: () => router.push(route.activityApp.home.path),
      isHide: router.pathname === route.activityApp.home.path,
    },
    {
      label: "Finance App",
      onClick: () => router.push(route.financeApp.home.path),
      isHide: router.pathname === route.financeApp.home.path,
    },
    // { label: "Settings", onClick: undefined },
    { label: "Logout", onClick: logout },
  ];

  const dropdownProfileRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(dropdownProfileRef, onClose);

  return (
    <Flex position="relative" alignItems="center">
      <Flex alignItems="center" gap="1rem">
        <Flex
          borderRadius="1.875rem"
          padding=".5rem"
          backgroundColor="white"
          boxShadow="0 .0625rem .625rem 0 rgba(131, 133, 132, 0.25)"
          onClick={onOpen}
        >
          <Icon name="Person-solid" size="1.5rem" />
        </Flex>
        <Flex flexDirection="column">
          <Text variant="medium">Hi, {name?.split(" ")[0]}</Text>
          <Text
            variant="small"
            color="black400"
          >{`Let's make this day productive`}</Text>
        </Flex>
      </Flex>

      {isOpen && (
        <Flex
          top="-1rem"
          left="-1rem"
          height="100dvh"
          width="100vw"
          position="absolute"
          zIndex="10"
          backgroundColor="rgba(0, 0, 0, 0.6)"
        >
          <Flex
            ref={dropdownProfileRef}
            flexDirection="column"
            width="100vw"
            maxWidth="17.5rem"
            height="100dvh"
            gap="1.25rem"
            backgroundColor="white"
            padding="2.5rem 1.25rem"
            boxShadow="0 .0625rem .625rem 0 rgba(131, 133, 132, 0.25)"
          >
            <Flex alignItems="center" gap="1.25rem">
              <Flex
                justifyContent="center"
                alignItems="center"
                gap="1.25rem"
                backgroundColor="blue400"
                padding=".75rem"
                borderRadius="6.1875rem"
                width="2.625rem"
                height="2.625rem"
              >
                <Text color="blue100" variant="heading6" weight="bold">
                  {name?.charAt(0).toLocaleUpperCase()}
                </Text>
              </Flex>
              <Flex flexDirection="column">
                <Text lineClamp={1} color="black800">
                  {name}
                </Text>
                <Text lineClamp={1} variant="small" color="black300">
                  {email}
                </Text>
              </Flex>
            </Flex>

            <Flex flexDirection="column">
              {sidebarMenu
                .filter((menu) => !menu.isHide)
                .map((item, index) => {
                  return (
                    <Flex
                      padding=".75rem"
                      borderBottom={
                        index < sidebarMenu.length - 1
                          ? `.0625rem solid ${Colors.black100}`
                          : ""
                      }
                      key={index}
                      onClick={item.onClick}
                    >
                      <Text variant="small">{item.label}</Text>
                    </Flex>
                  );
                })}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

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

import { KEY_ACCESS_TOKEN } from "@/constants/cookies";
import { route } from "@/constants/route";
import { cookies } from "@/utils/cookies";

export const Profile = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure({ open: false });

  const handleLogout = () => {
    cookies.deleteCookie(KEY_ACCESS_TOKEN);
    router.push("/login");
  };

  const dropdownProfile = [
    {
      label: "Finance App",
      onClick: () => router.push(route.financeApp.home.path),
    },
    // { label: "Settings", onClick: undefined },
    { label: "Logout", onClick: handleLogout },
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
          <Text variant="medium">Hi, Ganna</Text>
          <Text
            variant="small"
            color="black400"
          >{`Let's make this day productive`}</Text>
        </Flex>
      </Flex>

      {isOpen && (
        <Flex
          ref={dropdownProfileRef}
          flexDirection="column"
          width="13.125rem"
          position="absolute"
          top="3.5rem"
          left="0"
          zIndex="1"
          gap=".5rem"
          backgroundColor="white"
          borderRadius=".375rem"
          padding=".375rem .75rem"
          boxShadow="0 .0625rem .625rem 0 rgba(131, 133, 132, 0.25)"
        >
          {dropdownProfile.map((item, index) => {
            return (
              <Flex
                padding=".75rem"
                borderBottom={
                  index < dropdownProfile.length - 1
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
      )}
    </Flex>
  );
};

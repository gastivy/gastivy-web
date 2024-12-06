import {
  Box,
  Flex,
  Icon,
  Text,
  useClickOutside,
  useDisclosure,
} from "astarva-ui";
import { useRouter } from "next/router";
import { useRef } from "react";

import { cookies } from "@/utils/cookies";

export const Profile = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure({ open: false });

  const handleLogout = () => {
    cookies.deleteCookie("GSTID");
    router.push("/login");
  };

  const dropdownProfile = [
    { label: "Money Management", onClick: undefined },
    // { label: "Settings", onClick: undefined },
    { label: "Logout", onClick: handleLogout },
  ];

  const dropdownProfileRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(dropdownProfileRef, onClose);

  return (
    <Flex
      position="relative"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box />
      <Text weight="medium" variant="large">
        Activity Tracker
      </Text>
      <Flex
        borderRadius="1.875rem"
        padding=".5rem"
        backgroundColor="white"
        boxShadow="0 .0625rem .625rem 0px rgba(131, 133, 132, 0.25)"
        onClick={onOpen}
      >
        <Icon name="Person-solid" size="1.75rem" />
      </Flex>

      {isOpen && (
        <Flex
          ref={dropdownProfileRef}
          flexDirection="column"
          width="13.125rem"
          position="absolute"
          top="3.125rem"
          right="0"
          borderRadius=".625rem"
          boxShadow="0 .0625rem .625rem 0px rgba(131, 133, 132, 0.25)"
        >
          {dropdownProfile.map((item, index) => {
            return (
              <Flex
                padding=".625rem .75rem"
                borderRadius=".625rem"
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

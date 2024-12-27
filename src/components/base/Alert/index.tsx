import { Flex, Icon, Text } from "astarva-ui";
import React from "react";

interface AlertProps {
  message: string;
  description?: string;
  variant: "warning" | "success" | "error";
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  message,
  description,
  variant = "success",
  onClose,
}) => {
  const getColor = () => {
    if (variant === "success")
      return {
        backgroundColor: "green50",
        color: "green500",
      };

    if (variant === "warning")
      return {
        backgroundColor: "yellow50",
        color: "yellow500",
      };

    if (variant === "error")
      return {
        backgroundColor: "red50",
        color: "red500",
      };
  };

  return (
    <Flex
      backgroundColor={getColor()?.backgroundColor}
      flexDirection="column"
      gap=".75rem"
      padding="1rem"
      borderRadius=".375rem"
      border=".0625rem solid"
      borderColor={getColor()?.color}
    >
      <Flex alignItems="center" gap=".5rem">
        <Icon name="Alert-Triangle-solid" color={getColor()?.color} />
        <Flex flexDirection="column" flex={1}>
          <Text
            variant="small"
            color="black900"
            weight={description ? "semi-bold" : "regular"}
          >
            {message}
          </Text>
        </Flex>
        {onClose && <Icon name="Close-solid" size="1rem" onClick={onClose} />}
      </Flex>
      {description && (
        <Flex marginLeft="2rem">
          <Text variant="small" color="black900">
            {description}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

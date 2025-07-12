import { Button, Flex, FlexProps, Text } from "astarva-ui";
import Image from "next/image";
import { FC } from "react";

interface EmptyStateProps extends FlexProps {
  src: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  buttonText?: string;
  onClick?: () => void;
}

export const EmptyState: FC<EmptyStateProps> = ({
  src,
  title,
  description,
  width = 240,
  height = 240,
  buttonText,
  onClick,
  ...props
}) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="1.25rem"
      paddingBottom="1rem"
      {...props}
    >
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Image src={src} alt="Empty State" width={width} height={height} />
        <Text weight="semi-bold" color="black800">
          {title}
        </Text>
        <Text textAlign="center" color="black400" variant="small">
          {description}
        </Text>
      </Flex>

      {buttonText && (
        <Button
          variant="primary"
          shape="semi-round"
          size="medium"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      )}
    </Flex>
  );
};

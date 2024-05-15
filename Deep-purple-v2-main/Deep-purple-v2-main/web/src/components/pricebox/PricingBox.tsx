import React from 'react';
import {
  Box,
  Stack,
  HStack,
  Text,
  Heading,
  Divider,
  List,
  ListIcon,
  ListItem,
  Button
} from "@chakra-ui/react";

import { ArrowForwardIcon, CheckCircleIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

import { axiosInstance } from "../../api/axios/config";

interface PricingBoxProps { popular: boolean, name: string, price: number, info?: string, features?: string[] }

const PricingBox = ({ popular, name, price, info = "", features = [] }: PricingBoxProps) => {
  const createSubscription = async (subscriptionId: string, customerName: string, customerEmail: string) => {
    try {

      const response = await axiosInstance.post('http://localhost:8080/subscriptions/new', {
        subscriptionId: subscriptionId,
        customerName,
        customerEmail,
      });

      const sessionUrl = response.data;

      // Use the session URL
      // For example, you can redirect the user to the session URL
      window.location.href = sessionUrl;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  async function addSubscription() {
    console.log('Adding subscription');
    createSubscription(name, 'John Doe', 'john.doe@example.com');
  }

  return (
    <Stack
      spacing={2}
      border="3px solid"
      borderColor={popular ? "teal.300" : "gray.300"}
      borderRadius="0.7rem"
      p={4}
      h="350px"
      backgroundColor="purple-1"
      position="relative"
    >
      {popular && (
        <Box
          position="absolute"
          top="0"
          right="0"
          backgroundColor="teal.300"
          color="white"
          paddingX={2}
          paddingY={1}
          borderRadius="0 0 0 0.7rem"
          fontSize="0.8rem"
        >
          POPULAR
        </Box>
      )}
      <Text textTransform="uppercase">{name}</Text>
      <HStack>
        <Heading>{price ?? "Free"}</Heading>
        {price && (
          <Box as="span" color="gray.600" fontSize="sm">
            / mo
          </Box>
        )}
      </HStack>
      <Divider borderColor="blackAlpha.500" />
      <List flex="1">
        {features.map((feat) => (
          <ListItem key={Math.random()}>
            <ListIcon as={CheckCircleIcon} color="gray.400" />
            {feat}
          </ListItem>
        ))}
      </List>
      <Box>
        <Button
          variant="solid"
          size="sm"
          width="100%"
          rightIcon={<ArrowForwardIcon />}
          borderRadius={0}
          display="flex"
          justifyContent="space-between"
          backgroundColor={popular ? "teal.300" : "gray.400"}
          _hover={{
            backgroundColor: popular ? "teal.500" : "gray.300"
          }}
          color="white"
          onClick={addSubscription}
        >
          Buy
        </Button>
        <Text fontSize="xs">{info}</Text>
      </Box>
    </Stack>
  );
};
PricingBox.propTypes = {
  name: PropTypes.string.isRequired,
  popular: PropTypes.bool,
  price: PropTypes.number,
  info: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string)
};

export default PricingBox;
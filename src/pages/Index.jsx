import React, { useState } from "react";
import { Box, VStack, Heading, Text, Image, useToast, Input, Center, SimpleGrid } from "@chakra-ui/react";

const tarotCards = [
  { title: "The Fool", description: "New beginnings, optimism, trust in life" },
  { title: "The Magician", description: "Action, the power to manifest" },
  { title: "The High Priestess", description: "Inaction, going within, the mystical" },
  // ... add all other tarot cards
];

const Index = () => {
  const [images, setImages] = useState({});
  const toast = useToast();

  const handleImageChange = (e, cardTitle) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prevImages) => ({
          ...prevImages,
          [cardTitle]: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
      toast({
        title: "Image uploaded.",
        description: `You have uploaded an image for the ${cardTitle} card.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <VStack spacing={8}>
        <Heading>Tarot Card Upload</Heading>
        <Text>Click on the card image to upload an image for that tarot card.</Text>
        <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={10}>
          {tarotCards.map((card) => (
            <Center key={card.title} p={5} borderWidth="1px" borderRadius="lg">
              <VStack spacing={3}>
                <Heading size="md">{card.title}</Heading>
                <Text fontSize="sm">{card.description}</Text>
                <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, card.title)} style={{ display: "none" }} id={`file-input-${card.title}`} />
                <Image src={images[card.title] || 'https://images.unsplash.com/photo-1616628188540-925618b98318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0YXJvdCUyMGNhcmQlMjBwbGFjZWhvbGRlcnxlbnwwfHx8fDE3MDkyNjk2Mzd8MA&ixlib=rb-4.0.3&q=80&w=1080'} alt={`${card.title} image`} boxSize="150px" objectFit="cover" cursor="pointer" onClick={() => document.getElementById(`file-input-${card.title}`).click()} />
              </VStack>
            </Center>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Index;

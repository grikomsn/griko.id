import * as React from "react";

import DoodleMobile from "@/components/doodle-mobile";
import { baseRenderer } from "@/utils/renderers";

import { Box, Divider, Heading, HStack, Link, Stack } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import Markdown from "react-markdown";
import siteConfig from "site-config";

interface SocialImagePageProps {
  title: string;
  description: string;
  path: string;
}

const SocialImagePage: NextPage<SocialImagePageProps> = ({
  title,
  description,
  path,
}) => {
  return (
    <HStack
      borderColor="gray.700"
      borderWidth={8}
      h="512px"
      id="social-image"
      p={16}
      spacing={16}
      w="1024px"
    >
      <Box>
        <DoodleMobile boxSize="2xs" />
      </Box>

      <Stack>
        <Box>
          <Heading size={title.length > 40 ? "lg" : "xl"}>{title}</Heading>
        </Box>

        <Box fontSize="lg">
          <Markdown renderers={baseRenderer} source={description} />
        </Box>

        <Box py={4}>
          <Divider />
        </Box>

        <Box>
          <Link href={path} isExternal variant="link">
            {path}
          </Link>
        </Box>
      </Stack>
    </HStack>
  );
};

// @ts-expect-error custom disable layout parameter
SocialImagePage.disableLayout = true;

export const getServerSideProps: GetServerSideProps<SocialImagePageProps> = async ({
  query,
}) => {
  const t = (query.title as string) || siteConfig.title;
  const d = (query.description as string) || siteConfig.descriptionMd;
  const p = `${siteConfig.url}${query.path ?? ""}`;

  return {
    props: {
      title: t,
      description: d,
      path: p,
    },
  };
};

export default SocialImagePage;

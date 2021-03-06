import { Box, Flex, Heading, Link, Stack, Text, Skeleton } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { DomainConceptList } from '../../components/concepts/DomainConceptList';
import { BreadcrumbLink } from '../../components/layout/NavigationBreadcrumbs';
import { PageLayout } from '../../components/layout/PageLayout';
import { DomainLearningPaths } from '../../components/learning_paths/DomainLearningPaths';
import { InternalButtonLink } from '../../components/navigation/InternalLink';
import { DomainRecommendedResources } from '../../components/resources/DomainRecommendedResources';
import { ConceptData, generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewData, generateResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { useMockedFeaturesEnabled } from '../../hooks/useMockedFeaturesEnabled';
import { useGetDomainByKeyDomainPageQuery, GetDomainByKeyDomainPageQuery } from './DomainPage.generated';

export const DomainPagePath = (domainKey: string) => `/domains/${domainKey}`;

export const DomainPageInfo = (domain: DomainDataFragment): BreadcrumbLink => ({
  name: domain.name,
  path: DomainPagePath(domain.key),
  routePath: DomainPagePath('[key]'),
});

export const getDomainByKeyDomainPage = gql`
  query getDomainByKeyDomainPage($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
      concepts(options: { sorting: { entity: relationship, field: index, direction: ASC } }) {
        items {
          concept {
            ...ConceptData
          }
          relationship {
            index
          }
        }
      }
      resources(options: { pagination: { limit: 30 } }) {
        items {
          ...ResourcePreviewData
        }
      }
    }
  }
  ${DomainData}
  ${ConceptData}
  ${ResourcePreviewData}
`;

const placeholderDomainData: GetDomainByKeyDomainPageQuery['getDomainByKey'] = {
  ...generateDomainData(),
  concepts: {
    items: [
      {
        concept: generateConceptData(),
        relationship: {
          index: 0,
        },
      },
      {
        concept: generateConceptData(),
        relationship: {
          index: 0,
        },
      },
    ],
  },
  resources: {
    items: [generateResourcePreviewData(), generateResourcePreviewData(), generateResourcePreviewData()],
  },
};

export const DomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const router = useRouter();
  const { data, error, loading } = useGetDomainByKeyDomainPageQuery({ variables: { key: domainKey } });
  const domain = data?.getDomainByKey || placeholderDomainData;
  const { mockedFeaturesEnabled } = useMockedFeaturesEnabled();
  if (error) return <Box>Domain not found !</Box>;

  return (
    <PageLayout>
      <Flex direction="row" alignItems="center" pb={5}>
        <Skeleton isLoaded={!loading}>
          <Heading fontSize="4xl" fontWeight="normal" color="blackAlpha.800">
            Learn {domain.name}
          </Heading>
        </Skeleton>
        <Box flexGrow={1} />
        <InternalButtonLink
          variant="outline"
          borderColor="blue.500"
          color="blue.700"
          borderWidth="1px"
          routePath="/domains/[key]/resources/new"
          asHref={router.asPath + '/resources/new'}
          loggedInOnly
          isDisabled={loading}
        >
          + Add resource
        </InternalButtonLink>
        {mockedFeaturesEnabled && (
          <Box ml={2}>
            <InternalButtonLink
              routePath="/domains/[key]/resources/indexing_queue"
              asHref={router.asPath + '/resources/indexing_queue'}
              variant="solid"
              fontStyle="italic"
            >
              32 Pending Resources
            </InternalButtonLink>
          </Box>
        )}
      </Flex>
      {domain && domain.description && (
        <Box mb={2} fontWeight={250}>
          {domain.description}
        </Box>
      )}
      {/* <Box mb={4}>
        <NextLink href={`${router.asPath}/resources`}>
          <Link>All Resources </Link>
        </NextLink> */}
      {/* |
        <NextLink href={`${router.asPath}/concepts`}>
          <Link> Detailed Concept List</Link>
        </NextLink> */}
      {/* </Box> */}
      <Flex direction="row">
        <Flex direction="column" flexShrink={0}>
          <DomainConceptList domain={domain} isLoading={loading} />
        </Flex>
        {domain.resources && (
          <Flex direction="column" flexShrink={1} flexGrow={1}>
            <DomainRecommendedResources domain={domain} resourcePreviews={domain.resources.items} isLoading={loading} />
            {mockedFeaturesEnabled && <DomainLearningPaths domain={domain} />}
          </Flex>
        )}
        {mockedFeaturesEnabled && (
          <Stack spacing={4} direction="column" ml={6} flexShrink={1}>
            <Box>
              <Text fontSize="2xl">Sub domains</Text>
              <Stack direction="column" spacing={1}>
                {[
                  { _id: 1, name: 'Elixir' },
                  { _id: 2, name: 'Clojure' },
                  { _id: 3, name: 'Haskell' },
                  { _id: 4, name: 'JavaScript Functional Programming' },
                ].map((domain) => (
                  <Link key={domain._id}>{domain.name}</Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Text fontSize="2xl">Related domains</Text>
              <Stack direction="column" spacing={1}>
                {[
                  { _id: 1, name: 'Category Theory' },
                  { _id: 2, name: 'Object Oriented Programming' },
                ].map((domain) => (
                  <Link key={domain._id}>{domain.name}</Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Text fontSize="2xl">Links</Text>
              <Stack direction="column"></Stack>
            </Box>
          </Stack>
        )}
      </Flex>
      {/* <Box>
        <Box mb={4}>
          <Text fontSize="2xl">Resources</Text>
          <Box mt={2}>
            <ResourceList domainKey={domain.key} />
          </Box>
        </Box>
        <Box mb={4}>
          <Text fontSize="2xl">Concepts</Text>
          <Box mt={2}>
            <ConceptList domainKey={domain.key} />
          </Box>
        </Box>
      </Box> */}
    </PageLayout>
  );
};

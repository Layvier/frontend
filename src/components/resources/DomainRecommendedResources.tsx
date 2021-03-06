import { Box, Checkbox, Flex, Stack, Text } from '@chakra-ui/core';
import { useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { RoleAccess } from '../auth/RoleAccess';
import { ResourcePreviewCardList } from './ResourcePreviewCard';

export const DomainRecommendedResources: React.FC<{
  domain: DomainDataFragment;
  resourcePreviews: ResourcePreviewDataFragment[];
  isLoading?: boolean;
}> = ({ domain, resourcePreviews, isLoading }) => {
  const [showCheckedResources, setShowCheckedResources] = useState(false);
  return (
    <Flex direction="column" mb={4}>
      <Stack direction="row" isInline alignItems="center" spacing={4} mb={3} pr={3}>
        <Text fontSize="2xl">Resources</Text>

        <Box flexGrow={1} />
        <RoleAccess accessRule="loggedInUser">
          <Stack spacing={2} direction="row">
            <Text fontWeight={300}>Show completed</Text>
            <Checkbox
              size="lg"
              px={1}
              isChecked={showCheckedResources}
              onChange={(e: any) => setShowCheckedResources(e.target.checked)}
            />
          </Stack>
        </RoleAccess>
      </Stack>

      <ResourcePreviewCardList
        domainKey={domain.key}
        resourcePreviews={resourcePreviews.filter(
          (r) => !!showCheckedResources || !r.consumed || !r.consumed.consumedAt
        )}
        isLoading={isLoading}
      />
    </Flex>
  );
};

import {
  Icon,
  Link,
  Skeleton,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormLabel,
  FormControl,
} from '@chakra-ui/core';
import gql from 'graphql-tag';

import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { toUrlPreview, validateUrl } from '../../services/url.service';
import { useSetResourceOpenedMutation } from './ResourceUrl.generated';

export const setResourceOpened = gql`
  mutation setResourceOpened($resourceId: String!) {
    setResourcesConsumed(payload: { resources: [{ resourceId: $resourceId, opened: true }] }) {
      _id
      consumed {
        openedAt
      }
    }
  }
`;

export const ResourceUrlLink: React.FC<{
  resource: Pick<ResourcePreviewDataFragment, '_id' | 'consumed' | 'url'>;
  isLoading?: boolean;
}> = ({ resource, isLoading }) => {
  const [setResourceOpened] = useSetResourceOpenedMutation({ variables: { resourceId: resource._id } });
  return (
    <Skeleton isLoaded={!isLoading}>
      <Link
        fontSize="sm"
        color={resource.consumed && resource.consumed.openedAt ? 'blue.400' : 'blue.700'}
        href={resource.url}
        onClick={() => {
          if (!resource.consumed || !resource.consumed.openedAt) {
            setResourceOpened();
          }
        }}
        isExternal
      >
        {toUrlPreview(resource.url)}
        <Icon name="external-link" mx="2px" />
      </Link>
    </Skeleton>
  );
};

export const ResourceUrlInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({
  value,
  onChange,
}) => {
  const isValidUrl = validateUrl(value);
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="url">Url</FormLabel>
      <InputGroup>
        <Input
          id="url"
          isInvalid={!!value && !isValidUrl}
          placeholder="https://example.com"
          size="md"
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
        ></Input>
        <InputRightElement
          children={
            value && (
              <Link href={value} isExternal isDisabled={!isValidUrl}>
                <IconButton
                  size="xs"
                  aria-label="Open link"
                  color={isValidUrl ? 'green.400' : 'red.400'}
                  icon="external-link"
                />
              </Link>
            )
          }
        />
      </InputGroup>
    </FormControl>
  );
};

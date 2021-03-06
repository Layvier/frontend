import { Badge, BadgeProps, FormControl, FormLabel, Select } from '@chakra-ui/core';
import { upperFirst, values } from 'lodash';
import { ResourceType } from '../../graphql/types';

const colorMapping: { [key in ResourceType]: string } = {
  [ResourceType.Article]: 'green',
  [ResourceType.ArticleSeries]: 'green',
  [ResourceType.Course]: 'red',
  [ResourceType.Guide]: 'red',
  [ResourceType.Introduction]: 'blue',
  [ResourceType.Tutorial]: 'orange',
  [ResourceType.Podcast]: 'yellow',
  [ResourceType.PodcastSeries]: 'yellow',
  [ResourceType.Other]: 'gray',
};

export const ResourceTypeBadge: React.FC<BadgeProps & { type: ResourceType }> = ({ type, ...badgeProps }) => {
  return (
    <Badge variantColor={colorMapping[type]} fontSize="0.8em" {...badgeProps}>
      {type}
    </Badge>
  );
};

export const ResourceTypeSelector: React.FC<{ value: ResourceType; onSelect: (type: ResourceType) => void }> = ({
  onSelect,
  value,
}) => {
  return (
    <FormControl display="flex" flexDirection="row" alignItems="baseline" isRequired isInvalid={!value}>
      <FormLabel htmlFor="type">Type</FormLabel>
      <Select
        id="type"
        placeholder="Select Type"
        value={value}
        onChange={(e) => onSelect(e.target.value as ResourceType)}
      >
        {values(ResourceType).map((type) => (
          <option key={type} value={type}>
            {type.split('_').map(upperFirst).join(' ')}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

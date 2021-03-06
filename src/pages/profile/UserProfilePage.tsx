import { PageLayout } from '../../components/layout/PageLayout';

export const UserProfilePage: React.FC<{ userKey: string }> = ({ userKey }) => {
  return <PageLayout>Profile of {userKey}</PageLayout>;
};

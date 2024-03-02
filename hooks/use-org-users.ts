import { useOrganization } from '@clerk/nextjs';

export const useOrgUsers = () => {
  const organization = useOrganization({
    memberships: true,
  });
  return organization.memberships?.data?.map((user) => {
    return user.publicUserData;
  });
};

import { OrgControl } from './_components/org-control';

import { startCase } from 'lodash';
import { auth } from '@clerk/nextjs';

export function generateMetadata() {
  const { orgSlug } = auth();

  if (!orgSlug) {
    return {
      title: 'Organization',
    };
  }

  return {
    title: startCase(orgSlug || 'Organizaiton'),
  };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;

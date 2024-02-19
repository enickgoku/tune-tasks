'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useOrganizationList } from '@clerk/nextjs';

// If you manually change the organization
// in the URL, the OrgControl component
// will update the active organization in the Clerk context.
// Additionally, it will update the active organization if params change
// from a different source such as a button click in the sidebar.

export const OrgControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: params.organizationId as string,
    });
  }, [setActive, params.organizationId]);

  return null;
};

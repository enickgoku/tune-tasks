import { getCardAssignmentData } from '@/lib/get-card-assignment-data';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const cardAssignmentData = await getCardAssignmentData(params.cardId);

    const usersInOrg =
      await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: orgId,
      });

    if (!usersInOrg) {
      return new NextResponse('No Users in organization', { status: 401 });
    }

    const usersAssignedToCards = usersInOrg
      .map((user) => user.publicUserData)
      .filter((user) => {
        return cardAssignmentData?.data!.some((assignment) => {
          return assignment.userId === user?.userId;
        });
      })
      .map((u) => {
        return {
          name: u?.firstName + ' ' + u?.lastName,
        };
      });

    return NextResponse.json(usersAssignedToCards, { status: 200 });
  } catch {
    return new NextResponse('Internal API Error', { status: 500 });
  }
}

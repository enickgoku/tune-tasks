import { createBoard } from '@/actions/create-board';
import { db } from '@/lib/db';

import { Button } from '@/components/ui/button';

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany();
  return (
    <div className="flex flex-col space-y-4">
      <form action={createBoard}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a Board title."
          className="border-black border p-1"
        />
        <Button type="submit" className="border-black border p-1">
          Create Board
        </Button>
      </form>
      <div className="space-y-2">
        {boards.map((board) => (
          <div key={board.id}>
            <h2>Board Name: {board.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;

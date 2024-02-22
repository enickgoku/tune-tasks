interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <div>
      <h1>BoardIdPage</h1>
    </div>
  );
};

export default BoardIdPage;

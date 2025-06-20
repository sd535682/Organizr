import { useNavigation } from "../hooks/useNavigation";

export const BoardsPage = () => {
  const { navigateToBoard } = useNavigation();

  return (
    <div>
      <h1>Boards Page</h1>
      <button onClick={() => navigateToBoard("1")}>
        Redirect to Board Details
      </button>
    </div>
  );
};

import { useNavigation } from "../hooks/useNavigation";

export const BoardDetailsPage = () => {
  const { navigateToBoards } = useNavigation();

  return (
    <div>
      <h1>Board Details Page</h1>
      <button onClick={() => navigateToBoards()}>Go Back</button>
    </div>
  );
};

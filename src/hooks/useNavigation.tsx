import { useNavigate, useParams, useLocation } from "react-router";

export const useNavigation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const navigateToBoard = (boardId: string) => {
    navigate(`/boards/${boardId}`);
  };

  const navigateToBoards = () => {
    navigate("/boards");
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    navigate,
    params,
    location,
    navigateToBoard,
    navigateToBoards,
    goBack,
    currentBoardId: params.boardId,
    isOnBoardsPage: location.pathname === "/boards",
    isOnBoardDetailPage:
      location.pathname.includes("/boards/") && location.pathname !== "/boards",
  };
};

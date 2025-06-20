import ResponsiveTable from "../components/BoardsTable/BoardsTable";

export const BoardsPage = () => {
  return (
    <div className="px-8 mt-4">
      <div className="flex py-4">
        <h1 className="text-2xl font-semibold">Boards Page</h1>
        <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded">
          Add Board
        </button>
      </div>
      <ResponsiveTable />
    </div>
  );
};

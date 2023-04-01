const Pagination = ({
  totalPages,
  handlePageChange,
  currentPage,
}: {
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  currentPage: number;
}) => {
  return (
    <>
      {totalPages > 1 && (
        <div className="col-span-2 mt-5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={pageNumber === currentPage ? true : false}
                className="pagination-btn mx-2 rounded bg-black bg-opacity-75 px-2 py-1 disabled:bg-opacity-25"
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;

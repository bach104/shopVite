import PropTypes from "prop-types";

const Btn = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const visiblePages = 4;
  
  let startPage = 1;
  if (totalPages > visiblePages) {
    if (currentPage <= 2) {
      startPage = 1;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - visiblePages + 1;
    } else {
      startPage = currentPage - 1;
    }
  }

  const pageNumbers = [];
  for (let i = 0; i < Math.min(visiblePages, totalPages); i++) {
    pageNumbers.push(startPage + i);
  }

  return (
    <div className="flex justify-center items-center mt-5">
      <nav
        className={`w-10 h-10 flex justify-center items-center cursor-pointer btn__click rounded-sm mx-3 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
      >
        <i className="fa-solid fa-angle-left"></i>
      </nav>

      <div className="flex gap-3">
        {pageNumbers.map((pageNumber) => (
          <nav
            key={pageNumber}
            className={`w-10 h-10 flex justify-center items-center cursor-pointer btn__click rounded-sm ${
              currentPage === pageNumber ? "bg-gray-700 text-white" : ""
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </nav>
        ))}

        {totalPages > visiblePages && pageNumbers[pageNumbers.length - 1] < totalPages && (
          <nav className="w-10 h-10 flex justify-center items-center cursor-pointer btn__click rounded-sm">
            ...
          </nav>
        )}
      </div>

      <nav
        className={`w-10 h-10 flex justify-center items-center cursor-pointer btn__click rounded-sm mx-3 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => currentPage !== totalPages && setCurrentPage(currentPage + 1)}
      >
        <i className="fa-solid fa-angle-right"></i>
      </nav>
    </div>
  );
};

Btn.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Btn;

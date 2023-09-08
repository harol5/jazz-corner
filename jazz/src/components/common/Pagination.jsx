const Pagination = ({ previous, next, setEndPoint }) => {
  return (
    <nav>
      <ul className="pagination justify-content-center z-0">
        <li className="page-item m-2">
          <button
            className="btn btn-primary"
            onClick={() => setEndPoint(previous)}
            disabled={!previous ? "disabled" : null}
          >
            Prev
          </button>
        </li>
        <li className="page-item m-2">
          <button
            className="btn btn-primary"
            onClick={() => setEndPoint(next)}
            disabled={!next ? "disabled" : null}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

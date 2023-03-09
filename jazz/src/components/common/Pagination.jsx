const Pagination = ({ previous, next, setEndPoint }) => {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a
            href="#"
            className="page-link"
            onClick={() => setEndPoint(previous)}
          >
            Previous
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link" onClick={() => setEndPoint(next)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

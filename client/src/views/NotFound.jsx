const NotFound = () => {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <h2 className="text-danger mb-4" style={{ fontSize: '3rem' }}>
          404 Not Found
        </h2>
        <p className="lead mb-4" style={{ fontSize: '1.5rem' }}>
          Oops! The page you're looking for does not exist.
        </p>
        <a href="/" className="btn btn-primary btn-lg">
          Go Back Home
        </a>
      </div>
    );
};

export default NotFound;
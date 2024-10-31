const PaymentFailure = () => {
    return (
        <div className="container mt-5 text-center">
            <h1 className="display-4 text-danger">Payment Failed</h1>
            <p className="lead">Unfortunately, there was an issue processing your payment.</p>
            <p>Please try again or contact support if the problem persists.</p>
            <a href="/get-premium" className="btn btn-primary">Try Again</a>
        </div>
    );
};

export default PaymentFailure;
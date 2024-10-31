
const PaymentSuccess = () => {
    return (
        <div className="container mt-5 text-center">
            <h2 className="display-4">Payment Successful!</h2>
            <p className="lead">Thank you for upgrading to premium!</p>
            <p>Your premium features are now enabled</p>
            <a href="/statistics" className="btn btn-primary">Go to Statistics</a>
        </div>
    );
};

export default PaymentSuccess;

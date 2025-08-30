function ErrorFallback({ error }: { error: Error }) {
    return (
        <div role="alert" style={{ padding: "1rem", background: "#ffeeee" }}>
            <h2>Something went wrong:</h2>
            <pre>{error.message}</pre>
        </div>
    );
}

export default ErrorFallback;
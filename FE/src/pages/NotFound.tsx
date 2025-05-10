const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <img 
                    src="/404.png" 
                    alt="404 Not Found" 
                    className="w-100 h-64 mx-auto animate-float"
                />
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <p className="text-xl text-muted-foreground">Oops! Page not found</p>
                <a 
                    href="/" 
                    className="duck-button inline-block"
                >
                    Go back home
                </a>
            </div>
        </div>
    );
}
 
export default NotFound;
const LoadingSpinner = ({ className }: { className?: string }) => {
    return (
        <div className="flex justify-center items-center py-20">
            <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-duck-yellow ${className}`}></div>
        </div>
    );
}

export default LoadingSpinner;
// Header skeleton loader for better UX
export function HeaderSkeleton() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 sticky top-0 z-30">
            <div className="flex items-center space-x-4">
                <div className="h-7 w-40 bg-muted rounded animate-pulse"></div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
                <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
                <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
            </div>
        </header>
    );
}
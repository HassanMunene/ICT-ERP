import { cn } from "@/lib/utils";

// Main loading component
export function AppLoading() {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg font-semibold">Loading Dashboard</p>
                <p className="text-sm text-muted-foreground">Please wait...</p>
            </div>
        </div>
    );
}

// Skeleton loader for content
export function ContentSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
            </div>
        </div>
    );
}

// Page loading component
export function PageLoading({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">{message}</p>
            </div>
        </div>
    );
}

// Loading spinner for buttons/small elements
export function Spinner({ className }: { className?: string }) {
    return (
        <div className={cn("animate-spin rounded-full h-4 w-4 border-b-2 border-current", className)} />
    );
}
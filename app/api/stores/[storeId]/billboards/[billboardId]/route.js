import prismaClient from "@/lib/prismadb"; // Import Prisma client for database interaction
import { auth } from "@clerk/nextjs/server"; // Import Clerk's server-side authentication
import { NextResponse } from "next/server"; // Import Next.js's response helper

// Handle the GET request to fetch a specific billboard by its ID
export async function GET(request, { params }) {
    try {
        // Check if the billboardId is provided in the URL parameters
        if (!params.billboardId) {
            return new NextResponse("Billboard id required", { status: 400 }); // Return 400 if billboardId is missing
        }

        // Fetch the billboard from the database using findUnique with the provided billboardId
        const billboard = await prismaClient.billboard.findUnique({
            where: {
                id: params.billboardId, // Billboard ID provided in the URL parameters
            }
        });

        // Return the found billboard as a JSON response
        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_GET]', error); // Log any error that occurs for debugging
        return new NextResponse("Internal server error", { status: 500 }); // Return 500 if an internal server error occurs
    }
};

// Handle the PATCH request to update an existing billboard
export async function PATCH(request, { params }) {
    try {
        // Authenticate the user
        const { userId } = auth();
        
        // Parse the request body to get the updated data
        const body = await request.json();
        const { label, imageUrl } = body;

        // Check if the user is authenticated
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 }); // Return 401 if user is not authenticated
        }

        // Validate that required fields are provided
        if (!label) {
            return new NextResponse("Billboard label is required", { status: 400 }); // Return 400 if label is missing
        }
        if (!imageUrl) {
            return new NextResponse("Billboard image URL is required", { status: 400 }); // Return 400 if image URL is missing
        }
        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 }); // Return 400 if billboardId is missing
        }

        // Ensure the store belongs to the authenticated user
        const storeByUserId = await prismaClient.store.findFirst({
            where: {
                id: params.storeId,  // Ensure storeId matches
                userId: userId,      // Ensure the authenticated user owns the store
            }
        });

        // If the store doesn't belong to the user, return 403 (Forbidden)
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 }); // Return 403 if the user is not authorized
        }

        // Update the billboard's label and imageUrl in the database
        const billboard = await prismaClient.billboard.updateMany({
            where: {
                id: params.billboardId, // Update the billboard with the matching billboardId
            },
            data: {
                label: label,        // Update the label
                imageUrl: imageUrl,  // Update the imageUrl
            }
        });

        // Return the updated billboard data
        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error); // Log any error that occurs
        return new NextResponse("Internal server error", { status: 500 }); // Return 500 if there's a server error
    }
};

// Handle the DELETE request to remove a billboard
export async function DELETE(request, { params }) {
    try {
        // Retrieve the authenticated user's ID from Clerk
        const { userId } = auth();
        
        // Check if the user is authenticated
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 }); // Return 401 if not authenticated
        }

        // Validate that the billboardId is provided in the URL parameters
        if (!params.billboardId) {
            return new NextResponse("Billboard Id required", { status: 400 }); // Return 400 if billboardId is missing
        }

        // Ensure the store belongs to the authenticated user
        const storeByUserId = await prismaClient.store.findFirst({
            where: {
                id: params.storeId,  // Ensure the store ID matches
                userId: userId,      // Ensure the user owns the store
            }
        });

        // If the store doesn't belong to the user, return 403 (Forbidden)
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 }); // Return 403 if the user is not authorized
        }

        // Delete the billboard from the database using deleteMany (can use delete if ID is unique)
        const billboard = await prismaClient.billboard.deleteMany({
            where: {
                id: params.billboardId,  // Delete the billboard with the provided billboardId
            }
        });

        // Return the deleted billboard data (or the count of deleted records)
        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error); // Log any error that occurs for debugging
        return new NextResponse("Internal server error", { status: 500 }); // Return 500 if a server error occurs
    }
}

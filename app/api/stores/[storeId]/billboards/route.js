import prismaClient from "@/lib/prismadb"; // Import Prisma client for database interaction
import { auth } from "@clerk/nextjs/server"; // Import Clerk's server-side authentication
import { NextResponse } from "next/server"; // Import Next.js's response helper


// Handle the GET request to fetch billboards for a specific store
export async function GET(request, { params }) {
    try {
        // Check if the storeId is provided in the URL parameters
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 }); // Return 400 if storeId is missing
        }

        // Fetch all billboards associated with the provided storeId using Prisma
        const billboards = await prismaClient.billboard.findMany({
            where: {
                storeId: params.storeId, // Filter billboards by the store ID from the URL parameters
            }
        });

        // Return the fetched billboards as a JSON response
        return NextResponse.json(billboards);

    } catch (error) {
        console.log('[BILLBOARDS_GET]', error); // Log any error that occurs for debugging
        return new NextResponse("Internal server error", { status: 500 }); // Return 500 if an internal error occurs
    }
};

// Handle the POST request to create a new billboard
export async function POST(request, { params }) {
    try {
        // Retrieve the authenticated user's ID from Clerk
        const { userId } = auth();
        
        // Parse the request body to get the data sent in the POST request
        const body = await request.json();
        const { label, imageUrl } = body;

        // Check if the user is authenticated
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 }); // Return 401 if no user ID is found
        }

        // Check if the billboard label is provided
        if (!label) {
            return new NextResponse("Billboard label is required", { status: 400 }); // Return 400 if label is missing
        }

        // Check if the image URL for the billboard is provided
        if (!imageUrl) {
            return new NextResponse("Billboard image url is required", { status: 400 }); // Return 400 if image URL is missing
        }

        // Check if the storeId is provided in the URL parameters
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 }); // Return 400 if storeId is missing
        }

        // Find the store by ID and check if it belongs to the authenticated user
        const storeByUserId = await prismaClient.store.findFirst({
            where: {
                id: params.storeId,  // Store ID from URL params
                userId: userId,      // User ID from Clerk's authentication
            }
        });

        // If the store doesn't exist or the user doesn't own it, return 403 (forbidden)
        if (!storeByUserId) {
            return new NextResponse("Unauthorised", { status: 403 }); // Return 403 if store is not owned by the user
        }

        // Create a new billboard in the database
        const billboard = await prismaClient.billboard.create({
            data: {
                label: label,               // Billboard label from the request body
                imageUrl: imageUrl,         // Billboard image URL from the request body
                storeId: params.storeId,    // Store ID from the URL parameters
            }
        });

        // Return the created billboard as JSON
        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_POST]', error); // Log any error that occurs for debugging
        return new NextResponse("Internal server error", { status: 500 }); // Return 500 if an internal error occurs
    }
};
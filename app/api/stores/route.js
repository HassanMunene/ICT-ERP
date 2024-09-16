import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; // Import Next.js's response utility for creating server responses

import prismaClient from "@/lib/prismadb"; // Import the Prisma client to interact with the database

// Define an async POST function to handle the creation of a new store
export async function POST(request) {
    try {
        // Retrieve the authenticated user's ID from the request using Clerk's auth function
        const { userId } = auth();
        // Parse the request body to extract the JSON data
        const body = await request.json();
        const { name } = body; // Destructure 'name' from the request body

        // Check if the user is authenticated (i.e., userId exists)
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 }); // Return a 401 Unauthorized response if no userId
        }

        // Check if the 'name' field is provided in the request body
        if (!name) {
            return new NextResponse("Name is required", { status: 400 }); // Return a 400 Bad Request if 'name' is missing
        }

        // Create a new store in the database using Prisma with the provided name and userId
        const store = await prismaClient.store.create({
            data: {
                name: name,
                userId: userId,
            },
        });

        // Return the created store as a JSON response
        return NextResponse.json(store);
    } catch (error) {
        // Log any error that occurs during the process for debugging purposes
        console.log('[STORE_POST]', error);
        
        // Return a 500 Internal Server Error response in case of any errors
        return new NextResponse('Internal error', { status: 500 });
    }
}
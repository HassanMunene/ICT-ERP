import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismaClient from "@/lib/prismadb";

/**
 * API route handler for updating a store. (PATCH request)
 *
 * This handler expects a PATCH request with a JSON body containing the
 * updated store name (`name`). It validates the presence of the name and
 * store ID in the request parameters. It then performs the following actions:
 *
 * 1. Authenticates the user using Clerk.
 * 2. Checks for authorization (requires a logged-in user).
 * 3. Extracts the updated name from the request body.
 * 4. Validates the presence of the updated name.
 * 5. Extracts the store ID from the URL parameters.
 * 6. Validates the presence of the store ID.
 * 7. Updates the store data in the Prisma database using `prismaClient.store.updateMany`.
 * 8. Returns a JSON response containing the updated store data.
 * 9. Catches and logs errors, returning an appropriate error response.
 *
 * @param {Request} request - The incoming PATCH request
 * @param {object} params - URL parameters from the request
 * @returns {NextResponse} The response to the client
 */
export async function PATCH(request, { params }) {
  try {
    // Authenticate the user
    const { userId } = auth();
    if (!userId) {
      // Unauthorized if not logged in
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body as JSON
    const body = await request.json();

    // Extract the updated name from the body
    const { name } = body;

    // Validate presence of the name
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Extract the store ID from the URL parameters
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    // Update the store data in the database
    const store = await prismaClient.store.updateMany({
      where: {
        id: params.storeId,
        userId: userId,
      },
      data: {
        name: name,
      },
    });

    // Return the updated store data
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

/**
 * API route handler for deleting a store. (DELETE request)
 *
 * This handler expects a DELETE request with the store ID in the URL 
 * parameters. It validates the presence of the store ID and performs 
 * the following actions:
 *
 * 1. Authenticates the user using Clerk.
 * 2. Checks for authorization (requires a logged-in user).
 * 3. Extracts the store ID from the URL parameters.
 * 4. Validates the presence of the store ID.
 * 5. Deletes the store data from the Prisma database using `prismaClient.store.deleteMany`.
 * 6. Returns a JSON response containing the deleted store data 
 *   (likely an empty object).
 * 7. Catches and logs errors, returning an appropriate error response.
 *
 * @param {Request} request - The incoming DELETE request
 * @param {object} params - URL parameters from the request
 * @returns {NextResponse} The response to the client
 */
export async function DELETE(request, { params }) {
  try {
    // Authenticate the user
    const { userId } = auth();
    if (!userId) {
      // Unauthorized if not logged in
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract the store ID from the URL parameters
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Delete the store data from the database
    const store = await prismaClient.store.deleteMany({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    // Return a response, likely an empty object
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE', error);
    return new NextResponse("Internal Server Error", {status: 500});
  }
};
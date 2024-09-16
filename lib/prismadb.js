import { PrismaClient } from "@prisma/client"; // Import PrismaClient from Prisma for database interaction

let prismaClient; // Declare a variable to hold the PrismaClient instance

// Check if the application is running in production
if (process.env.NODE_ENV === 'production') {
    // In production, create a new instance of PrismaClient
    prismaClient = new PrismaClient();
} else {
    // In development, reuse the PrismaClient instance to avoid creating a new one each time
    if (!global.prismaClient) {
        // If there's no global PrismaClient instance, create one
        global.prismaClient = new PrismaClient();
    }
    // Assign the global PrismaClient instance to prismaClient
    prismaClient = global.prismaClient;
}

export default prismaClient; // Export the PrismaClient instance for use in other parts of the app
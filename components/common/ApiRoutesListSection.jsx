'use client';

import { useOrigin } from "@/hooks/useOrigin"; // Custom hook to get the current origin (base URL)
import { useParams } from "next/navigation"; // Hook to access dynamic route parameters
import ApiAlertBox from "./ApiAlertBox"; // Reusable alert component for showing API routes

/**
 * ApiRoutesListSection component
 * 
 * This component generates and displays a list of API routes related to a specific entity 
 * (e.g., product, billboard). It displays the API routes for common CRUD operations 
 * (GET, POST, PATCH, DELETE) along with their HTTP methods and access levels.
 * 
 * Props:
 * - `entityName`: Name of the entity (e.g., "billboards", "products")
 * - `entityId`: ID of the specific entity (used in PATCH and DELETE routes)
 * 
 * The component uses the `useOrigin` hook to get the base URL (e.g., http://localhost:3000),
 * and `useParams` to dynamically access the storeId parameter from the route.
 */

const ApiRoutesListSection = ({ entityName, entityId }) => {
    const params = useParams(); // Get dynamic parameters from the URL (like storeId)
    const origin = useOrigin(); // Get the current origin (base URL)
    
    // Construct the base URL for the API routes
    const baseUrl = `${origin}/api/stores/${params.storeId}`;

    return (
        <>
            {/* GET request for listing all entities */}
            <ApiAlertBox 
                title="GET"
                variant="public" // Public access for listing entities
                description={`${baseUrl}/${entityName}`} // API route: /api/stores/:storeId/entityName
            />

            {/* GET request for retrieving a specific entity */}
            <ApiAlertBox 
                title="GET"
                variant="public" // Public access for retrieving an entity by ID
                description={`${baseUrl}/${entityName}/<${entityId}>`} // API route: /api/stores/:storeId/entityName/entityId
            />

            {/* POST request for creating a new entity */}
            <ApiAlertBox 
                title="POST"
                variant="admin" // Admin access required for creating a new entity
                description={`${baseUrl}/${entityName}`} // API route: /api/stores/:storeId/entityName (POST)
            />

            {/* PATCH request for updating an existing entity */}
            <ApiAlertBox 
                title="PATCH"
                variant="admin" // Admin access required for updating an entity
                description={`${baseUrl}/${entityName}/<${entityId}>`} // API route: /api/stores/:storeId/entityName/entityId (PATCH)
            />

            {/* DELETE request for deleting an existing entity */}
            <ApiAlertBox 
                title="DELETE"
                variant="admin" // Admin access required for deleting an entity
                description={`${baseUrl}/${entityName}/<${entityId}>`} // API route: /api/stores/:storeId/entityName/entityId (DELETE)
            />
        </>
    )
}

export default ApiRoutesListSection;
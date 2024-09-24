import prismaClient from "@/lib/prismadb";
import { format } from "date-fns";

const CategoriesPage = async ({ params }) => {
    const categories = await prismaClient.category.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc',
        }
    });

    const formattedCategories = categories.map((category) => ({
        id: category.id,
        name: category.name,
        createdAt: format(category.createdAt, "MMMM do, yyyy"),
        updatedAt: format(category.updatedAt, "MMMM do, yyyy"),
    }))
    
    return (
        <div>categories page</div>
    )
}

export default CategoriesPage;
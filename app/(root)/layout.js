//This is the layout file for Home page that will be used to fetch store from
//the database. if there is a store and it belongs to the currently logged in user,
//user is redirected to the dashboard. if there is not store for the currently logged in user
//user is show the the create store modal
import prismaClient from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePageLayout({ children }) {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismaClient.store.findFirst({
        where: {
            userId: userId,
        }
    });
    if (store) {
        redirect(`/${store.id}`);
    }
    return (
        <>
            {children}
        </>
    )
};
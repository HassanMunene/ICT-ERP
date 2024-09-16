//this is the server component for the dashboard page
//it retrieves the userId from clerk using auth() if we dont have user means you
// have not logged in just tryna be sneaky so you are redirected to sign-in page
// then fetches the store that has been created by currently logged in user
// if there is no store then your redirected to home page to create a store

import prismaClient from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPageLayout({ children, params}) {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismaClient.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId,
        }
    });
    if (!store) {
        redirect('/');
    }

    return (
        <>
            <div>This will be navbar here</div>
            {children}
        </>
    )
};
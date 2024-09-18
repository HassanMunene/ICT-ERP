import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prismadb";

import NavbarRoutesSection from "./NavbarRoutesSection";
import StoreSwitcher from "./StoreSwitcher";

const Navbar = async () => {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in')
    }
    const stores = await prismaClient.store.findMany({
        where: {
            userId: userId,
        }
    });

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher storeItems={stores} />
                <NavbarRoutesSection className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default Navbar;
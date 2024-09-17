import { UserButton } from "@clerk/nextjs";

import NavbarRoutesSection from "./NavbarRoutesSection";

const Navbar = () => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <div>Store switcher</div>
                <NavbarRoutesSection className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default Navbar;
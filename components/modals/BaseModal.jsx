// Importing Dialog components from the custom Shadcn UI directory.
// These components handle the structure and presentation of the modal.
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"

// BaseModal is a reusable component to render modals across the application.
// It accepts props to customize the modal's title, description, open state, and content.
const BaseModal = ({ title, description, isOpen, onClose, children }) => {
    return (
        // Dialog component from Shadcn UI, controlling whether the modal is open with the "isOpen" prop.
        <Dialog open={isOpen}>
            
            {/* DialogContent wraps the modal content, provided by Shadcn UI's dialog system. */}
            <DialogContent>
                
                {/* DialogHeader is used to display the title and description of the modal. */}
                <DialogHeader>
                    {/* DialogTitle renders the title of the modal, passed via the "title" prop. */}
                    <DialogTitle>{title}</DialogTitle>
                    
                    {/* DialogDescription shows an optional description below the title. */}
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {/* The children prop allows any content (like forms or text) to be passed into the modal. */}
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    );
}

export default BaseModal;
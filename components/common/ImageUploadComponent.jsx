import { useEffect, useState } from "react";
import { Button } from "../ui/button"; // Importing the Button component for UI
import { ImagePlus, Trash } from "lucide-react"; // Icons for upload and delete
import Image from "next/image"; // Next.js Image component for optimized images
import { CldUploadWidget } from "next-cloudinary"; // Cloudinary widget for image uploads

const ImageUploadComponent = ({ disabled, onChange, onRemoveImage, value }) => {
    const [isMounted, setIsMounted] = useState(false); // State to handle client-side rendering

    useEffect(() => {
        setIsMounted(true); // Set mounted to true when component is loaded on the client
    }, []);

    // Handles successful image upload by Cloudinary
    const onUploadImage = (result) => {
        onChange(result.info.secure_url); // Pass the uploaded image's URL to the parent component
    };

    // Don't render anything if not mounted (client-side rendering safety)
    if (!isMounted) {
        return null;
    }

    return (
        <div>
            {/* Display uploaded images */}
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        {/* Trash button for removing the image */}
                        <div className="z-10 absolute top-2 right-2">
                            <Button 
                                type="button"
                                onClick={() => onRemoveImage(url)} // Handle image removal
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" /> {/* Trash icon */}
                            </Button>
                        </div>
                        {/* Render the uploaded image */}
                        <Image
                            fill={true}
                            className="object-cover"
                            alt="image"
                            src={url} // Image source URL
                        />
                    </div>
                ))}
            </div>
            {/* Cloudinary upload widget */}
            <CldUploadWidget upload={onUploadImage} uploadPreset="kzc0wg3y">
                {({ open }) => {
                    const onClick = () => {
                        open(); // Open the Cloudinary widget when button is clicked
                    };
                    return (
                        <Button 
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" /> {/* Upload icon */}
                            Upload an image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUploadComponent;

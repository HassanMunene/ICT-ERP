'use client';

// Hook for opening the create store modal
import { useCreateStoreModal } from "@/hooks/useCreateStoreModal";

// Navigation hooks from Next.js
import { useParams, useRouter } from "next/navigation";

// State management hook from React
import { useState } from "react";

// Lucide icons for UI elements
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";

// Custom Popover components from shadcn UI library
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

// Button component from shadcn UI library
import { Button } from "../ui/button";

// Utility function for combining class names (likely from your utils)
import { cn } from "@/lib/utils";

// Command components from shadcn UI library for building a menu structure
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

/**
 * StoreSwitcher component for selecting and switching between stores.
 *
 * This component displays the current store name and provides a dropdown menu
 * to select a different store or create a new one.
 *
 * @param {object} props - Component props
 * @param {string} props.className - Optional class name to apply to the component
 * @param {array} props.storeItems - Array of store objects with name and ID
 * @returns {JSX.Element} The StoreSwitcher component
 */
const StoreSwitcher = ({ className = "", storeItems = [] }) => {
  // Hook for managing the popover state (open/closed)
  const [open, setOpen] = useState(false);

  const createStoreModal = useCreateStoreModal();
  // Get store ID from URL parameters
  const params = useParams();

  // Router object for navigation
  const router = useRouter();

  // Format store data for display and selection
  const formattedStoreItems = storeItems.map((store) => ({
    label: store.name,
    idValue: store.id,
  }));

  // Find the current store based on the URL parameter
  const currentStore = formattedStoreItems.find((store) => store.idValue === params.storeId);

  // Handler for selecting a store from the popover
  const onSelectingStore = (store) => {
    setOpen(false); // Close the popover after selection
    router.push(`/${store.idValue} `); // Navigate to the selected store's page
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Popover trigger button */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox" // Indicates a selection list for accessibility
          aria-expanded={open} // For screen readers to announce open/closed state
          aria-label="Select a store" // Accessibility label for screen readers
          className={cn("w-[200px] justify-between", className)} // Combine class names
        >
          <StoreIcon className="mr-2 h-4 w-4" /> {/* Store icon */}
          {currentStore?.label || "No store selected"} {/* Display current store name or default */}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-60" /> {/* Down arrow icon */}
        </Button>
      </PopoverTrigger>

      {/* Popover content with the store selection menu */}
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." /> {/* Search bar for stores */}
            <CommandEmpty>No store found.</CommandEmpty> {/* Empty state message */}
            {/* Group of available stores */}
            <CommandGroup heading="Stores">
              {formattedStoreItems.map((store) => (
                <CommandItem
                  key={store.idValue}
                  onSelect={() => onSelectingStore(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" /> {/* Store icon */}
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.idValue === store.idValue ? "opacity-100" : "opacity-0"
                    )}
                  /> {/* Checkmark icon to indicate the current store */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator /> {/* Separator for the create store option */}
          <CommandList>
            <CommandGroup>
              {/* Button to open the create store modal */}
              <CommandItem
                onSelect={() => {
                  setOpen(false); // Close the current popover
                  createStoreModal.onOpen(); // Open the create store modal
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
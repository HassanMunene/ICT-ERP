import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactElement<any>;
    disabled?: boolean;
}

export function Tooltip({ content, children, disabled = false }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const childRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (isVisible && childRef.current) {
            const rect = childRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top + window.scrollY + rect.height / 2,
                left: rect.right + window.scrollX + 8
            });
        }
    }, [isVisible]);

    if (disabled) return children;

    const clonedChild = React.cloneElement(children, {
        ...(typeof children.type === 'string' ? { ref: childRef } : {}),
        onMouseEnter: () => setIsVisible(true),
        onMouseLeave: () => setIsVisible(false),
        onFocus: () => setIsVisible(true),
        onBlur: () => setIsVisible(false),
    });

    return (
        <>
            {clonedChild}
            {isVisible &&
                createPortal(
                    <div
                        className="fixed px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md shadow-lg z-[9999] whitespace-nowrap pointer-events-none"
                        style={{
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                            transform: 'translateY(-50%)'
                        }}
                    >
                        {content}
                    </div>,
                    document.body
                )
            }
        </>
    );
}
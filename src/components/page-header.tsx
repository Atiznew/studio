
import React from 'react';
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    children?: React.ReactNode;
    className?: string;
}

export function PageHeader({ title, children, className }: PageHeaderProps) {
    return (
        <header className={cn("sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b", className)}>
            <div className="container flex h-14 items-center">
                <div className="flex items-center gap-2">
                    {React.Children.toArray(children).find(child => React.isValidElement(child) && child.props.size === 'icon')}
                    <h1 className="text-xl font-bold tracking-tight font-headline text-foreground/80">
                        {title}
                    </h1>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                     {React.Children.toArray(children).filter(child => !React.isValidElement(child) || child.props.size !== 'icon')}
                </div>
            </div>
        </header>
    );
}


import React from 'react';
import { cn } from "@/lib/utils";
import {
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface NavigationItemProps {
  className?: string;
  title: string;
  description?: string;
  href: string;
  children?: React.ReactNode;
}

const NavigationItem = React.forwardRef<
  React.ElementRef<"a">,
  NavigationItemProps
>(({ className, title, description, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          {description && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          )}
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
NavigationItem.displayName = "NavigationItem";

export default NavigationItem;

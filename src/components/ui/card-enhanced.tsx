import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  'rounded-card border bg-white text-surface-950 shadow-sm transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: 'border-surface-200',
        outlined: 'border-surface-300 shadow-none',
        elevated: 'border-surface-200 shadow-lg',
        interactive: 'border-surface-200 hover:shadow-md active:shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer touch-manipulation',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      spacing: {
        none: 'space-y-0',
        sm: 'space-y-2',
        md: 'space-y-3',
        lg: 'space-y-4',
        xl: 'space-y-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      spacing: 'md',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  pressable?: boolean;
}

const CardEnhanced = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, spacing, pressable = false, children, onClick, ...props }, ref) => {
    const cardVariant = pressable ? 'interactive' : variant;
    
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant: cardVariant, padding, spacing, className }))}
        onClick={onClick}
        role={pressable ? 'button' : undefined}
        tabIndex={pressable ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardEnhanced.displayName = 'CardEnhanced';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-surface-500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('pt-0', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  CardEnhanced,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}; 
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-app font-medium transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none touch-manipulation',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white shadow hover:bg-primary-600 active:bg-primary-700',
        secondary: 'bg-surface-100 text-surface-900 shadow-sm hover:bg-surface-200 active:bg-surface-300',
        outline: 'border border-surface-300 bg-white text-surface-900 hover:bg-surface-50 active:bg-surface-100',
        ghost: 'text-surface-900 hover:bg-surface-100 active:bg-surface-200',
        link: 'text-primary-500 underline-offset-4 hover:underline active:text-primary-600',
        destructive: 'bg-error-500 text-white shadow hover:bg-error-600 active:bg-error-700',
        success: 'bg-success-500 text-white shadow hover:bg-success-600 active:bg-success-700',
      },
      size: {
        xs: 'h-8 px-3 text-xs',
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        xl: 'h-16 px-10 text-xl',
        icon: 'h-12 w-12',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-app',
        lg: 'rounded-card',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      rounded: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ButtonEnhanced = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    rounded,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, rounded, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

ButtonEnhanced.displayName = 'ButtonEnhanced';

export default ButtonEnhanced; 
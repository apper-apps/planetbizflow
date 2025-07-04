import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white focus:ring-primary hover:scale-105",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    accent: "bg-gradient-to-r from-accent to-success hover:from-accent/90 hover:to-success/90 text-white focus:ring-accent hover:scale-105",
    danger: "bg-gradient-to-r from-error to-red-600 hover:from-error/90 hover:to-red-600/90 text-white focus:ring-error hover:scale-105",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const disabledClasses = disabled || loading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: variant === 'ghost' ? 1 : 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" className="h-4 w-4 animate-spin mr-2" />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} className="h-4 w-4 mr-2" />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} className="h-4 w-4 ml-2" />
      )}
    </motion.button>
  );
};

export default Button;
import logo from "@/assets/logo.svg";

const Logo = ({className, isAnimated = true}: {className?: string, isAnimated?: boolean}) => {
  return (
    <div className={`bg-duck-yellow rounded-full flex items-center justify-center overflow-hidden ${className}`}>
      <img 
        src={logo} 
        alt="QuackSeats Logo" 
        className={`w-full h-full ${isAnimated ? 'animate-float transform-gpu' : ''} object-contain`}
      />
    </div>
  );
};

export default Logo;
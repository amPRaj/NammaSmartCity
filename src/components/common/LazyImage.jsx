import { useState, useRef, useEffect } from 'react';
import { FiHome } from 'react-icons/fi';

const LazyImage = ({ 
    src, 
    alt, 
    className = "", 
    placeholder = null,
    fallback = null 
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    const defaultPlaceholder = (
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <FiHome className="w-12 h-12 text-blue-300 dark:text-gray-500" />
        </div>
    );

    const defaultFallback = (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <FiHome className="w-12 h-12 text-gray-400 dark:text-gray-500" />
        </div>
    );

    return (
        <div ref={imgRef} className={`relative ${className}`}>
            {!isInView && (placeholder || defaultPlaceholder)}
            
            {isInView && !hasError && (
                <>
                    {!isLoaded && (placeholder || defaultPlaceholder)}
                    <img
                        src={src}
                        alt={alt}
                        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                        onLoad={handleLoad}
                        onError={handleError}
                        loading="lazy"
                    />
                </>
            )}
            
            {hasError && (fallback || defaultFallback)}
        </div>
    );
};

export default LazyImage;
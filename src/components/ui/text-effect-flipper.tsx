import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipLinkProps {
    children: string;
    href?: string;
    className?: string;
}

const FlipLink: React.FC<FlipLinkProps> = ({ children, href, className }) => {
    const Component = href ? motion.a : motion.div;

    const props = href
        ? {
            href,
            target: "_blank",
            rel: "noopener noreferrer"
        }
        : {};

    return (
        <Component
            initial="initial"
            whileHover="hovered"
            className={cn(
                "relative inline-block overflow-hidden whitespace-nowrap",
                className
            )}
            style={{ color: 'inherit' }}
            {...props}
        >
            <div>
                {children.split("").map((l, i) => (
                    <motion.span
                        variants={{
                            initial: {
                                y: 0,
                            },
                            hovered: {
                                y: "-100%",
                            },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                        style={{ color: 'inherit' }}
                        key={i}
                    >
                        {l === " " ? "\u00A0" : l}
                    </motion.span>
                ))}
            </div>
            <div className="absolute inset-0">
                {children.split("").map((l, i) => (
                    <motion.span
                        variants={{
                            initial: {
                                y: "100%",
                            },
                            hovered: {
                                y: 0,
                            },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                        style={{ color: 'inherit' }}
                        key={i}
                    >
                        {l === " " ? "\u00A0" : l}
                    </motion.span>
                ))}
            </div>
        </Component>
    );
};

export default FlipLink;
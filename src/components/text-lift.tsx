"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface TextLiftProps {
    children: React.ReactNode;
    animateOnScroll?: boolean;
    delay?: number;
}

export default function TextLift({
    children,
    animateOnScroll = true,
    delay = 0,
}: TextLiftProps) {
    // Use HTMLDivElement to match div ref
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Arrays of elements and SplitText instances
    const elementRef = useRef<HTMLElement[]>([]);
    const splitRef = useRef<SplitText[]>([]);
    const lines = useRef<HTMLElement[]>([]);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            // Reset arrays
            elementRef.current = [];
            splitRef.current = [];
            lines.current = [];

            let elements: HTMLElement[] = [];

            if (containerRef.current.hasAttribute("data-text-lift-wrapper")) {
                // Cast children to HTMLElement[]
                elements = Array.from(
                    containerRef.current.children
                ) as HTMLElement[];
            } else {
                elements = [containerRef.current];
            }

            elements.forEach((element) => {
                elementRef.current.push(element);

                // Create SplitText instance
                const split = new SplitText(element, {
                    type: "lines",
                    linesClass: "line++",
                    mask: "lines",
                });

                splitRef.current.push(split);

                const computedStyle = window.getComputedStyle(element);
                const textIndent = computedStyle.textIndent;

                if (textIndent && textIndent === "0px") {
                    if (split.lines.length > 0) {
                        // split.lines is HTMLElement[]
                        (split.lines[0] as HTMLElement).style.paddingLeft =
                            textIndent;
                    }
                    (element as HTMLElement).style.textIndent = "0";
                }

                // Collect all lines (HTMLElement[])
                lines.current.push(...(split.lines as HTMLElement[]));
            });

            // Set initial position
            gsap.set(lines.current, { y: "100%" });

            const animationProps = {
                y: "0%",
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
                delay: delay,
            };

            if (animateOnScroll) {
                gsap.to(lines.current, {
                    ...animationProps,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        once: true,
                    },
                });
            } else {
                gsap.to(lines.current, animationProps);
            }

            return () => {
                splitRef.current.forEach((split) => {
                    if (split) {
                        split.revert();
                    }
                });
            };
        },
        {
            scope: containerRef,
            dependencies: [animateOnScroll, delay],
        }
    );

    // // If single child, clone it and attach ref
    // if (React.Children.count(children) === 1) {
    //     const child = React.Children.only(children);
    //     if (React.isValidElement(child)) {
    //         return React.cloneElement(child, { ref: containerRef });
    //     }
    // }
    // Multiple children: wrap in div with ref and data attribute
    return (
        <div ref={containerRef} data-text-lift-wrapper="true">
            {children}
        </div>
    );
}

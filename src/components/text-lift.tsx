/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const containerRef = useRef<HTMLDivElement | null>(null);
    const splitRef = useRef<SplitText[]>([]);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            // Immediately hide the container to prevent flash
            gsap.set(containerRef.current, { autoAlpha: 0 });

            // Clear previous splits
            splitRef.current.forEach((split) => {
                if (split) {
                    split.revert();
                }
            });
            splitRef.current = [];

            let elements: HTMLElement[] = [];

            // Check if we have a wrapper with multiple children
            if (containerRef.current.hasAttribute("data-text-lift-wrapper")) {
                elements = Array.from(
                    containerRef.current.children
                ) as HTMLElement[];
            } else {
                elements = [containerRef.current];
            }

            const allLines: HTMLElement[] = [];

            elements.forEach((element) => {
                if (!element.textContent?.trim()) return;

                const split = new SplitText(element, {
                    type: "lines",
                    linesClass: "split-line",
                });

                splitRef.current.push(split);
                gsap.set(element, { overflow: "hidden" });

                if (split.lines && split.lines.length > 0) {
                    allLines.push(...(split.lines as HTMLElement[]));
                }
            });

            if (allLines.length === 0) return;

            // Now reveal the container after splitting
            gsap.set(containerRef.current, { autoAlpha: 1 });

            gsap.set(allLines, {
                y: "100%",
                opacity: 1,
            });

            const animationProps = {
                y: "0%",
                duration: 1.2,
                stagger: 0.08,
                ease: "power3.out",
                delay: delay,
            };

            if (animateOnScroll) {
                gsap.to(allLines, {
                    ...animationProps,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        once: true,
                    },
                });
            } else {
                gsap.to(allLines, animationProps);
            }

            return () => {
                splitRef.current.forEach((split) => {
                    if (split) {
                        split.revert();
                    }
                });
                ScrollTrigger.getAll().forEach((trigger) => {
                    if (trigger.trigger === containerRef.current) {
                        trigger.kill();
                    }
                });
            };
        },
        {
            scope: containerRef,
            dependencies: [],
        }
    );

    if (React.Children.count(children) === 1) {
        const child = React.Children.only(children);
        if (React.isValidElement(child) && typeof child.type === "string") {
            return React.cloneElement(child as React.ReactElement<any>, {
                ref: containerRef,
                style: {
                    ...((child.props as any)?.style || {}),
                    overflow: "hidden",
                },
            });
        }
    }

    return (
        <div
            ref={containerRef}
            data-text-lift-wrapper="true"
            style={{ overflow: "hidden" }}
        >
            {children}
        </div>
    );
}

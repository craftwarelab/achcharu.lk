"use client";
import React from "react";

export default function Button({ children, className = "", ...props }) {
    return (
        <button
            className={`
                relative inline-block overflow-hidden px-6 py-2
                text-white text-[13px] font-semibold uppercase tracking-[2.6px]
                border border-[#bfa373]
                transition-[background-position] duration-400 ease-in-out
                bg-[length:500px] bg-no-repeat
                bg-[linear-gradient(30deg,#bfa373_50%,transparent_50%)]
                bg-[position:0%] hover:bg-[position:100%]
                ${className}
            `}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </button>
    );
}

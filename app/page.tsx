"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const tabs = ["Project", "Deployments", "Speed Insights", "Logs"];

  type TabRef = HTMLButtonElement | null;
  const [tabRefs, _] = useState<TabRef[]>([]);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const hoveredTab = tabRefs[hoveredIdx ?? -1]?.getBoundingClientRect();

  return (
    <main className="bg-muted/70 min-h-screen">
      <nav
        onMouseLeave={() => {
          setHoveredIdx(null);
        }}
        className="bg-background flex items-center border-b relative p-2"
      >
        {tabs.map((tab, index) => (
          <button
            ref={(el) => {
              tabRefs[index] = el;
            }}
            key={tab}
            className="px-3 py-1.5 z-10 font-medium"
            onPointerEnter={() => setHoveredIdx(index)}
          >
            {tab}
          </button>
        ))}
        <AnimatePresence>
          {hoveredTab ? (
            <motion.button
              className="absolute top-0 left-0 bg-gray-200 rounded-md"
              initial={{
                top: hoveredTab.top,
                left: hoveredTab.left,
                width: hoveredTab.width,
                height: hoveredTab.height,
                opacity: 0,
              }}
              animate={{
                top: hoveredTab.top,
                left: hoveredTab.left,
                width: hoveredTab.width,
                height: hoveredTab.height,
                opacity: 1,
              }}
              exit={{
                top: hoveredTab.top,
                left: hoveredTab.left,
                width: hoveredTab.width,
                height: hoveredTab.height,
                opacity: 0,
              }}
              transition={{
                duration: 0.14,
              }}
            />
          ) : null}
        </AnimatePresence>
      </nav>
    </main>
  );
}

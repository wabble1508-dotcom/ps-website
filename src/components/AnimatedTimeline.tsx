import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "./FadeIn";

interface Step {
  title: string;
  description: string;
}

export function AnimatedTimeline({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the element is visible
      // Start filling when top hits middle of screen, finish when bottom hits middle
      const startPoint = windowHeight * 0.6;
      const scrolled = startPoint - rect.top;
      const totalHeight = rect.height;

      const percentage = Math.max(
        0,
        Math.min(100, (scrolled / totalHeight) * 100),
      );
      setProgress(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-10">
      {/* Background Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1.5 bg-muted rounded-full md:-translate-x-1/2"></div>

      {/* Animated Fill Line */}
      <div
        className="absolute left-8 md:left-1/2 top-0 w-1.5 bg-gradient-to-b from-primary to-accent rounded-full md:-translate-x-1/2 transition-all duration-150 ease-out"
        style={{ height: `${progress}%` }}
      ></div>

      <div className="space-y-12 md:space-y-24 relative z-10">
        {steps.map((step, i) => {
          const isEven = i % 2 === 0;
          // Calculate if this step has been reached by the progress line
          const stepPercentage = (i / (steps.length - 1)) * 100;
          const isActive = progress >= stepPercentage - 10; // Slightly early trigger

          return (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:flex-row-reverse" : ""}`}
            >
              {/* Timeline Dot */}
              <div
                className="absolute left-8 md:left-1/2 w-12 h-12 -translate-x-[21px] md:-translate-x-1/2 flex items-center justify-center bg-white rounded-full border-4 border-muted z-10 transition-colors duration-500"
                style={{
                  borderColor: isActive
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted))",
                }}
              >
                <CheckCircle2
                  className={`w-6 h-6 transition-colors duration-500 ${isActive ? "text-primary" : "text-muted-foreground/30"}`}
                />
              </div>

              {/* Content Box */}
              <div
                className={`w-full pl-24 md:pl-0 md:w-1/2 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 text-left"}`}
              >
                <FadeIn direction={isEven ? "left" : "right"} delay={i * 100}>
                  <div
                    className={`bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-border/50 transition-all duration-500 ${isActive ? "shadow-primary/20 scale-[1.02]" : "opacity-70"}`}
                  >
                    <div className="text-primary font-black text-4xl opacity-20 absolute -top-4 -right-2 md:top-4 md:right-4">
                      {i + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

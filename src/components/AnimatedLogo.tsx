export const AnimatedLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Soft background glow */}
      <div
        className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "3s" }}
      ></div>

      {/* Clean, elegant logo presentation with subtle movement */}
      <div className="relative z-10 animate-in fade-in zoom-in duration-1000 animate-float">
        <img
          src="/media/vibe.filesafe.space/1778931020193405557/attachments/98e2f944-6284-4364-828f-058da15e3823.png"
          alt="PS Professional Solutions"
          className="w-48 md:w-64 h-auto object-contain drop-shadow-xl animate-pulse"
          style={{ animationDuration: "2.5s" }}
        />
      </div>
    </div>
  );
};

import { activeSocialLinks } from "../../server/socialLinks";

// Runde Social-Media-Symbole mit Link (Liste in server/socialLinks.ts)
export const SocialIcons = ({ className = "", itemClassName = "" }: { className?: string; itemClassName?: string }) => (
  <div className={`flex flex-wrap gap-3 ${className}`}>
    {activeSocialLinks().map((s) => (
      <a
        key={s.id}
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={s.name}
        title={s.name}
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary hover:text-white ${itemClassName}`}
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d={s.path} />
        </svg>
      </a>
    ))}
  </div>
);

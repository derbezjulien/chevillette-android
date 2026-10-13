import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home as HomeIcon, Calculator, History as HistoryIcon } from "lucide-react";

const ROUTES = ["/", "/estimation", "/historique", "/en", "/en/estimate", "/en/history"];
const TABS_BY_LANG = {
  fr: [
    { path: "/", label: "Accueil", Icon: HomeIcon },
    { path: "/estimation", label: "Estimation", Icon: Calculator },
    { path: "/historique", label: "Historique", Icon: HistoryIcon },
  ],
  en: [
    { path: "/en", label: "Home", Icon: HomeIcon },
    { path: "/en/estimate", label: "Estimate", Icon: Calculator },
    { path: "/en/history", label: "History", Icon: HistoryIcon },
  ],
};

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  if (!ROUTES.includes(location.pathname)) return null;
  const isEn = location.pathname.startsWith("/en");
  const TABS = isEn ? TABS_BY_LANG.en : TABS_BY_LANG.fr;

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-card/95 backdrop-blur-sm border-t border-border/60"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex" style={{ paddingLeft: "env(safe-area-inset-left)", paddingRight: "env(safe-area-inset-right)" }}>
        {TABS.map(({ path, label, Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              type="button"
              onClick={() => {
                if (location.pathname === path) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate(path);
                }
              }}
              className="flex-1 flex flex-col items-center gap-1 py-2"
            >
              <Icon className={`w-5 h-5 ${active ? "text-accent" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium ${active ? "text-accent" : "text-muted-foreground"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
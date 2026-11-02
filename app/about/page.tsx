import type { Metadata } from "next";
import { ABOUT_HERO, ABOUT } from "../content";

export const metadata: Metadata = {
  title: "About us",
  description: ABOUT_HERO.lede,
};

export default function AboutPage() {
  return (
    <>
      <div className="band page-hero">
        <div className="wrap">
          <h1>{ABOUT_HERO.h1}</h1>
          <p className="lede">{ABOUT_HERO.lede}</p>
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <div className="about-grid">
            {ABOUT.blocks.map((b) => (
              <div key={b.title}>
                <h2>{b.title}</h2>
                {b.body.map((p) => <p key={p}>{p}</p>)}
                {b.tags.length ? (
                  <div className="tags">
                    {b.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="band section">
        <div className="wrap">
          <h2 style={{ maxWidth: "24ch" }}>{ABOUT.geoHeading}</h2>
          <div className="geo">
            {ABOUT.regions.map((r) => <span key={r}>{r}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}

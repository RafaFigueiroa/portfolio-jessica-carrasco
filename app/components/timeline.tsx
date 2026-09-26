"use client";

import { CSSProperties, useState } from "react";

const moments = [
  {
    title: "Chile",
    kicker: "01 / ORIGEM",
    tone: "orange",
    shape: "chile",
    story: "Jessica nasceu em Cerro Navia, Santiago, no Chile. Desde pequena, adorava desenhar, mas sua paixão foi sufocada por um sistema escolar rígido.",
  },
  {
    title: "Canadá",
    kicker: "02 / RECOMEÇO",
    tone: "blue",
    shape: "canada",
    story: "Em 2005, mudou-se para o Canadá. Foi em uma nova terra que Jessica se reconectou com a arte e encontrou espaço para continuar criando.",
  },
  {
    title: "Hoje",
    kicker: "03 / HOJE",
    tone: "green",
    shape: "book",
    story: "Hoje, Jessica é mãe de uma filha adolescente, artista visual, escritora e professora de arte. Também publicou três livros infantis e um livro de poesia.",
  },
] as const;

type Shape = (typeof moments)[number]["shape"];

function CountryVector({ shape }: { shape: Shape }) {
  if (shape === "chile") {
    return (
      <svg className="timeline-vector timeline-vector--chile" viewBox="0 0 1024 1024" fill="none" aria-hidden="true">
        <use href="/assets/chile-outline.svg#map" />
      </svg>
    );
  }

  if (shape === "canada") {
    return (
      <svg className="timeline-vector timeline-vector--canada" viewBox="0 0 1024 1024" fill="none" aria-hidden="true">
        <use href="/assets/canada-outline.svg#map" />
      </svg>
    );
  }

  return (
    <svg className="timeline-vector timeline-vector--book" viewBox="0 0 180 142" fill="none" aria-hidden="true">
      <path d="M90 42c-18-15-42-18-67-12v75c26-6 49-3 67 13 18-16 41-19 67-13V30c-25-6-49-3-67 12Z" fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" pathLength="1" />
      <path d="M90 42v76M36 49c18-3 34 0 46 9m-46 8c18-3 34 0 46 9m62-26c-18-3-34 0-46 9m46 8c-18-3-34 0-46 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" pathLength="1" />
    </svg>
  );
}

function TimelineCard({ moment, index }: { moment: (typeof moments)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      className={`timeline-card timeline-card--${moment.tone}${expanded ? " is-expanded" : ""}`}
      aria-label={`${moment.title}: ${expanded ? "recolher história" : "ver história"}`}
      aria-expanded={expanded}
      onClick={() => setExpanded((value) => !value)}
    >
      <span className="timeline-card__toggle" aria-hidden="true">{expanded ? "−" : "+"}</span>
      <span className="timeline-card__vector-wrap"><CountryVector shape={moment.shape} /></span>
      {expanded && (
        <span className="timeline-card__copy">
          <span className="timeline-card__kicker">{moment.kicker}</span>
          <span className="timeline-card__title" role="heading" aria-level={3}>{moment.title}.</span>
          <span className="timeline-card__story" style={{ "--write-delay": `${index * 120}ms` } as CSSProperties}>{moment.story}</span>
        </span>
      )}
    </button>
  );
}

export default function Timeline() {
  return (
    <div className="timeline-grid">
      {moments.map((moment, index) => <TimelineCard key={moment.title} moment={moment} index={index} />)}
    </div>
  );
}

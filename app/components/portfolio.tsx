"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";
import Timeline from "./timeline";

const works = [
  ["Anjo", "Obra Angel, de Jessica Carrasco", "https://static.wixstatic.com/media/3ce887_da2845637d6f44f0a1cc535be4a38f99~mv2.jpg/v1/fill/w_700,h_850,q_90,enc_avif,quality_auto/3ce887_da2845637d6f44f0a1cc535be4a38f99~mv2.jpg"],
  ["Paisagem", "Obra Cliff, de Jessica Carrasco", "https://static.wixstatic.com/media/3ce887_fa0d6eccedfc43af8dbb977e05151880~mv2.jpg/v1/fill/w_700,h_850,q_90,enc_avif,quality_auto/3ce887_fa0d6eccedfc43af8dbb977e05151880~mv2.jpg"],
  ["Esquilo", "Ilustração de esquilo, de Jessica Carrasco", "https://static.wixstatic.com/media/3ce887_4ba2b7eaf040409d8161362b3e8d7f11~mv2.png/v1/fill/w_700,h_850,q_90,enc_avif,quality_auto/3ce887_4ba2b7eaf040409d8161362b3e8d7f11~mv2.png"],
  ["Flores", "Ilustração de flores, de Jessica Carrasco", "https://static.wixstatic.com/media/3ce887_9f59ba44ce5f44338e2342fe1c235c17~mv2.png/v1/fill/w_700,h_850,q_90,enc_avif,quality_auto/3ce887_9f59ba44ce5f44338e2342fe1c235c17~mv2.png"],
  ["Cerejeira", "Ilustração de cerejeira, de Jessica Carrasco", "https://static.wixstatic.com/media/3ce887_f0352dd491f6408cb6dceac5b7d0d90b~mv2.png/v1/fill/w_700,h_850,q_90,enc_avif,quality_auto/3ce887_f0352dd491f6408cb6dceac5b7d0d90b~mv2.png"],
  ["Memórias", "Obra Censura, de Jessica Carrasco", "https://static.wixstatic.com/media/3ce887_698a337cc6964f2eb36195cdc7f7449b~mv2.jpg/v1/fill/w_700,h_850,q_90,enc_avif,quality_auto/3ce887_698a337cc6964f2eb36195cdc7f7449b~mv2.jpg"],
  ["Encontro", "Obra Couple, de Jessica Carrasco", "https://static.wixstatic.com/media/3ce887_855a94c88a8b46b28509e29e17a11ace~mv2.jpg/v1/fill/w_700,h_850,q_90,enc_avif,quality_auto/3ce887_855a94c88a8b46b28509e29e17a11ace~mv2.jpg"],
] as const;

const columns = [
  [works[0], works[3], works[6]],
  [works[1], works[4], works[2]],
  [works[5], works[2], works[4]],
];

function RollingColumn({ items, reverse = false, delay = "0s" }: { items: typeof columns[number]; reverse?: boolean; delay?: string }) {
  return (
    <div className="h-full overflow-hidden">
      <div className={reverse ? "gallery-roll gallery-roll-reverse" : "gallery-roll"} style={{ "--delay": delay } as CSSProperties}>
        {[...items, ...items].map(([title, alt, src], index) => (
          <figure className="group relative h-[clamp(210px,27vw,360px)] shrink-0 overflow-hidden bg-[#ddd2e6]" key={`${src}-${index}`} aria-hidden={index >= items.length}>
            <Image src={src} alt={index < items.length ? alt : ""} fill sizes="25vw" className="object-cover saturate-[.86] transition duration-500 group-hover:scale-[1.025] group-hover:saturate-100" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#241123cc] to-transparent px-3 pb-3 pt-10 text-[11px] font-medium text-white opacity-0 transition group-hover:opacity-100">{title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function Gallery() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!expanded) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", close);
    document.body.classList.add("overflow-hidden");
    return () => {
      window.removeEventListener("keydown", close);
      document.body.classList.remove("overflow-hidden");
    };
  }, [expanded]);

  return (
    <>
      <div className="relative left-1/2 grid h-[min(82vw,980px)] min-h-[680px] w-screen -translate-x-1/2 grid-cols-[35%_21.67%_21.67%_21.66%] gap-px overflow-hidden bg-white p-0 max-lg:grid-cols-[35%_32.5%_32.5%] max-sm:left-0 max-sm:h-[620px] max-sm:min-h-0 max-sm:w-full max-sm:translate-x-0 max-sm:grid-cols-2 max-sm:gap-px">
        <div className="flex flex-col justify-center bg-white p-[clamp(22px,4vw,58px)] text-[#55052d] max-sm:col-span-2 max-sm:min-h-[210px] max-sm:p-6">
          <span className="mb-7 text-[10px] font-medium uppercase tracking-[.12em]">02 — Obras selecionadas</span>
          <h2 className="text-[clamp(42px,5.8vw,82px)] font-normal leading-none tracking-[-.055em]">Galeria</h2>
          <p className="mb-8 mt-6 text-base text-[#716175]">Pintura, desenho e outros modos de olhar.</p>
          <button className="w-fit border-b border-[#55052d60] py-2 text-[10px] font-medium uppercase" onClick={() => setExpanded(true)}>Ver galeria completa ↗</button>
        </div>
        <div className="col-span-3 grid min-h-0 grid-cols-3 gap-2 p-2 max-lg:col-span-2 max-lg:grid-cols-2 max-sm:col-span-2 max-sm:grid-cols-2">
          <RollingColumn items={columns[0]} />
          <RollingColumn items={columns[1]} reverse delay="-7s" />
          <RollingColumn items={columns[2]} delay="-13s" />
        </div>
      </div>

      {expanded && (
        <div className="fixed inset-0 z-50 overflow-auto bg-white px-[clamp(24px,4vw,68px)] pb-16 pt-6 text-[#301b30] max-sm:px-3" role="dialog" aria-modal="true" aria-label="Galeria completa">
          <div className="mb-[clamp(70px,12vh,150px)] flex items-center justify-between text-[10px] font-medium"><span>Jessica Carrasco</span><button className="uppercase" onClick={() => setExpanded(false)}>Fechar ×</button></div>
          <div className="mb-5 flex items-baseline justify-between"><h3 className="text-[clamp(20px,2vw,28px)] font-medium tracking-[-.035em]">Obras selecionadas<sup className="ml-1 text-[9px]">07</sup></h3><span className="text-sm text-[#8f8293]">Grade</span></div>
          <div className="grid grid-cols-4 gap-0.5 max-sm:grid-cols-2">
            {works.map(([title, alt, src], index) => (
              <figure className="group relative aspect-[1.18] overflow-hidden bg-[#f3eff7] max-sm:aspect-square" key={src}>
                <Image src={src} alt={alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover saturate-[.88] transition duration-500 group-hover:scale-[1.025] group-hover:saturate-100" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-[#241123c9] to-transparent px-3 pb-3 pt-8 text-xs font-medium text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 max-sm:translate-y-0 max-sm:opacity-100"><small className="mb-1 block text-[8px]">{String(index + 1).padStart(2, "0")}</small>{title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function Portfolio() {
  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("PT");

  useEffect(() => {
    const update = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(1, hero.offsetHeight - window.innerHeight))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const reveal = Math.max(0, Math.min(1, (progress - 0.4) / 0.6));
  const navVisible = progress > 0.4;

  return (
    <div className="bg-white font-[Helvetica_Neue,Helvetica,Arial,sans-serif] text-[#301b30]">
      <header className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[clamp(22px,3vw,56px)] py-6 transition duration-300 ${navVisible ? "border-b border-[#55052d18] bg-white/95 text-[#55052d] backdrop-blur" : "pointer-events-none text-white opacity-0"}`}>
        <a className="text-[22px] font-medium tracking-[-.04em]" href="#home">Jessica Carrasco</a>
        <button className="text-xl sm:hidden" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
        <div className="flex items-center gap-6">
          <nav className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-0 top-[70px] flex-col items-center gap-5 bg-white p-6 text-[11px] font-medium tracking-[.06em] sm:static sm:flex sm:flex-row sm:bg-transparent sm:p-0`}>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>SOBRE</a><a href="#galeria" onClick={() => setMenuOpen(false)}>GALERIA</a><a href="#convite" onClick={() => setMenuOpen(false)}>CONVITE</a>
          </nav>
          <div className="flex items-center gap-0.5 rounded-full border border-[#55052d25] bg-[#f3eff7] p-1 text-[10px] tracking-[.12em]" role="group" aria-label="Idioma">
            {["PT", "ES", "ENG"].map((item) => <button key={item} type="button" aria-pressed={language === item} onClick={() => setLanguage(item)} className={`min-w-9 rounded-full px-2.5 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#55052d] ${language === item ? "bg-[#55052d] font-bold text-white" : "text-[#806c83] hover:bg-white"}`}>{item}</button>)}
          </div>
        </div>
      </header>

      <main>
        <section id="home" ref={heroRef} className="relative h-[185svh] bg-white">
          <div className="sticky top-0 grid h-[100svh] min-h-[560px] place-items-center overflow-hidden text-center">
            <Image src="/assets/jessica-carrasco-hero.png" alt="" fill priority className="object-cover object-[center_42%]" style={{ opacity: 1 - progress, transform: `scale(${1.03 - progress * 0.03})` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#17131b20] to-[#17131b55]" style={{ opacity: 1 - progress }} />
            <div className="relative z-10 flex w-[min(calc(100%-32px),1500px)] flex-col items-center justify-center px-4">
              <p className="mb-6 text-[clamp(9px,1vw,12px)] font-medium uppercase tracking-[.2em]" style={{ opacity: reveal, color: progress > .35 ? "#211e1e" : "#fff" }}>artista visual · escritora · professora de arte</p>
              <h1 className="grid whitespace-nowrap px-[.12em] font-[var(--font-hand)] text-[clamp(28px,6.8vw,130px)] leading-[1.15] tracking-[-.055em]">
                <span className="col-start-1 row-start-1 text-white title-write" style={{ opacity: 1 - progress }}>Jessica Carrasco</span>
                <span className="photo-text col-start-1 row-start-1 title-write" style={{ opacity: progress }}>Jessica Carrasco</span>
              </h1>
              <p className="mt-6 text-[clamp(16px,1.5vw,21px)] leading-relaxed" style={{ opacity: reveal, color: progress > .35 ? "#211e1e" : "#fff" }}>Chilena vivendo e criando no Canadá.</p>
              <span className="mt-[clamp(42px,7vh,80px)] flex flex-col items-center gap-3 text-[11px] tracking-[.18em]" style={{ opacity: reveal, color: progress > .35 ? "#211e1e" : "#fff" }}>ROLE PARA CONHECER<i className="h-10 w-px bg-current opacity-60" /></span>
            </div>
          </div>
        </section>

        <section id="sobre" className="scroll-mt-20 bg-white px-[clamp(24px,6vw,100px)] py-[88px]">
          <p className="mb-7 text-[10px] font-medium uppercase tracking-[.12em] text-[#55052d]">01 — Sobre</p>
          <h2 className="text-[clamp(42px,5.8vw,82px)] font-normal leading-none tracking-[-.055em] text-[#55052d]">Sobre Jessica</h2>
          <Timeline />
        </section>

        <section id="galeria" className="scroll-mt-20 bg-white px-[clamp(24px,6vw,100px)] py-[88px]">
          <Gallery />
        </section>

        <section id="convite" className="scroll-mt-20 bg-[#e6def0] px-[clamp(24px,6vw,100px)] py-[88px]">
          <p className="mb-7 text-[10px] font-medium uppercase tracking-[.12em] text-[#55052d]">03 — Encontros</p>
          <h2 className="text-[clamp(42px,5.8vw,82px)] font-normal leading-none tracking-[-.055em] text-[#55052d]">Vamos criar algo?</h2>
          <p className="mb-12 mt-6 text-base text-[#716175]">Uma obra para sua casa, um livro ou uma noite de pintura.</p>
          <div className="mx-auto max-w-[1360px] border-t border-[#9c87ad]">
            {[
              ["01", "Pinturas", "Obras originais e encomendas. Consulte peças disponíveis ou converse sobre uma ideia.", "Perguntar sobre uma obra", "https://www.jessicacarrasco.com/contacto"],
              ["02", "Paint Night", "Uma noite de pintura guiada por Jessica. Para reunir amigos, celebrar ou experimentar algo novo.", "Reservar uma noite", "https://www.jessicacarrasco.com/paint-nights"],
              ["03", "Livros", "Poesia, ilustrações e livros infantis sobre rotina e diversidade.", "Conhecer os livros", "https://www.jessicacarrasco.com/personas"],
              ["04", "Contato", "Para projetos, colaborações ou uma primeira conversa. Escreva para Jessica.", "Enviar uma mensagem", "https://www.jessicacarrasco.com/contacto"],
            ].map(([number, title, body, link, href]) => (
              <article className="grid grid-cols-[40px_minmax(150px,.85fr)_minmax(200px,1.3fr)_minmax(150px,.8fr)] items-baseline gap-7 border-b border-[#b9a8c7] py-8 max-sm:grid-cols-[24px_1fr]" key={number}>
                <span className="text-[10px] text-[#7d5d92]">{number}</span><h3 className="text-3xl font-normal tracking-[-.04em] text-[#55052d]">{title}</h3><p className="text-sm leading-[1.7] text-[#584564] max-sm:col-start-2">{body}</p><a className="justify-self-end border-b border-[#55052d50] pb-1 text-[10px] font-medium uppercase text-[#55052d] max-sm:col-start-2 max-sm:justify-self-start" href={href}>{link} →</a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap items-end justify-between gap-6 bg-[#55052d] px-[clamp(24px,6vw,100px)] py-14 text-[11px] text-[#eee3f4]"><a className="text-[clamp(22px,3vw,40px)] tracking-[-.045em]" href="#home">Jessica Carrasco<span className="mt-3 block text-[11px] tracking-normal text-[#ccb6d6]">Artista visual &amp; escritora</span></a><span>Chile · Canadá</span><a href="#home">Voltar ao início ↑</a></footer>
    </div>
  );
}

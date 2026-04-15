import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import AnimateOnScroll from "@/components/animate-on-scroll";
import CertificatesGrid from "@/components/certificates-grid";
import PageLoader from "@/components/page-loader";
import NavLinks from "@/components/nav-links";
import { resume } from "@/data/resume";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  icon?: string;
};

function Section({ id, title, children, icon }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-12" data-animate="pixel-rise">
      <div className="flex flex-wrap items-center gap-4">
        {icon ? (
          <Image src={icon} alt="" width={20} height={20} className="section-icon" />
        ) : null}
        <h2 className="font-pixel text-lg text-white">{title}</h2>
        <div className="h-[2px] flex-1 bg-violet-400/40" />
      </div>
      <div className="mt-6 text-zinc-200">{children}</div>
    </section>
  );
}

export default function Home() {
  const techPositions = [
    { top: "6%", left: "6%", driftX: "18px", driftY: "-26px" },
    { top: "12%", left: "68%", driftX: "-22px", driftY: "18px" },
    { top: "22%", left: "32%", driftX: "16px", driftY: "24px" },
    { top: "28%", left: "82%", driftX: "-18px", driftY: "-20px" },
    { top: "36%", left: "12%", driftX: "24px", driftY: "-16px" },
    { top: "42%", left: "58%", driftX: "-26px", driftY: "14px" },
    { top: "48%", left: "22%", driftX: "18px", driftY: "20px" },
    { top: "54%", left: "76%", driftX: "-20px", driftY: "-18px" },
    { top: "62%", left: "38%", driftX: "22px", driftY: "-22px" },
    { top: "66%", left: "8%", driftX: "16px", driftY: "18px" },
    { top: "70%", left: "88%", driftX: "-24px", driftY: "20px" },
    { top: "74%", left: "52%", driftX: "20px", driftY: "-18px" },
    { top: "82%", left: "28%", driftX: "-18px", driftY: "22px" },
    { top: "86%", left: "66%", driftX: "26px", driftY: "-20px" },
    { top: "92%", left: "14%", driftX: "-16px", driftY: "-24px" },
    { top: "18%", left: "90%", driftX: "24px", driftY: "16px" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden text-zinc-100">
      <AnimateOnScroll />
      <PageLoader />
      <div className="tech-bg" aria-hidden="true">
        {resume.techStack.map((tech, index) => (
          <div
            key={`${tech.name}-bg`}
            className="tech-tile"
            style={
              {
                top: techPositions[index % techPositions.length].top,
                left: techPositions[index % techPositions.length].left,
                "--drift-x": techPositions[index % techPositions.length].driftX,
                "--drift-y": techPositions[index % techPositions.length].driftY,
                "--delay": `${(index % 6) * 0.15}s`,
                "--drift-duration": `${14 + (index % 5) * 3}s`,
              } as CSSProperties
            }
          >
            <Image
              src={tech.logo}
              alt=""
              width={64}
              height={64}
              className="tech-logo"
              style={{
                animationDuration: `${3 + (index % 4) * 0.6}s`,
              }}
            />
          </div>
        ))}
      </div>
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl" data-animate="pixel-rise">
            <p className="font-pixel text-xs text-cyan-200">
              Pixel Portfolio
            </p>
            <div className="pixel-avatar pixel-card mt-6 rounded-sm border border-white/20 bg-black/40">
              <Image
                src="/profile/pixel-profile.svg"
                alt="Pixel profile"
                fill
                className="object-contain p-4"
                sizes="200px"
                priority
              />
              <Image
                src="/profile/blink-profile.png"
                alt="Blink profile"
                fill
                className="blink-frame object-contain p-4"
                sizes="200px"
                priority
              />
            </div>
            <h1 className="mt-6 font-pixel text-3xl text-white md:text-4xl">
              {resume.name}
            </h1>
            <p className="mt-4 text-lg text-zinc-200">{resume.title}</p>
            <p className="mt-3 text-sm text-zinc-400">{resume.contact.location}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              <a
                className="pixel-card rounded-sm border border-white/20 bg-black/30 px-4 py-2 text-cyan-100 transition hover:text-white"
                href={`mailto:${resume.contact.email}`}
              >
                {resume.contact.email}
              </a>
              <a
                className="pixel-card rounded-sm border border-white/20 bg-black/30 px-4 py-2 text-cyan-100 transition hover:text-white"
                href={`tel:${resume.contact.phone.replace(/\\s/g, "")}`}
              >
                {resume.contact.phone}
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-300">
              <a
                className="underline decoration-dotted underline-offset-4 transition hover:text-white"
                href={resume.contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="underline decoration-dotted underline-offset-4 transition hover:text-white"
                href={resume.contact.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <NavLinks
            items={[
              { label: "About", id: "about" },
              { label: "Experience", id: "experience" },
              { label: "Projects", id: "projects" },
              { label: "Skills", id: "skills" },
              { label: "Education", id: "education" },
              { label: "Certificates", id: "certificates" },
              { label: "Contact", id: "contact" },
            ]}
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <Section id="about" title="About">
          <ul className="space-y-4 text-sm leading-relaxed">
            {resume.summary.map((item) => (
              <li key={item} className="list-[square] pl-5">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="experience"
          title="Experience"
          icon="/icons/pxlkit/trophy.svg"
        >
          <div className="space-y-8">
            {resume.experience.map((role) => (
              <div
                key={`${role.company}-${role.title}`}
                className="pixel-card rounded-sm border border-white/15 bg-black/30 p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-pixel text-sm text-white">
                      {role.title}
                    </h3>
                    <p className="text-xs text-zinc-400">{role.company}</p>
                  </div>
                  <span className="text-xs text-cyan-200">{role.dates}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-zinc-200">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="list-[square] pl-5">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects" icon="/icons/pxlkit/trophy.svg">
          <div className="grid gap-6 md:grid-cols-2">
            {resume.projects.map((project) => (
              <div key={project.name}>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-card block rounded-sm border border-white/15 bg-black/30 p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-pixel text-sm text-white">
                          {project.name}
                        </h3>
                        <p className="text-xs text-zinc-400">
                          {project.subtitle}
                        </p>
                      </div>
                      <span className="text-xs text-cyan-200">
                        {project.dates}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-zinc-200">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="list-[square] pl-5">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-xs text-cyan-200 underline decoration-dotted underline-offset-4">
                      {project.linkLabel ?? "Project link"}
                    </div>
                  </a>
                ) : (
                  <div className="pixel-card rounded-sm border border-white/15 bg-black/30 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-pixel text-sm text-white">
                          {project.name}
                        </h3>
                        <p className="text-xs text-zinc-400">
                          {project.subtitle}
                        </p>
                      </div>
                      <span className="text-xs text-cyan-200">
                        {project.dates}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-zinc-200">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="list-[square] pl-5">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-xs text-cyan-200">
                      {project.linkLabel ?? "Private build"}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(resume.skills).map(([group, items]) => (
              <div
                key={group}
                className="pixel-card rounded-sm border border-white/15 bg-black/30 p-6"
              >
                <h3 className="font-pixel text-xs text-cyan-200">
                  {group.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-sm border border-white/20 bg-black/40 px-3 py-1 text-zinc-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="education"
          title="Education & Training"
          icon="/icons/pxlkit/scroll.svg"
        >
          <div className="space-y-8">
            {resume.education.map((edu) => (
              <div
                key={`${edu.school}-${edu.degree}`}
                className="pixel-card rounded-sm border border-white/15 bg-black/30 p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-pixel text-sm text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-zinc-400">{edu.school}</p>
                    {edu.location ? (
                      <p className="text-xs text-zinc-500">{edu.location}</p>
                    ) : null}
                  </div>
                  {edu.dates ? (
                    <span className="text-xs text-cyan-200">{edu.dates}</span>
                  ) : null}
                </div>
                {edu.honors ? (
                  <ul className="mt-4 space-y-2 text-sm text-zinc-200">
                    {edu.honors.map((honor) => (
                      <li key={honor} className="list-[square] pl-5">
                        {honor}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <div className="pixel-card rounded-sm border border-white/15 bg-black/30 p-6">
              <h3 className="font-pixel text-sm text-white">Training</h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-200">
                {resume.training.map((item) => (
                  <li key={item.title} className="flex flex-wrap gap-2">
                    <span className="font-medium text-zinc-100">
                      {item.title}
                    </span>
                    <span className="text-zinc-500">{item.issuer}</span>
                    {item.dates ? (
                      <span className="text-zinc-500">• {item.dates}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          id="certificates"
          title="Certificates"
          icon="/icons/pxlkit/badge.svg"
        >
          <CertificatesGrid certificates={resume.certificates} />
        </Section>

        <Section id="contact" title="Contact">
          <div className="pixel-card rounded-sm border border-white/15 bg-black/30 p-6">
            <p className="text-sm text-zinc-300">
              Open to full-stack and backend engineering opportunities. Let’s
              build something reliable and scalable.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              <a
                className="pixel-card rounded-sm border border-white/20 bg-black/30 px-4 py-2 text-cyan-100 transition hover:text-white"
                href={`mailto:${resume.contact.email}`}
              >
                Email me
              </a>
              <a
                className="pixel-card rounded-sm border border-white/20 bg-black/30 px-4 py-2 text-cyan-100 transition hover:text-white"
                href={`tel:${resume.contact.phone.replace(/\\s/g, "")}`}
              >
                Call me
              </a>
              <a
                className="pixel-card rounded-sm border border-white/20 bg-black/30 px-4 py-2 text-cyan-100 transition hover:text-white"
                href={resume.contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="pixel-card rounded-sm border border-white/20 bg-black/30 px-4 py-2 text-cyan-100 transition hover:text-white"
                href={resume.contact.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}

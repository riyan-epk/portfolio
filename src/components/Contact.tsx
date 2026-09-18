"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Magnetic from "./Magnetic";

const EMAIL = "ryaan.epk@gmail.com";
const PHONE = "+92 309 848 0389";

const projectTypes = [
  "Web Application",
  "Mobile Application",
  "Enterprise System (ERP/POS)",
  "API / Integration",
  "UI/UX Development",
  "Consulting",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: projectTypes[0], message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "Your name, please";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "A valid email address";
    if (form.message.trim().length < 10) err.message = "A little more detail helps";
    setErrors(err);
    if (Object.keys(err).length) return;

    const subject = encodeURIComponent(`New project — ${form.type} — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\n\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const label = "mb-2.5 block font-mono text-[11px] uppercase tracking-widest text-slate-2/70";
  const field =
    "w-full rounded-xl border bg-paper px-4 py-3.5 text-[14.5px] text-carbon outline-none transition-colors placeholder:text-slate-2/45 focus:border-amber focus:bg-paper-card";

  return (
    <section id="contact" className="bg-paper">
      <div className="shell section-y">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* LEFT — heading + details */}
          <div className="lg:sticky lg:top-28">
            <SectionHead
              index="(08)"
              kicker="Contact"
              title={
                <>
                  Have something worth <span className="grad-amber font-display italic">building?</span>
                </>
              }
              intro="Tell me what you're shipping — I reply to every serious enquiry within a day."
            />

            <Reveal delay={0.1} className="mt-10 flex flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="card card-hover group flex items-center gap-4 p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-amber">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-slate-2/60">Email</span>
                  <span className="block truncate font-medium text-carbon group-hover:text-ember">{EMAIL}</span>
                </span>
              </a>
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="card card-hover group flex items-center gap-4 p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-amber">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-slate-2/60">Phone</span>
                  <span className="block font-medium text-carbon group-hover:text-ember">{PHONE}</span>
                </span>
              </a>
            </Reveal>
          </div>

          {/* RIGHT — premium form panel */}
          <Reveal>
            {sent ? (
              <div className="card flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-amber/15 text-ember">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <h3 className="mt-6 font-display text-2xl text-carbon">Your mail client is opening</h3>
                <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-slate-2">
                  If it didn&apos;t, email me directly at{" "}
                  <a href={`mailto:${EMAIL}`} className="text-ember link-underline">{EMAIL}</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="card p-7 sm:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={label}>Name</label>
                    <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" className={`${field} ${errors.name ? "border-ember" : "border-carbon/12"}`} />
                    {errors.name && <p className="mt-2 text-[12px] text-ember">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={label}>Email</label>
                    <input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" className={`${field} ${errors.email ? "border-ember" : "border-carbon/12"}`} />
                    {errors.email && <p className="mt-2 text-[12px] text-ember">{errors.email}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label className={label}>Project type</label>
                  <select value={form.type} onChange={(e) => set("type", e.target.value)} className={`${field} border-carbon/12`}>
                    {projectTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div className="mt-6">
                  <label className={label}>Message</label>
                  <textarea value={form.message} onChange={(e) => set("message", e.target.value)} rows={5} placeholder="What are you trying to build?" className={`${field} resize-none ${errors.message ? "border-ember" : "border-carbon/12"}`} />
                  {errors.message && <p className="mt-2 text-[12px] text-ember">{errors.message}</p>}
                </div>

                <div className="mt-8">
                  <Magnetic strength={0.25}>
                    <button type="submit" className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[13px] font-semibold text-paper-1 transition-colors hover:bg-amber hover:text-ink">
                      Send message
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

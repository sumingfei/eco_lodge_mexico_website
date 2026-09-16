"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { pricing, finishLevels, type FinishLevel } from "@/data/pricing";
import { mexicanStates } from "@/data/locations";
import {
  estimate,
  initialEstimatorInput,
  purposes,
  type EstimatorInput,
  type OptionKey,
  type SizeRangeId,
} from "@/lib/estimator";
import { formatMXN } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Check } from "@/components/ui/Icons";
import { EstimateResult } from "./EstimateResult";

export type EstimatorDefaults = Partial<
  Pick<EstimatorInput, "sizeRange" | "bedrooms">
> & { hasLand?: string; modelName?: string };

const STEPS = [
  "Ubicación",
  "Uso",
  "Tamaño",
  "Recámaras",
  "Acabados",
  "Sistemas",
] as const;
const optionKeys = Object.keys(pricing.options) as OptionKey[];

export function Estimator({ defaults }: { defaults?: EstimatorDefaults }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [input, setInput] = useState<EstimatorInput>({
    ...initialEstimatorInput,
    sizeRange: defaults?.sizeRange ?? null,
    bedrooms: defaults?.bedrooms ?? null,
  });
  const [hasLand, setHasLand] = useState(defaults?.hasLand ?? "si");
  const rootRef = useRef<HTMLDivElement>(null);

  // Keep the top of the estimator in view when moving between steps.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    const headerOffset = 96;
    if (top < headerOffset)
      window.scrollBy({ top: top - headerOffset, behavior: "smooth" });
  }, [step, done]);

  const update = <K extends keyof EstimatorInput>(
    key: K,
    value: EstimatorInput[K],
  ) => setInput((s) => ({ ...s, [key]: value }));

  const canContinue = [
    Boolean(input.stateCode),
    Boolean(input.purpose),
    Boolean(input.sizeRange),
    Boolean(input.bedrooms),
    Boolean(input.finish),
    true,
  ][step];

  const result = useMemo(() => (done ? estimate(input) : null), [done, input]);

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  };
  const back = () => (done ? setDone(false) : setStep(Math.max(0, step - 1)));

  const variants = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -16 },
      };

  if (done && result) {
    return (
      <div ref={rootRef}>
        <EstimateResult
          input={input}
          result={result}
          hasLand={hasLand}
          stateName={
            mexicanStates.find((s) => s.code === input.stateCode)?.name ?? ""
          }
          modelName={defaults?.modelName}
          onEdit={back}
        />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Progress */}
      <div className="min-w-0 lg:col-span-3">
        <ol
          className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:pb-0"
          aria-label="Pasos del cotizador"
        >
          {STEPS.map((label, i) => {
            const state = i < step ? "done" : i === step ? "current" : "todo";
            return (
              <li
                key={label}
                className="shrink-0 lg:border-t lg:border-ink/10 lg:py-3"
              >
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  aria-current={state === "current" ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-full px-3 py-1.5 text-sm lg:px-0",
                    state === "current"
                      ? "font-semibold text-ink"
                      : state === "done"
                        ? "text-ink/70 hover:text-ink"
                        : "text-stone-300",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border text-[0.6875rem] font-semibold",
                      state === "done"
                        ? "border-agave bg-agave text-white"
                        : state === "current"
                          ? "border-ink bg-ink text-limestone"
                          : "border-ink/15 text-stone-300",
                    )}
                    aria-hidden
                  >
                    {state === "done" ? <Check size={12} /> : i + 1}
                  </span>
                  {label}
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 hidden text-xs leading-relaxed text-stone lg:block">
          Estimación preliminar con base en precios de referencia. La cotización
          formal se emite después de evaluar tu terreno.
        </p>
      </div>

      <div className="min-w-0 lg:col-span-9">
        <div className="rounded-[1.5rem] border border-ink/10 bg-limestone-50 p-6 sm:p-10">
          <p className="eyebrow">
            Paso {step + 1} de {STEPS.length}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              {...variants}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <StepLocation
                  input={input}
                  update={update}
                  hasLand={hasLand}
                  setHasLand={setHasLand}
                />
              )}
              {step === 1 && <StepPurpose input={input} update={update} />}
              {step === 2 && <StepSize input={input} update={update} />}
              {step === 3 && <StepBedrooms input={input} update={update} />}
              {step === 4 && <StepFinish input={input} update={update} />}
              {step === 5 && <StepOptions input={input} update={update} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-ink disabled:invisible"
            >
              <ArrowLeft size={16} /> Atrás
            </button>
            <Button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="disabled:cursor-not-allowed disabled:opacity-40"
              icon={<ArrowRight size={16} />}
            >
              {step === STEPS.length - 1 ? "Ver estimación" : "Continuar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Steps ---------- */

type StepProps = {
  input: EstimatorInput;
  update: <K extends keyof EstimatorInput>(
    key: K,
    value: EstimatorInput[K],
  ) => void;
};

function StepTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mt-3">
      <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
      {hint && <p className="mt-2 text-sm text-charcoal-700/75">{hint}</p>}
    </div>
  );
}

const fieldClass =
  "mt-1.5 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-[0.9375rem] text-ink focus:border-ink focus:outline-none";

function StepLocation({
  input,
  update,
  hasLand,
  setHasLand,
}: StepProps & { hasLand: string; setHasLand: (v: string) => void }) {
  return (
    <>
      <StepTitle
        title="¿Dónde quieres construir?"
        hint="La ubicación influye en logística, cimentación y clima. Si aún no tienes terreno, elige la zona que estás considerando."
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="estado" className="text-sm font-medium text-ink">
            Estado
          </label>
          <select
            id="estado"
            value={input.stateCode}
            onChange={(e) => update("stateCode", e.target.value)}
            className={fieldClass}
          >
            <option value="">Selecciona un estado</option>
            {mexicanStates.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ciudad" className="text-sm font-medium text-ink">
            Municipio / ciudad{" "}
            <span className="font-normal text-stone">(opcional)</span>
          </label>
          <input
            id="ciudad"
            type="text"
            value={input.city}
            onChange={(e) => update("city", e.target.value)}
            className={fieldClass}
            placeholder="Ej. Valle de Bravo"
          />
        </div>
      </div>
      <fieldset className="mt-8">
        <legend className="text-sm font-medium text-ink">
          ¿Ya tienes terreno?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { value: "si", label: "Sí" },
            { value: "buscando", label: "Estoy buscando" },
            { value: "no", label: "Aún no" },
          ].map((o) => (
            <Chip
              key={o.value}
              selected={hasLand === o.value}
              onClick={() => setHasLand(o.value)}
            >
              {o.label}
            </Chip>
          ))}
        </div>
        {hasLand !== "si" && (
          <p className="mt-3 text-xs text-stone">
            Sin problema: la estimación sirve igual para definir tu presupuesto
            y qué terreno buscar.
          </p>
        )}
      </fieldset>
    </>
  );
}

function StepPurpose({ input, update }: StepProps) {
  return (
    <>
      <StepTitle title="¿Qué necesitas?" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {purposes.map((p) => (
          <OptionCard
            key={p.id}
            selected={input.purpose === p.id}
            onClick={() => update("purpose", p.id)}
            title={p.title}
            text={p.text}
          />
        ))}
      </div>
    </>
  );
}

function StepSize({ input, update }: StepProps) {
  return (
    <>
      <StepTitle
        title="¿De qué tamaño, aproximadamente?"
        hint="Superficie interior construida. Las terrazas no cuentan."
      />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pricing.sizeRanges.map((s) => (
          <OptionCard
            key={s.id}
            selected={input.sizeRange === s.id}
            onClick={() => update("sizeRange", s.id as SizeRangeId)}
            title={s.label}
            text={sizeHint(s.id)}
          />
        ))}
      </div>
    </>
  );
}

function sizeHint(id: string) {
  return (
    {
      "40-60": "NIDO 45 · un refugio o una unidad de renta",
      "60-90": "NIDO 65 · CASA 85 · pareja o familia pequeña",
      "90-120": "CASA 110 · familia con hijos",
      "120-160": "PATIO 140 · casa con patio central",
      "160+": "PATIO 180 · dos niveles, cuatro recámaras",
    }[id] ?? ""
  );
}

function StepBedrooms({ input, update }: StepProps) {
  return (
    <>
      <StepTitle
        title="¿Cuántas recámaras?"
        hint="Si el número de recámaras no cabe en el tamaño elegido, ajustamos la superficie de la estimación."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => update("bedrooms", n)}
            aria-pressed={input.bedrooms === n}
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl border font-serif text-2xl transition-colors",
              input.bedrooms === n
                ? "border-ink bg-ink text-limestone"
                : "border-ink/15 bg-white text-ink hover:border-ink",
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </>
  );
}

function StepFinish({ input, update }: StepProps) {
  return (
    <>
      <StepTitle
        title="¿Qué nivel de acabados?"
        hint="Todos comparten la misma estructura y envolvente térmica. Cambian los materiales que ves y tocas."
      />
      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        {finishLevels.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => update("finish", f.id as FinishLevel)}
            aria-pressed={input.finish === f.id}
            className={cn(
              "flex flex-col rounded-2xl border p-5 text-left transition-colors",
              input.finish === f.id
                ? "border-ink bg-ink text-limestone"
                : "border-ink/15 bg-white text-ink hover:border-ink",
            )}
          >
            <span className="font-serif text-2xl">{f.name}</span>
            <span
              className={cn(
                "mt-1 text-sm font-semibold",
                input.finish === f.id ? "text-limestone/80" : "text-terracotta",
              )}
            >
              {formatMXN(pricing.pricePerM2[f.id])}/m²
            </span>
            <span
              className={cn(
                "mt-3 text-sm leading-relaxed",
                input.finish === f.id
                  ? "text-limestone/75"
                  : "text-charcoal-700/75",
              )}
            >
              {f.description}
            </span>
            <ul
              className={cn(
                "mt-4 space-y-1 text-xs",
                input.finish === f.id ? "text-limestone/70" : "text-stone",
              )}
            >
              {f.highlights.map((h) => (
                <li key={h}>· {h}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </>
  );
}

function StepOptions({ input, update }: StepProps) {
  const toggle = (key: OptionKey) =>
    update(
      "options",
      input.options.includes(key)
        ? input.options.filter((k) => k !== key)
        : [...input.options, key],
    );
  return (
    <>
      <StepTitle
        title="Sistemas opcionales"
        hint="Puedes agregarlos ahora o más adelante; la casa se entrega preparada."
      />
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {optionKeys.map((key) => {
          const opt = pricing.options[key];
          const selected = input.options.includes(key);
          const perBedroom = "perUnit" in opt && opt.perUnit === "bedroom";
          return (
            <label
              key={key}
              className={cn(
                "flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-colors",
                selected
                  ? "border-ink bg-white"
                  : "border-ink/15 bg-white hover:border-ink/40",
              )}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggle(key)}
                className="mt-1 h-4 w-4 accent-terracotta"
              />
              <span className="flex-1">
                <span className="block font-medium text-ink">{opt.label}</span>
                <span className="block text-xs text-stone">
                  ≈ {formatMXN(opt.price)}
                  {perBedroom ? " por recámara" : ""}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </>
  );
}

/* ---------- Small primitives ---------- */

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        selected
          ? "bg-ink text-limestone"
          : "bg-white text-ink/80 ring-1 ring-ink/15 hover:ring-ink",
      )}
    >
      {children}
    </button>
  );
}

function OptionCard({
  selected,
  onClick,
  title,
  text,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  text?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-2xl border p-5 text-left transition-colors",
        selected
          ? "border-ink bg-ink text-limestone"
          : "border-ink/15 bg-white text-ink hover:border-ink",
      )}
    >
      <span className="block font-semibold">{title}</span>
      {text && (
        <span
          className={cn(
            "mt-1 block text-sm",
            selected ? "text-limestone/75" : "text-charcoal-700/70",
          )}
        >
          {text}
        </span>
      )}
    </button>
  );
}

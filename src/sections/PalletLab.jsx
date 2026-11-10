import { useState } from "react";

const checkpoints = [
  {
    name: "Dispatch",
    event: "Shipment linked",
    current: "The dispatch team records the shipment and the number of pallets leaving.",
    tracked: "A scan links pallet LR-024 to this shipment. The record captures the time and dispatch location.",
  },
  {
    name: "In transit",
    event: "Reading recorded",
    current: "The team relies on carrier updates or checks the load at the next stop.",
    tracked: "An optional temperature sensor records 5 °C. This simulated load has an upper threshold of 8 °C.",
  },
  {
    name: "Delivery",
    event: "Handoff confirmed",
    current: "The receiving team signs for the shipment and reconciles discrepancies later.",
    tracked: "The receiver scans LR-024 and records the delivery time. The shipment history now shows both handoffs.",
  },
  {
    name: "Return",
    event: "Empty pallet recovered",
    current: "The team counts empty pallets and matches them against earlier shipment records.",
    tracked: "A return scan closes this trip. LR-024 keeps its ID so it can be linked to a new load on the next trip.",
  },
];

const temperatureException = {
  event: "Temperature threshold crossed",
  current: "Without an in-transit sensor, a temperature issue may only become visible during a later inspection.",
  tracked: "The optional sensor records 11 °C, above the example 8 °C threshold. With network coverage, the team can receive an alert and ask the carrier to check the load.",
};

const fields = [
  { key: "trips", label: "Pallet trips per month", example: "500", max: 100000000 },
  { key: "replacement", label: "Replacement cost per lost pallet", example: "18000", max: 1000000000 },
  { key: "hourly", label: "Labor cost per hour", example: "4000", max: 1000000000 },
  { key: "currentLoss", label: "Current loss rate (%)", example: "4", max: 100 },
  { key: "pilotLoss", label: "Expected pilot loss rate (%)", example: "2", max: 100 },
  { key: "currentMinutes", label: "Current admin minutes per trip", example: "5", max: 1440 },
  { key: "pilotMinutes", label: "Expected pilot admin minutes per trip", example: "3", max: 1440 },
  { key: "monthly", label: "Pilot running cost per month", example: "55000", max: 1000000000 },
  { key: "setup", label: "One-time pilot setup cost", example: "300000", max: 1000000000 },
];

const examples = Object.fromEntries(fields.map(({ key, example }) => [key, example]));
const panel = "rounded-3xl border border-s3 bg-s2 p-5 sm:p-8";
const input = "w-full rounded-xl border border-s3 bg-s1 px-3 py-2.5 text-p4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-p3";

function PalletJourney() {
  const [step, setStep] = useState(0);
  const [exception, setException] = useState(false);
  const checkpoint = checkpoints[step];
  const reading = exception && step === 1 ? temperatureException : checkpoint;

  return (
    <div className={panel}>
      <h3 className="mb-2 h6 text-p4">Follow a pallet</h3>
      <p className="mb-5 body-3">Select a checkpoint to see what each workflow records.</p>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {checkpoints.map(({ name }, index) => (
          <li key={name}>
            <button
              type="button"
              aria-pressed={index === step}
              onClick={() => setStep(index)}
              className={`w-full rounded-xl border px-3 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-p3 ${index === step ? "border-p3 bg-p3 text-s1" : "border-s3 bg-s1 text-p4 hover:border-p3"}`}
            >
              {index + 1}. {name}
            </button>
          </li>
        ))}
      </ol>
      <label className="my-5 flex w-fit cursor-pointer items-center gap-3 text-sm text-p4">
        <input
          type="checkbox"
          checked={exception}
          className="size-4 accent-p3"
          onChange={(event) => {
            const enabled = event.target.checked;
            setException(enabled);
            if (enabled) setStep(1);
          }}
        />
        Simulate a temperature excursion
      </label>
      <div aria-live="polite">
        <p className="caption mb-3">{checkpoint.name} · {reading.event}</p>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-s1 p-4">
            <dt className="mb-1 font-semibold text-p4">Example current routine</dt>
            <dd className="body-3">{reading.current}</dd>
          </div>
          <div className="rounded-2xl border border-s3 bg-s1 p-4">
            <dt className="mb-1 font-semibold text-p3">Smart-pallet scenario</dt>
            <dd className="body-3">{reading.tracked}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function PilotCalculator() {
  const [values, setValues] = useState(examples);
  const [currency, setCurrency] = useState("RWF");
  const valid = fields.every(({ key, max }) =>
    values[key] !== "" && Number.isFinite(Number(values[key])) &&
    Number(values[key]) >= 0 && Number(values[key]) <= max,
  );
  const { trips, replacement, hourly, currentLoss, pilotLoss, currentMinutes, pilotMinutes, monthly, setup } = values;
  const operatingCost = (loss, minutes) => trips * (loss * replacement / 100 + minutes * hourly / 60);
  const currentCost = operatingCost(currentLoss, currentMinutes);
  const pilotCost = operatingCost(pilotLoss, pilotMinutes) + Number(monthly);
  const savings = currentCost - pilotCost;
  const firstYear = savings * 12 - setup;
  const money = new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 });
  const payback = savings > 0 ? `${(setup / savings).toFixed(1)} months` : "No payback under these inputs";

  return (
    <div className={panel}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="mb-2 h6 text-p4">Estimate the value of a pilot</h3>
          <p className="max-w-640 body-3">Replace the example figures with your own. Use the same currency for all costs.</p>
        </div>
        <button
          type="button"
          className="rounded-lg px-2 py-1 text-sm font-semibold text-p3 underline"
          onClick={() => {
            setValues(examples);
            setCurrency("RWF");
          }}
        >
          Reset examples
        </button>
      </div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="grid gap-1.5 text-sm font-medium text-p4">
          Currency
          <select value={currency} onChange={(event) => setCurrency(event.target.value)} className={input}>
            <option value="RWF">RWF · Rwandan franc</option>
            <option value="USD">USD · US dollar</option>
            <option value="EUR">EUR · Euro</option>
          </select>
        </label>
        {fields.map(({ key, label, max }) => (
          <label key={key} className="grid gap-1.5 text-sm font-medium text-p4">
            {label}
            <input
              type="number"
              min="0"
              max={max}
              step="any"
              required
              className={input}
              value={values[key]}
              onChange={(event) => setValues({ ...values, [key]: event.target.value })}
            />
          </label>
        ))}
      </div>
      {valid ? (
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Current monthly cost", money.format(currentCost)],
            ["Pilot monthly cost", money.format(pilotCost)],
            ["Net monthly savings", money.format(savings)],
            ["First-year net savings", money.format(firstYear)],
            ["Estimated payback", payback],
          ].map(([label, result]) => (
            <div key={label} className="rounded-2xl border border-s3 bg-s1 p-4">
              <dt className="mb-1 text-sm">{label}</dt>
              <dd className="text-lg font-semibold text-p3">{result}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p role="status" className="rounded-2xl border border-s3 bg-s1 p-4 text-p4">
          Enter a number in each field. Costs and times must be zero or greater, and loss rates must be between 0% and 100%.
        </p>
      )}
      <details className="mt-5 text-sm">
        <summary className="w-fit cursor-pointer font-semibold text-p4">How the estimate works</summary>
        <p className="mt-2 max-w-640 leading-relaxed">
          Monthly cost combines lost pallets and admin time. The pilot adds its monthly running cost.
          First-year savings subtract setup from twelve months of net savings. Payback divides setup
          by positive monthly savings. The estimate assumes constant volume and excludes costs you
          leave out, such as taxes or integration work.
        </p>
      </details>
      <p className="mt-4 text-sm text-p5">Illustrative estimate based on your inputs. Currency selection changes the label only.</p>
    </div>
  );
}

export default function PalletLab() {
  return (
    <section id="pallet-lab" className="container scroll-mt-28 pb-20 max-md:pb-14" aria-labelledby="pallet-lab-title">
      <p className="caption">Interactive demo</p>
      <h2 id="pallet-lab-title" className="mb-4 h3 max-md:h5 text-p4">Try a smart-pallet scenario</h2>
      <p className="mb-8 max-w-640 body-3">
        Walk through one shipment, then see how changes in pallet losses and admin time could affect your costs.
      </p>
      <div className="grid gap-5">
        <PalletJourney />
        <PilotCalculator />
      </div>
      <a href="#contact" className="mt-6 inline-block font-semibold text-p3 underline underline-offset-4">
        Discuss a pilot for your operation
      </a>
    </section>
  );
}

import { Element } from "react-scroll";

const useCases = [
  {
    title: "Trace handoffs",
    description: "Use a barcode or RFID tag to record where a pallet was last seen, from dispatch to receipt.",
  },
  {
    title: "Monitor sensitive loads",
    description: "Explore battery-powered sensors for temperature or shock on routes where handling conditions matter.",
  },
  {
    title: "Recover reusable pallets",
    description: "Give each pallet a persistent ID and link it to the load it carries on each trip. See what was shipped and which pallets came back.",
  },
];

export default function SmartPallets() {
  return (
    <section className="container pb-20 max-md:pb-14" aria-labelledby="smart-pallets-title">
      <Element id="smart-pallets" name="smart-pallets" className="scroll-mt-28">
        <div className="mb-8 max-w-640">
          <p className="caption">Smart pallets</p>
          <h2 id="smart-pallets-title" className="mb-4 h3 max-md:h5 text-p4">
            From dispatch to return
          </h2>
          <p className="body-3">
            We’re exploring how digital IDs and sensors can give logistics teams
            a clearer record of each trip.
          </p>
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {useCases.map(({ title, description }, index) => (
            <li key={title} className="rounded-3xl border border-s3 bg-s2 p-6">
              <span aria-hidden="true" className="small-2 text-p3">0{index + 1}</span>
              <h3 className="mb-2 mt-4 text-xl font-semibold text-p4">{title}</h3>
              <p className="body-3">{description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-7 body-3">
          Interested in testing this on one of your routes?{" "}
          <a href="#contact" className="font-semibold text-p3 underline underline-offset-4">
            Tell us about your operation.
          </a>
        </p>
      </Element>
    </section>
  );
}

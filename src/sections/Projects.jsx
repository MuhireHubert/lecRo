import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import { getAllHistoryItems } from "../api/get";
import { projectHistory } from "../constants/index.jsx";

const dateFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const engagements = [
  {
    label: "For logistics operators",
    title: "Scope a pilot on one route",
    description: "Choose a dispatch point, a receiving point, and a return process. Agree on what to measure, such as pallet return rates or time spent reconciling handoffs.",
  },
  {
    label: "For technical collaborators",
    title: "Test tracking and sensor power",
    description: "Explore which tags and sensors suit the route, how often they need to report, and how power use affects battery maintenance.",
  },
];

export default function Projects() {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    let current = true;
    getAllHistoryItems()
      .then((items) => {
        if (current && Array.isArray(items)) setHistoryItems(items);
      })
      .catch((error) => console.error("Error fetching project history:", error));
    return () => {
      current = false;
    };
  }, []);

  const history = historyItems.length ? historyItems : projectHistory;

  return (
    <section className="py-20 max-md:py-14" aria-labelledby="project-history-title">
      <Element name="projects" id="project-history" className="container scroll-mt-28">
        <div className="mb-9 max-w-640">
          <p className="caption">Our work</p>
          <h2 id="project-history-title" className="mb-4 h3 max-md:h5 text-p4">Project history</h2>
          <p className="body-3">
            Lec-Ro began with piezoelectric research on roads and tiles. We’re now exploring
            how low-power tracking can help logistics teams trace shipments and recover reusable pallets.
          </p>
        </div>

        <div className="mb-9 rounded-3xl border border-p2/60 bg-s2 p-6 sm:p-8">
          <p className="caption mb-3">Our mission</p>
          <h3 className="mb-3 h6 text-p4">Make reusable pallets easier to trace and recover</h3>
          <p className="max-w-640 body-3">
            We want teams to know which pallets left, where they changed hands, and which came back.
            Our energy research informs a practical question for that work: how little power can a
            tracker use and still give operators the information they need?
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h3 className="mb-5 h6 text-p4">Milestones</h3>
            <ol className="space-y-5 border-l border-s3 pl-5">
              <li className="relative">
                <span aria-hidden="true" className="absolute -left-[25px] top-2 size-2 rounded-full bg-p2" />
                <p className="small-compact uppercase text-p3">Current focus</p>
                <h4 className="my-1 font-semibold text-p4">Smart pallets for logistics</h4>
                <p className="body-3">Explore digital IDs, sensor readings, and ways to track empty pallets on their return.</p>
              </li>
              {history.map(({ _id, date, title, points }) => {
                const timestamp = Date.parse(date);
                const displayDate = Number.isFinite(timestamp) ? dateFormat.format(timestamp) : date;
                return (
                  <li key={_id ?? title} className="relative">
                    <span aria-hidden="true" className="absolute -left-[25px] top-2 size-2 rounded-full bg-p2" />
                    <p className="small-compact uppercase text-p3">{displayDate}</p>
                    <h4 className="my-1 font-semibold text-p4">{title.trim()}</h4>
                    <ul className="space-y-1 body-3">
                      {points?.map((point) => (
                        <li key={point}>{point.trim().replace(/^Milestone:\s*/i, "")}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>

          <div>
            <h3 className="mb-5 h6 text-p4">Engagements</h3>
            <p className="mb-4 body-3">Two ways to work with Lec-Ro on the next phase.</p>
            <div className="grid gap-3">
              {engagements.map(({ label, title, description }) => (
                <article key={title} className="rounded-2xl border border-s3 bg-s2 p-5">
                  <p className="caption mb-2">{label}</p>
                  <h4 className="mb-2 text-lg font-semibold text-p4">{title}</h4>
                  <p className="body-3">{description}</p>
                </article>
              ))}
            </div>
            <a href="#contact" className="mt-5 inline-block font-semibold text-p3 underline underline-offset-4">
              Discuss an engagement
            </a>
          </div>
        </div>
      </Element>
    </section>
  );
}

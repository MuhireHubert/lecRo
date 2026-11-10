import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import { getAllHistoryItems } from '../api/get';

import {
    VerticalTimeline,
    VerticalTimelineElement,
  } from "react-vertical-timeline-component";

  import "react-vertical-timeline-component/style.min.css";

  const HistoryCard = ({ historyItem }) => {
    return (
      <VerticalTimelineElement
        contentStyle={{
          background: "#1d1836",
          color: "#fff",
        }}
        contentArrowStyle={{ borderRight: "7px solid  #232631" }}
        date={historyItem.date}
        iconStyle={{ background: "#915eff" }}
        icon={
          <div className='flex justify-center items-center w-full h-full'>
            <img 
              src="/images/lecRo.svg" 
              alt="lecRo Logo" 
              className='w-[60%] h-[60%] object-contain'
            />
          </div>
        }
      >
        <div>
          <h3 className='text-white text-[24px] font-bold'>{historyItem.title}</h3>
        </div>
  
        <ul className='mt-5 list-disc ml-5 space-y-2'>
          {historyItem.points.map((point, index) => (
            <li
              key={`history-point-${index}`}
              className='text-white-100 text-[14px] pl-1 tracking-wider'
            >
              {point}
            </li>
          ))}
        </ul>
      </VerticalTimelineElement>
    );
  }

const milestones = [
  {
    stage: "Foundation",
    title: "Piezoelectric energy research",
    description: "Lec-Ro began by exploring how pressure on roads and tiles could generate electricity.",
  },
  {
    stage: "Current focus",
    title: "Smart pallets for logistics",
    description: "We’re exploring how digital IDs and sensors could help teams trace handoffs, monitor sensitive loads, and recover pallets.",
  },
  {
    stage: "Next step",
    title: "Define a pilot route",
    description: "We’d like to work with a logistics partner to choose a route and measure outcomes such as return rates or the quality of tracking data.",
  },
];

const Projects = () => {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    getAllHistoryItems()
      .then((items) => setHistoryItems(items || []))
      .catch((error) => console.error("Error fetching project history:", error));
  }, []);

  return (
    <section className="py-20 max-md:py-14" aria-labelledby="milestones-title">
      <Element name="projects">
        <div className="container">
          <h2 id="milestones-title" className="mb-4 h3 max-md:h5 text-p4">
            Milestones
          </h2>
          <p className="mb-8 max-w-640 body-3">
            From piezoelectric research to exploring a smart-pallet pilot.
          </p>
          <ol className="grid gap-4 md:grid-cols-3">
            {milestones.map(({ stage, title, description }) => (
              <li key={stage} className="rounded-3xl border border-s3 bg-s2 p-6">
                <p className="caption mb-3">{stage}</p>
                <h3 className="mb-3 text-xl font-semibold text-p4">{title}</h3>
                <p className="body-3">{description}</p>
              </li>
            ))}
          </ol>
        </div>

        {historyItems.length > 0 && (
          <div className="mt-12">
            <h3 className="container h5 text-p4">Project history</h3>
            <VerticalTimeline>
              {historyItems.map((historyItem) => (
                <HistoryCard key={historyItem._id} historyItem={historyItem} />
              ))}
            </VerticalTimeline>
          </div>
        )}
      </Element>
    </section>
  );
};

export default Projects;

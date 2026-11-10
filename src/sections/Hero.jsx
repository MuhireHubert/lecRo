import { Element } from "react-scroll";
import Button from "../components/Button.jsx";

const Hero = () => {
  return (
    <section className="pt-40 pb-20 max-md:pt-28 max-md:pb-14">
      <Element name="hero">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="caption">Lec-Ro · Smart logistics</p>
            <h1 className="mb-6 text-5xl font-black leading-tight text-p4 lg:text-6xl">
              See where your pallets go.
            </h1>
            <p className="mb-8 max-w-440 body-1 max-md:body-3">
              Lec-Ro is exploring smart pallets to help logistics teams trace
              shipments, monitor sensitive loads, and recover reusable pallets.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="#contact">Discuss a pilot</Button>
              <a className="font-semibold text-p3 hover:underline" href="#pallet-lab">
                Try the simulator <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-3xl border border-s3 bg-s2">
            <div className="relative">
              <img
                src="/images/lecRo.svg"
                className="absolute left-3 top-2 w-32 sm:w-40"
                alt="Lec-Ro"
                width="586"
                height="244"
              />
              <img
                src="/images/smart-pallet-warehouse.jpg"
                alt="Smart pallet concept with a compact tracker beneath a stack of wrapped cartons in a warehouse"
                className="h-auto w-full"
                width="1200"
                height="900"
                fetchPriority="high"
              />
            </div>
            <figcaption className="border-t border-s3 px-5 py-3 text-sm text-p5">
              Lec-Ro smart pallet concept
            </figcaption>
          </figure>
        </div>
      </Element>
    </section>
  );
};

export default Hero;

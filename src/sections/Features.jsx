import { Element, Link } from "react-scroll";
import { details, features } from "../constants/index.jsx";
import Button from "../components/Button.jsx";

const Features = () => {
  return (
    <section>
      <Element name="features">
        <div className="container">
          <p className="caption">Energy innovation</p>
          <h2 className="mb-7 h3 max-md:h5 text-p4">From energy harvesting to low-power tracking</h2>
          <p className="mb-8 max-w-640 body-3">
            We’re bringing the same question from our energy research into logistics.
            How can a device do its job with less power?
          </p>
          <div className="relative flex max-lg:flex-wrap flex-nowrap border-2 border-s3 rounded-7xl lg:overflow-hidden max-lg:flex-col feature-after lg:g7 max-lg:border-none justify-between max-lg:rounded-none max-lg:gap-3">
            {features.map(({ id, icon, caption, title, text, button }) => (
              <div
                key={id}
                className="relative z-2 lg:px-10 px-5 lg:pb-10 pb-5 flex-50 max-lg:g7 max-lg:border-2 max-lg:border-s3 max-lg:rounded-3xl max-lg:flex-320"
              >
                <div className="w-full flex justify-start items-start">
                  <div className="-ml-3 mb-12 flex items-center justify-center flex-col">
                    <div className="w-0.5 h-16 bg-s3" />

                    <img
                      src={icon}
                      className="size-28 object-contain"
                      alt={title}
                    />
                  </div>
                </div>

                <p className="caption mb-5 max-lg:mb-6">{caption}</p>
                <h3 className="max-w-400 mb-7 h3 text-p4 max-lg:mb-6 max-lg:h5">
                  {title}
                </h3>
                <p className="mb-11 body-1 max-lg:mb-8 max-lg:body-3">{text}</p>
                <Link to="projects" offset={-100} spy smooth>
                  <Button icon={button.icon}>See milestones</Button>
                </Link>
              </div>
            ))}

            <ul className="relative flex justify-around flex-grow px-[5%] border-2 border-s3 rounded-7xl max-lg:hidden">
              <div className="absolute bg-s3/20 top-[38%] left-0 right-0 w-full h-[1px] z-10" />

              {details.map(({ id, icon, title }) => (
                <li key={id} className="relative pt-16 px-4 pb-14">
                  <div className="absolute top-8 bottom-0 left-1/2 bg-s3/20 w-[1px] h-full z-10" />

                  <div className="flex items-center justify-center mx-auto mb-3 border-2 border-s2 rounded-full hover:border-s4 transition-all duration-500 shadow-500 size-20">
                    <img
                      src={icon}
                      alt={title}
                      className="size-17/20 object-contain z-20"
                    />
                  </div>

                  <h3 className="relative z-2 max-w-36 mx-auto my-0 base-small text-center uppercase">
                    {title}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Element>
    </section>
  );
};
export default Features;

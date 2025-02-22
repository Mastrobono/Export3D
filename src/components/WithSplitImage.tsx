import Container from "../layouts/Container.tsx";

// Reducir gap entre details list

const features = [
  {
    name: "Durable",
    description:
      "The leather cover and machined steel disc binding stand up to daily use for years to come.",
  },
  {
    name: "Refillable",
    description:
      "Buy it once and refill as often as you need. Subscribe and save on routine refills.",
  },
  {
    name: "Thoughtfully designed",
    description:
      "The comfortable disc binding allows you to quickly rearrange pages or combine lined, graph, and blank refills.",
  },
  {
    name: "Locally made",
    description:
      "Responsibly and sustainably made real close to wherever you are, somehow.",
  },
];

interface ProjectDetails {
  title: string;
  location: string;
  year: number;
  client: string;
  role: string;
  buildingType: string;
  status: string;
}

interface WithSplitImageProps {
  imagePosition: "left" | "right";
  imageUrl: string;
  projectDetails: ProjectDetails;
}

export default function WithSplitImage({
  imagePosition,
  imageUrl,
  projectDetails,
}: WithSplitImageProps) {
  const sectionClasses =
    imagePosition === "left"
      ? "lg:grid-cols-[65%_35%]"
      : "lg:grid-cols-[35%_65%] lg:grid-flow-col-dense";
  const textColumnStart =
    imagePosition === "left" ? "lg:col-start-2" : "lg:col-start-1";
  const imageColumnStart =
    imagePosition === "left" ? "lg:col-start-1" : "lg:col-start-2";
  const imageBorderRadius =
    imagePosition === "left"
      ? "rounded-lg lg:rounded-r-none"
      : "rounded-lg lg:rounded-l-none";
  const projectDetailsTitle =
    "font-bold text-white font-kuunari-medium text-lg";
  const projectDetailsText = " text-slate-200 font-kuunari-light text-xl";

  return (
    <Container>
      <section
        aria-labelledby="features-heading"
        className={`relative grid items-center   ${sectionClasses}`}
      >
        <div className={imageColumnStart}>
          <img
            alt={projectDetails.title}
            src={imageUrl}
            className={`aspect-[3/2] w-full object-cover sm:aspect-[5/2] lg:aspect-auto lg:h-full lg:w-full ${imageBorderRadius}`}
          />
        </div>

        <div className="px-16 py-8 ">
          <h2
            id="features-heading"
            className=" font-medium text-accent-500 font-kuunari-bold-condensed text-[24px] absolute top-10"
          >
            Visualización Arquitectónica
          </h2>
          <div className="">
            <div className={`items-center ${textColumnStart}`}>
              <h2
                id="features-heading"
                className="font-bold text-accent-500  font-kuunari-bold-condensed text-[52px] mb-14 text-center"
              >
                {projectDetails.title}
              </h2>
              <div className="space-y-6 my-8">
                <p className={projectDetailsText}>
                  <span className={projectDetailsTitle}>Location: </span>
                  {projectDetails.location}
                </p>
                <p className={projectDetailsText}>
                  <span className={projectDetailsTitle}>Year: </span>{" "}
                  {projectDetails.year}
                </p>
                <p className={projectDetailsText}>
                  <span className={projectDetailsTitle}>Client: </span>{" "}
                  {projectDetails.client}
                </p>
                <p className={projectDetailsText}>
                  <span className={projectDetailsTitle}>Role:</span>{" "}
                  {projectDetails.role}
                </p>
                <p className={projectDetailsText}>
                  <span className={projectDetailsTitle}>Building Type: </span>{" "}
                  {projectDetails.buildingType}
                </p>
                <p className={projectDetailsText}>
                  <span className={projectDetailsTitle}>Status: </span>{" "}
                  {projectDetails.status}
                </p>
              </div>
              <p className={projectDetailsTitle}>
                loreme ipsum dolor sit amet, consectetur adipiscing elit. Donec
              </p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

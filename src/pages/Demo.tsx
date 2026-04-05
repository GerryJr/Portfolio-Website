import { Link } from "react-router-dom";

const DEMO_PROJECTS = [
  {
    id: "krisp-fresh-living",
    title: "Krisp Fresh Living",
    description:
      "A pixel-perfect recreation of the Krisp Fresh Living specialty coffee & fresh food website. Features a full ordering flow, interactive menu, cart system, and rewards program.",
    image: "/demo/krisp/menu-2023-11-07-7.20.02.webp",
    status: "In Progress",
    tags: ["React", "CSS", "E-Commerce", "Restaurant"],
    route: "/demo/krisp-fresh-living",
  },
];

export default function Demo() {
  return (
    <div className="min-h-[80vh] px-6 py-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 max-w-[40px] bg-muted-foreground/30" />
          <span className="text-[0.7rem] font-semibold tracking-[3px] uppercase text-muted-foreground">
            Workshop
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground mb-3">
          Demo Projects
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
          Works in progress — recreations and experiments that aren't quite ready
          for the spotlight. Building in public, one pixel at a time.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6">
        {DEMO_PROJECTS.map((project) => (
          <Link
            key={project.id}
            to={project.route}
            className="group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-shadow-color/5 hover:-translate-y-0.5"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="sm:w-72 aspect-[16/10] sm:aspect-auto overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-accent-foreground transition-colors">
                    {project.title}
                  </h2>
                  <span className="px-2.5 py-0.5 text-[0.65rem] font-bold tracking-wide uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full whitespace-nowrap">
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[0.68rem] font-medium bg-secondary text-muted-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-wide uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>View Demo</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-16 text-center">
        <p className="text-xs text-muted-foreground/60">
          These demos are recreations for learning purposes and are not
          affiliated with the original brands.
        </p>
      </div>
    </div>
  );
}

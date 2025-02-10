export default function ProjectSection() {
    const projects = [
      {
        category: "Living Room Lighting",
        title: "Chandelier",
        description:
          "Vestibulum ac diam sit amet quam vehicula sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        category: "Outdoor Lighting",
        title: "Patio Fixtures",
        description:
          "Vestibulum ac diam sit amet quam vehicula sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        category: "Bedroom Lighting",
        title: "Hanging Fixture",
        description:
          "Vestibulum ac diam sit amet quam vehicula sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ];
  
    return (
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Projects</h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="flex items-center gap-6">
              <div className="flex-1 p-6 border-l-4 border-blue-500 bg-white shadow-md rounded-lg">
                <p className="text-blue-600 font-semibold">{project.category}</p>
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
              <div className="w-48 h-48 bg-gray-200 rounded-lg shadow-md"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
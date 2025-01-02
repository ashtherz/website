const Projects = () => (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Projects</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="p-6 bg-gray-800 rounded shadow">
          <h3 className="text-xl font-bold">Interactive Resume</h3>
          <p className="text-gray-400">An interactive resume website built using React and Tailwind CSS.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded shadow">
          <h3 className="text-xl font-bold">API Overflow</h3>
          <p className="text-gray-400">A web app to explore APIs dynamically, using a React frontend and Node.js backend.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded shadow">
          <h3 className="text-xl font-bold">Receipt Scanner</h3>
          <p className="text-gray-400">A receipt scanning app built with Python for text recognition and React for the UI.</p>
        </div>
      </div>
    </div>
  );
  
  export default Projects;
  
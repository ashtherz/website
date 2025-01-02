const Contact = () => (
    <div className="min-h-screen bg-gray-800 text-white py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Contact Me</h2>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-lg text-gray-300">Feel free to reach out to me via:</p>
        <div className="space-y-2">
          <a
            href="mailto:yourname@example.com"
            className="block text-blue-400 hover:underline"
          >
            Email: yourname@example.com
          </a>
          <a
            href="https://www.linkedin.com/in/yourlinkedin/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-400 hover:underline"
          >
            LinkedIn: linkedin.com/in/yourlinkedin/
          </a>
          <a
            href="https://github.com/yourgithub"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-400 hover:underline"
          >
            GitHub: github.com/yourgithub
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Let’s connect and collaborate on exciting projects!
        </p>
      </div>
    </div>
  );
  
  export default Contact;
  
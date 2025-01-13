const About = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className='shadow-2xl my-4 p-6 bg-white rounded-md'>
          <h1 className="text-center text-2xl font-bold mb-4">About This Application</h1>
          <p className="text-justify">
          This application provides an accounting service for penalties in sports teams or any group that needs a tool to keep track of penalties.
          The application is my ongoing personal project, aiming to showcase my knowledge to recruiters and serve as a programming playground. 
          For me, Sakkokassa is a project where I can apply the theories I learn at university to practical solution that help teams manage their everyday tasks. 

          <p className="mt-1">
            <span className="font-bold">
              Note:&nbsp; 
            </span>
            <span>
              It may take a moment for the database to wake up if the application has not been used in a while since the database is a using free version of MongoDB.
            </span>
          </p>
         
          </p>
          <div className="mt-4">
            <p className="font-bold">What penalties?</p>
            <p className="text-justify">Penalties, "sakot" in Finnish, are punishments for breaking the mutually agreed rules made by the team. A penalty can be for example <span className="italic">Being late to practice </span> and the sum can be for example 5€.</p>
          </div>
          <div className="mt-4">
            <p className="font-bold">Why penalties?</p>
            <p className="text-justify">Penalties ensure that all team members follow the rules and guidelines. The collected money is typically used in the team's annual parties such as the Christmas party or end-of-season party.</p>
          </div>
          <div className="mt-4">
            <p className="font-bold">The motivation:</p>
            <p className="text-justify">The motivation behind the application is to replace manual counting and statistical analyses in an Excel sheet with a website where it is easier to log, fetch, and show information.</p>
          </div>
          <div className="mt-5">
          <p className="font-bold">Tools and Languages:</p>
          <p>JavaScript, React, MongoDB, TailwindCSS, Express</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  
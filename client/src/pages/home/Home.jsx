import "./home.css";

const Home = () => {
  return (
    <div className="h-full mx-auto pt-20 flex-grow text-white">
      <div className="m-full h-full mx-auto container">
        <div className="m-full h-full flex flex-wrap justify-center flex-col">
          <div className="font-extrabold text-9xl">
            <p className="flowteam">flow.team</p>
            <p>Developer Assignment</p>
          </div>
          <div className="mt-10">
            <p>Tailwind Css Very Nice</p>
            <p>Made By An Byeong Hyeon</p>
            <p className="text-red-300">
              Flow : Admin SignIn {"->"} Assignment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

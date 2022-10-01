import LatestNews from "../src/components/latestNews";

const Home = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="mb-auto">
        <LatestNews />
      </div>
    </div>
  );
};

export default Home;

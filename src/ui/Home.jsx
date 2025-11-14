import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 text-center sm:my-16 px-4">
      <h1 className="mb-8 text-xl text-yellow-500 font-semibold text-center md:text-3xl">
        The best pizza.
        <br />
        <span className="text-black">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Link to="/menu">
          <button className="bg-yellow-300 px-2 py-3 rounded-full">
            Continue ordering, {username}
          </button>{" "}
        </Link>
      )}
    </div>
  );
}

export default Home;

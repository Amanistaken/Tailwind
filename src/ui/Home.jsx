import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="my-10 text-center sm:my-16 px-4">
      <h1 className="mb-8 text-xl text-yellow-500 font-semibold text-center md:text-3xl">
        The best pizza.
        <br />
        <span className="text-black">Straight out of the oven, straight to you.</span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;

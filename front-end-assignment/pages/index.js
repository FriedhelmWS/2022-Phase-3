import { useRouter } from "next/router";
import store from "./store";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl">Welcome to the Country Quiz Platform!</h1>
        <p className="text-xl mt-2">
          You would have chance to get test on your country knowledge!
        </p>
        <div className="flex justify-center gap-5 mt-5">
          <div>Please Enter Your Name: </div>
          <input
            className="border-2"
            onChange={(e) =>
              store.dispatch({
                type: "system/addName",
                payload: e.target.value,
              })
            }
          />
        </div>
        <button
          onClick={() => router.push("/category")}
          className="bg-gray-500 mt-2 px-4 py-1 text-gray-100 rounded-md hover:bg-gray-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

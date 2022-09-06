import axios from "axios";
import { useRouter } from "next/router";
import { useStore } from "react-redux";

export default function Home() {
  const router = useRouter();

  const store = useStore();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl">Welcome to the Country Quiz Platform!</h1>
        <p className="mt-2 text-xl">
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
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              router.push("/category");
              axios
                .get(
                  "https://msa-2022-owen.azurewebsites.net/weatherforecast",
                  {
                    header: {
                      "Access-Control-Allow-Headers": "*",
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": "*",
                    },

                    // put the rest of your config here
                  }
                )
                .then(function (response) {
                  console.log(response);
                });
            }}
            className="absolute z-40 px-6 py-3 text-xl font-semibold text-white bg-gray-500 rounded-lg shadow-inner hover:mt-1 active:mt-2"
          >
            Continue
          </button>
          <div className="px-6 py-3 mt-2 text-xl font-semibold text-white bg-gray-600 rounded-lg">
            Continue
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
import { useStore, useSelector } from "react-redux";
import { useEffect } from "react";

export default function CategoryPage() {
  const router = useRouter();
  const store = useStore();
  const xp = useSelector((state) => state.xp);
  const progress = ((xp % 100) / 100) * 127;

  useEffect(() => {
    var newxp = xp;
    const add = 0;
    const interval = setInterval(() => {
      if (newxp < xp + add) {
        newxp = newxp + 1;
        store.dispatch({
          type: "system/setXp",
          payload: newxp,
        });
      } else {
        clearInterval(interval);
      }
    }, 20);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-5 text-2xl font-bold text-center text-gray-800">
        Hello, {store.getState().name}! Please select a question category
      </div>
      <div className="mb-2 text-lg font-bold">My Progress: </div>
      <div className="flex flex-row items-center justify-center gap-5 font-bold text-gray-800">
        <div className="flex justify-center">Level {parseInt(xp / 100)}</div>
        <div className="flex flex-row items-center justify-center">
          <div className="absolute w-3 h-3 mr-32 transform rotate-45 bg-yellow-500" />
          <div style={{ height: 17 }} className="w-32 bg-gray-200" />
          <div style={{ height: 17 }} className="absolute flex flex-row w-32">
            <div
              style={{ height: 17, width: progress }}
              className="absolute flex flex-row items-center justify-start bg-yellow-500"
            >
              <div
                style={{ marginLeft: progress - 6 }}
                className="absolute z-40 w-3 h-3 transform rotate-45 bg-yellow-500"
              />
            </div>
          </div>
          <div className="absolute w-3 h-3 ml-32 transform rotate-45 bg-gray-200" />
        </div>
        <div className="flex justify-center">
          {xp}/{parseInt(xp / 100) + 1}00
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-2">
        <button
          className="flex flex-col items-center hover:opacity-80"
          onClick={() => {
            store.dispatch({
              type: "system/selectFlag",
            });
            router.push("/question");
          }}
        >
          <img
            className="object-none w-64 h-64 md:h-96 md:w-96"
            src="https://pbs.twimg.com/media/Dj4mRH4X0AERo7g.jpg:large"
          />
          <div className="flex justify-center w-full py-2 text-lg font-bold text-gray-200 bg-gray-600">
            Flags
          </div>
        </button>
        <button
          className="flex flex-col items-center hover:opacity-80"
          onClick={() => {
            store.dispatch({
              type: "system/selectCapital",
            });
            router.push("/question");
          }}
        >
          <img
            className="object-none w-64 h-64 md:h-96 md:w-96"
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/3c/f9/9f/local-area.jpg?w=600&h=400&s=1"
          />
          <div className="flex justify-center w-full py-2 text-lg font-bold text-gray-200 bg-gray-600">
            Capitals
          </div>
        </button>
      </div>
    </div>
  );
}

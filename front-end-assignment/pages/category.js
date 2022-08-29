import { useRouter } from "next/router";
import { useStore } from "react-redux";

export default function CategoryPage() {
  const router = useRouter();
  const store = useStore();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold text-center text-gray-800">
        Hello, {store.getState().name}! Please select a question category
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
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

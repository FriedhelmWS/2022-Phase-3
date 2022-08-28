import store from "../utils/store";

export default function TestPage() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="text-3xl">
        Hello, {store.getState().name}! Please select a question category
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <button
          className="flex flex-col items-center hover:opacity-80"
          onClick={() =>
            store.dispatch({
              type: "system/selectFlag",
            })
          }
        >
          <img
            className="h-96 w-96 object-none"
            src="https://pbs.twimg.com/media/Dj4mRH4X0AERo7g.jpg:large"
          />
          <div className="bg-gray-600 w-full flex justify-center py-2 text-gray-200 text-lg font-bold">
            Flags
          </div>
        </button>
        <button
          className="flex flex-col items-center hover:opacity-80"
          onClick={() =>
            store.dispatch({
              type: "system/selectCapital",
            })
          }
        >
          <img
            className="h-96 w-96 object-none"
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/3c/f9/9f/local-area.jpg?w=600&h=400&s=1"
          />
          <div className="bg-gray-600 w-full flex justify-center py-2 text-gray-200 text-lg font-bold">
            Capitals
          </div>
        </button>
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { useStore, useSelector } from "react-redux";

const answers = [
  "USA",
  "France",
  "Finland",
  "New Zealand",
  "Austria",
  "Russia",
  "Denmark",
  "Germany",
  "Sweden",
  "India",
  "Peru",
  "Japan",
  "Egypt",
  "South Africa",
  "Ethiopia",
  "Canada",
  "Spain",
  "Panama",
];

export default function QuestionPage() {
  const store = useStore();
  const router = useRouter();

  const questionType = useSelector((state) => state.category);
  const isCorrect = useSelector((state) => state.correct);

  useEffect(() => {
    const select = answers[Math.floor(Math.random() * answers.length)];
    store.dispatch({
      type: "system/setAnswer",
      payload: select,
    });

    axios
      .get("https://restcountries.com/v3.1/name/" + select)
      .then((response) => {
        console.log(response);
        axios
          .get(
            "https://restcountries.com/v3.1/name/" +
              String.fromCharCode(97 + Math.floor(Math.random() * 26))
          )
          .then((response1) => {
            console.log(response1);
            axios
              .get(
                "https://restcountries.com/v3.1/name/" +
                  String.fromCharCode(97 + Math.floor(Math.random() * 26))
              )
              .then((response2) => {
                console.log(response2);
                const question = [];
                question.push(
                  questionType === 1
                    ? response.data[0].flags.png
                    : response.data[0].capital[0]
                );
                question.push(
                  questionType === 1
                    ? response1.data[
                        Math.floor(Math.random() * response1.data.length)
                      ].flags.png
                    : response1.data[
                        Math.floor(Math.random() * response1.data.length)
                      ].capital[0]
                );
                question.push(
                  questionType === 1
                    ? response2.data[
                        Math.floor(Math.random() * response2.data.length)
                      ].flags.png
                    : response2.data[
                        Math.floor(Math.random() * response2.data.length)
                      ].capital[0]
                );
                store.dispatch({
                  type: "system/setQuestion",
                  payload: question,
                });
              });
          });
      });
  }, []);

  console.log(store);

  const question = useSelector((state) => state.question);
  const answerString = useSelector((state) => state.answer);

  if (isCorrect !== null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold ">
          {isCorrect === true ? (
            <div className="grid grid-cols-1 gap-2 text-center md:grid-cols-2">
              <div>Congratulations!</div>
              <div>You are correct!</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 text-center md:grid-cols-2">
              <div>Unfortunately!</div>
              <div>The answer is wrong.</div>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              store.dispatch({
                type: "system/resetAnswer",
              });
              store.dispatch({
                type: "system/resetQuestion",
              });
              router.push("/category");
            }}
            className="absolute z-40 px-6 py-3 text-xl font-semibold text-white bg-gray-500 rounded-lg shadow-inner hover:mt-1 active:mt-2"
          >
            Try Another Question
          </button>
          <div className="px-6 py-3 mt-2 text-xl font-semibold text-white bg-gray-600 rounded-lg">
            Try Another Question
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {question.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex items-center justify-center bg-gray-500 w-72 h-72 animate-spin">
            <div className="w-56 h-56 bg-white" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-3xl">
            {questionType === 1
              ? "What flag is for"
              : "What is the captial of "}{" "}
            {answerString}?
          </div>
          <div className="grid justify-center grid-cols-1 gap-5 mt-10 md:grid-cols-3">
            <button
              className="hover:opacity-75"
              onClick={() =>
                store.dispatch({
                  type: "system/answerCorrect",
                })
              }
            >
              {questionType === 1 ? (
                <img className="h-48 border" src={question[0]} />
              ) : (
                <div className="hover:animate-pulse">{question[0]}</div>
              )}
            </button>
            <button
              className="hover:opacity-75"
              onClick={() =>
                store.dispatch({
                  type: "system/answerWrong",
                })
              }
            >
              {questionType === 1 ? (
                <img className="h-48 border" src={question[1]} />
              ) : (
                <div className="hover:animate-pulse">{question[1]}</div>
              )}
            </button>
            <button
              className="hover:opacity-75"
              onClick={() =>
                store.dispatch({
                  type: "system/answerWrong",
                })
              }
            >
              {questionType === 1 ? (
                <img className="h-48 border" src={question[2]} />
              ) : (
                <div className="hover:animate-pulse">{question[2]}</div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


import { useState } from "react";

const quizData = [
  {
    question: "You need to ensure that the data analysts can access the gold layer lakehouse. What should you do?",
    options: {
      A: "Add the DataAnalyst group to the Viewer role for WorkspaceA.",
      B: "Share the lakehouse with the DataAnalysts group and grant the Build reports on the default semantic model permission.",
      C: "Share the lakehouse with the DataAnalysts group and grant the Read all SQL Endpoint data permission.",
      D: "Share the lakehouse with the DataAnalysts group and grant the Read all Apache Spark permission."
    },
    answer: "C"
  }
  // Bạn có thể dán thêm toàn bộ quizData đầy đủ vào đây
];

export default function QuizApp() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (key) => {
    setSelected(key);
    if (key === quizData[current].answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current < quizData.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center' }}>
        <h2>Your score: {score} / {quizData.length}</h2>
      </div>
    );
  }

  const q = quizData[current];

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h2>Question {current + 1}: {q.question}</h2>
      {Object.entries(q.options).map(([key, value]) => (
        <button
          key={key}
          onClick={() => handleAnswer(key)}
          disabled={!!selected}
          style={{
            display: 'block',
            width: '100%',
            marginTop: 10,
            padding: 10,
            background: selected === key ? '#4f46e5' : '#eee',
            color: selected === key ? 'white' : 'black',
            border: 'none',
            cursor: selected ? 'not-allowed' : 'pointer'
          }}
        >
          {key}. {value}
        </button>
      ))}
      {selected && (
        <button onClick={next} style={{ marginTop: 20 }}>
          {current === quizData.length - 1 ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
}

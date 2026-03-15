"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SkillTest {
  skill: string;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correct: number;
  }>;
}

const SKILL_TESTS: Record<string, SkillTest> = {
  "JavaScript": {
    skill: "JavaScript",
    questions: [
      {
        id: 1,
        question: "What is the difference between 'let' and 'var'?",
        options: [
          "No difference",
          "let has block scope, var has function scope",
          "var is newer than let",
          "let is deprecated",
        ],
        correct: 1,
      },
      {
        id: 2,
        question: "What is Promise in JavaScript?",
        options: [
          "A function that returns a value",
          "An object that represents async operation",
          "A type of loop",
          "A deprecated feature",
        ],
        correct: 1,
      },
      {
        id: 3,
        question: "Which of these is a pure function?",
        options: [
          "A function that modifies global variables",
          "A function that performs I/O operations",
          "A function that always returns the same output for same input",
          "A function that uses setTimeout",
        ],
        correct: 2,
      },
    ],
  },
  "React": {
    skill: "React",
    questions: [
      {
        id: 1,
        question: "What is a React Hook?",
        options: [
          "A way to hook components together",
          "A function that hooks into React state and lifecycle features",
          "A deprecated feature",
          "A way to connect to a database",
        ],
        correct: 1,
      },
      {
        id: 2,
        question: "What is the virtual DOM?",
        options: [
          "A fake DOM in memory",
          "An in-memory representation of the real DOM",
          "A deprecated feature",
          "A server-side rendering technique",
        ],
        correct: 1,
      },
      {
        id: 3,
        question: "When should you use useEffect?",
        options: [
          "For rendering components",
          "For side effects that should run after render",
          "For styling components",
          "For routing",
        ],
        correct: 1,
      },
    ],
  },
};

export default function SkillTestPage({
  params,
}: {
  params: { skill: string };
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const skillName = decodeURIComponent(params.skill);
  const test = SKILL_TESTS[skillName];

  if (!test) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Skill Test Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The skill test for "{skillName}" is not available.</p>
          <Button
            onClick={() => router.back()}
            className="mt-4"
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (optionIndex === test.questions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setTestCompleted(true);
    }
  };

  const handleSubmitScore = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const percentage = (score / test.questions.length) * 100;

      const response = await fetch("http://localhost:8000/api/profiles/tests/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          skill: skillName,
          score: percentage,
        }),
      });

      if (response.ok) {
        setTimeout(() => {
          router.push("/freelancer/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting score:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl">{skillName} Skill Test</CardTitle>
            <CardDescription className="text-blue-100">
              Test your knowledge and get verified
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                This test contains {test.questions.length} questions. You need to
                answer at least 70% correctly to pass.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-900">Test Details:</p>
                <ul className="mt-2 space-y-1 text-blue-800">
                  <li>• {test.questions.length} Multiple Choice Questions</li>
                  <li>• 70% pass score required</li>
                  <li>• Immediate results</li>
                  <li>• Badge upon completion</li>
                </ul>
              </div>
              <Button
                onClick={() => setTestStarted(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg"
              >
                Start Test
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (testCompleted) {
    const percentage = (score / test.questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className={`${passed ? "bg-green-600" : "bg-red-600"} text-white`}>
            <CardTitle className="text-2xl">
              {passed ? "🎉 Test Passed!" : "❌ Test Failed"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-gray-900">
                {percentage.toFixed(1)}%
              </div>
              <p className="text-gray-700">
                You got {score} out of {test.questions.length} questions correct
              </p>
              {passed && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-900 font-semibold">
                    ✓ {skillName} skill badge unlocked!
                  </p>
                </div>
              )}
              <Button
                onClick={handleSubmitScore}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg"
              >
                {loading ? "Saving..." : "Continue to Dashboard"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = test.questions[currentQuestion];
  const answered = answers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{skillName} Test</CardTitle>
              <CardDescription>
                Question {currentQuestion + 1} of {test.questions.length}
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Score: {score}</p>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${((currentQuestion + 1) / test.questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-900">
              {question.question}
            </p>

            <div className="space-y-2">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-3 text-left rounded-lg border-2 transition ${
                    answers[currentQuestion] === index
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <input
                    type="radio"
                    checked={answers[currentQuestion] === index}
                    onChange={() => {}}
                    className="mr-3"
                  />
                  {option}
                </button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!answered}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
            >
              {currentQuestion === test.questions.length - 1
                ? "Finish Test"
                : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

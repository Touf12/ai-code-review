import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Prism from "prismjs"; // Correct import
import "prismjs/components/prism-javascript"; // Load JavaScript syntax
import "prismjs/components/prism-python"; // Load Python syntax
import "prismjs/components/prism-css"; // Load CSS syntax
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";
import React from "react";
function App() {
  const [code, setCode] = useState(`def sum():  \n  return a + b \n`);
  const [review, setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ai/get-review`,
        {
          prompt: code,
        }
      );

      setReview(response.data.message);
    } catch (error) {
      console.error(
        "Error fetching review:",
        error.response?.data || error.message
      );
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6">
      {/* Header */}
      <header className="w-full text-center py-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg rounded-lg">
        AI Code Reviewer 🤖
      </header>
      <div className="flex flex-row gap-6 w-full max-w-6xl">
        <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          {/* File Upload Button */}
          <input
            type="file"
            accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java"
            onChange={handleFileUpload}
            className="mb-4 text-sm text-gray-400 cursor-pointer bg-gray-700 p-2 rounded-lg"
          />

          {/* Code Editor */}
          <div className="border border-gray-600 rounded-lg p-4 bg-gray-900">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{ fontFamily: "Fira Code, monospace", fontSize: 16 }}
            />
          </div>

          <button
            onClick={reviewCode}
            className="w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            Review Code 🧑🏻‍💻
          </button>
        </div>
        <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              pre: ({ children }) => (
                <pre className="bg-gray-900 p-4 rounded-md">{children}</pre>
              ),
              code: ({ children }) => (
                <code className="text-blue-400">{children}</code>
              ),
            }}
          >
            {review}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");

  const handleAnalyze = async () => {
    const response = await fetch("/api/analyzeResume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText }),
    });

    const data = await response.json();
    setAnalysis(data.analysis || "Error analyzing resume.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Resume Analyzer</h1>
      <textarea
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={10}
        cols={50}
        style={{ width: "100%", height: "150px", padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button onClick={handleAnalyze} style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}>
        Analyze Resume
      </button>
      <h2>Analysis:</h2>
      <p>{analysis}</p>
    </div>
  );
}

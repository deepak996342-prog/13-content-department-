import { useState, useRef, useEffect } from "react";

const DEPARTMENTS = [
  { id: "marketing", name: "Marketing Research", icon: "📡", color: "#6366f1", desc: "Finding viral content ideas" },
  { id: "trend", name: "Trend Analysis", icon: "📈", color: "#8b5cf6", desc: "Filtering by virality potential" },
  { id: "strategy", name: "Content Strategy", icon: "🎯", color: "#a855f7", desc: "Selecting top angles" },
  { id: "shortlist", name: "Idea Shortlisting", icon: "💡", color: "#ec4899", desc: "Picking the best idea" },
  { id: "script", name: "Script Writing", icon: "✍️", color: "#f43f5e", desc: "Writing high-retention script" },
  { id: "hook", name: "Hook Specialist", icon: "🪝", color: "#ef4444", desc: "Optimizing first 3 seconds" },
  { id: "copy", name: "Copy Team", icon: "🖊️", color: "#f97316", desc: "Punchy, viral language" },
  { id: "packaging", name: "Packaging Team", icon: "🎨", color: "#f59e0b", desc: "Thumbnail + title + visuals" },
  { id: "seo", name: "SEO Team", icon: "🔍", color: "#84cc16", desc: "Hashtags + keywords" },
  { id: "publishing", name: "Publishing Team", icon: "🚀", color: "#22c55e", desc: "Best time + posting strategy" },
  { id: "performance", name: "Performance Team", icon: "📊", color: "#10b981", desc: "Predicting engagement" },
  { id: "feedback", name: "Feedback Team", icon: "🔄", color: "#14b8a6", desc: "Virality improvements" },
  { id: "operations", name: "Operations Team", icon: "⚙️", color: "#06b6d4", desc: "Compiling CEO report" },
];

const SYSTEM_PROMPT = `You are a multi-department AI content company. You will simulate 13 departments working sequentially, each building on the previous department's output.

The niche is: personal finance, taxation, business, business politics, corporate laws (Indian/Global context).

Each department must output ONLY their section. Format each department output clearly with the department name as header.

Work through these departments in order:
1. MARKETING RESEARCH TEAM - Find 10 viral content ideas
2. TREND ANALYSIS TEAM - Filter ideas by virality, relatability, hook strength. Score each /10
3. CONTENT STRATEGY TEAM - Select top 3 ideas, define angle + target audience for each
4. IDEA SHORTLISTING TEAM - Pick 1 best idea with clear reasoning
5. SCRIPT WRITING TEAM - Full reel script: Hook → Build → Re-hook → Climax → CTA (with timestamps)
6. HOOK SPECIALIST - Rewrite and optimize first 3 seconds in 3 variations
7. COPY TEAM - Refine script language to be simple, punchy, viral. Show before/after
8. PACKAGING TEAM - Thumbnail concept + title + opening visual + color scheme
9. SEO TEAM - 20 hashtags + 10 keywords + SEO title
10. PUBLISHING TEAM - Best posting times + platform strategy + frequency
11. PERFORMANCE TEAM - Predict: views range, saves %, share %, comment topics, virality score /100
12. FEEDBACK TEAM - 5 specific improvements to maximize virality
13. OPERATIONS TEAM - Final CEO report compiling everything into a clean structured summary

Format each section with === DEPARTMENT NAME === as the header.
Be specific, creative, and actionable. Make this genuinely useful content.`;

function TypewriterText({ text, speed = 8 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const iRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    iRef.current = 0;
    if (!text) return;
    const interval = setInterval(() => {
      if (iRef.current < text.length) {
        setDisplayed(text.slice(0, iRef.current + 1));
        iRef.current++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && <span style={{ animation: "blink 1s infinite", color: "#6366f1" }}>▋</span>}
    </span>
  );
}

function DeptCard({ dept, status, output, isActive }) {
  const statusColors = {
    idle: "#374151",
    active: dept.color,
    done: "#10b981",
    waiting: "#4b5563",
  };

  const statusLabels = {
    idle: "IDLE",
    active: "WORKING",
    done: "DONE",
    waiting: "QUEUED",
  };

  return (
    <div style={{
      background: isActive
        ? `linear-gradient(135deg, #0f172a 0%, ${dept.color}22 100%)`
        : status === "done"
        ? "linear-gradient(135deg, #0f172a 0%, #10b98111 100%)"
        : "#0f172a",
      border: `1px solid ${isActive ? dept.color : status === "done" ? "#10b98144" : "#1e293b"}`,
      borderRadius: 12,
      padding: "14px 16px",
      transition: "all 0.4s ease",
      position: "relative",
      overflow: "hidden",
      boxShadow: isActive ? `0 0 24px ${dept.color}44` : "none",
    }}>
      {isActive && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${dept.color}, transparent)`,
          animation: "scan 1.5s linear infinite",
        }} />
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>{dept.icon}</span>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: "#e2e8f0", letterSpacing: 0.5 }}>
              {dept.name.toUpperCase()}
            </div>
            <div style={{ fontSize: 10, color: "#64748b", marginTop: 1 }}>{dept.desc}</div>
          </div>
        </div>
        <div style={{
          padding: "3px 8px",
          borderRadius: 20,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 1,
          fontFamily: "'Space Mono', monospace",
          background: `${statusColors[status]}22`,
          color: statusColors[status],
          border: `1px solid ${statusColors[status]}55`,
        }}>
          {statusLabels[status]}
        </div>
      </div>

      {output && (
        <div style={{
          marginTop: 10,
          padding: "10px 12px",
          background: "#020617",
          borderRadius: 8,
          border: "1px solid #1e293b",
          maxHeight: 140,
          overflowY: "auto",
          fontSize: 11,
          lineHeight: 1.7,
          color: "#94a3b8",
          fontFamily: "'Space Mono', monospace",
          whiteSpace: "pre-wrap",
        }}>
          {isActive ? <TypewriterText text={output} speed={4} /> : output}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [topic, setTopic] = useState("");
  const [running, setRunning] = useState(false);
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(DEPARTMENTS.map(d => [d.id, "idle"]))
  );
  const [outputs, setOutputs] = useState({});
  const [currentDept, setCurrentDept] = useState(null);
  const [finalReport, setFinalReport] = useState("");
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  function addLog(msg, type = "info") {
    const colors = { info: "#64748b", success: "#10b981", active: "#6366f1", warn: "#f59e0b" };
    setLog(prev => [...prev, { msg, color: colors[type], time: new Date().toLocaleTimeString() }]);
  }

  function parseDeptOutputs(fullText) {
    const deptMap = {
      "MARKETING RESEARCH": "marketing",
      "TREND ANALYSIS": "trend",
      "CONTENT STRATEGY": "strategy",
      "IDEA SHORTLISTING": "shortlist",
      "SCRIPT WRITING": "script",
      "HOOK SPECIALIST": "hook",
      "COPY TEAM": "copy",
      "PACKAGING": "packaging",
      "SEO TEAM": "seo",
      "PUBLISHING": "publishing",
      "PERFORMANCE": "performance",
      "FEEDBACK": "feedback",
      "OPERATIONS": "operations",
    };

    const results = {};
    const parts = fullText.split(/===\s*([^=]+?)\s*===/g);

    for (let i = 1; i < parts.length; i += 2) {
      const header = parts[i].trim().toUpperCase();
      const content = (parts[i + 1] || "").trim();
      for (const [key, deptId] of Object.entries(deptMap)) {
        if (header.includes(key)) {
          results[deptId] = content;
          break;
        }
      }
    }
    return results;
  }

  async function runPipeline() {
    if (!apiKey.trim()) return alert("Enter your Anthropic API key first!");
    setRunning(true);
    setStarted(true);
    setDone(false);
    setFinalReport("");
    setOutputs({});
    setLog([]);
    setStatuses(Object.fromEntries(DEPARTMENTS.map(d => [d.id, "waiting"])));

    addLog("🏢 AI Company OS initializing...", "active");
    addLog("📋 Task assigned to all 13 departments", "info");

    const userMessage = topic.trim()
      ? `Create content about: ${topic}\nNiche: personal finance, taxation, business, business politics, corporate laws`
      : `Pick the best viral topic from: personal finance, taxation, business, business politics, corporate laws`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 8000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
          stream: true,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "API error");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";

      // Track which dept is current based on streamed text
      let activeDeptIdx = 0;
      setCurrentDept(DEPARTMENTS[0].id);
      setStatuses(prev => ({ ...prev, [DEPARTMENTS[0].id]: "active" }));
      addLog(`▶ ${DEPARTMENTS[0].name} team started`, "active");

      while (true) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === "content_block_delta" && parsed.delta?.type === "text_delta") {
              fullText += parsed.delta.text;

              // Detect department transitions
              const deptMatch = fullText.match(/===\s*([^=]+?)\s*===/g);
              if (deptMatch) {
                const count = deptMatch.length;
                if (count > activeDeptIdx + 1 && activeDeptIdx + 1 < DEPARTMENTS.length) {
                  // Mark current as done, move to next
                  const prevDept = DEPARTMENTS[activeDeptIdx];
                  setStatuses(prev => ({ ...prev, [prevDept.id]: "done" }));
                  addLog(`✅ ${prevDept.name} complete`, "success");
                  activeDeptIdx++;
                  const nextDept = DEPARTMENTS[activeDeptIdx];
                  setCurrentDept(nextDept.id);
                  setStatuses(prev => ({ ...prev, [nextDept.id]: "active" }));
                  addLog(`▶ ${nextDept.name} team started`, "active");
                }
              }

              // Update outputs in real-time
              const parsed2 = parseDeptOutputs(fullText);
              setOutputs(parsed2);
              // Update the active dept with streaming text
              if (DEPARTMENTS[activeDeptIdx]) {
                const sections = fullText.split(/===\s*[^=]+?\s*===/g);
                const lastSection = sections[sections.length - 1]?.trim();
                if (lastSection) {
                  setOutputs(prev => ({ ...prev, [DEPARTMENTS[activeDeptIdx].id]: lastSection }));
                }
              }
            }
          } catch {}
        }
      }

      // Mark last dept done
      DEPARTMENTS.forEach(d => {
        setStatuses(prev => ({ ...prev, [d.id]: "done" }));
      });

      const finalOutputs = parseDeptOutputs(fullText);
      setOutputs(finalOutputs);
      setFinalReport(finalOutputs["operations"] || fullText.slice(-800));
      setCurrentDept(null);
      setDone(true);
      addLog("🎯 All departments complete! CEO report ready.", "success");
    } catch (err) {
      addLog(`❌ Error: ${err.message}`, "warn");
      setStatuses(Object.fromEntries(DEPARTMENTS.map(d => [d.id, "idle"])));
    }

    setRunning(false);
  }

  function reset() {
    setStarted(false);
    setDone(false);
    setOutputs({});
    setLog([]);
    setFinalReport("");
    setCurrentDept(null);
    setStatuses(Object.fromEntries(DEPARTMENTS.map(d => [d.id, "idle"])));
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      fontFamily: "'Space Mono', monospace",
      color: "#e2e8f0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0f172a; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px #6366f144; } 50% { box-shadow: 0 0 40px #6366f188; } }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1e293b",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#0a0f1e",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>🏢</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, letterSpacing: -0.5, color: "#f1f5f9" }}>
              AI Company OS
            </div>
            <div style={{ fontSize: 9, color: "#475569", letterSpacing: 2 }}>13-DEPARTMENT CONTENT ENGINE</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: running ? "#10b981" : done ? "#6366f1" : "#374151",
            position: "relative",
          }}>
            {running && <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#10b981",
              animation: "pulse-ring 1s ease-out infinite",
            }} />}
          </div>
          <span style={{ fontSize: 10, color: "#64748b" }}>
            {running ? "PIPELINE ACTIVE" : done ? "COMPLETE" : "STANDBY"}
          </span>
        </div>
      </div>

      <div style={{ padding: "20px 24px", maxWidth: 1400, margin: "0 auto" }}>

        {/* Setup panel */}
        {!started && (
          <div style={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: 16,
            padding: 24,
            marginBottom: 20,
            animation: "fadeIn 0.4s ease",
          }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
              🚀 Launch Content Pipeline
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 20 }}>
              13 AI departments will work in sequence to produce a complete viral content plan
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 10, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  ANTHROPIC API KEY
                </label>
                <input
                  type="password"
                  placeholder="sk-ant-api03-..."
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px",
                    background: "#020617", border: "1px solid #1e293b",
                    borderRadius: 8, color: "#e2e8f0", fontSize: 12,
                    fontFamily: "'Space Mono', monospace",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 10, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  SPECIFIC TOPIC (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. How to save tax legally in India"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px",
                    background: "#020617", border: "1px solid #1e293b",
                    borderRadius: 8, color: "#e2e8f0", fontSize: 12,
                    fontFamily: "'Space Mono', monospace",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <button
              onClick={runPipeline}
              disabled={!apiKey.trim()}
              style={{
                padding: "12px 28px",
                background: apiKey.trim() ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#1e293b",
                border: "none", borderRadius: 8, color: "#fff",
                fontSize: 13, fontWeight: 700, cursor: apiKey.trim() ? "pointer" : "not-allowed",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: 1,
              }}>
              ▶ LAUNCH ALL DEPARTMENTS
            </button>
          </div>
        )}

        {/* Running controls */}
        {started && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 16, padding: "12px 16px",
            background: "#0f172a", borderRadius: 10, border: "1px solid #1e293b",
          }}>
            <div style={{ fontSize: 11, color: "#64748b" }}>
              {running
                ? `⚙️ Active: ${DEPARTMENTS.find(d => d.id === currentDept)?.name || "..."}`
                : done ? "✅ All 13 departments complete" : ""}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {done && (
                <button onClick={reset} style={{
                  padding: "6px 16px", background: "#1e293b", border: "1px solid #334155",
                  borderRadius: 6, color: "#94a3b8", fontSize: 11, cursor: "pointer",
                  fontFamily: "'Space Mono', monospace",
                }}>↺ RESET</button>
              )}
              {!running && !done && (
                <button onClick={runPipeline} style={{
                  padding: "6px 16px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none", borderRadius: 6, color: "#fff", fontSize: 11, cursor: "pointer",
                  fontFamily: "'Space Mono', monospace",
                }}>▶ RUN</button>
              )}
            </div>
          </div>
        )}

        {started && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>

            {/* Department Grid */}
            <div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 10,
              }}>
                {DEPARTMENTS.map(dept => (
                  <DeptCard
                    key={dept.id}
                    dept={dept}
                    status={statuses[dept.id]}
                    output={outputs[dept.id]}
                    isActive={currentDept === dept.id}
                  />
                ))}
              </div>

              {/* Final CEO Report */}
              {done && finalReport && (
                <div style={{
                  marginTop: 16,
                  background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
                  border: "1px solid #6366f144",
                  borderRadius: 12,
                  padding: 20,
                  animation: "glow 3s ease infinite",
                }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
                  }}>
                    <span style={{ fontSize: 20 }}>👔</span>
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 800, color: "#a5b4fc" }}>
                        CEO FINAL REPORT
                      </div>
                      <div style={{ fontSize: 10, color: "#64748b" }}>Compiled by Operations Team — Ready for approval</div>
                    </div>
                  </div>
                  <div style={{
                    background: "#020617",
                    borderRadius: 8, padding: 16,
                    fontSize: 12, lineHeight: 1.8,
                    color: "#cbd5e1",
                    whiteSpace: "pre-wrap",
                    fontFamily: "'Space Mono', monospace",
                    maxHeight: 400, overflowY: "auto",
                  }}>
                    {finalReport}
                  </div>
                </div>
              )}
            </div>

            {/* Activity Log sidebar */}
            <div style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: 12,
              padding: 16,
              height: "fit-content",
              position: "sticky",
              top: 80,
            }}>
              <div style={{
                fontSize: 10, letterSpacing: 2, color: "#475569",
                marginBottom: 12, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>⚡</span> ACTIVITY LOG
              </div>
              <div
                ref={logRef}
                style={{
                  maxHeight: 500, overflowY: "auto",
                  display: "flex", flexDirection: "column", gap: 6,
                }}>
                {log.length === 0 && (
                  <div style={{ fontSize: 11, color: "#334155", textAlign: "center", padding: "20px 0" }}>
                    Waiting for pipeline...
                  </div>
                )}
                {log.map((entry, i) => (
                  <div key={i} style={{
                    padding: "6px 10px",
                    background: "#020617",
                    borderRadius: 6,
                    borderLeft: `2px solid ${entry.color}`,
                    animation: "fadeIn 0.3s ease",
                  }}>
                    <div style={{ fontSize: 9, color: "#334155", marginBottom: 2 }}>{entry.time}</div>
                    <div style={{ fontSize: 11, color: entry.color, lineHeight: 1.4 }}>{entry.msg}</div>
                  </div>
                ))}
              </div>

              {/* Dept status mini list */}
              <div style={{ marginTop: 16, borderTop: "1px solid #1e293b", paddingTop: 12 }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 8 }}>DEPT STATUS</div>
                {DEPARTMENTS.map(dept => (
                  <div key={dept.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "4px 0", borderBottom: "1px solid #0f172a",
                  }}>
                    <div style={{ fontSize: 10, color: "#475569" }}>{dept.icon} {dept.name}</div>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: statuses[dept.id] === "done" ? "#10b981"
                        : statuses[dept.id] === "active" ? dept.color
                        : statuses[dept.id] === "waiting" ? "#334155"
                        : "#1e293b",
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

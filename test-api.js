// test-api.js (ESM version)
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:4000/api";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@sohailacademy.com";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin123";

async function runTests() {
  console.log("🧪 Starting Cybersecurity Calendar API tests...");

  try {
    // 1️⃣ Ping test
    const ping = await axios.get(BASE_URL.replace("/api", ""));
    console.log("✅ Ping test:", ping.data);

    // 2️⃣ Login
    const login = await axios.post(`${BASE_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASS,
    });
    const token = login.data.token;
    console.log("✅ Login successful, token obtained");

    const headers = { Authorization: `Bearer ${token}` };

    // 3️⃣ Create session
    const newSession = {
      title: "Test Session - API Automation",
      description: "Created by automated test script",
      topic: "SOC",
      date: new Date(Date.now() + 60 * 60 * 1000),
      durationMinutes: 60,
      meetingLink: "https://meet.testsession.com",
      trainer: "Automation Bot",
    };

    const createRes = await axios.post(`${BASE_URL}/sessions`, newSession, { headers });
    console.log("✅ Session created:", createRes.data.title);
    const sessionId = createRes.data._id;

    // 4️⃣ Fetch sessions
    const allSessions = await axios.get(`${BASE_URL}/sessions`);
    console.log("✅ Sessions fetched:", allSessions.data.length);

    // 5️⃣ Update session
    const updateRes = await axios.put(
      `${BASE_URL}/sessions/${sessionId}`,
      { trainer: "Updated Trainer" },
      { headers }
    );
    console.log("✅ Session updated:", updateRes.data.trainer);

    // 6️⃣ Send notification
    const notifyRes = await axios.post(
      `${BASE_URL}/sessions/${sessionId}/notify`,
      {
        emails: ["student@example.com"],
        message: "Test notification message",
      },
      { headers }
    );
    console.log("✅ Notification sent:", notifyRes.data.sent);

    // 7️⃣ Delete session
    await axios.delete(`${BASE_URL}/sessions/${sessionId}`, { headers });
    console.log("✅ Session deleted successfully");

    console.log("\n🎉 ALL API TESTS PASSED SUCCESSFULLY!");
  } catch (err) {
    console.error("\n❌ Test failed:");
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error(err.message);
    }
    process.exit(1);
  }
}

runTests();

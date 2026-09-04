import { useState } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext.jsx";
import { ProgressProvider } from "./context/ProgressContext.jsx";
import Header from "./components/Header.jsx";
import SettingsPanel from "./components/SettingsPanel.jsx";
import Onboarding from "./components/Onboarding.jsx";
import Login from "./components/Login.jsx";
import XPToast from "./components/XPToast.jsx";
import BadgeUnlockModal from "./components/BadgeUnlockModal.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Learn from "./pages/Learn.jsx";
import Missions from "./pages/Missions.jsx";
import Lab from "./pages/Lab.jsx";
import Roadmap from "./pages/Roadmap.jsx";
import Badges from "./pages/Badges.jsx";
import AITeacher from "./pages/AITeacher.jsx";
import Parent from "./pages/Parent.jsx";
import { isDeviceKnown } from "./utils/storage.js";

function Shell() {
  const { profile } = useLanguage();
  const [route, setRoute] = useState("home");
  const [openLessonId, setOpenLessonId] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  // Once a student has logged out, showAsNewStudent lets them fall through
  // to the full onboarding wizard instead of the quick login screen.
  const [showAsNewStudent, setShowAsNewStudent] = useState(false);

  if (!profile.onboarded) {
    if (isDeviceKnown() && !showAsNewStudent) {
      return <Login onFinish={() => setRoute("home")} onNewStudent={() => setShowAsNewStudent(true)} />;
    }
    return <Onboarding onFinish={() => setRoute("home")} />;
  }

  const openLesson = (id) => {
    setOpenLessonId(id);
    setRoute("learn");
  };

  const navigate = (key) => {
    setRoute(key);
    if (key !== "learn") setOpenLessonId(null);
  };

  return (
    <div className="app-shell">
      <Header route={route} onNavigate={navigate} onOpenSettings={() => setSettingsOpen(true)} />
      <main className="app-main container">
        {route === "home" && <Dashboard onNavigate={navigate} onOpenLesson={openLesson} />}
        {route === "learn" && (
          <Learn openLessonId={openLessonId} onOpenLesson={setOpenLessonId} onCloseLesson={() => setOpenLessonId(null)} />
        )}
        {route === "missions" && <Missions />}
        {route === "lab" && <Lab />}
        {route === "roadmap" && <Roadmap onOpenLesson={openLesson} />}
        {route === "badges" && <Badges />}
        {route === "teacher" && <AITeacher />}
        {route === "parent" && <Parent />}
      </main>

      {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
      <XPToast />
      <BadgeUnlockModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ProgressProvider>
        <Shell />
      </ProgressProvider>
    </LanguageProvider>
  );
}

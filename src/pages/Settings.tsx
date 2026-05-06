// Settings Page
import { useState, useEffect } from "react";
import { Header, Footer } from "../components";
import { useUser } from "../contexts/UserContext";
import "../styles/pages.css";

export const Settings = () => {
  const { userName: globalUserName, setUserName, avatarUrl: globalAvatarUrl, setAvatarUrl } = useUser();
  const [settings, setSettings] = useState({
    appName: "Admin Dashboard",
    email: "admin@example.com",
    theme: "light",
    notifications: true,
    userName: globalUserName,
    avatarUrl: globalAvatarUrl,
  });

  useEffect(() => {
    // Only update local state if it differs from the global state on load/sync
    setSettings((prev) => {
      if (prev.userName !== globalUserName || prev.avatarUrl !== globalAvatarUrl) {
        return {
          ...prev,
          userName: globalUserName,
          avatarUrl: globalAvatarUrl,
        };
      }
      return prev;
    });
  }, [globalUserName, globalAvatarUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setSettings({
      ...settings,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSave = () => {
    setUserName(settings.userName);
    setAvatarUrl(settings.avatarUrl);
    alert("Settings saved successfully!");
    console.log("Saved settings:", settings);
  };

  return (
    <div className="page-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <h1>Settings</h1>
          <p className="page-subtitle">Manage your application settings</p>
        </div>

        <div className="settings-container">
          <div className="card settings-card">
            <h2>General Settings</h2>

            <div className="form-group">
              <label htmlFor="appName">Application Name</label>
              <input
                type="text"
                id="appName"
                name="appName"
                value={settings.appName}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="userName">Your Name</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={settings.userName}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatarUrl">Profile Picture URL</label>
              <input
                type="text"
                id="avatarUrl"
                name="avatarUrl"
                value={settings.avatarUrl}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="theme">Theme</label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="form-input"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              <label htmlFor="notifications">Enable Notifications</label>
            </div>

            <button className="btn btn-primary btn-large" onClick={handleSave}>
              Save Settings
            </button>
          </div>

          <div className="card settings-card">
            <h2>Information</h2>
            <div className="info-section">
              <p>
                <strong>Version:</strong> 1.0.0
              </p>
              <p>
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> Active
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

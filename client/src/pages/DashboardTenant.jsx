import { useState, useEffect } from "react";
import { Bell, CreditCard, Calendar, Droplets, Shield, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardTenant = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const rent = 1200;
  const paid = 800;
  const balance = rent - paid;
  const utilities = { water: 50, garbage: 20, security: 30 };

  const [notifications, setNotifications] = useState([]);
  const [reminder, setReminder] = useState("");

  // Load notifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tenantNotifications");
    if (saved) setNotifications(JSON.parse(saved));
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("tenantNotifications", JSON.stringify(notifications));
  }, [notifications]);

  // Simulate rent payment
  const handlePayRent = () => {
    const newNote = {
      id: Date.now(),
      message: `💰 Rent payment of $${balance} confirmed.`,
      date: new Date().toLocaleDateString(),
      read: false,
    };
    setNotifications((prev) => [newNote, ...prev]);
    alert("Payment successful!");
  };

  // Add a scheduled reminder
  const handleSchedule = () => {
    if (!reminder.trim()) return;
    const newNote = {
      id: Date.now(),
      message: `📅 Reminder scheduled: ${reminder}`,
      date: new Date().toLocaleDateString(),
      read: false,
    };
    setNotifications((prev) => [newNote, ...prev]);
    setReminder("");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tenant Dashboard</h1>

        {/* Notification Bell */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/notifications")}
        >
          <Bell
            className={`w-6 h-6 transition ${
              unreadCount > 0
                ? "text-blue-500 animate-pulse"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <p className="mb-6 text-lg">
        Welcome back, <span className="font-semibold">{user?.email}</span>
      </p>

      {/* Rent Overview */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="text-blue-500" /> Rent Overview
        </h2>
        <ul className="space-y-2">
          <li>Rent Due: <span className="font-medium text-blue-500">${rent}</span></li>
          <li>Amount Paid: <span className="font-medium text-green-500">${paid}</span></li>
          <li>Balance: <span className="font-medium text-red-500">${balance}</span></li>
        </ul>
        <button
          onClick={handlePayRent}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          Pay Rent
        </button>
      </div>

      {/* Utilities */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Droplets className="text-sky-500" /> Monthly Utilities
        </h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><Droplets size={18} /> Water: ${utilities.water}</li>
          <li className="flex items-center gap-2"><Trash2 size={18} /> Garbage: ${utilities.garbage}</li>
          <li className="flex items-center gap-2"><Shield size={18} /> Security: ${utilities.security}</li>
        </ul>
      </div>

      {/* Notifications Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="text-amber-500" /> Schedule Notifications
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            placeholder="Enter reminder (e.g., Pay water bill)"
            className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          />
          <button
            onClick={handleSchedule}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition"
          >
            Schedule
          </button>
        </div>

        {/* Recent Notifications */}
        {notifications.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {notifications.slice(0, 3).map((note) => (
              <li
                key={note.id}
                className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
              >
                <span>{note.message}</span>
                <span className="text-xs text-gray-500">{note.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notifications yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardTenant;

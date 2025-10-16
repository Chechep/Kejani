import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Trash2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tenantNotifications");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Mark all as read once opened
      const updated = parsed.map((n) => ({ ...n, read: true }));
      setNotifications(updated);
      localStorage.setItem("tenantNotifications", JSON.stringify(updated));
    }
  }, []);
  

  // Update localStorage when notifications change
  useEffect(() => {
    localStorage.setItem("tenantNotifications", JSON.stringify(notifications));
  }, [notifications]);

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkAllRead = () => {
    const marked = notifications.map((n) => ({
      ...n,
      message: `✅ ${n.message}`,
    }));
    setNotifications(marked);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-100 p-6 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/tenant"
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="text-blue-500" /> Notifications
          </h1>
        </div>

        {/* Action Buttons */}
        {notifications.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
            >
              <CheckCircle2 size={16} /> Mark All Read
            </button>
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
            >
              <Trash2 size={16} /> Clear All
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">No new notifications.</p>
        ) : (
          notifications.map((note) => (
            <div
              key={note.id}
              className="group bg-white dark:bg-gray-900 shadow-md rounded-xl p-4 hover:shadow-lg transition transform hover:-translate-y-1 flex justify-between items-start relative"
            >
              <div>
                <p className="text-sm sm:text-base">{note.message}</p>
                <span className="text-xs text-gray-500">{note.date}</span>
              </div>

              {/* Delete Icon (appears on hover) */}
              <button
                onClick={() => handleDelete(note.id)}
                className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                title="Delete notification"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;

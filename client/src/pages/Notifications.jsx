import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Trash2, CheckCircle2, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "unread", "read"

  // Load notifications from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tenantNotifications");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Mark all as read once opened (optional - you can remove this if you want to keep unread state)
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
      read: true,
    }));
    setNotifications(marked);
  };

  const handleMarkAsUnread = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
  };

  // Filter notifications based on current filter
  const filteredNotifications = notifications.filter((note) => {
    switch (filter) {
      case "unread":
        return !note.read;
      case "read":
        return note.read;
      default:
        return true;
    }
  });

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

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
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bell className="text-blue-500" /> Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
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

      {/* Filter Tabs */}
      {notifications.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Filter size={18} className="text-gray-500" />
            <div className="flex gap-2">
              {[
                { key: "all", label: "All", count: notifications.length },
                { key: "unread", label: "Unread", count: unreadCount },
                { key: "read", label: "Read", count: notifications.length - unreadCount },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === tab.key
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {tab.label} {tab.count > 0 && `(${tab.count})`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              {notifications.length === 0
                ? "No notifications yet"
                : `No ${filter === "all" ? "" : filter} notifications`}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {notifications.length === 0
                ? "You'll see important updates here"
                : "Try changing your filter settings"}
            </p>
          </div>
        ) : (
          filteredNotifications.map((note) => (
            <div
              key={note.id}
              className={`group bg-white dark:bg-gray-900 shadow-md rounded-xl p-4 hover:shadow-lg transition transform hover:-translate-y-1 flex justify-between items-start relative border-l-4 ${
                note.read
                  ? "border-l-gray-300 dark:border-l-gray-600"
                  : "border-l-blue-500"
              }`}
            >
              <div className="flex-1">
                <p className="text-sm sm:text-base mb-2">{note.message}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{note.date}</span>
                  {!note.read && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      New
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons (appear on hover) */}
              <div className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 flex gap-2 transition">
                {note.read ? (
                  <button
                    onClick={() => handleMarkAsUnread(note.id)}
                    className="p-1.5 text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900 rounded"
                    title="Mark as unread"
                  >
                    <Bell size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleMarkAllRead([note.id])}
                    className="p-1.5 text-green-500 hover:text-green-600 bg-green-50 dark:bg-green-900 rounded"
                    title="Mark as read"
                  >
                    <CheckCircle2 size={14} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(note.id)}
                  className="p-1.5 text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900 rounded"
                  title="Delete notification"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats Footer */}
      {notifications.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Showing {filteredNotifications.length} of {notifications.length}{" "}
            notification{notifications.length !== 1 ? "s" : ""}
            {unreadCount > 0 && ` • ${unreadCount} unread`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
import { useState, useEffect } from "react";
import { 
  CreditCard, 
  Droplets, 
  Shield, 
  Trash2, 
  MessageCircle, 
  Bell, 
  Calendar, 
  X, 
  Search,
  UserPlus,
  Users,
  Send
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardTenant = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const rent = 1200;
  const [paymentAmount, setPaymentAmount] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [nextPaymentDate, setNextPaymentDate] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard"); // "dashboard", "search", "invites"
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgents] = useState([]);
  const [invites, setInvites] = useState([]);

  const utilities = { 
    water: { amount: 50, checked: false },
    garbage: { amount: 20, checked: false },
    security: { amount: 30, checked: false }
  };

  const [selectedUtilities, setSelectedUtilities] = useState(utilities);

  // Mock agents data
  const mockAgents = [
    { id: 1, name: "John Smith", company: "Prime Properties", email: "john@primeproperties.com", phone: "+254712345678", rating: 4.8, properties: 24 },
    { id: 2, name: "Sarah Johnson", company: "Elite Homes", email: "sarah@elitehomes.com", phone: "+254723456789", rating: 4.9, properties: 18 },
    { id: 3, name: "Mike Chen", company: "Urban Living", email: "mike@urbanliving.com", phone: "+254734567890", rating: 4.7, properties: 32 },
  ];

  // Mock invites data
  const mockInvites = [
    { id: 1, from: "David Kimani", property: "Golf Heights - Unit 101", date: "2024-01-15", status: "pending" },
    { id: 2, from: "Sarah Johnson", property: "Sunset Villas - Villa B", date: "2024-01-10", status: "accepted" },
  ];

  // Calculate next payment date
  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 5);
    setNextPaymentDate(nextMonth.toLocaleDateString());
    setAgents(mockAgents);
    setInvites(mockInvites);
  }, []);

  const calculateTotal = () => {
    let total = parseInt(paymentAmount) || 0;
    Object.values(selectedUtilities).forEach(utility => {
      if (utility.checked) total += utility.amount;
    });
    return total;
  };

  const handlePayment = () => {
    if (!paymentAmount || isNaN(paymentAmount)) {
      alert("Please enter a valid payment amount");
      return;
    }
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }
    
    const total = calculateTotal();
    alert(`Payment of $${total} processed via ${selectedPaymentMethod}`);
    setShowPaymentModal(false);
    setPaymentAmount("");
    setSelectedUtilities(utilities);
    setSelectedPaymentMethod("");
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulate agent response
    setTimeout(() => {
      const agentMessage = {
        id: Date.now() + 1,
        text: "Thank you for your message. Our agent will get back to you shortly.",
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleSearchAgents = () => {
    if (!searchQuery.trim()) {
      setAgents(mockAgents);
      return;
    }
    
    const filtered = mockAgents.filter(agent =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAgents(filtered);
  };

  const sendInviteRequest = (agentId) => {
    const agent = mockAgents.find(a => a.id === agentId);
    alert(`Invite request sent to ${agent.name}`);
    // In real app, this would send an API request
  };

  const handleInviteResponse = (inviteId, accept) => {
    const action = accept ? "accepted" : "declined";
    alert(`Invite ${action}`);
    // In real app, this would update the invite status via API
    setInvites(prev => prev.filter(invite => invite.id !== inviteId));
  };

  // Filter utilities based on selection
  const handleUtilityToggle = (utility) => {
    setSelectedUtilities(prev => ({
      ...prev,
      [utility]: {
        ...prev[utility],
        checked: !prev[utility].checked
      }
    }));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/notifications")}
            className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >
            <Bell className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowChatbot(true)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-500"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      <p className="mb-6 text-lg">
        Welcome back, <span className="font-semibold">{user?.email}</span>
      </p>

      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: "dashboard", label: "Dashboard", icon: CreditCard },
            { key: "search", label: "Find Agents", icon: Search },
            { key: "invites", label: "My Invites", icon: UserPlus }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeSection === key
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Dashboard Section */}
      {activeSection === "dashboard" && (
        <>
          {/* Rent Overview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="text-blue-500" /> Rent Overview
            </h2>
            
            {/* Payment Schedule */}
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Next Payment Due</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {nextPaymentDate}
                  </p>
                </div>
                <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm">
                  Cancel Auto-pay
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Monthly Rent:</span>
                <span className="font-semibold">${rent}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount to Pay:</span>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-32 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-right"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition font-semibold"
            >
              Proceed to Payment
            </button>
          </div>

          {/* Utilities */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Droplets className="text-sky-500" /> Monthly Utilities
            </h2>
            <div className="space-y-3">
              {Object.entries(selectedUtilities).map(([key, utility]) => (
                <div key={key} className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={utility.checked}
                      onChange={() => handleUtilityToggle(key)}
                      className="h-5 w-5 text-blue-600 rounded"
                    />
                    <div className="flex items-center gap-2">
                      {key === 'water' && <Droplets size={18} className="text-sky-500" />}
                      {key === 'garbage' && <Trash2 size={18} className="text-green-500" />}
                      {key === 'security' && <Shield size={18} className="text-purple-500" />}
                      <span className="capitalize">{key}</span>
                    </div>
                  </div>
                  <span className="font-semibold">${utility.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Search Agents Section */}
      {activeSection === "search" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Search className="text-blue-500" /> Find Property Agents
          </h2>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchAgents()}
              placeholder="Search by agent name or company..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            />
            <button
              onClick={handleSearchAgents}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          {/* Agents List */}
          <div className="space-y-4">
            {agents.map(agent => (
              <div key={agent.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{agent.company}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span>📧 {agent.email}</span>
                      <span>📞 {agent.phone}</span>
                      <span>⭐ {agent.rating}/5</span>
                      <span>🏠 {agent.properties} properties</span>
                    </div>
                  </div>
                  <button
                    onClick={() => sendInviteRequest(agent.id)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
                  >
                    <Send size={16} />
                    Send Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invites Section */}
      {activeSection === "invites" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="text-purple-500" /> My Invites
          </h2>
          
          <div className="space-y-4">
            {invites.map(invite => (
              <div key={invite.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Invite from {invite.from}</h3>
                    <p className="text-gray-600 dark:text-gray-300">Property: {invite.property}</p>
                    <p className="text-sm text-gray-500">Sent: {invite.date}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      invite.status === 'accepted' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invite.status}
                    </span>
                  </div>
                  {invite.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleInviteResponse(invite.id, true)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleInviteResponse(invite.id, false)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Complete Payment</h3>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-lg font-semibold text-center mb-2">Total Amount: ${calculateTotal()}</p>
                <p className="text-sm text-gray-500 text-center">Rent: ${paymentAmount} + Utilities: ${calculateTotal() - parseInt(paymentAmount)}</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold">Select Payment Method:</h4>
                
                <button
                  onClick={() => setSelectedPaymentMethod("mpesa")}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 ${
                    selectedPaymentMethod === "mpesa" 
                      ? "border-green-500 bg-green-50 dark:bg-green-900" 
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
                  <span>M-Pesa</span>
                </button>

                <button
                  onClick={() => setSelectedPaymentMethod("visa")}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 ${
                    selectedPaymentMethod === "visa" 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900" 
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">V</div>
                  <span>Visa/MasterCard</span>
                </button>

                <button
                  onClick={() => setSelectedPaymentMethod("airtel")}
                  className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 ${
                    selectedPaymentMethod === "airtel" 
                      ? "border-red-500 bg-red-50 dark:bg-red-900" 
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
                  <span>Airtel Money</span>
                </button>
              </div>

              <button
                onClick={processPayment}
                disabled={!selectedPaymentMethod}
                className={`w-full py-3 rounded-lg font-semibold ${
                  selectedPaymentMethod
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                }`}
              >
                Pay ${calculateTotal()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Modal */}
      {showChatbot && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-50">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600 bg-blue-500 text-white rounded-t-lg">
            <h3 className="font-semibold">Chat with Agent</h3>
            <button 
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="h-64 p-4 overflow-y-auto">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <MessageCircle size={48} className="mx-auto mb-2 text-gray-400" />
                <p>Start a conversation with your agent</p>
              </div>
            ) : (
              <div className="space-y-3">
                {chatMessages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTenant;
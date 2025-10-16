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
  Send,
  Home,
  Filter
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
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgents] = useState([]);
  const [invites, setInvites] = useState([]);
  const [daysUntilPayment, setDaysUntilPayment] = useState(0);

  const utilities = { 
    water: { amount: 50, checked: false },
    garbage: { amount: 20, checked: false },
    security: { amount: 30, checked: false }
  };

  const [selectedUtilities, setSelectedUtilities] = useState(utilities);

  // Mock agents data
  const mockAgents = [
    { 
      id: 1, 
      name: "John Smith", 
      company: "Prime Properties", 
      email: "john@primeproperties.com", 
      phone: "+254712345678", 
      rating: 4.8, 
      properties: 24,
      specialty: "Apartments",
      experience: "5 years"
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      company: "Elite Homes", 
      email: "sarah@elitehomes.com", 
      phone: "+254723456789", 
      rating: 4.9, 
      properties: 18,
      specialty: "Luxury Homes",
      experience: "7 years"
    },
    { 
      id: 3, 
      name: "Mike Chen", 
      company: "Urban Living", 
      email: "mike@urbanliving.com", 
      phone: "+254734567890", 
      rating: 4.7, 
      properties: 32,
      specialty: "Commercial",
      experience: "4 years"
    },
  ];

  // Mock invites data
  const mockInvites = [
    { 
      id: 1, 
      from: "David Kimani", 
      property: "Golf Heights - Unit 101", 
      date: "2024-01-15", 
      status: "pending",
      rent: 1200,
      address: "123 Main Street, Nairobi"
    },
    { 
      id: 2, 
      from: "Sarah Johnson", 
      property: "Sunset Villas - Villa B", 
      date: "2024-01-10", 
      status: "accepted",
      rent: 1500,
      address: "456 Oak Avenue, Nairobi"
    },
  ];

  // Initialize data
  useEffect(() => {
    // Calculate next payment date (5th of next month)
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 5);
    setNextPaymentDate(nextMonth.toLocaleDateString());
    
    // Calculate days until payment
    const diffTime = nextMonth - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilPayment(diffDays);

    // Load mock data
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
    
    // Create payment notification
    const newNotification = {
      id: Date.now(),
      message: `✅ Payment of $${total} processed via ${selectedPaymentMethod}`,
      date: new Date().toLocaleDateString(),
      read: false
    };
    
    // Save to notifications
    const existingNotifications = JSON.parse(localStorage.getItem("tenantNotifications") || "[]");
    localStorage.setItem("tenantNotifications", JSON.stringify([newNotification, ...existingNotifications]));
    
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
        text: "Thank you for your message. Our agent will get back to you shortly. For urgent matters, please call +254700000000.",
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, agentMessage]);
    }, 1500);
  };

  const handleSearchAgents = () => {
    if (!searchQuery.trim()) {
      setAgents(mockAgents);
      return;
    }
    
    const filtered = mockAgents.filter(agent =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAgents(filtered);
  };

  const sendInviteRequest = (agentId) => {
    const agent = mockAgents.find(a => a.id === agentId);
    
    // Create notification for the request
    const newNotification = {
      id: Date.now(),
      message: `📨 Invite request sent to ${agent.name} from ${agent.company}`,
      date: new Date().toLocaleDateString(),
      read: false
    };
    
    const existingNotifications = JSON.parse(localStorage.getItem("tenantNotifications") || "[]");
    localStorage.setItem("tenantNotifications", JSON.stringify([newNotification, ...existingNotifications]));
    
    alert(`Invite request sent to ${agent.name}! They will contact you soon.`);
  };

  const handleInviteResponse = (inviteId, accept) => {
    const invite = invites.find(inv => inv.id === inviteId);
    const action = accept ? "accepted" : "declined";
    
    // Create notification for the response
    const newNotification = {
      id: Date.now(),
      message: accept 
        ? `✅ You accepted invite for ${invite.property}`
        : `❌ You declined invite for ${invite.property}`,
      date: new Date().toLocaleDateString(),
      read: false
    };
    
    const existingNotifications = JSON.parse(localStorage.getItem("tenantNotifications") || "[]");
    localStorage.setItem("tenantNotifications", JSON.stringify([newNotification, ...existingNotifications]));
    
    alert(`Invite ${action} for ${invite.property}`);
    setInvites(prev => prev.filter(invite => invite.id !== inviteId));
  };

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
        <div>
          <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, <span className="font-semibold text-blue-500">{user?.email}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/notifications")}
            className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
          >
            <Bell className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowChatbot(true)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: "dashboard", label: "Dashboard", icon: Home },
            { key: "search", label: "Find Agents", icon: Search },
            { key: "invites", label: "My Invites", icon: UserPlus }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                activeSection === key
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300"
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
              <CreditCard className="text-blue-500" /> Rent & Payment
            </h2>
            
            {/* Payment Schedule */}
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-200">Next Payment Due</p>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    {nextPaymentDate} • {daysUntilPayment} days from now
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {daysUntilPayment}d
                  </div>
                  <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm mt-1">
                    Cancel Auto-pay
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-300">Monthly Rent:</span>
                <span className="font-semibold text-lg">${rent}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">Amount to Pay:</span>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-right font-semibold"
                  min="0"
                  max={rent}
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={!paymentAmount || paymentAmount <= 0}
              className={`w-full mt-4 px-4 py-3 rounded-lg font-semibold transition-all ${
                paymentAmount && paymentAmount > 0
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              {paymentAmount && paymentAmount > 0 ? `Pay $${paymentAmount}` : "Enter Amount to Pay"}
            </button>
          </div>

          {/* Utilities */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Droplets className="text-sky-500" /> Monthly Utilities
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Select utilities to include in your payment:</p>
            <div className="space-y-3">
              {Object.entries(selectedUtilities).map(([key, utility]) => (
                <div key={key} className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={utility.checked}
                      onChange={() => handleUtilityToggle(key)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      {key === 'water' && <Droplets size={20} className="text-sky-500" />}
                      {key === 'garbage' && <Trash2 size={20} className="text-green-500" />}
                      {key === 'security' && <Shield size={20} className="text-purple-500" />}
                      <span className="capitalize font-medium">{key} Bill</span>
                    </div>
                  </div>
                  <span className="font-semibold text-lg">${utility.amount}</span>
                </div>
              ))}
            </div>
            
            {/* Total Preview */}
            {Object.values(selectedUtilities).some(u => u.checked) && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex justify-between items-center">
                  <span className="text-green-800 dark:text-green-200 font-semibold">Selected Utilities Total:</span>
                  <span className="text-green-800 dark:text-green-200 font-bold text-lg">
                    ${Object.values(selectedUtilities).reduce((sum, util) => util.checked ? sum + util.amount : sum, 0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Search Agents Section */}
      {activeSection === "search" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Search className="text-blue-500" /> Find Property Agents
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Connect with professional agents to find your perfect home
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchAgents()}
                placeholder="Search by agent name, company, or specialty..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearchAgents}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          {/* Agents List */}
          <div className="space-y-4">
            {agents.length === 0 ? (
              <div className="text-center py-8">
                <Users size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No agents found matching your search.</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search terms.</p>
              </div>
            ) : (
              agents.map(agent => (
                <div key={agent.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-5 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{agent.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{agent.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                            <span className="text-yellow-800 dark:text-yellow-200 font-semibold">{agent.rating}</span>
                            <span className="text-yellow-600 dark:text-yellow-400">⭐</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-2">
                          <span>📧</span>
                          <span>{agent.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>📞</span>
                          <span>{agent.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🏠</span>
                          <span>{agent.properties} properties</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🎯</span>
                          <span>{agent.specialty}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Filter size={14} />
                        <span>{agent.experience} experience</span>
                      </div>
                    </div>
                    <button
                      onClick={() => sendInviteRequest(agent.id)}
                      className="ml-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                      <Send size={16} />
                      Contact
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Invites Section */}
      {activeSection === "invites" && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="text-purple-500" /> My Invites
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Manage your property invitations from agents and landlords
          </p>
          
          <div className="space-y-4">
            {invites.length === 0 ? (
              <div className="text-center py-8">
                <UserPlus size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No pending invites</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Start by searching for agents to receive invites.
                </p>
              </div>
            ) : (
              invites.map(invite => (
                <div key={invite.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-5 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{invite.property}</h3>
                          <p className="text-gray-600 dark:text-gray-300">From: {invite.from}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          invite.status === 'accepted' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {invite.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p>📍 {invite.address}</p>
                        <p>💰 Rent: ${invite.rent}/month</p>
                        <p>📅 Invite sent: {invite.date}</p>
                      </div>
                    </div>
                    
                    {invite.status === 'pending' && (
                      <div className="ml-4 flex gap-2">
                        <button
                          onClick={() => handleInviteResponse(invite.id, true)}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleInviteResponse(invite.id, false)}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
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
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6 text-center">
                <p className="text-2xl font-bold text-green-600 mb-2">${calculateTotal()}</p>
                <p className="text-sm text-gray-500">
                  Rent: ${paymentAmount} + Utilities: ${calculateTotal() - parseInt(paymentAmount)}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-lg mb-3">Select Payment Method:</h4>
                
                {[
                  { id: "mpesa", name: "M-Pesa", color: "green", letter: "M" },
                  { id: "visa", name: "Visa/MasterCard", color: "blue", letter: "V" },
                  { id: "airtel", name: "Airtel Money", color: "red", letter: "A" }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-all ${
                      selectedPaymentMethod === method.id 
                        ? `border-${method.color}-500 bg-${method.color}-50 dark:bg-${method.color}-900 shadow-md` 
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className={`w-10 h-10 bg-${method.color}-500 rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                      {method.letter}
                    </div>
                    <span className="font-semibold">{method.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={processPayment}
                disabled={!selectedPaymentMethod}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
                  selectedPaymentMethod
                    ? "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                }`}
              >
                {selectedPaymentMethod ? `Pay $${calculateTotal()}` : "Select Payment Method"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Modal */}
      {showChatbot && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600 bg-blue-500 text-white rounded-t-lg">
            <div>
              <h3 className="font-semibold">Chat with Agent</h3>
              <p className="text-xs opacity-80">Typically replies in minutes</p>
            </div>
            <button 
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
            {chatMessages.length === 0 ? (
              <div className="text-center h-full flex flex-col justify-center">
                <MessageCircle size={48} className="mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">Start a conversation with your agent</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Ask about properties, payments, or maintenance</p>
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
                      <p className="text-xs opacity-70 mt-1 text-right">{message.timestamp}</p>
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
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  newMessage.trim()
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                }`}
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
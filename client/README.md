kejani/
│
├── client/                      # React (Vite + Tailwind + Firebase)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env                       # (for Firebase config)
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       │
│       ├── assets/                # images, logos, icons
│       │   ├── logo.svg
│       │   └── hero.jpg
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── DarkModeToggle.jsx
│       │   ├── PropertyCard.jsx
│       │   ├── PaymentHistoryTable.jsx
│       │   ├── UtilityCard.jsx
│       │   └── Footer.jsx
│       │
│       ├── context/
│       │   ├── ThemeContext.jsx
│       │   ├── AuthContext.jsx
│       │   └── FirebaseContext.jsx
│       │
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── RegisterTenant.jsx
│       │   ├── RegisterLandlord.jsx
│       │   ├── DashboardTenant.jsx
│       │   ├── DashboardLandlord.jsx
│       │   ├── DashboardAgent.jsx
│       │   ├── Properties.jsx
│       │   └── About.jsx
│       │
│       ├── routes/
│       │   └── ProtectedRoute.jsx
│       │
│       ├── services/
│       │   ├── firebase.js        # Firebase init (Auth + Firestore)
│       │   ├── api.js             # Communicates with Flask backend
│       │   └── auth.js            # Firebase auth helpers
│       │
│       └── utils/
│           ├── formatCurrency.js
│           ├── calculateBalance.js
│           └── roleGuard.js
│
├── server/                       # Flask API
│   ├── app.py                     # main entry point
│   ├── requirements.txt
│   ├── .env                       # (Firebase admin creds + M-Pesa API keys)
│   │
│   ├── instance/
│   │   └── config.py              # secret config (Flask settings)
│   │
│   ├── utils/
│   │   ├── firebase_admin.py      # Firebase Admin init
│   │   ├── mpesa.py               # M-Pesa integration helpers
│   │   └── auth_middleware.py     # verify Firebase token middleware
│   │
│   ├── routes/
│   │   ├── auth_routes.py         # login/signup verification with Firebase
│   │   ├── property_routes.py     # create property, list tenants
│   │   ├── payment_routes.py      # rent payment via M-Pesa + webhook
│   │   ├── invitation_routes.py   # landlord invites tenants
│   │   └── report_routes.py       # generate reports
│   │
│   ├── models/
│   │   ├── property_model.py
│   │   ├── payment_model.py
│   │   └── user_model.py
│   │
│   └── tests/
│       ├── test_auth.py
│       ├── test_payment.py
│       └── test_property.py
│
├── firebase.json                  # for Firebase hosting (optional)
├── firestore.rules                # security rules
└── README.md                      # project setup + documentation

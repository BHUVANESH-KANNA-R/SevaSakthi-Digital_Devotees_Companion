
import React, { useState, useEffect } from 'react';
import { Screen, User, FamilyMember, Badge, LeaderboardEntry, POI, Notification } from './types';
import { MOCK_USER_TEMPLATE, MOCK_BADGES, MOCK_LEADERBOARD, MAP_POIS, MOCK_NOTIFICATIONS } from './constants';
import Icon from './components/Icon';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';

// --- Screen Components ---

// --- Auth Flow Components ---

const RoleSelectionScreen: React.FC<{ onSelectRole: (role: 'devotee' | 'organiser') => void }> = ({ onSelectRole }) => (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-orange-400 to-amber-500 p-4 text-white">
        <div className="text-center mb-10">
            <Icon name="fa-hands-holding-child" className="text-6xl mb-4" />
            <h1 className="text-4xl font-bold">SevaSathi</h1>
            <p className="text-lg mt-2">Your digital companion for a blessed journey.</p>
        </div>
        <div className="w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Continue as a...</h2>
            <div className="space-y-4">
                <button
                    onClick={() => onSelectRole('devotee')}
                    className="w-full bg-white text-orange-500 p-4 rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
                >
                    <Icon name="fa-person-praying" className="text-3xl w-12" />
                    <div className="text-left ml-4">
                        <p className="font-bold text-lg">Devotee</p>
                        <p className="text-sm">Navigate, connect, and stay safe.</p>
                    </div>
                </button>
                <button
                    onClick={() => onSelectRole('organiser')}
                    className="w-full bg-white text-blue-500 p-4 rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
                >
                    <Icon name="fa-user-shield" className="text-3xl w-12" />
                    <div className="text-left ml-4">
                        <p className="font-bold text-lg">Organiser</p>
                        <p className="text-sm">Manage crowds and ensure safety.</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
);

const AuthOptionsScreen: React.FC<{ role: 'devotee' | 'organiser'; setAuthState: (status: 'login' | 'signup') => void; onBack: () => void }> = ({ role, setAuthState, onBack }) => {
    const isDevotee = role === 'devotee';
    const theme = {
        gradient: isDevotee ? 'from-red-500 to-orange-500' : 'from-indigo-600 to-purple-600',
        button: isDevotee ? 'bg-orange-600 hover:bg-orange-700' : 'bg-indigo-700 hover:bg-indigo-800',
        secondaryButton: `bg-white ${isDevotee ? 'text-orange-600' : 'text-indigo-700'}`,
        icon: isDevotee ? 'fa-person-praying' : 'fa-user-shield',
        title: isDevotee ? 'Devotee Portal' : 'Organiser Portal',
    };

    return (
        <div className={`min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br ${theme.gradient} p-4 text-white`}>
            <button onClick={onBack} className="absolute top-4 left-4 text-white text-lg flex items-center gap-2"><Icon name="fa-arrow-left" /> Back</button>
            <div className="text-center mb-10">
                <Icon name={theme.icon} className="text-6xl mb-4" />
                <h1 className="text-4xl font-bold">{theme.title}</h1>
            </div>
            <div className="w-full max-w-sm space-y-4">
                <button onClick={() => setAuthState('login')} className={`w-full text-white p-3 rounded-lg shadow-lg font-semibold text-lg transition-transform transform hover:scale-105 ${theme.button}`}>
                    Login
                </button>
                <button onClick={() => setAuthState('signup')} className={`w-full p-3 rounded-lg shadow-lg font-semibold text-lg transition-transform transform hover:scale-105 ${theme.secondaryButton}`}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};


const LoginScreen: React.FC<{
    role: 'devotee' | 'organiser';
    onLogin: (email: string, pass: string) => boolean;
    onBack: () => void;
}> = ({ role, onLogin, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isDevotee = role === 'devotee';
    const theme = {
        gradient: isDevotee ? 'from-red-500 to-orange-500' : 'from-indigo-600 to-purple-600',
        button: isDevotee ? 'bg-orange-600 hover:bg-orange-700' : 'bg-indigo-700 hover:bg-indigo-800',
        icon: isDevotee ? 'fa-person-praying' : 'fa-user-shield',
        title: isDevotee ? 'Devotee Login' : 'Organiser Login',
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!onLogin(email, password)) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className={`min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br ${theme.gradient} p-4 text-white`}>
             <button onClick={onBack} className="absolute top-4 left-4 text-white text-lg flex items-center gap-2"><Icon name="fa-arrow-left" /> Back</button>
            <div className="text-center mb-10">
                <Icon name={theme.icon} className="text-6xl mb-4" />
                <h1 className="text-4xl font-bold">{theme.title}</h1>
            </div>
            <div className="w-full max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email address</label>
                        <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium">Password</label>
                        <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" placeholder="Enter your password" />
                    </div>
                    {error && <p className="text-sm bg-red-800/50 p-2 rounded-md text-center">{error}</p>}
                    <button type="submit" className={`w-full text-white p-3 rounded-lg shadow-lg font-semibold text-lg transition-transform transform hover:scale-105 ${theme.button}`}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

const SignupScreen: React.FC<{
    role: 'devotee' | 'organiser';
    onSignup: (user: Omit<User, 'ecoPoints' | 'badges' | 'avatarUrl' | 'distanceWalked' | 'groupName'>) => boolean;
    onBack: () => void;
}> = ({ role, onSignup, onBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const isDevotee = role === 'devotee';
    const theme = {
        gradient: isDevotee ? 'from-red-500 to-orange-500' : 'from-indigo-600 to-purple-600',
        button: isDevotee ? 'bg-orange-600 hover:bg-orange-700' : 'bg-indigo-700 hover:bg-indigo-800',
        icon: isDevotee ? 'fa-person-praying' : 'fa-user-shield',
        title: isDevotee ? 'Devotee Signup' : 'Organiser Signup',
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        
        const success = onSignup({
            name,
            email,
            phone,
            password,
            role,
            emergencyContact: { name: '', phone: '' }, // Can be filled in profile later
        });

        if (!success) {
            setError("An account with this email already exists.");
        }
    };

    return (
        <div className={`min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br ${theme.gradient} p-4 text-white`}>
            <button onClick={onBack} className="absolute top-4 left-4 text-white text-lg flex items-center gap-2"><Icon name="fa-arrow-left" /> Back</button>
            <div className="text-center mb-8">
                <Icon name={theme.icon} className="text-5xl mb-3" />
                <h1 className="text-3xl font-bold">{theme.title}</h1>
            </div>
            <div className="w-full max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                        <input type="text" id="name" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                        <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white" />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                        <input type="tel" id="phone" required value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white" />
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium">Password</label>
                        <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white" />
                    </div>
                     <div>
                        <label htmlFor="confirm-password"className="block text-sm font-medium">Confirm Password</label>
                        <input type="password" id="confirm-password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white" />
                    </div>
                    {error && <p className="text-sm bg-red-800/50 p-2 rounded-md text-center">{error}</p>}
                    <button type="submit" className={`w-full text-white p-3 rounded-lg shadow-lg font-semibold text-lg transition-transform transform hover:scale-105 ${theme.button}`}>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- Main Screens ---

const DashboardCard: React.FC<{ icon: string; title: string; subtitle: string; onClick: () => void; className?: string; }> = ({ icon, title, subtitle, onClick, className }) => (
    <div onClick={onClick} className={`bg-white p-4 rounded-lg shadow-md flex items-center cursor-pointer hover:shadow-lg transition-shadow ${className}`}>
        <Icon name={icon} className="text-3xl text-orange-500 w-12" />
        <div className="ml-4">
            <h3 className="font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <Icon name="fa-chevron-right" className="ml-auto text-gray-400" />
    </div>
);

const DashboardScreen: React.FC<{ user: User; navigate: (screen: Screen) => void; family: FamilyMember[] }> = ({ user, navigate, family }) => {
    const familyStatus = family.find(m => m.status !== 'Safe') ? 'Needs Help' : 'All Safe';
    const familyStatusColor = familyStatus === 'Needs Help' ? 'text-red-500' : 'text-green-500';

    return (
        <div className="p-4 space-y-4">
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg shadow">
                <h2 className="font-bold text-lg text-gray-800">Eco-Challenge</h2>
                <p className="text-sm text-gray-600">You've earned <span className="font-bold text-green-600">{user.ecoPoints}</span> points!</p>
                <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: `${(user.ecoPoints / 2000) * 100}%` }}></div>
                </div>
                <button onClick={() => navigate(Screen.Eco)} className="text-sm font-semibold text-orange-600 mt-2 hover:underline">View Progress &rarr;</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <DashboardCard icon="fa-map-location-dot" title="Kumbh Map" subtitle="Find locations" onClick={() => navigate(Screen.Map)} />
                <DashboardCard icon="fa-users" title="My Family" subtitle={familyStatus} onClick={() => navigate(Screen.Family)} className={familyStatus === 'Needs Help' ? 'ring-2 ring-red-500' : ''} />
                <DashboardCard icon="fa-ticket" title="Darshan Booking" subtitle="Book your slot" onClick={() => navigate(Screen.Darshan)} />
                <DashboardCard icon="fa-shield-halved" title="Safety Alerts" subtitle="Stay informed" onClick={() => navigate(Screen.SafetyAlerts)} />
            </div>
        </div>
    );
};

const MapScreen: React.FC<{ pois: POI[]; familyInNeed: FamilyMember[]; onViewLocation: (member: FamilyMember) => void; focusedMember: FamilyMember | null; onClearFocus: () => void; }> = ({ pois, familyInNeed, onViewLocation, focusedMember, onClearFocus }) => {
    useEffect(() => {
        return () => onClearFocus();
    }, [onClearFocus]);

    return (
        <div className="relative h-[calc(100vh-130px)] bg-gray-200">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29375.32549215037!2d75.75338578586427!3d23.18432360252158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39637537385a8509%3A0x1d3a54497e781031!2sMahakaleshwar%20Jyotirlinga!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ujjain Map"
            ></iframe>
            {pois.map(poi => (
                <div key={poi.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ top: poi.top, left: poi.left }}>
                    <div className="relative group pointer-events-auto">
                        <Icon name="fa-location-dot" className="text-3xl text-red-600 drop-shadow-lg cursor-pointer" />
                        <div className="absolute bottom-full mb-2 w-max bg-white text-black text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2 left-1/2">
                            {poi.name} ({poi.type})
                        </div>
                    </div>
                </div>
            ))}
            {familyInNeed.map(member => {
                const isFocused = focusedMember?.id === member.id;
                return member.top && member.left && (
                    <div key={`member-${member.id}`} className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500" style={{ top: member.top, left: member.left, zIndex: isFocused ? 10 : 5 }}>
                        <div
                            className="relative group pointer-events-auto"
                            onClick={() => onViewLocation(member)}
                        >
                            <div className="relative">
                                <img src={member.avatarUrl} alt={member.name} className={`w-12 h-12 rounded-full border-4 shadow-lg cursor-pointer transition-all duration-300 ${isFocused ? 'border-blue-500 scale-125' : 'border-red-500'}`} />
                                <div className={`absolute inset-0 rounded-full border-2 ${isFocused ? 'border-blue-500' : 'border-red-500'} animate-ping`}></div>
                            </div>
                            <div className="absolute bottom-full mb-2 w-max bg-red-600 text-white text-xs text-center rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2 left-1/2">
                                <p className="font-bold">{member.name}</p>
                                <p>{member.status}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

const FamilyScreen: React.FC<{ family: FamilyMember[]; onViewLocation: (member: FamilyMember) => void; onAddMember: () => void; onLinkQr: (member: FamilyMember) => void; }> = ({ family, onViewLocation, onAddMember, onLinkQr }) => (
    <div className="p-4 space-y-3">
        <button onClick={onAddMember} className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition-colors flex items-center justify-center text-lg">
            <Icon name="fa-plus" className="mr-2" />
            Add Family Member
        </button>
        {family.length === 0 && (
            <div className="text-center p-8 bg-gray-100 rounded-lg mt-4">
                <Icon name="fa-users-slash" className="text-5xl text-gray-400 mb-3"/>
                <p className="text-gray-600">Your family group is empty.</p>
                <p className="text-sm text-gray-500">Click the button above to add members.</p>
            </div>
        )}
        {family.map(member => {
            const statusClasses = {
                'Safe': { bg: 'bg-green-100', text: 'text-green-800', icon: 'fa-check-circle' },
                'Needs Help': { bg: 'bg-red-100', text: 'text-red-800', icon: 'fa-exclamation-triangle' },
                'Lost': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'fa-question-circle' },
            };
            const statusInfo = statusClasses[member.status];
            return (
                <div key={member.id} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-start">
                        <img src={member.avatarUrl} alt={member.name} className="w-16 h-16 rounded-full" />
                        <div className="ml-4 flex-grow">
                            <h3 className="font-bold text-gray-800">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.relation}</p>
                            <p className="text-sm text-gray-600 mt-1">
                                <Icon name="fa-map-marker-alt" className="mr-1" />
                                {member.location}
                            </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${statusInfo.bg} ${statusInfo.text}`}>
                            <Icon name={statusInfo.icon} className="mr-2" />
                            {member.status}
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                        {member.linked ? (
                             <div className="text-green-600 font-semibold flex items-center">
                                <Icon name="fa-check-circle" className="mr-2" />
                                QR Tag Linked
                            </div>
                        ) : (
                             <button onClick={() => onLinkQr(member)} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center">
                                <Icon name="fa-qrcode" className="mr-2" />
                                Link via QR
                            </button>
                        )}
                       
                        {['Needs Help', 'Lost'].includes(member.status) && (
                            <button
                                onClick={() => onViewLocation(member)}
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                            >
                                <Icon name="fa-location-crosshairs" className="mr-2" />
                                View Location
                            </button>
                        )}
                    </div>
                </div>
            );
        })}
    </div>
);

const ProfileScreen: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => (
    <div className="p-4">
        <div className="bg-white pt-16 pb-6 rounded-lg shadow-md text-center relative">
            <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mx-auto absolute -top-12 left-1/2 -translate-x-1/2 border-4 border-white shadow-lg" />
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600 mt-1">{user.email}</p>
        </div>
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md space-y-4">
             <div className="flex items-center">
                <Icon name="fa-phone" className="w-6 text-gray-500" />
                <span className="ml-3 text-gray-800">{user.phone}</span>
            </div>
            <div className="flex items-center">
                <Icon name="fa-users" className="w-6 text-gray-500" />
                <span className="ml-3 text-gray-800">{user.groupName}</span>
            </div>
            <div className="flex items-center">
                <Icon name="fa-person-walking" className="w-6 text-gray-500" />
                <span className="ml-3 text-gray-800">Walked {user.distanceWalked} km</span>
            </div>
            <div className="flex items-center">
                <Icon name="fa-first-aid" className="w-6 text-gray-500" />
                <span className="ml-3 text-gray-800">Emergency: {user.emergencyContact.name || 'Not Set'} {user.emergencyContact.phone}</span>
            </div>
        </div>
        <button onClick={onLogout} className="w-full mt-6 bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-600 transition-colors">
            Logout
        </button>
    </div>
);

const EcoChallengeScreen: React.FC<{ user: User, badges: Badge[], leaderboard: LeaderboardEntry[] }> = ({ user, badges, leaderboard }) => (
    <div className="p-4">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Icon name="fa-leaf" className="text-4xl text-green-500 mb-2" />
            <h2 className="text-2xl font-bold">{user.ecoPoints} Eco Points</h2>
            <p className="text-gray-500">Keep up the great work!</p>
        </div>

        <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">My Badges</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
                {badges.map(badge => (
                    <div key={badge.id} className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center justify-start">
                        <Icon name={badge.icon} className={`text-3xl ${badge.color}`} />
                        <p className="text-sm font-semibold mt-2 text-gray-700 h-10 flex items-center">{badge.name}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">Leaderboard</h3>
            <div className="bg-white p-2 rounded-lg shadow-md space-y-2">
                {leaderboard.map(entry => (
                    <div key={entry.rank} className={`flex items-center p-2 rounded ${entry.name === user.name ? 'bg-amber-100' : ''}`}>
                        <span className="font-bold w-8">{entry.rank}</span>
                        <img src={entry.avatarUrl} alt={entry.name} className="w-10 h-10 rounded-full" />
                        <span className="ml-3 font-semibold">{entry.name}</span>
                        <span className="ml-auto font-bold text-green-600">{entry.points}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const DarshanBookingScreen: React.FC = () => (
     <div className="p-4 text-center flex flex-col items-center justify-center h-[calc(100vh-130px)]">
        <Icon name="fa-ticket" className="text-8xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Darshan Booking</h2>
        <p className="text-gray-500 mt-2">Online booking is coming soon. Please visit the nearest help desk to book your slot.</p>
    </div>
);

const SafetyAlertsScreen: React.FC<{notifications: Notification[]}> = ({notifications}) => (
    <div className="p-4 space-y-3">
        {notifications.map(n => (
            <div key={n.id} className={`p-4 rounded-lg shadow-md border-l-4 ${!n.read ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={`font-bold ${!n.read ? 'text-red-800' : 'text-gray-800'}`}>{n.title}</h3>
                        <p className="text-sm text-gray-600">{n.message}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 bg-red-500 rounded-full ml-2 mt-1"></div>}
                </div>
                <p className="text-xs text-gray-400 mt-2 text-right">{n.timestamp}</p>
            </div>
        ))}
    </div>
);

type FamilyGroup = {
    groupName: string;
    email: string;
    members: FamilyMember[];
    distressCount: number;
};

const OrganiserDashboard: React.FC<{ 
    familyGroups: FamilyGroup[]; 
    notifications: Notification[]; 
    onLogout: () => void; 
    onBroadcast: (message: string) => void;
    onScan: () => void;
}> = ({ familyGroups, notifications, onLogout, onBroadcast, onScan }) => {
    const [expandedFamilyEmail, setExpandedFamilyEmail] = useState<string | null>(null);
    const [broadcastMessage, setBroadcastMessage] = useState('');

    const totalMembers = familyGroups.reduce((sum, group) => sum + group.members.length, 0);
    const totalInDistress = familyGroups.reduce((sum, group) => sum + group.distressCount, 0);
    const activeAlerts = notifications.filter(n => !n.read).length;
    
    const handleBroadcast = () => {
        if (broadcastMessage.trim()) {
            onBroadcast(broadcastMessage.trim());
            setBroadcastMessage('');
        }
    };
    
    const toggleFamily = (email: string) => {
        setExpandedFamilyEmail(prev => (prev === email ? null : email));
    };

    return (
        <div className="bg-gray-100 min-h-screen">
             <header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
                <h1 className="text-xl font-bold">Organiser Dashboard</h1>
                <button onClick={onLogout} className="text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 p-2 rounded-md">
                    <Icon name="fa-sign-out-alt" />
                    Logout
                </button>
            </header>
            <div className="p-4 space-y-4">
                 <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-3 rounded-lg shadow">
                        <p className="text-2xl font-bold text-red-600">{activeAlerts}</p>
                        <p className="text-sm text-gray-500">Active Alerts</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow">
                        <p className="text-2xl font-bold text-orange-600">{totalInDistress}</p>
                        <p className="text-sm text-gray-500">In Distress</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow">
                        <p className="text-2xl font-bold text-blue-600">{totalMembers}</p>
                        <p className="text-sm text-gray-500">Tracked People</p>
                    </div>
                </div>

                 <div className="space-y-4">
                     <button onClick={onScan} className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center text-lg">
                        <Icon name="fa-qrcode" className="mr-2" />
                        Scan QR & Notify
                    </button>
                     <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-bold text-lg mb-2 text-gray-800">Broadcast Alert</h3>
                        <textarea
                            className="w-full border border-gray-300 rounded-md p-2"
                            rows={2}
                            placeholder="Type your alert message here..."
                            value={broadcastMessage}
                            onChange={(e) => setBroadcastMessage(e.target.value)}
                        ></textarea>
                        <button onClick={handleBroadcast} className="w-full mt-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                           <Icon name="fa-bullhorn" className="mr-2" /> Send Broadcast
                        </button>
                     </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">Tracked Families</h3>
                    <div className="bg-white rounded-lg shadow">
                        {familyGroups.length > 0 ? (
                            familyGroups.map(group => (
                                <div key={group.email} className="border-b last:border-b-0">
                                    <button onClick={() => toggleFamily(group.email)} className="w-full p-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{group.groupName}</p>
                                            <p className="text-sm text-gray-500">{group.members.length} member(s)</p>
                                        </div>
                                        <div className="flex items-center gap-4 ml-2">
                                            {group.distressCount > 0 && (
                                                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">{group.distressCount} in distress</span>
                                            )}
                                            <Icon name={expandedFamilyEmail === group.email ? "fa-chevron-up" : "fa-chevron-down"} className="text-gray-500"/>
                                        </div>
                                    </button>
                                    {expandedFamilyEmail === group.email && (
                                        <div className="p-3 bg-gray-50 border-t">
                                            <ul className="divide-y divide-gray-200">
                                                {group.members.map(member => (
                                                    <li key={member.id} className="py-2 flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full"/>
                                                            <div className="ml-3">
                                                                <p className="font-semibold text-gray-800 text-sm">{member.name}</p>
                                                                <p className="text-sm text-gray-500">{member.relation}</p>
                                                            </div>
                                                        </div>
                                                        <p className={`text-sm font-bold ${member.status === 'Safe' ? 'text-green-600' : 'text-red-600'}`}>{member.status}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 p-6">No devotee families are being tracked yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Modals ---

const LiveLocationModal: React.FC<{ member: FamilyMember; onClose: () => void; onSendHelp: (memberName: string) => void; }> = ({ member, onClose, onSendHelp }) => {
  const handleSendHelpClick = () => {
    onSendHelp(member.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col text-white max-w-md mx-auto" role="dialog" aria-modal="true" aria-labelledby="location-title">
      <div className="p-4 bg-gray-900 bg-opacity-80 flex justify-between items-center">
        <div>
          <h2 id="location-title" className="text-xl font-bold">Live Location: {member.name}</h2>
          <p className="text-sm text-red-400">{member.status}</p>
        </div>
        <button onClick={onClose} className="text-2xl" aria-label="Close"><Icon name="fa-times" /></button>
      </div>
      <div className="flex-grow relative">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29375.32549215037!2d75.75338578586427!3d23.18432360252158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39637537385a8509%3A0x1d3a54497e781031!2sMahakaleshwar%20Jyotirlinga!5e0!3m2!1sen!2sin!4v1700000000000" className="w-full h-full border-0 pointer-events-none" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ujjain Map"></iframe>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
         <div className="absolute" style={{ top: member.top || '50%', left: member.left || '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="relative">
              <img src={member.avatarUrl} alt={member.name} className="w-16 h-16 rounded-full border-4 border-white shadow-lg" />
              <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
            </div>
         </div>
      </div>
      <div className="p-4 bg-gray-900 bg-opacity-80 grid grid-cols-1">
        <button onClick={handleSendHelpClick} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center text-lg">
          <Icon name="fa-hands-helping" className="mr-2"/> Send Help Immediately
        </button>
      </div>
    </div>
  );
};

const AddFamilyMemberModal: React.FC<{ onClose: () => void; onAdd: (name: string, relation: string) => void; }> = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && relation) {
            onAdd(name, relation);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4">Add Family Member</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="memberName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="memberName" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
                    </div>
                     <div>
                        <label htmlFor="memberRelation" className="block text-sm font-medium text-gray-700">Relation</label>
                        <input type="text" id="memberRelation" value={relation} onChange={e => setRelation(e.target.value)} required placeholder="e.g., Mother, Son, Friend" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600">Add Member</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const QRLinkModal: React.FC<{ member: FamilyMember; onClose: () => void; }> = ({ member, onClose }) => {
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsScanning(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center text-white p-4 max-w-md mx-auto" role="dialog" aria-modal="true">
            {isScanning ? (
                <>
                    <h2 className="text-xl font-semibold mb-2">Linking QR for {member.name}</h2>
                    <p className="mb-4 text-gray-300">Scanning for QR Code...</p>
                    <div className="relative w-64 h-64 bg-black/50 border-4 border-dashed border-gray-500 rounded-lg overflow-hidden flex items-center justify-center">
                        <img src={member.avatarUrl} alt={member.name} className="w-24 h-24 rounded-full opacity-30" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)] scanner-line"></div>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <Icon name="fa-check-circle" className="text-8xl text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold">QR Tag Linked!</h2>
                    <p className="text-gray-300 mt-2">{member.name} is now successfully linked.</p>
                    <button onClick={onClose} className="mt-6 bg-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-orange-600">Done</button>
                </div>
            )}
        </div>
    );
};

const OrganiserScannerModal: React.FC<{ onClose: () => void; onScanSuccess: (memberName: string, location: string) => void; }> = ({ onClose, onScanSuccess }) => {
    const [scanState, setScanState] = useState<'scanning' | 'success'>('scanning');

    useEffect(() => {
        const timer = setTimeout(() => {
            // Simulate a successful scan of a random person
            onScanSuccess('Priya Sharma', 'Ram Ghat'); 
            setScanState('success');
        }, 2500);
        return () => clearTimeout(timer);
    }, [onScanSuccess]);

    return (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center text-white p-4 max-w-md mx-auto" role="dialog" aria-modal="true">
            {scanState === 'scanning' ? (
                <>
                    <h2 className="text-xl font-semibold mb-2">Scanning for Pilgrim Tag</h2>
                    <p className="mb-4 text-gray-300">Point camera at the QR Code...</p>
                    <div className="relative w-64 h-64 bg-black/50 border-4 border-dashed border-gray-500 rounded-lg overflow-hidden flex items-center justify-center">
                        <Icon name="fa-user-tag" className="text-6xl text-gray-600" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)] scanner-line"></div>
                    </div>
                     <button onClick={onClose} className="mt-6 bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-gray-700">Cancel</button>
                </>
            ) : (
                <div className="text-center">
                    <Icon name="fa-check-circle" className="text-8xl text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold">Pilgrim Found!</h2>
                    <p className="text-gray-300 mt-2">Priya Sharma's family has been notified of their location at Ram Ghat.</p>
                    <button onClick={onClose} className="mt-6 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700">Done</button>
                </div>
            )}
        </div>
    );
};


// --- Main App Component ---

const App: React.FC = () => {
    // --- State ---
    const [authState, setAuthState] = useState<{
        status: 'role-select' | 'auth-options' | 'login' | 'signup' | 'logged-in';
        role: 'devotee' | 'organiser' | null;
    }>({ status: 'role-select', role: null });

    const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
        // Initialize with a default organiser
        const organiser = { ...MOCK_USER_TEMPLATE, role: 'organiser' as const, email: 'organiser@kumbh.gov', name: 'Kumbh Admin', password: 'password' };
        return [organiser];
    });
    const [familyData, setFamilyData] = useState<Record<string, FamilyMember[]>>({});
    
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Dashboard);
    const [focusedMember, setFocusedMember] = useState<FamilyMember | null>(null);
    
    // Modal States
    const [liveLocationMember, setLiveLocationMember] = useState<FamilyMember | null>(null);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [qrLinkMember, setQrLinkMember] = useState<FamilyMember | null>(null);
    const [isOrganiserScanning, setIsOrganiserScanning] = useState(false);


    // --- Auth Handlers ---
    const handleSelectRole = (role: 'devotee' | 'organiser') => setAuthState({ status: 'auth-options', role });
    const handleAuthBack = () => setAuthState(prev => ({ ...prev, status: 'auth-options' }));
    const handleRoleBack = () => setAuthState({ status: 'role-select', role: null });

    const handleLogin = (email: string, pass: string): boolean => {
        const user = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass && u.role === authState.role);
        if (user) {
            setCurrentUser(user);
            if (user.role === 'devotee') {
                setFamilyMembers(familyData[user.email] || []);
            }
            setAuthState(prev => ({ ...prev, status: 'logged-in' }));
            return true;
        }
        return false;
    };

    const handleSignup = (newUser: Omit<User, 'ecoPoints' | 'badges' | 'avatarUrl' | 'distanceWalked' | 'groupName'>): boolean => {
        if (registeredUsers.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
            return false; // Email exists
        }
        const userToSave: User = {
            ...MOCK_USER_TEMPLATE,
            ...newUser,
            avatarUrl: `https://picsum.photos/seed/${newUser.email}/200/200`,
            groupName: `${newUser.name.split(' ')[0]} Family Group`,
        };
        setRegisteredUsers(prev => [...prev, userToSave]);
        setCurrentUser(userToSave);
        if (userToSave.role === 'devotee') {
            setFamilyData(prev => ({...prev, [userToSave.email]: []}));
            setFamilyMembers([]);
        }
        setAuthState(prev => ({ ...prev, status: 'logged-in' }));
        return true;
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setFamilyMembers([]);
        setAuthState({ status: 'role-select', role: null });
        setCurrentScreen(Screen.Dashboard);
    };

    // --- Devotee Data Handlers ---
    const handleAddFamilyMember = (name: string, relation: string) => {
        if (!currentUser) return;
        const newMember: FamilyMember = {
            id: Date.now(),
            name,
            relation,
            location: 'Near Main Temple',
            status: 'Safe',
            avatarUrl: `https://picsum.photos/seed/${name.replace(/\s/g, '')}/200/200`,
            belongings: [],
            linked: false
        };
        const updatedFamily = [...familyMembers, newMember];
        setFamilyMembers(updatedFamily);
        setFamilyData(prev => ({...prev, [currentUser.email]: updatedFamily}));
        setIsAddMemberModalOpen(false);
    };
    
    const handleLinkQr = (member: FamilyMember) => {
        if (!currentUser) return;
        const updatedFamily = familyMembers.map(m => m.id === member.id ? {...m, linked: true} : m);
        setFamilyMembers(updatedFamily);
        setFamilyData(prev => ({...prev, [currentUser.email]: updatedFamily}));
        setQrLinkMember(null); // Close modal
    };

    const handleSendHelp = (memberName: string) => {
        setNotifications(prev => [{
            id: Date.now(),
            title: 'Help Dispatched',
            message: `Emergency services alerted for ${memberName}.`,
            timestamp: 'Just now',
            read: false,
        }, ...prev]);
    };

    const handleBroadcast = (message: string) => {
        setNotifications(prev => [{
            id: Date.now(),
            title: 'Organiser Broadcast',
            message,
            timestamp: 'Just now',
            read: false,
        }, ...prev]);
    };

    const handleOrganiserScan = (scannedMemberName: string, location: string) => {
        setNotifications(prev => [{
            id: Date.now(),
            title: 'Location Update',
            message: `${scannedMemberName} was scanned by an organiser at ${location}.`,
            timestamp: 'Just now',
            read: false,
        }, ...prev]);
        setIsOrganiserScanning(false);
    };
    
    // --- Navigation & UI ---
    const navigate = (screen: Screen) => setCurrentScreen(screen);
    const handleViewLocation = (member: FamilyMember) => setLiveLocationMember(member);
    const handlePinClickOnMap = (member: FamilyMember) => {
        setFocusedMember(member);
        setLiveLocationMember(member);
    };
    
    // --- Render Logic ---
    if (authState.status !== 'logged-in') {
        switch (authState.status) {
            case 'role-select': return <RoleSelectionScreen onSelectRole={handleSelectRole} />;
            case 'auth-options': return <AuthOptionsScreen role={authState.role!} setAuthState={(s) => setAuthState(p => ({...p, status: s}))} onBack={handleRoleBack} />;
            case 'login': return <LoginScreen role={authState.role!} onLogin={handleLogin} onBack={handleAuthBack} />;
            case 'signup': return <SignupScreen role={authState.role!} onSignup={handleSignup} onBack={handleAuthBack} />;
        }
    }
    
    if (!currentUser) return null; // Should not happen if logged-in

    // Logged In View
    const renderDevoteeScreen = () => {
        switch (currentScreen) {
            case Screen.Dashboard: return <DashboardScreen user={currentUser} navigate={navigate} family={familyMembers} />;
            case Screen.Map: {
                const familyInNeed = familyMembers.filter(m => ['Needs Help', 'Lost'].includes(m.status) && m.top && m.left);
                return <MapScreen pois={MAP_POIS} familyInNeed={familyInNeed} onViewLocation={handlePinClickOnMap} focusedMember={focusedMember} onClearFocus={() => setFocusedMember(null)} />;
            }
            case Screen.Family: return <FamilyScreen family={familyMembers} onViewLocation={handleViewLocation} onAddMember={() => setIsAddMemberModalOpen(true)} onLinkQr={(m) => setQrLinkMember(m)} />;
            case Screen.Profile: return <ProfileScreen user={currentUser} onLogout={handleLogout} />;
            case Screen.Eco: return <EcoChallengeScreen user={currentUser} badges={MOCK_BADGES} leaderboard={MOCK_LEADERBOARD} />;
            case Screen.Darshan: return <DarshanBookingScreen />;
            case Screen.SafetyAlerts: return <SafetyAlertsScreen notifications={notifications} />;
            default: return <DashboardScreen user={currentUser} navigate={navigate} family={familyMembers} />;
        }
    };
    
    if (currentUser.role === 'organiser') {
        const familyGroups: FamilyGroup[] = registeredUsers
            .filter(u => u.role === 'devotee' && familyData[u.email] && familyData[u.email].length > 0)
            .map(u => ({
                groupName: u.groupName,
                email: u.email,
                members: familyData[u.email],
                distressCount: familyData[u.email].filter(m => ['Needs Help', 'Lost'].includes(m.status)).length
            }));

        return (
            <>
                <OrganiserDashboard 
                    familyGroups={familyGroups} 
                    notifications={notifications} 
                    onLogout={handleLogout} 
                    onBroadcast={handleBroadcast} 
                    onScan={() => setIsOrganiserScanning(true)} 
                />
                {isOrganiserScanning && <OrganiserScannerModal onClose={() => setIsOrganiserScanning(false)} onScanSuccess={handleOrganiserScan} />}
            </>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-gray-50 h-screen font-sans flex flex-col">
            <Header user={currentUser} notifications={notifications} onNotificationClick={() => navigate(Screen.SafetyAlerts)} />
            <main className="flex-grow overflow-y-auto pb-20">
                {renderDevoteeScreen()}
            </main>
            <BottomNavBar activeScreen={currentScreen} navigate={navigate} />
            
            {/* Modals */}
            {liveLocationMember && <LiveLocationModal member={liveLocationMember} onClose={() => setLiveLocationMember(null)} onSendHelp={handleSendHelp} />}
            {isAddMemberModalOpen && <AddFamilyMemberModal onClose={() => setIsAddMemberModalOpen(false)} onAdd={handleAddFamilyMember} />}
            {qrLinkMember && <QRLinkModal member={qrLinkMember} onClose={() => handleLinkQr(qrLinkMember)} />}
        </div>
    );
};

export default App;

// All available users (for search)
export const allUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    status: "online",
    phone: "+1 234 567 8901",
    about: "Available",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    status: "offline",
    lastSeen: "10:30 AM",
    phone: "+1 234 567 8902",
    about: "At work",
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    status: "typing",
    phone: "+1 234 567 8903",
    about: "Busy",
  },
  {
    id: "4",
    name: "James Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    status: "online",
    phone: "+1 234 567 8904",
    about: "Hey there! I am using WhatsApp",
  },
  {
    id: "5",
    name: "Lisa Park",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    status: "offline",
    lastSeen: "Yesterday",
    phone: "+1 234 567 8905",
    about: "Can't talk, WhatsApp only",
  },
  {
    id: "6",
    name: "David Kim",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    status: "offline",
    lastSeen: "2 hours ago",
    phone: "+1 234 567 8906",
    about: "Available",
  },
  // New users not in contacts yet
  {
    id: "7",
    name: "Olivia Martinez",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    status: "online",
    phone: "+1 234 567 8907",
    about: "Living my best life ✨",
  },
  {
    id: "8",
    name: "Alex Thompson",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    status: "offline",
    lastSeen: "5 minutes ago",
    phone: "+1 234 567 8908",
    about: "Coffee lover ☕",
  },
  {
    id: "9",
    name: "Sophie Lee",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    status: "online",
    phone: "+1 234 567 8909",
    about: "Adventure awaits! 🌍",
  },
  {
    id: "10",
    name: "Ryan Cooper",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    status: "offline",
    lastSeen: "1 hour ago",
    phone: "+1 234 567 8910",
    about: "Tech enthusiast 💻",
  },
  {
    id: "11",
    name: "Mia Anderson",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
    status: "online",
    phone: "+1 234 567 8911",
    about: "Music is life 🎵",
  },
  {
    id: "12",
    name: "Daniel Brown",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face",
    status: "offline",
    lastSeen: "Today",
    phone: "+1 234 567 8912",
    about: "Fitness freak 💪",
  },
];

export const users = allUsers.slice(0, 6);

export const chats = [
  {
    id: "1",
    user: users[0],
    lastMessage: "Hey! How's the project going?",
    lastMessageTime: "12:45 PM",
    unreadCount: 2,
    messages: [
      {
        id: "m1",
        text: "Hi there! 👋",
        timestamp: "12:30 PM",
        isSent: false,
        status: "read",
      },
      {
        id: "m2",
        text: "Hey Sarah! Good to hear from you!",
        timestamp: "12:32 PM",
        isSent: true,
        status: "read",
      },
      {
        id: "m3",
        text: "How have you been?",
        timestamp: "12:33 PM",
        isSent: true,
        status: "read",
      },
      {
        id: "m4",
        text: "I've been great! Working on some exciting projects 🚀",
        timestamp: "12:40 PM",
        isSent: false,
        status: "read",
      },
      {
        id: "m5",
        text: "Hey! How's the project going?",
        timestamp: "12:45 PM",
        isSent: false,
        status: "read",
      },
    ],
  },
  {
    id: "2",
    user: users[1],
    lastMessage: "Sure, let's meet at 3 PM",
    lastMessageTime: "11:20 AM",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        text: "Hey Mike, are you free today?",
        timestamp: "11:00 AM",
        isSent: true,
        status: "read",
      },
      {
        id: "m2",
        text: "Let me check my schedule",
        timestamp: "11:15 AM",
        isSent: false,
        status: "read",
      },
      {
        id: "m3",
        text: "Sure, let's meet at 3 PM",
        timestamp: "11:20 AM",
        isSent: false,
        status: "read",
      },
      {
        id: "m4",
        text: "Perfect! See you then 👍",
        timestamp: "11:22 AM",
        isSent: true,
        status: "delivered",
      },
    ],
  },
  {
    id: "3",
    user: users[2],
    lastMessage: "The designs look amazing!",
    lastMessageTime: "10:05 AM",
    unreadCount: 1,
    messages: [
      {
        id: "m1",
        text: "Check out the new designs I sent",
        timestamp: "9:30 AM",
        isSent: true,
        status: "read",
      },
      {
        id: "m2",
        text: "Looking at them now...",
        timestamp: "9:45 AM",
        isSent: false,
        status: "read",
      },
      {
        id: "m3",
        text: "The designs look amazing!",
        timestamp: "10:05 AM",
        isSent: false,
        status: "read",
      },
    ],
  },
  {
    id: "4",
    user: users[3],
    lastMessage: "Thanks for the help! 🙏",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        text: "Can you help me with the code?",
        timestamp: "Yesterday",
        isSent: false,
        status: "read",
      },
      {
        id: "m2",
        text: "Of course! What do you need?",
        timestamp: "Yesterday",
        isSent: true,
        status: "read",
      },
      {
        id: "m3",
        text: "Just some React hooks guidance",
        timestamp: "Yesterday",
        isSent: false,
        status: "read",
      },
      {
        id: "m4",
        text: "Sure, useState is for local state, useEffect for side effects...",
        timestamp: "Yesterday",
        isSent: true,
        status: "read",
      },
      {
        id: "m5",
        text: "Thanks for the help! 🙏",
        timestamp: "Yesterday",
        isSent: false,
        status: "read",
      },
    ],
  },
  {
    id: "5",
    user: users[4],
    lastMessage: "See you at the party!",
    lastMessageTime: "Tuesday",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        text: "Are you coming to the party this weekend?",
        timestamp: "Tuesday",
        isSent: false,
        status: "read",
      },
      {
        id: "m2",
        text: "Yes! I'll be there around 8",
        timestamp: "Tuesday",
        isSent: true,
        status: "read",
      },
      {
        id: "m3",
        text: "See you at the party!",
        timestamp: "Tuesday",
        isSent: false,
        status: "read",
      },
    ],
  },
  {
    id: "6",
    user: users[5],
    lastMessage: "Let me know when you're free",
    lastMessageTime: "Monday",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        text: "We should catch up soon!",
        timestamp: "Monday",
        isSent: true,
        status: "delivered",
      },
      {
        id: "m2",
        text: "Definitely! It's been too long",
        timestamp: "Monday",
        isSent: false,
        status: "read",
      },
      {
        id: "m3",
        text: "Let me know when you're free",
        timestamp: "Monday",
        isSent: false,
        status: "read",
      },
    ],
  },
];

// Initial friend requests
export const initialFriendRequests = [
  {
    id: "fr1",
    user: allUsers[6], // Olivia Martinez
    timestamp: "2 hours ago",
    type: "incoming",
  },
  {
    id: "fr2",
    user: allUsers[7], // Alex Thompson
    timestamp: "Yesterday",
    type: "incoming",
  },
];

// Current logged in user
export const currentUser = {
  id: "current",
  name: "You",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
  status: "online",
  phone: "+1 234 567 8900",
  about: "Hey there! I am using WhatsApp",
};

import { v3 as uuidv3 } from 'uuid';

// Initial mock sessions
export let count = 0 
let sessions = [
  {
    id: ++count,
    title: 'Calculus Study Group',
    course: 'Math',
    date: new Date(new Date().setHours(15, 0, 0, 0)),
    location: 'Library Room 203',
    members: 5,
    description: 'Review for upcoming calculus exam',
  },
  {
    id: ++count,
    title: 'Physics Lab Review',
    course: 'Science',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    date: new Date(new Date().setHours(14, 0, 0, 0)),
    location: 'Science Building Room 101',
    members: 3,
    description: 'Go over lab results and prepare for next week',
  },
  {
    id: ++count,
    title: 'History Essay Workshop',
    course: 'History',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    date: new Date(new Date().setHours(16, 0, 0, 0)),
    location: 'Humanities Building Room 305',
    members: 4,
    description: 'Peer review and feedback session',
  },
];

// Track which sessions the user has joined
export let joinedSessions = [];

// Function to get all sessions
export const getAllSessions = () => {
  return sessions;
};

// Function to get sessions for a specific date
export const getSessionsForDate = (date) => {
  return sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate.toDateString() === date.toDateString();
  });
};

// Function to get joined sessions for a specific date
export const getJoinedSessionsForDate = (date) => {
  return sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate.toDateString() === date.toDateString() && joinedSessions.includes(session.id);
  });
};

// Function to get upcoming sessions (today and future)
export const getUpcomingSessions = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return sessions.filter(session => new Date(session.date) >= today);
};

// Function to add a new session
export const addSession = (session) => {
  const newSession = {
    ...session,
    id: ++count,
    members: 1, // Start with 1 member (the creator)
  };
  sessions.push(newSession);
  return newSession;
};

// Function to get a session by ID
export const getSessionById = (id) => {
  return sessions.find(session => session.id === id);
};

// Function to join a session
export const joinSession = (sessionId) => {
  const session = sessions.find(s => s.id === sessionId);
  if (session && !joinedSessions.includes(sessionId)) {
    session.members += 1;
    joinedSessions.push(sessionId);
  }
  return session;
};

// Function to check if a session is joined
export const isSessionJoined = (sessionId) => {
  return joinedSessions.includes(sessionId);
}; 
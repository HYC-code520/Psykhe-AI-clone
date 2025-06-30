import { testSessions, type TestSession, type InsertTestSession, type UpdateTestSession } from "@shared/schema";

export interface IStorage {
  createTestSession(session: InsertTestSession): Promise<TestSession>;
  getTestSession(sessionId: string): Promise<TestSession | undefined>;
  updateTestSession(sessionId: string, updates: UpdateTestSession): Promise<TestSession | undefined>;
  deleteTestSession(sessionId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private sessions: Map<string, TestSession>;
  private currentId: number;

  constructor() {
    this.sessions = new Map();
    this.currentId = 1;
  }

  async createTestSession(insertSession: InsertTestSession): Promise<TestSession> {
    const id = this.currentId++;
    const session: TestSession = {
      ...insertSession,
      id,
      createdAt: new Date(),
    };
    this.sessions.set(session.sessionId, session);
    return session;
  }

  async getTestSession(sessionId: string): Promise<TestSession | undefined> {
    return this.sessions.get(sessionId);
  }

  async updateTestSession(sessionId: string, updates: UpdateTestSession): Promise<TestSession | undefined> {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    const updatedSession: TestSession = {
      ...session,
      ...updates,
    };
    this.sessions.set(sessionId, updatedSession);
    return updatedSession;
  }

  async deleteTestSession(sessionId: string): Promise<boolean> {
    return this.sessions.delete(sessionId);
  }
}

export const storage = new MemStorage();

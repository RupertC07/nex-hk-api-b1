import session from "express-session";

export interface CustomSession extends session.Session {
  userData?: {
    [sessionId: string]: {
      otpCode?: string;
      userData?: any;
      otpExpiration: number;
      attempts: number;

      // Add other properties if needed
    };
  };
}

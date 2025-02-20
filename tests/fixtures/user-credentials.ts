export interface UserData {
  [key: string]: {
    description: string;
    username: string;
    password: string;
    type: string;
  };
}

export type UseType = keyof UserData;

export const users: UserData = {
  standard: {
    description: 'Standard User',
    username: process.env.USERNAME_STANDARD || '',
    password: process.env.PASSWORD_STANDARD || '',
    type: 'standard',
  },
  locked: {
    description: 'Locked Out User',
    username: process.env.USERNAME_LOCKED_OUT || '',
    password: process.env.PASSWORD_LOCKED_OUT || '',
    type: 'locked',
  },
  problem: {
    description: 'Problem User',
    username: process.env.USERNAME_PROBLEM || '',
    password: process.env.PASSWORD_PROBLEM || '',
    type: 'problem',
  },
  performance: {
    description: 'Performance Glitch User',
    username: process.env.USERNAME_PERFORMANCE_GLITCH || '',
    password: process.env.PASSWORD_PERFORMANCE_GLITCH || '',
    type: 'performance',
  },
  error: {
    description: 'Error User',
    username: process.env.USERNAME_ERROR || '',
    password: process.env.PASSWORD_ERROR || '',
    type: 'error',
  },
  visual: {
    description: 'Visual User',
    username: process.env.USERNAME_VISUAL || '',
    password: process.env.PASSWORD_VISUAL || '',
    type: 'visual',
  },
  invalid: {
    description: 'Invalid User',
    username: process.env.USERNAME_INVALID || '',
    password: process.env.PASSWORD_INVALID || '',
    type: 'invalid',
  },
} as const;

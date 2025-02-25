import mongoose from 'mongoose';

export interface IUser {
  auth0Id: string;
  email: string;
  name?: string;
  preferences?: {
    categories?: string[];
    subscriptions?: string[];
    darkMode?: boolean;
    carbonGoal?: number;
  };
  carbonFootprint?: {
    lastCalculated: Date;
    score: number;
    history: Array<{
      date: Date;
      score: number;
    }>;
  };
  challenges?: Array<{
    challengeId: string;
    progress: number;
    joined: Date;
  }>;
}

const userSchema = new mongoose.Schema<IUser>({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: String,
  preferences: {
    categories: [String],
    subscriptions: [String],
    darkMode: Boolean,
    carbonGoal: Number,
  },
  carbonFootprint: {
    lastCalculated: Date,
    score: Number,
    history: [{
      date: Date,
      score: Number,
    }],
  },
  challenges: [{
    challengeId: String,
    progress: Number,
    joined: Date,
  }],
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
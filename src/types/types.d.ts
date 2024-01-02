import { Request } from "express";

export type City = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
};

export type Role = "user" | "admin" | "all";

export type User = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  shareMode?: boolean;
  email?: string;
  password?: string;
  role?: Role;
  REFRESH_TOKEN?: string
};

type Payload = { id: string; role: Role };

export interface AuthRequest extends Request {
  payload?: Payload;
}

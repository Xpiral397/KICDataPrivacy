import NextAuth from "next-auth"

interface Session {
    refreshToken?: string;
    user?: DefaultSession;
}

// Define the type for the user object
export interface DefaultSession{
     id: number;
    email: string;
    gender: string;
    last_login?: string | null;
    is_superuser?: boolean;
    username?: string;
    first_name?: string;
    last_name?: string;
    is_staff?: boolean;
    date_joined?: string;
    name?: string;
    is_active?: boolean;
    has_registered?: boolean;
    has_confirm_email?: boolean;
    has_confirm_location?: boolean;
    has_confirm_full_name?: boolean;
    account?: {
        links: string[];
    };
    has_confirm_number?: boolean;
    has_confirm_profile_picture?: boolean;
    number?: string | null;
    nationality?: string | null;
    date_of_birth?: string | null;
    bio?: string;
    address?: string;
    occupation?: string;
    website?: string;
    languages_spoken?: string;
    interests_hobbies?: string;
    education?: string;
    skills?: string;
    favorite_books_movies_tv_shows?: string;
    relationship_status?: string;
    favorite_quotes?: string;
    travel_experiences?: string;
    achievements?: string;
    volunteer_work?: string;
    pet_ownership?: string;
    music_preferences?: string;
    fitness_activities?: string;
    profile_picture?: string | null;
    groups?: any[]; // Adjust according to your needs or specify a more specific type
    user_permissions?: any[]; //
    // Add more fields as needed
}

// Extend the NextAuthUser type provided by NextAuth.js
declare module "next-auth" {
    interface NextAuthUser {
         id: number;
    email: string;
    gender: string;
    last_login?: string | null;
    is_superuser?: boolean;
    username?: string;
    first_name?: string;
    last_name?: string;
    is_staff?: boolean;
    date_joined?: string;
    name?: string;
    is_active?: boolean;
    has_registered?: boolean;
    has_confirm_email?: boolean;
    has_confirm_location?: boolean;
    has_confirm_full_name?: boolean;
    account?: {
        links: string[];
    };
    has_confirm_number?: boolean;
    has_confirm_profile_picture?: boolean;
    number?: string | null;
    nationality?: string | null;
    date_of_birth?: string | null;
    bio?: string;
    address?: string;
    occupation?: string;
    website?: string;
    languages_spoken?: string;
    interests_hobbies?: string;
    education?: string;
    skills?: string;
    favorite_books_movies_tv_shows?: string;
    relationship_status?: string;
    favorite_quotes?: string;
    travel_experiences?: string;
    achievements?: string;
    volunteer_work?: string;
    pet_ownership?: string;
    music_preferences?: string;
    fitness_activities?: string;
    profile_picture?: string | null;
    groups?: any[]; // Adjust according to your needs or specify a more specific type
    user_permissions?: any[]; //
    }
}

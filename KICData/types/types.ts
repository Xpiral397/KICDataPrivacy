// types.ts or next-auth.d.ts

export interface DefaultSession {
  user?: {
    d: number;
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
  
        
  }
    expires: string;
  refreshToken:string  // Change ISODateString to string if ISODateString is a custom type
}

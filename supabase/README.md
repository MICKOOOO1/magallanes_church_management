# Supabase Schema for Church Management System

This folder contains the SQL schema needed to create the database objects used by the app.

## What is included

- `users` table for application user profiles
- `user_profiles` table for extended user information and roles
- `wedding_bookings`, `baptism_bookings`, `funeral_bookings`, and `confession_bookings`
- `user_directory` view for searchable profile directories
- `user_statistics` view for admin reporting

## How to apply

1. Open your Supabase project.
2. Go to `SQL Editor`.
3. Create a new query and paste the contents of `supabase/schema.sql`.
4. Execute the query.

Alternatively, run this file with Supabase CLI or psql if you have command-line access.

## Notes

- The schema uses `gen_random_uuid()` from the `pgcrypto` extension.
- `user_profiles` is the main profile store used by the app.
- `user_directory` and `user_statistics` support admin search and reporting.

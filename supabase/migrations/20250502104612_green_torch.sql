/*
  # Initial schema setup

  1. New Tables
    - `clothing_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category_id` (text)
      - `subcategory_id` (text)
      - `image_url` (text)
      - `z_index` (integer)
      - `exclusive` (boolean)
      - `can_change_color` (boolean)
      - `default_color` (text)
      - `width` (integer)
      - `height` (integer)
      - `created_at` (timestamptz)
      - `user_id` (uuid, references auth.users)

    - `saved_outfits`
      - `id` (uuid, primary key)
      - `name` (text)
      - `items` (jsonb)
      - `background_color` (text)
      - `created_at` (timestamptz)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create clothing items table
CREATE TABLE clothing_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id text NOT NULL,
  subcategory_id text,
  image_url text NOT NULL,
  z_index integer NOT NULL DEFAULT 1,
  exclusive boolean DEFAULT false,
  can_change_color boolean DEFAULT true,
  default_color text DEFAULT '#ffffff',
  width integer DEFAULT 50,
  height integer DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

-- Create saved outfits table
CREATE TABLE saved_outfits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  items jsonb NOT NULL,
  background_color text DEFAULT '#f9f9f9',
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

-- Enable RLS
ALTER TABLE clothing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_outfits ENABLE ROW LEVEL SECURITY;

-- Policies for clothing items
CREATE POLICY "Users can view all clothing items"
  ON clothing_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can insert clothing items"
  ON clothing_items
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email LIKE '%@admin%'
  ));

CREATE POLICY "Admin users can update their clothing items"
  ON clothing_items
  FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@admin%'
    )
  )
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@admin%'
    )
  );

CREATE POLICY "Admin users can delete their clothing items"
  ON clothing_items
  FOR DELETE
  TO authenticated
  USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@admin%'
    )
  );

-- Policies for saved outfits
CREATE POLICY "Users can view their own saved outfits"
  ON saved_outfits
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create saved outfits"
  ON saved_outfits
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own saved outfits"
  ON saved_outfits
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own saved outfits"
  ON saved_outfits
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
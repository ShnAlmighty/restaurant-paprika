const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

const readRestaurants = async (req, res) => {
  try {
    const { location, cuisine } = req.query;
    
    let { data: restaurants, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('location', location)
      .eq('cuisine', cuisine);

    if (error) {
      throw error;
    }

    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine } = req.body;

    let { data: restaurants, error } = await supabase
      .from('restaurants')
      .insert({ name, location, cuisine })
      .select();
    if (error) {
      throw error;
    }

    res.json(restaurants);
  } catch (error) {
    console.error('Error creating the restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  readRestaurants,
  createRestaurant
}
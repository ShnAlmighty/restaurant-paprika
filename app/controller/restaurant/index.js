const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

const readRestaurants = async (req, res) => {
  try {
    const { latitude=null, longitude=null, cuisine=null, limit = 10, offset = 0 } = req.query;

    let restaurants, error;
    if(!cuisine && (latitude && longitude)){
      let { data, error } = await supabase.rpc('nearby_restaurants', {
        lat: latitude,
        long: longitude,
      })
      .range(Number(offset), Number(offset) + Number(limit) - 1);
      ; 
      restaurants = data;
      error = error;
    } else if(cuisine && latitude && longitude){
      let { data, error } = await supabase.rpc('nearby_restaurants_with_cuisine', {
        lat: latitude,
        long: longitude,
        cuisine
      })
      .range(Number(offset), Number(offset) + Number(limit) - 1);
      ; 
      restaurants = data;
      error = error;
    }

    // let { data: restaurants, error } = await supabase
    //   .from('restaurants')
    //   .select('*')
    //   .eq('cuisine', cuisine)

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
    const { name, longitude, latitude, cuisine } = req.body;

    let { data: restaurants, error } = await supabase
      .from('restaurants')
      .insert({ 
        name, 
        location: `POINT(${longitude} ${latitude})`, 
        cuisine 
      })
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
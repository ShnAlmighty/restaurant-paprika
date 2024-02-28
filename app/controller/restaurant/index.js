const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

const VALID_DIETARY_PREFERENCES = ["vegan", "vegetarian", "gluten-free", "dairy-free", "keto", "non-vegetarian"];

const readRestaurants = async (req, res) => {
  try {
    const { latitude=null, longitude=null, cuisine=null, limit = 10, offset = 0, dietary_preferences: preferences=null } = req.query;
    const dietary_preferences = JSON.parse(preferences); 

    let restaurants, error;
    if(cuisine){
      if(latitude && longitude){
        if(dietary_preferences){
          let { data, error } = await supabase.rpc('nearby_restaurants_with_cuisine_dietary_preferences_v4', {
            latitude,
            longitude,
            cuisine,
            preferences: dietary_preferences
          })
          .range(Number(offset), Number(offset) + Number(limit) - 1);
          restaurants = data;
          error = error;
        } else {
          let { data, error } = await supabase.rpc('nearby_restaurants_with_cuisine_v4', {
            latitude,
            longitude,
            cuisine
          })
          .range(Number(offset), Number(offset) + Number(limit) - 1);
          restaurants = data;
          error = error;
        }
      } else {
        if(dietary_preferences){
          let { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('cuisine', cuisine)
            .overlaps('dietary_preferences', dietary_preferences)
            .range(Number(offset), Number(offset) + Number(limit) - 1);
          restaurants = data;
          error = error;
        } else {
          let { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('cuisine', cuisine)
            .range(Number(offset), Number(offset) + Number(limit) - 1);
          restaurants = data;
          error = error;
        }
      }
    } 
    else {
      if(latitude && longitude){
        if(dietary_preferences){
          let { data, error } = await supabase.rpc('nearby_restaurants_with_preference_v1', {
            latitude,
            longitude,
            preferences: dietary_preferences
          })
          .overlaps('dietary_preferences', dietary_preferences)
          .range(Number(offset), Number(offset) + Number(limit) - 1);
          restaurants = data;
          error = error;
        } else {
          let { data, error } = await supabase.rpc('nearby_restaurants_v4', {
            latitude,
            longitude,
          })
          .range(Number(offset), Number(offset) + Number(limit) - 1);
          restaurants = data;
          error = error;
        }
      } else {
        if(dietary_preferences){
          let { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .overlaps('dietary_preferences', dietary_preferences)
            .range(Number(offset), Number(offset) + Number(limit) - 1);
          restaurants = data;
          error = error;
        } else {
          let { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .range(Number(offset), Number(offset) + Number(limit) - 1);
          restaurants = data;
          error = error; 
        }
      }
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
    const { name, longitude, latitude, cuisine, dietary_preferences } = req.body;

    const is_dietary_preferences_valid = dietary_preferences.every(element => VALID_DIETARY_PREFERENCES.includes(element));
    if(!is_dietary_preferences_valid){
      throw new Error("Invalid dietary preference provided!")
    }

    let { data: restaurants, error } = await supabase
      .from('restaurants')
      .insert({ 
        name, 
        location: `POINT(${longitude} ${latitude})`, 
        dietary_preferences,
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
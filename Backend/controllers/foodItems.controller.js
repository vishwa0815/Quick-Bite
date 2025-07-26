const express = require('express');
const mongoose = require('mongoose');

const fs = require('fs').promises;
const path = require('path');
const Recipe = require('../models/fooditems.model'); // Import your Recipe model

module.exports.fetchFoodItems = async (req, res, next) => {
    try {
        // 1. Read the JSON file
        const filePath = path.join(__dirname, '../food.json');
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);
        
        // 2. Store in MongoDB
        if (data.recipes && data.recipes.length > 0) {
            // Delete existing data (optional)
            await Recipe.deleteMany({});
            
            // Insert new data
            const insertedRecipes = await Recipe.insertMany(data.recipes);
            console.log(`${insertedRecipes.length} recipes inserted into MongoDB`);
        }
        
        // 3. Return the data
        res.status(200).json({
            success: true,
            data: data.recipes
        });
    } catch (error) {
        console.error("Error in fetchFoodItems:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch and store food items",
            error: error.message
        });
    }
};

module.exports.getFoodItems = async (req,res,next) => {
    const data = await Recipe.find({});
    if (!data) {
        return res.status(404).json({
            success: false,
            message: "No food items found"
        });
    }
    try{
        res.status(200).json({
            success: true,
            data: data
        });
    }
catch (error){
    res.json({
        error: error.array()
    })
}
};


module.exports.getFoodItemsByMealType = async (req, res, next) => {
    const { mealType } = req.params; 
    
    try {
        const validMealTypes = Recipe.schema.path('mealType').caster.enumValues;
        
        if (!validMealTypes.includes(mealType)) {
            return res.status(400).json({
                success: false,
                message: `Invalid meal type. Valid types are: ${validMealTypes.join(', ')}`,
                validMealTypes: validMealTypes
            });
        }

        const data = await Recipe.find({ mealType: mealType });
        
        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No food items found for meal type: ${mealType}`
            });
        }

        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });

    } catch (error) {
        console.error('Error fetching food items by meal type:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching food items',
            error: error.message
        });
    }
};


module.exports.getFoodItemById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await Recipe.findOne({ id: parseInt(id) }); // Convert to number if needed
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "No food item found with this ID"
            });
        }
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error('Error fetching food item by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching food item',
            error: error.message
        });
    }
};




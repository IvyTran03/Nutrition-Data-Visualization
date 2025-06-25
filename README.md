# Fruits and Vegetables Nutrition Visualization
This project visualizes the nutritional content of fruits and vegetables to help users better understand fiber, sugar, and other nutrient values. Users can explore the data through interactive charts that compare different nutrients, filtered by food type and preparation (raw or cooked).

## Data Source
[Original dataset on Kaggle]https://www.kaggle.com/datasets/yoyoyloloy/fruits-and-vegetables-nutritional-values?select=fruits.csv

## Features
- Interactive **bar chart** comparing fiber content across fruits and vegetables
- **Scatterplot** with customizable x- and y-axes (e.g., sugar, potassium, vitamin C, carbohydrates)
- **Linked graph interaction**: selecting a data point in the scatterplot highlights the corresponding bar in the bar chart (and vice versa, if applicable)
- **Color encoding** to distinguish food types:
  - Cooked vegetables: orange
  - Raw vegetables: dark green
  - Fruits: green

## Built With
- Javascript
- HTML
- CSS

## How to Run the Visualization
To run the server, open `Terminal` (for Mac) or `Command Prompt` (for Windows). Navigate to the folder `Nutrition-Data-Visualization` using for example, `cd /Nutrition-Data-Visualization`.

You should now be in the directory `Nutrition-Data-Visualization`. Now we will run a python command which will create an HTTP web server for this current directory and all of its sub-directories. In the console execute the following command if you're running Python 2.x:

    python -m SimpleHTTPServer 8080

if you're running Python 3.x or higher, use

    python -m http.server 8080  (or python3 -m http.server 8080)

Now, open your browser and type `http://localhost:8080/` in the URL bar and press enter or go.

## Demo
![Demo]https://imgur.com/a/ogfGgMx

import pandas as pd
import numpy as np
import os
import sqlalchemy
import sqlite3
from flask import (
    Flask,
    render_template,
    jsonify)

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

#################################################
# Database Setup
#################################################

# The database URI
engine = create_engine("sqlite:///db/database.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Trip = Base.classes.trip
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    """Render Home Page."""
    results = session.query(Station.city).distinct()
    cities = [result[0] for result in results]
  
    print(cities)
    return render_template("index.html", cities=cities)

@app.route("/bar")
def default_station_data():
    # Query for the top 10 most popular stations
    results = session.query(Trip.start_station_name, func.count(Trip.start_station_id)).group_by(Trip.start_station_name).order_by(func.count(Trip.start_station_id).desc()).limit(20).all()
    
    # Create lists from the query results
    station_names = [result[0] for result in results]
    trips = [result[1] for result in results]
    
    end_results = session.query(Trip.end_station_name, func.count(Trip.end_station_id)).group_by(Trip.end_station_name).order_by(func.count(Trip.end_station_id).desc()).limit(20).all()
    
    # Create lists from the query results
    end_station_names = [result[0] for result in end_results]
    end_trips = [result[1] for result in end_results]
    
    print(station_names)
    print(trips)
    print("Cephra is amazing!")
    # Generate the plot trace
    trace1 = {
        "x": station_names,
        "y": trips,
        "type": "bar"
    }
    
    trace2 = {
        "x": end_station_names,
        "y": end_trips,
        "type": "bar"
    }
    
    return jsonify(trace1, trace2)

@app.route("/city/<city>")
def get_city_data(city):
    # Query for the top 10 most popular stations
    if city == "San Jose":
        stations = ['San Jose Diridon Caltrain Station', 'San Jose Civic Center',
       'Santa Clara at Almaden', 'Adobe on Almaden', 'San Pedro Square',
       'Paseo de San Antonio', 'San Salvador at 1st', 'Japantown',
       'San Jose City Hall', 'MLK Library', 'SJSU 4th at San Carlos',
       'St James Park', 'Arena Green / SAP Center',
       'SJSU - San Salvador at 9th', 'Santa Clara County Civic Center',
       'Ryland Park']
        
    if city == "Redwood City":
        stations = ['Franklin at Maple', 'Redwood City Caltrain Station',
       'San Mateo County Center', 'Redwood City Public Library',
       'Stanford in Redwood City', 'Redwood City Medical Center',
       'Mezes Park']

    if city == "Mountain View":
        stations = ['Mountain View City Hall', 'Mountain View Caltrain Station',
       'San Antonio Caltrain Station', 'Evelyn Park and Ride',
       'San Antonio Shopping Center', 'Castro Street and El Camino Real',
       'Rengstorff Avenue / California Street']

    if city == "Palo Alto":
        stations = ['Palo Alto Caltrain Station', 'University and Emerson',
       'California Ave Caltrain Station', 'Cowper at University',
       'Park at Olive']

    if city == "San Francisco":
        stations = ['Clay at Battery', 'Davis at Jackson', 'Commercial at Montgomery',
       'Washington at Kearney', 'Post at Kearney',
       'Embarcadero at Vallejo', 'Spear at Folsom',
       'Harry Bridges Plaza (Ferry Building)', 'Embarcadero at Folsom',
       'Powell Street BART', 'Embarcadero at Bryant',
       'Temporary Transbay Terminal (Howard at Beale)', 'Beale at Market',
       '5th at Howard', 'San Francisco City Hall', 'Golden Gate at Polk',
       'Embarcadero at Sansome', '2nd at Townsend', '2nd at Folsom',
       'Howard at 2nd', '2nd at South Park', 'Townsend at 7th',
       'South Van Ness at Market', 'Market at 10th',
       'Yerba Buena Center of the Arts (3rd @ Howard)',
       'San Francisco Caltrain 2 (330 Townsend)',
       'San Francisco Caltrain (Townsend at 4th)',
       'Powell at Post (Union Square)',
       'Civic Center BART (7th at Market)',
       'Grant Avenue at Columbus Avenue', 'Steuart at Market',
       'Mechanics Plaza (Market at Battery)', 'Market at 4th',
       'Market at Sansome', 'Broadway St at Battery St']
    print(stations)
    results = session.query(Trip.start_station_name, func.count(Trip.start_station_id)).filter(Trip.start_station_name.in_(stations)).group_by(Trip.start_station_name).order_by(func.count(Trip.start_station_id).desc()).all()
    print(results)
    # Create lists from the query results
    station_names = [result[0] for result in results]
    start_station_id = [result[1] for result in results]
    
    # Generate the plot trace
    trace = {
        "x": station_names,
        "y": start_station_id,
        "type": "bar"
    }
    return jsonify(trace)


@app.route("/end")
def end_station_data():
    # Query for the top 10 most popular stations
    results = session.query(Trip.end_station_name, func.count(Trip.end_station_id)).group_by(Trip.end_station_name).order_by(func.count(Trip.end_station_id).desc()).limit(20).all()
    
    # Create lists from the query results
    station_names = [result[0] for result in results]
    end_station_id = [result[1] for result in results]
    
    # Generate the plot trace
    trace = {
        "x": station_names,
        "y": end_station_id,
        "type": "bar"
    }
    return jsonify(trace)

if __name__ == '__main__':
    app.run(debug=True)

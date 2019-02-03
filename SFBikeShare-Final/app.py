import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import inspect
from sqlalchemy import MetaData
from sqlalchemy import Table

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################


# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
# db = SQLAlchemy(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/database.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
#Base = automap_base()
# reflect the tables
#Base.prepare(db.engine, reflect=True)

engine2 = db.engine
#connection = engine.connect()


#metadata = MetaData()
#metadata.reflect(bind=db.engine)

# Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
# Samples = Base.classes.samples
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



@app.route("/")
def index():
    """Return the homepage."""
    
    dist_city_sql = (f'SELECT DISTINCT city FROM station ')
    dist_city = pd.read_sql(dist_city_sql, engine2.connect())
    dist_city_list = dist_city["city"].values.tolist()
    dist_city_list
    # results = session.query(Station.city).distinct()
    # cities = [result[0] for result in results]

    return render_template("index.html", cities=dist_city_list)

@app.route("/names")
def names():
    """Return a list of sample names."""

    year_extract = '201'
    avg_sql = (f'SELECT city, substr(start_date, INSTR(start_date, {year_extract}), 4) as yr, ' +
                'avg(duration) as avg_trip ' +
                'FROM trip ' +
                'JOIN station ON trip.start_station_id = station.id ' +
                'GROUP BY city, yr'
                )

    avg_city = pd.read_sql(avg_sql, engine2.connect())
    avg_city['avg_trip'] = avg_city['avg_trip']/60
    avg_city['avg_trip'] = avg_city['avg_trip'].round()
    avg_list = avg_city.to_dict('records')

    yr_2013 = []
    yr_2014 = []
    yr_2015 = []

    for item in avg_list:
        data = {}
        for k,v in item.items():
            if(k=='city'):
                data['axis'] = v
            if(k=='avg_trip'):
                data['value'] = v
            if(k=='yr'and v=='2013'):
                data['name'] = v
                yr_2013.append(data)
            elif(k=='yr'and v=='2014'):
                data['name'] = v
                yr_2014.append(data)
            elif(k=='yr'and v=='2015'):
                data['name'] = v
                yr_2015.append(data)
    
    all_yr = [yr_2015, yr_2014, yr_2013]


    return jsonify(all_yr)

@app.route("/stations")
def stations():
    """Return a list of sample names."""

    year_extract = '201'
    avg_station_sql = (f'SELECT city, name, substr(start_date, INSTR(start_date, {year_extract}), 4) as yr, ' +
                'avg(duration) as avg_trip ' +
                'FROM trip ' +
                'JOIN station ON trip.start_station_id = station.id ' +
                'GROUP BY city, name, yr'
                )

    avg_station = pd.read_sql(avg_station_sql, engine2.connect())

    avg_station['avg_trip'] = avg_station['avg_trip']/60
    avg_station['avg_trip'] = avg_station['avg_trip'].round()
    avg_station_list = avg_station.to_dict('records')

    yrs_2013 = []
    yrs_2014 = []
    yrs_2015 = []

    for item in avg_station_list:
        data = {}
        for k,v in item.items():
            if(k=='name'):
                data['axis'] = v
            if(k=='avg_trip'):
                data['value'] = v
            if(k=='city'):
                data['city'] = v
            if(k=='yr'and v=='2013'):
                data['name'] = v
                yrs_2013.append(data)
            elif(k=='yr'and v=='2014'):
                data['name'] = v
                yrs_2014.append(data)
            elif(k=='yr'and v=='2015'):
                data['name'] = v
                yrs_2015.append(data)
    
    all_yr_station = [yrs_2015, yrs_2014, yrs_2013]


    return jsonify(all_yr_station)


@app.route("/bar")
def default_station_data():
    # # Query for the top 10 most popular stations
    # results = session.query(Trip.start_station_name, func.count(Trip.start_station_id)).group_by(Trip.start_station_name).order_by(func.count(Trip.start_station_id).desc()).limit(20).all()
    
    # # Create lists from the query results
    # station_names = [result[0] for result in results]
    # trips = [result[1] for result in results]

     # Query for the top 20 most popular stations in the bay area
    top_start_sql = ('SELECT start_station_name, COUNT(start_station_id) as ct FROM trip GROUP BY start_station_name')
    top_start = pd.read_sql(top_start_sql, engine.connect())
    top_start_20 = top_start.nlargest(20, 'ct')

    # Create lists from the query results
    start_station = top_start_20["start_station_name"].values.tolist()
    start_ct = top_start_20["ct"].values.tolist()

    
    # end_results = session.query(Trip.end_station_name, func.count(Trip.end_station_id)).group_by(Trip.end_station_name).order_by(func.count(Trip.end_station_id).desc()).limit(20).all()
    
    # # Create lists from the query results
    # end_station_names = [result[0] for result in end_results]
    # start_ct = [result[1] for result in end_results]

    # Query for the top 20 most popular stations in the bay area
    top_end_sql = ('SELECT end_station_name, COUNT(end_station_id) as ct FROM trip GROUP BY end_station_name')
    top_end = pd.read_sql(top_end_sql, engine.connect())
    top_end_20 = top_end.nlargest(20, 'ct')

    # Create lists from the query results
    end_station = top_end_20["end_station_name"].values.tolist()
    end_ct = top_end_20["ct"].values.tolist()
    
    print(start_station)
    print(start_ct)
    print("Cephra is amazing!")

    # Generate the plot trace
    trace1 = {
        "x": start_station,
        "y": start_ct,
        "type": "bar"
    }
    
    trace2 = {
        "x": end_station,
        "y": end_ct,
        "type": "bar"
    }
    
    return jsonify(trace1, trace2)

@app.route("/city/<city>")
def get_city_data(city):
    # Query for the top 10 most popular stations
    # print("flask "+ city)
    # stations = []
    # if city == "San Jose":
    #     stations = ['San Jose Diridon Caltrain Station', 'San Jose Civic Center',
    #    'Santa Clara at Almaden', 'Adobe on Almaden', 'San Pedro Square',
    #    'Paseo de San Antonio', 'San Salvador at 1st', 'Japantown',
    #    'San Jose City Hall', 'MLK Library', 'SJSU 4th at San Carlos',
    #    'St James Park', 'Arena Green / SAP Center',
    #    'SJSU - San Salvador at 9th', 'Santa Clara County Civic Center',
    #    'Ryland Park']
        
    # if city == "Redwood City":
    #     stations = ['Franklin at Maple', 'Redwood City Caltrain Station',
    #    'San Mateo County Center', 'Redwood City Public Library',
    #    'Stanford in Redwood City', 'Redwood City Medical Center',
    #    'Mezes Park']

    # if city == "Mountain View":
    #     stations = ['Mountain View City Hall', 'Mountain View Caltrain Station',
    #    'San Antonio Caltrain Station', 'Evelyn Park and Ride',
    #    'San Antonio Shopping Center', 'Castro Street and El Camino Real',
    #    'Rengstorff Avenue / California Street']

    # if city == "Palo Alto":
    #     stations = ['Palo Alto Caltrain Station', 'University and Emerson',
    #    'California Ave Caltrain Station', 'Cowper at University',
    #    'Park at Olive']

    # if city == "San Francisco":
    #     stations = ['Clay at Battery', 'Davis at Jackson', 'Commercial at Montgomery',
    #    'Washington at Kearney', 'Post at Kearney',
    #    'Embarcadero at Vallejo', 'Spear at Folsom',
    #    'Harry Bridges Plaza (Ferry Building)', 'Embarcadero at Folsom',
    #    'Powell Street BART', 'Embarcadero at Bryant',
    #    'Temporary Transbay Terminal (Howard at Beale)', 'Beale at Market',
    #    '5th at Howard', 'San Francisco City Hall', 'Golden Gate at Polk',
    #    'Embarcadero at Sansome', '2nd at Townsend', '2nd at Folsom',
    #    'Howard at 2nd', '2nd at South Park', 'Townsend at 7th',
    #    'South Van Ness at Market', 'Market at 10th',
    #    'Yerba Buena Center of the Arts (3rd @ Howard)',
    #    'San Francisco Caltrain 2 (330 Townsend)',
    #    'San Francisco Caltrain (Townsend at 4th)',
    #    'Powell at Post (Union Square)',
    #    'Civic Center BART (7th at Market)',
    #    'Grant Avenue at Columbus Avenue', 'Steuart at Market',
    #    'Mechanics Plaza (Market at Battery)', 'Market at 4th',
    #    'Market at Sansome', 'Broadway St at Battery St']
    # print(stations)


    # results = session.query(Trip.start_station_name, func.count(Trip.start_station_id)).filter(Trip.start_station_name.in_(stations)).group_by(Trip.start_station_name).order_by(func.count(Trip.start_station_id).desc()).all()
    # print(results)

    station_ct_sql =('SELECT city, start_station_name, COUNT(start_station_id) as ct '
                 'FROM trip JOIN station on trip.start_station_id = station.id '
                 'GROUP BY city, start_station_name')

    station_ct = pd.read_sql(station_ct_sql, engine.connect())

    selected_city=city
    station_ct_select = station_ct[station_ct["city"]==selected_city].nlargest(10, 'ct')

    # Create lists from the query results
    # station_names = [result[0] for result in results]
    # start_station_id = [result[1] for result in results]

    station_names = station_ct_select["start_station_name"].values.tolist()
    start_station_id = station_ct_select["ct"].values.tolist()
    
    # # Generate the plot trace
    trace = {
        "x": station_names,
        "y": start_station_id,
        "type": "bar"
    }

    # temp = ['1', '2']
    return jsonify(trace)


@app.route("/end/<city>")
def end_station_data(city):
    # Query for the top 10 most popular stations
    # results = session.query(Trip.end_station_name, func.count(Trip.end_station_id)).group_by(Trip.end_station_name).order_by(func.count(Trip.end_station_id).desc()).limit(20).all()
    
    # # Create lists from the query results
    # station_names = [result[0] for result in results]
    # end_station_id = [result[1] for result in results]
    
    # Query for the top 10 most popular stations
    station_end_ct_sql =('SELECT city, end_station_name, COUNT(end_station_id) as ct '
                 'FROM trip JOIN station on trip.start_station_id = station.id '
                 'GROUP BY city, end_station_name')

    station_end_ct = pd.read_sql(station_end_ct_sql, engine.connect())

    selected_city = city
    station_end_ct_select = station_end_ct[station_end_ct["city"]==selected_city].nlargest(10, 'ct')

    end_station_names = station_end_ct_select["end_station_name"].values.tolist()
    end_station_id = station_end_ct_select["ct"].values.tolist()
    
    # Generate the plot trace
    trace = {
        "x": end_station_names,
        "y": end_station_id,
        "type": "bar"
    }
    return jsonify(trace)


if __name__ == "__main__":
    app.run()

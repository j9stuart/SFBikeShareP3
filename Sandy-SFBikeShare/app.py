import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
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

engine = db.engine
#connection = engine.connect()


#metadata = MetaData()
#metadata.reflect(bind=db.engine)

# Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
# Samples = Base.classes.samples


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

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

    avg_city = pd.read_sql(avg_sql, engine.connect())
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

    avg_station = pd.read_sql(avg_station_sql, engine.connect())

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

# @app.route("/names")
# def names():
#     """Return a list of sample names."""

#     # Use Pandas to perform the sql query
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Return a list of the column names (sample names)
#     return jsonify(list(df.columns)[2:])


# @app.route("/metadata/<sample>")
# def sample_metadata(sample):
#     """Return the MetaData for a given sample."""
#     sel = [
#         Samples_Metadata.sample,
#         Samples_Metadata.ETHNICITY,
#         Samples_Metadata.GENDER,
#         Samples_Metadata.AGE,
#         Samples_Metadata.LOCATION,
#         Samples_Metadata.BBTYPE,
#         Samples_Metadata.WFREQ,
#     ]

#     results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         sample_metadata["sample"] = result[0]
#         sample_metadata["ETHNICITY"] = result[1]
#         sample_metadata["GENDER"] = result[2]
#         sample_metadata["AGE"] = result[3]
#         sample_metadata["LOCATION"] = result[4]
#         sample_metadata["BBTYPE"] = result[5]
#         sample_metadata["WFREQ"] = result[6]

#     print(sample_metadata)
#     return jsonify(sample_metadata)


# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run()

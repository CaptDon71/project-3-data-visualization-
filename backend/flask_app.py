# Imports
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc
from flask import Flask, jsonify

app = Flask(__name__)

# Database Setup
database_path = "./backend/processed-data/birdstrike_db.sqlite"
engine = create_engine(f"sqlite:///{database_path}", echo=True)

Base = automap_base()
Base.prepare(autoload_with=engine, reflect=True)

Birdstrikes = Base.classes.Birdstrikes
Airports = Base.classes.Airports

@app.route("/")
def home():
    return("Welcome to the home page")

@app.route("/strikes-by-airport")
def strikes_by_airport():
    session = Session(engine)
   
    
    strike_query = session\
        .query(
            Airports.AIRPORT,
            func.count(Birdstrikes.INDEX_NR),
            Airports.AIRPORT_LATITUDE,
            Airports.AIRPORT_LONGITUDE
        )\
        .filter(Birdstrikes.AIRPORT == Airports.AIRPORT)\
        .group_by(Birdstrikes.AIRPORT)\
        .order_by(desc(func.count(Birdstrikes.INDEX_NR)))\
        .all()
    
    output = jsonify([{
        "airport_name" : value[0],
        "strike_count" : value[1],
        "latitude"     : value[2],
        "longitude"    : value[3]
    } for value in strike_query])

    session.close()

    output.headers.add('Access-Control-Allow-Origin', '*')

    return output
      


if __name__ == "__main__":
	app.run(debug=True)
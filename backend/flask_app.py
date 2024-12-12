# Imports
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc, extract
from flask import Flask, jsonify

app = Flask(__name__)

# Database Setup
database_path = "./backend/processed-data/birdstrike_db.sqlite"
engine = create_engine(f"sqlite:///{database_path}", echo=True)

Base = automap_base()
Base.prepare(autoload_with=engine, reflect=True)

Birdstrikes = Base.classes.Birdstrikes
Airports = Base.classes.Airports

# Dropdown Values
dropdown_1_value = "option11"
dropdown_2_value = "option21"
dropdown_3_value = "option31"

# Selected Area
selected_area = "All States"

# Airport Limit
airport_limit = "All Airports"

@app.route("/")
def home():
    return("Welcome to the home page")

# Got the idea to add the "Access-Control-Allow-Origin" header from user 'Salvador Dali' on this StackOverflow article
# https://stackoverflow.com/questions/26980713/solve-cross-origin-resource-sharing-with-flask

# Updating dropdown values so that we can change queries based on their output
@app.route("/update_dropdown_1/<update_value>")
def update_dropdown_1(update_value):
    global dropdown_1_value
    dropdown_1_value = update_value

    output = jsonify({ "response" : "200 - OK" })
    output.headers.add('Access-Control-Allow-Origin', '*')
    return output

@app.route("/update_dropdown_2/<update_value>")
def update_dropdown_2(update_value):
    global dropdown_2_value
    dropdown_2_value = update_value
    
    output = jsonify({ "response" : "200 - OK" })
    output.headers.add('Access-Control-Allow-Origin', '*')
    return output

@app.route("/update_dropdown_3/<update_value>")
def update_dropdown_3(update_value):
    global dropdown_3_value
    dropdown_3_value = update_value
    
    output = jsonify({ "response" : "200 - OK" })
    output.headers.add('Access-Control-Allow-Origin', '*')
    return output

@app.route("/update_selected_area/<area>")
def update_selected_area(area):
    global selected_area
    selected_area = area
    
    output = jsonify({ "response" : "200 - OK" })
    output.headers.add('Access-Control-Allow-Origin', '*')
    return output

@app.route("/update_airport_limit/<limit>")
def update_airport_limit(limit):
    global airport_limit
    airport_limit = limit
    
    output = jsonify({ "response" : "200 - OK" })
    output.headers.add('Access-Control-Allow-Origin', '*')
    return output

@app.route("/strikes-by-airport")
def strikes_by_airport():
    global selected_area
    global airport_limit

    session = Session(engine)

    strike_query = []
    
    if (selected_area == "All States"):
        strike_query = session\
            .query(
                Airports.AIRPORT,
                func.count(Birdstrikes.INDEX_NR),
                Airports.AIRPORT_LATITUDE,
                Airports.AIRPORT_LONGITUDE
            )\
            .filter(Birdstrikes.AIRPORT == Airports.AIRPORT)\
            .group_by(Birdstrikes.AIRPORT)\
            .order_by(desc(func.count(Birdstrikes.INDEX_NR)))
    else:
        strike_query = session\
            .query(
                Airports.AIRPORT,
                func.count(Birdstrikes.INDEX_NR),
                Airports.AIRPORT_LATITUDE,
                Airports.AIRPORT_LONGITUDE
            )\
            .filter(Birdstrikes.STATE == selected_area)\
            .filter(Birdstrikes.AIRPORT == Airports.AIRPORT)\
            .group_by(Birdstrikes.AIRPORT)\
            .order_by(desc(func.count(Birdstrikes.INDEX_NR)))
        
    if (airport_limit == "All Airports"):
        strike_query = strike_query.all()
    else:
        strike_query = strike_query.limit(airport_limit).all()
    
    output = jsonify([{
        "airport_name" : value[0],
        "strike_count" : value[1],
        "latitude"     : value[2],
        "longitude"    : value[3]
    } for value in strike_query])

    session.close()

    output.headers.add('Access-Control-Allow-Origin', '*')

    return output
      
@app.route("/state_center_zoom")
def state_center_zoom():
    global selected_area
    
    dropdown_1_values = {
        "All States" : [39.8283, -98.5795,  4],
        "AL" : [32.3182, -86.9023,  7],
        "AK" : [63.5888, -154.4931, 4],
        "AZ" : [34.0489, -111.0937, 7],
        "AR" : [35.2010, -91.8318,  7],
        "CA" : [36.7783, -119.4179, 6],
        "CO" : [39.5501, -105.7821, 7],
        "CT" : [41.6032, -73.0877,  9],
        "DE" : [38.9108, -75.5277,  9],
        "FL" : [27.6648, -81.5158,6.5],
        "GA" : [32.1574, -82.9071,  7],
        "HI" : [19.8987, -155.6659, 7],
        "ID" : [44.0682, -114.7420, 6],
        "IL" : [40.6331, -89.3985,6.5],
        "IN" : [40.5512, -85.6024,  7],
        "IA" : [42.0167, -93.1635,  7],
        "KA" : [39.0119, -98.4842,  7],
        "KY" : [37.8393, -84.2700,  7],
        "LA" : [30.5191, -91.5209,  7],
        "ME" : [45.2538, -69.4455,  7],
        "MD" : [39.0458, -76.6413,  7],
        "MA" : [42.4072, -71.3824,  8],
        "MI" : [44.2520, -85.4012,6.5],
        "MN" : [46.7296, -94.6859,  6],
        "MS" : [32.3547, -89.3985,  7],
        "MO" : [39.5081, -91.5288,  7],
        "MT" : [46.8797, -110.3626, 6],
        "NE" : [41.4925, -99.9018,  7],
        "NV" : [38.8026, -116.4194, 6], 
        "NH" : [43.1939, -71.5724,  7],
        "NJ" : [40.0583, -74.4057,  8],
        "NM" : [34.9727,-105.0324,6.5],
        "NY" : [43.2994, -74.2179,6.5],
        "NC" : [35.7596, -79.0193,  7],  
        "ND" : [47.1164, -101.2996, 7],
        "OH" : [40.0640, -81.5290,  7],
        "OK" : [35.0078, -97.0929,  7],
        "OR" : [43.8041, -120.5542, 7],
        "PA" : [41.2033, -77.1945,  7],
        "RI" : [41.5801, -71.4774,  9],
        "SC" : [33.8361, -81.1637,  7],
        "SD" : [43.9695, -99.9018,  7],
        "TN" : [35.5175, -86.5804,  7],
        "TX" : [31.9686, -99.9018,  6],
        "UT" : [40.7607,-111.8939,6.5],
        "VT" : [44.5588, -72.5778,7.5],
        "VA" : [37.4316, -78.6569,  7],
        "WA" : [47.7511, -120.7401, 7],
        "WV" : [38.5976, -80.4549,  7],
        "WI" : [43.7844, -88.7879,  7],
        "WY" : [43.0760, -107.2903, 7]
    }

    output = jsonify(dropdown_1_values[selected_area])

    output.headers.add('Access-Control-Allow-Origin', '*')

    return output

# Alecs Flask API Endpoint
@app.route("/grouped-bar-data")
def grouped_bar_data():
    global selected_area
    global airport_limit

    session = Session(engine)

    query_result = []

    if (airport_limit == "All Airports"):
        query_result = session\
            .query(Birdstrikes.DAMAGE_LEVEL, Birdstrikes.SIZE,  func.count(Birdstrikes.INDEX_NR).label("frequency"), Birdstrikes.STATE)\
            .filter(Birdstrikes.DAMAGE_LEVEL != "No Damage")\
            .filter(Birdstrikes.DAMAGE_LEVEL != "Unknown Damage")
    else:
        query_result = session\
            .query(Birdstrikes.DAMAGE_LEVEL, Birdstrikes.SIZE,  func.count(Birdstrikes.INDEX_NR).label("frequency"), Birdstrikes.STATE)\
            .filter(Birdstrikes.DAMAGE_LEVEL != "No Damage")\
            .filter(Birdstrikes.DAMAGE_LEVEL != "Unknown Damage")\
            .filter(Birdstrikes.AIRPORT == Airports.AIRPORT)\
            .filter(Airports.RANKING < airport_limit)
       
    if (selected_area == "All States"):
        # Query data grouped by damage level and size
        query_result = query_result\
            .group_by(Birdstrikes.DAMAGE_LEVEL, Birdstrikes.SIZE)\
            .all()
    else:
        # Query data grouped by damage level and size
        query_result = query_result\
            .filter(Birdstrikes.STATE == selected_area)\
            .group_by(Birdstrikes.DAMAGE_LEVEL, Birdstrikes.SIZE)\
            .all()

    # Exclude 'No Damage' and 'Unknown Damage'
    output = jsonify([{
        "damage_level": row[0],
        "size": row[1],
        "frequency": row[2],
    } for row in query_result])

    session.close()

    output.headers.add('Access-Control-Allow-Origin', '*')

    return output

@app.route("/incidents_per_aircraft")
def incidents_per_aircraft():
    global selected_area
    global airport_limit
    
    session = Session(engine)
    
    query_result = []

    if (airport_limit == "All Airports"):
        query_result = session\
            .query(Birdstrikes.AIRCRAFT, func.count(Birdstrikes.INDEX_NR))\
            .where(Birdstrikes.AIRCRAFT.isnot(None))
    else:
        query_result = session\
            .query(Birdstrikes.AIRCRAFT, func.count(Birdstrikes.INDEX_NR))\
            .where(Birdstrikes.AIRCRAFT.isnot(None))\
            .filter(Birdstrikes.AIRPORT == Airports.AIRPORT)\
            .filter(Airports.RANKING < airport_limit)
            
            
    if (selected_area == "All States"):
        query_result = query_result\
            .group_by(Birdstrikes.AIRCRAFT)\
            .order_by(Birdstrikes.AIRCRAFT)\
            .all()
    else:
        query_result = query_result\
            .filter(Birdstrikes.STATE == selected_area)\
            .group_by(Birdstrikes.AIRCRAFT)\
            .order_by(Birdstrikes.AIRCRAFT)\
            .all()
        
    session.close()

    output = jsonify([{
        "aircraft" : row[0],
        "count"    : row[1]
    } for row in query_result])

    output.headers.add('Access-Control-Allow-Origin', '*')

    return output


@app.route("/graph_data/graph_2")
def graph_2_data():
    global selected_area
    global airport_limit

    session = Session(engine)

    query_result = []

    if (airport_limit == "All Airports"):
        query_result = session\
            .query(func.count(Birdstrikes.INDEX_NR), extract('month', func.date(Birdstrikes.INCIDENT_DATE)))
    else:
        query_result = session\
            .query(func.count(Birdstrikes.INDEX_NR), extract('month', func.date(Birdstrikes.INCIDENT_DATE)))\
            .filter(Birdstrikes.AIRPORT == Airports.AIRPORT)\
            .filter(Airports.RANKING < airport_limit)

    if (selected_area == "All States"):
        query_result = query_result\
            .group_by(extract('month', func.date(Birdstrikes.INCIDENT_DATE)))\
            .all()
    else:
        query_result = query_result\
            .filter(Birdstrikes.STATE == selected_area)\
            .group_by(extract('month', func.date(Birdstrikes.INCIDENT_DATE)))\
            .all()

    session.close()

    output = jsonify([{
        "month" : row[1],
        "count" : row[0]
    } for row in query_result])

    output.headers.add('Access-Control-Allow-Origin', '*')

    return output
    
if __name__ == "__main__":
	app.run(debug=True)
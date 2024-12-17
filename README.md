**Project 3 Data Visualization Track**
---
Bird Strikes in Aviation: Analyzing Aircraft Collisions with Birds to Enhance Aviation Safety

**Purpose:**
---
Bird strikes pose a significant threat to aviation safety, with potential risks to both aircraft operations and human life. This project aims to analyze bird strike data to better understand the frequency, causes, and impact of bird collisions with aircraft, with the ultimate goal of enhancing aviation safety. By leveraging data analysis techniques, the project seeks to identify trends and patterns in bird strike incidents.

**Instructions**
---
1) Launch the Flask App located at './backend/flask_app.py' (Note that this Flask app requires the use of the 'Flask' and 'SQLAlchemy' Python libraries)
2) Launch the dashboard by running a local server using the './frontend/index.html' file (make sure the port this is being run on is different from the one the Flask app is running on). We used the 'Live Server' extension in VS Code to run the HTML code.
3) Access the dashboard via your browser at the URL given to you by Live Server (by default it is http://127.0.0.1:5500/frontend/index.html)
4) In the graph view, you can get a larger and more in depth version of each of the graphs by clicking on them (note that I am talking about the graph itself, and not its surrounding div. Clicking the surrounding div will do nothing). To exit out of the larger graph view, click the graph again. 
5) For graph #1, if you need to see more information about each individual aircraft, you can hold the control key and hover over each bar to learn more information.
---
- **IMPORTANT** DO NOT change the options in the filters in quickly. Doing so will break the query system and mess up the graphs updating. Update one filter at a time, giving reasonable buffer room for the API to respond and the graphs to update with accurate information.
- There are two views for this dashboard, a "graph view" that displays three graphs that analyze various parts of the data, and a "leaflet view" that displays a leaflet map of all of the airports in the dataset, with each airport being represented by a bubbles whose size is dictated by the total number of birdstrikes that occurred at that airport. The user can swap between these two options by hitting the switch below the two filters on the dashboard.
- There are two filters that the user can interact with on the dashboard. The first will filter the data by state, and the second will filter the data for the top however many airports you want to select in the dataset. The first filter works the same way for both the leaflet map and the graphs, but the second filter works a bit differently for these two different parts of the project for performance reasons.
    - The graph view of the dashboard will find the top however many airports by total number of birdstrikes, filter only for the user defined number of airports, then will break down that number by state. This was done because we cannot group the data by airport in the queries for the graphs and still get the output that we want.
    - The leaflet view of the dashboard will filter for datapoints in a given state, then find the top however many airports in the state by total number of birdstrikes. This means that it will display the top however many airports in a state when a specific state is selected instead of the top however many airports for the whole dataset  (this is only shown when "All States" is selected)
- All data is pulled through our Flask app using an API. The flask app pulls data from the './backend/processed-data/birdstrike_dv.sqlite' file, which was generated by first running the code in the './backend/faa-data-processor.ipynb' file, then the code in the './backend/sqlite-creation.ipynb' file.
- The actual excel file that this code pulls data from is not included in this repo as it was too large to push (and would result in us not being able to push code to the repo). You can download the data by hitting the 'Download Excel' button on the following website'https://wildlife.faa.gov/search'. The code will only successfully run if you add this excel into a folder labeled 'raw-data' in the 'backend' folder, then run the code in the aforementioned Jupyter Notebooks.


**Ethical Considerations**
---
This project prioritized ethical considerations by utilizing anonymized FAA data in compliance with public access policies, ensuring confidentiality and focusing on enhancing aviation safety. Efforts were made to avoid biases by accounting for variables such as flight frequency and geography, preventing misleading correlations. Findings were framed to emphasize safety and risk mitigation rather than assigning blame to specific aircraft, airlines, or regions. The dataset provides valuable insights into bird strike patterns, analyzing factors like aircraft type, location, flight phase, and species involved. These insights help identify risk factors and trends, supporting strategies to reduce the frequency and impact of bird strikes and ultimately improving aviation safety.

**Outside Code Reference**
---
- The only outside code consulted during the creation of this project (other than code found in official documentation) is the code suggestion given by the user 'Salvador Dali' on the following Stack Overflow post(https://stackoverflow.com/questions/26980713/solve-cross-origin-resource-sharing-with-flask). This code was added to all of the endpoints of our Flask API so that our website could actually access and modify data contained in the API. (We added 'output.headers.add('Access-Control-Allow-Origin', '*');' to all of our flask endpoints).
- Color palette from the following website : https://colorhunt.co/palette/89a8b2b3c8cfe5e1daf1f0e8 

**Data Source Reference**  
---
- **Author:** The Federal Aviation Administration
- **Title:** FAA Wildlife Strike Database
- **Source:** wildlife.faa.gov
- **URL:** https://wildlife.faa.gov/search (We used the 'Download Excel' button to download the dataset)
- **Accessed:** 12/07/2024

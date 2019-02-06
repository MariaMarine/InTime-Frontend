# InTime

Telerik Academy Alpha JavaScript Aug'18 Track <br>
Team 8 Final Project Assignment

## Contributors
[Maria Marinova](https://gitlab.com/Marinova)
<br>
[Stefan Georgiev](https://gitlab.com/StefanGeorgiev)

## Project Description
> The InTime web app visualizes travel time between preselected intersections over a certain period.
> It relies on data from hardware installed at various key points that detects drivers’ mobile devices and then calculates the travel time between the different points.
> The goal of the InTime web app is to provide traffic engineers with a highly customizeable summary of the raw data relevant to their needs.


# Project Features

####  Features by **access type**:<br>
1. [Public Part](#public-part) <br>
1. [Admin Part](#admin-part) <br>
1. [User Part](#user-part) <br>
2. [Misc pages](#misc-pages) <br>

####  Detailed description of **reports**:<br>
1. [Multipoint route table reports](#multipoint-route-table-reports)
1. [Multiperiod chart reports](multiperiod-chart-reports)


## Public Part
<img src="./screenshots/home.jpg"><br>
- Homepage with a carousel of inspirational images/text
- Navbar with register and login functionality
- Registration form is available to any user who wants to get a feel of how the web app works

## Admin Part

> After authentication, admin users are authorized to view and access the admin sections of the web app (Devices section and Users section) through the navbar menu. 
- Devices section: admin users can add, remove and edit devices and their details (name, latitude, longitude). The list of devices can be sorted in ascending/descending order.
- Users section: admins can create or remove accounts for view users. The list of users can be sorted in ascending/descending order. 
 - Profile page: admin users can change their password  
 - Reportings section: admin users can create, edit, view and delete reports as well as vidualize the different routes on the maps. See more on Reports.

## User Part
> When an admin creates a view user's account, the user receives login instructions via an automatically generated email. Upon authentication, users can access their Profile page and the Reportings section through the navbar menu.
- Profile page: users can change their password                                        
- Reportings section: users can create, edit, view and delete reports as well as visualize the different routes on the maps.
- View users cannot access the Devices and Users Sections (but can view available devices through the Reportings section).

# Reports
> The reports overview page is split in two responsive panes: map view on the left and a reports tab on the right. Users can collapse one of the panes or drag the splitter to a screen position of their choice.

## Multipoint route table reports
- Create table form: users can input a name and period (in hours) and select amongst the devices registered by their admin (selection of multiple devices is possible). CRUD operations on other table reports are disabled while in create table mode.
- Table reports contain travel time data in seconds between each two of the selected devices, in both directions of travel. Origin device names are in the leftmost column, whereas destination device names are in the header row.
- Table reports can be toggled on and off by clicking on the chevron icon.
- Table reports can be deleted by clicking on the bin icon.
- Table reports can be edited by clicking on the pencil icon. The edit form is prepopulated with the current data for the report. Users can change the name, period, add and remove devices and save the updated report (or cancel any changes). 
- Table reports' devices position can be visualized on the map by clicking on the pin icon.
- Users can set minimum and maximum expected travel time for a route by clicking on the corresponding cell in the table report. Travel time exceeding the maximum is visualized in red, travel time within limits but exceeding the average expected time is visualized in yellow, travel time within limits and not exceeding the average expected time is visualized in green and travel time that does not reach to the minimum expected time is visualized in darkgrey. Cells that do not have a set min/max expected travel time do not have a background.

## Multiperiod chart reports
- Create chart form: users can input a name, select origin and destination amongst the devices registered by their admin and select a date-time range for the report. Users can then add multiple other starting dates/times to compare travel time data for the same route over the same length of time. To ensure that comparisons are always done over the same length of time the duration is automatically calculated for the first date-time range selected and is then added on to each additional starting date.
- Travel time data between origin and destination is visualized as a coloured line for each of the periods selected, with a legend on the bottom of the chart. Users can toggle one or more of the lines on and off. Users can zoom in and scroll within the charts.
- The Y axis of the chart represents travel time in minutes, while the X axis represents the period. Labels on the X axis are generated depending on the duration of the comparison periods - reports spanning up to 2 hours have labels for each 15 minute period, while reports with a longer span have labels on every hour.
- Chart reports can be toggled on and off by clicking on the chevron icon.
- Chart reports can be deleted by clicking on the bin icon.
- Chart reports can be edited by clicking on the pencil icon. The edit form is prepopulated with the current data for the report. Users can change the name, origin, destination, date-time range, as well as add and remove additional starting dates, and save the updated report (or cancel any changes).
- Table reports' devices position can be visualized on the map by clicking on the pin icon.
- Users can export a chart report as a pdf.

## Misc pages
- Entering an invalid url results in a redirect to a custom error page.
- In the event of a server error, users will see a custom error page. 

# Built with:

# License:

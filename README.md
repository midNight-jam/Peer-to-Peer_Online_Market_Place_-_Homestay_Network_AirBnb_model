
CMPE 273 – Enterprise Distributed Systems – Team Project
    
    Team


  Team Number 4

  Team Member SJSU ID
  
  Aniruddha Pratap Singh 011432317
  
  Gaurang Mahatre 011432200
  
  Jayam Malviya 011435567
  
  Kunal Ahuja 010731227
  
  Mayank Sharma 011435320
  
  Prateek Sharma 011475620
  
Member Contribution towards the Group Project

• Aniruddha Pratap Singh:
Design and development of Host Module – Back End
Pagination

• Gaurang Mhatre :
Design and development of Admin module – Front End
Redis Caching

• Jayam Malviya:
Admin Analytics
Log Analysis

• Kunal Ahuja :
Design and development of trip module- backend
Google Map API Integration

• Mayank Tanwar:
Design and development of Host Module – Front End
User Authentication

• Prateek Sharma :
Design and development of trip bidding
Trip Module-front End.

     Introduction

The application is the replica of Airbnb. In this project we are building an application
where the user can either host other people by renting his property for a short period of
time or the user can be a guest if he books property hosted by other user. The user can
make payment, view the listings on map and provide reviews for other properties and
people.
Purpose of System
We learn web development using MEAN stack and RabbitMQ a message broker which
uses AMQP protocol for scalability. We have also used Redis for cache management.

• Front End/GUI Technologies

HTML

CSS/Bootstrap

JavaScript

Angular JavaScript
  
• Back End/ Server Technologies

  Node Java Script
  
  Rabbit MQ (Message Broker)


• Databases
 
 MongoDB
  
  MySQL
   
  Redis (for caching)
  
 
• Framework
 Express


    Object Management Policy
 
     • Requirement Analysis:
Planning and requirement analysis phase is the first phase of our application, as
per the requirements the application is divided into three layers:


1. Presentation Layer: The presentation layer consists of the graphical user
interface of our application. The user interacts with the user interface to send
requests to the server.


2. Business Layer: The business layer consists of the implementation of business
logic. In this layer we translate the functional requirements into working code,
that is, this layer is responsible for processing of the requests received from
the user and to return valid response. The modules have been implemented
using the message broker Rabbit MQ which implements the Advance
Messaging and Queuing Protocol. The various modules are also integrated in
this layer.


    Data Layer: 

The data layer comprises of the database to store the data for
various modules. In this layer we define the relationship between different
tables. We have used both MongoDB and MySQL to store the data.

      
      • Modules:
We have implemented various modules as per the requirements namely, Host,
Trips, Billing and Admin. The host model stores the data about the host and the
property he has listed. The trips module stores the data about the trip of the user.
The billing module stores the bills for various trips and admin model has the data
for all the users, their trips, lists and bills. Each of these module has its own
characteristics and schema.


    • Implementation:

We have implemented the user interface and various functionalities for each of
the modules mentioned above. We have implemented key features like address
validator to validate the address of the property entered by the user, maps using
google map API which the properties in a particular area on google map. We have
used Rabbit MQ as message broker between the client and server which makes
the application reliable and scalable. We have also used Redis for caching sql data.


    • Testing:

We have tested our application using mocha and jmeter. The various graphs
shown below discusses the result of jmeter testing. We also tested application
using Mocha to check if the functionalities are as expected.
v How we handled “Heavy Weight” resources.


The heavy weight resources in our application are the profiles images and profile videos
of the user, the images of the property that the user saved while listing his property for
rent and the images uploaded by the user while reviewing a property. We have followed
industry best practices and used Amazon S3 to store these images, retrieving the images
from cloud is less expensive than fetching the images from database.
 
 The policy you used to decide when to write data into the database
We are storing the data into the database optimally. For Example, while posting a
property on rent the user has to enter the information about the property in multiple
pages, we are not storing the data into the database at each page rather we store the
data in the database only at the last step, this way if the user wishes to cancel the booking
in between we don’t have to rollback all the data and also we don’t have to store the data
into the database at each step. 

Similarly, in trips we are fetching the listings of a particular
city only once from the database and then we store this data in local storage, we use this
locally saved data in the next booking screens and save the data about the booking at the
last step.

For deatiled description read the  Project_Report_Peer-To-Peer-Online-MarketPlace.pdf


#!/usr/bin/python
from MySQLdb import *

def getActive(connection, user):
    sessionID = user['parkingSessions'].split(chr(31))
    response = []
    if sessionID != "":
        for i in range(0, len(sessionID)):
            sqlquery = "SELECT * FROM parking_sessions WHERE sessionID = '{0}'".format(sessionID[i])
            result = connection.execute(sqlquery)
            result = connection.fetchone()
            curr = []
            curr.append(result['address'])
            curr.append(result['rego'])
            curr.append(result['expiryTime'])
            response.append(curr)
    return ['0', response]
        

def getVehicles(connection, user):
    vehicleRego = user['rego'].split(chr(31))
    vehicleDescription = user['description'].split(chr(31))
    output = []
    for i in range(len(vehicleRego)):
        curr = []
        curr.append(vehicleRego[i])
        curr.append(vehicleDescription[i])
        output.append(curr)
    return ["0", output]
        
    
def createSession(connection, user, rego, coords, expiryTime):
    #create a parking session
    zone = getZone(connection, coords)
    sqlquery = "INSERT INTO parking_sessions (rego, coords, expiryTime, parkingZone) VALUES ({0}, {1}, {2}, {3})".format(rego, coords, expiryTime, zone)
    a = connection.execute(sqlquery)
    sessionID = connection.lastrowid
    sqlquery = "UPDATE user_data SET parkingSessions = CONCAT(parkingSessions, {0}) WHERE user_id = '{1}'".format(str(sessionID)+chr(31), user['user_id'])
    a = connection.execute(sqlquery)
    
    return ['0']
def deleteSession(connection, user, rego):
    #delete a parking session
    sqlquery = "SELECT * FROM parking_sessions WHERE rego = {0}".format(rego)
    response = connection.execute(sqlquery)
    session = connection.fetchone()
    sessionID = session['sessionID']
    sqlquery = "DELETE * FROM parking_sessions WHERE rego = {0}".format(rego)
    a = connection.execute(sqlquery)
    sessions = user['parkingSessions'].split(chr(31))
    newSessions = []
    for i in range(len(sessions)):
        if sessions[i] != sessionID:
            newSessions.append(sessions[i])
            
    sqlquery = "UPDATE user_data SET parkingSessions = {0} WHERE user_id = {1}".format(chr(31).join(newSessions), user['user_id'])
    a = connection.execute(sqlquery)
    
def extendSession(connection, rego, expiryTime):
    #extend the time left on a parking session
    sqlquery = "UPDATE parking_sessions SET expiryTime = {0} WHERE rego = {1}".format(expiryTime, rego)
    a = connection.execute(sqlquery)
    
    return ['0']
def getZone(connection, coords):
    #get the zone the car is currently in
    #get code from larry
    return ["0"]

def pointInPolygon(coords, poly):
    '''
    //  Globals which should be set before calling this function:
    //
    //  int    polyCorners  =  how many corners the polygon has (no repeats)
    //  float  polyX[]      =  horizontal coordinates of corners
    //  float  polyY[]      =  vertical coordinates of corners
    //  float  x, y         =  point to be tested
    //
    //  (Globals are used in this example for purposes of speed.  Change as
    //  desired.)
    //
    //  The function will return YES if the point x,y is inside the polygon, or
    //  NO if it is not.  If the point is exactly on the edge of the polygon,
    //  then the function may return YES or NO.
    //
    //  Note that division by zero is avoided because the division is protected
    //  by the "if" clause which surrounds it.
    '''
    x = coords[0]
    y = coord[1]
    polyCorners = len(poly)
    i, j = polyCorners-1
    oddNodes= False
    for i in range(polyCorners):
        if (poly[i][0]<y and poly[j][1]>=y or polyY[j]<y and polyY[i]>=y):
           if (poly[i][0]+(y-poly[i][1])/(poly[j][1]-poly[i][1])*(poly[j][0]-poly[i][0])<x):
                oddNodes=not(oddNodes)
        j=i
    return ['0', oddNodes]


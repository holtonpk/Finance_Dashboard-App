from flask import Flask, request
from flask_cors import CORS
import requests
import json
from datetime import date, timedelta, datetime


def strToDate(dateString):
    Date = datetime.strptime(dateString, '%Y-%m-%d %H:%M:%S.%f')
    return Date


def getTransactions(days, increment):
    today = datetime.today()
    startDate = datetime.today() - timedelta(days=days)

    res = requests.get("http://localhost:5000/data/transactions/all")
    responseUnfiltered = json.loads(res.text)['items']

    response = []
    for item in responseUnfiltered:
        if (strToDate(item['date']) <= today + timedelta(days=1)
                and strToDate(item['date']) >= startDate):
            response.append(item)

    response4 = json.loads(res.text)
    dataArray = []
    labelArray = []

    # calculate account total before range
    res2 = requests.get("http://localhost:5000/data/transactions/all")
    response2 = json.loads(res2.text)['items']
    accountTotal = 0
    startValue = 0

    for item in response2:
        if (strToDate(item['date']) < startDate):
            accountTotal += item['amount']
            startValue += item['amount']

    # create labels
    labelDate = startDate
    while labelDate <= today:
        labelArray.append(labelDate)
        labelDate += increment
    if (labelArray[len(labelArray) - 1] != today):
        labelArray.append(today)

    # print('len', labelArray)

    for x in range(len(labelArray)):
        for y in range(len(response)):
            itemDate = datetime.strptime(response[y]['date'],
                                         '%Y-%m-%d %H:%M:%S.%f')
            if (len(labelArray) - 1 >= x + 1):
                if (itemDate >= labelArray[x]
                        and itemDate <= labelArray[x + 1]):
                    accountTotal += response[y]['amount']
            if (len(labelArray) - 1 == x):
                # print(labelArray[x].date(), itemDate.date())
                if (itemDate.date() == labelArray[x].date()):
                    accountTotal += response[y]['amount']
        dataArray.append(accountTotal)

    return {
        "accountTotal": accountTotal,
        "startValue": startValue,
        "data": dataArray,
        "labels": labelArray
    }
    # return response


main = Flask(__name__)
CORS(main)


@main.route("/data")
def getData():
    res = requests.get(
        'http://127.0.0.1:8090/api/collections/transactions/records',
        params={"perPage": 432})
    response = json.loads(res.text)
    return response


@main.route("/createTransaction", methods=['POST'])
def createTransaction():
    transactionData = request.get_json()
    res = requests.post(
        'http://127.0.0.1:8090/api/collections/transactions/records',
        json=transactionData)
    return "Done", 201


@main.route("/deleteTransaction", methods=['DELETE'])
def deleteTransaction():
    transID = request.get_json()['id']
    res = requests.delete(
        'http://127.0.0.1:8090/api/collections/transactions/records/' +
        transID)
    return "Done", 201


@main.route("/data/transactions/all")
def getTotal():

    allRecords = []

    res1 = requests.get(
        'http://127.0.0.1:8090/api/collections/transactions/records',
        params={"perPage": 400})

    totalPages = int(json.loads(res1.text)['totalPages'])
    totalAmount = 0
    for i in range(1, totalPages + 1):
        res = requests.get(
            'http://127.0.0.1:8090/api/collections/transactions/records',
            params={
                "page": i,
                "perPage": 400
            })
        for record in json.loads(res.text)['items']:
            allRecords.append(record)
            totalAmount += record['amount']

    return {
        "items": allRecords,
        "totalItems": len(allRecords),
        "totalAmount": totalAmount
    }


@main.route("/data/transactions/1w")
def getWeek():
    return getTransactions(7, timedelta(hours=6))


@main.route("/data/transactions/1m")
def getMonth():
    return getTransactions(30, timedelta(hours=6))


@main.route("/data/transactions/3m")
def get3Month():
    return getTransactions(90, timedelta(days=1))


@main.route("/data/transactions/1y")
def getYear():
    return getTransactions(365, timedelta(days=3))
    # return {"item":"1"}


@main.route("/data/transactions/3y")
def get3Year():
    return getTransactions(1095, timedelta(days=7))


if __name__ == "__main__":
    main.run(debug=True, host="localhost", port=5000)

import pymongo

# import schedule
# import time
# import requests
# import sys
# import json
# import random
import re
# import datetime
from bson.objectid import ObjectId
from pymongo import ReadPreference
from datetime import datetime, timedelta, date

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
}
myclient = pymongo.MongoClient(
    "mongodb://8d03da95e99e5607c5dd804e5fa2ca3d:dbd5d44906de2cae719f7daef994362fcarbikec645dea65bb482e04c8dda4e0c1def22@15.206.219.185:27017/?authSource=admin",
    directConnection=True,
)
mydb = myclient["carbike360-admin"]
collection_import_lead_data = mydb["tv_models"]
mobileData = collection_import_lead_data.find(
    {},
    {"slug": 1, "brandSlug": 1, "brandName": 1, "Name": 1},
)
replaceData = {"$set": {}}

for models in mobileData:
    originalBrandName = models["brandName"]
    brandName = originalBrandName.replace("Televisions", "").strip()
    dataFliter = {"_id": models["_id"], "slug": models["slug"]}
    if "Televisions" in originalBrandName:
        replaceData = {"$set": {"brandName": brandName}}

    if originalBrandName.replace("Televisions", "").strip() in models["Name"] or originalBrandName.replace("Televisions", "").upper().strip() in models["Name"] or originalBrandName.replace("Televisions", "").lower().strip() in models["Name"] or originalBrandName.replace("Televisions", "").capitalize().strip() in models["Name"]:
        brand_name_regex = re.compile(re.escape(brandName), re.IGNORECASE)
        replaceData = {
            "$set": {
                **replaceData["$set"],
                "Name":re.sub(brand_name_regex, "", models["Name"]).strip(),
            }
        }
    print(originalBrandName)
    print(models["Name"])
    print(dataFliter)
    print('replaceData========',replaceData)
    if len(replaceData["$set"]) > 0:
        # collection_import_lead_data.update_many(dataFliter, replaceData)
        replaceData = {"$set": {}}

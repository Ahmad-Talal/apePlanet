from selenium import webdriver
from apscheduler.schedulers.background import BackgroundScheduler
import os
import chromedriver_autoinstaller
import mechanicalsoup
from bs4 import BeautifulSoup
import time
import json
import os
import pandas as pd
import schedule
from django.shortcuts import render
from django.db import connections

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

from ..models import *
from ..serializers import *

from base.serializers import UserSerializer, UserSerializerWithToken      
from django.contrib.auth.hashers import make_password
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView  
from datetime import datetime
from time import sleep
from random import randint

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom claims
        serializer = UserSerializerWithToken(self.user).data

        for keys , values in serializer.items():
                data[keys] = values
        # ...

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([IsAdminUser])
def registerUser(request):
        data = request.data
        try:
                user = User.objects.create(
                        first_name= data['name'],
                        username= data['email'],
                        email= data['email'],
                        password= make_password(data['password'])
                )
                serializer = UserSerializerWithToken(user,many=False)
                return Response(serializer.data)
        except:
                message = {'detail' : 'User with this email already exists'}
                return Response (message,status=status.HTTP_400_BAD_REQUEST)          

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
        user=request.user
        serializer= UserSerializer(user,many=False)
        return Response(serializer.data)  

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
        user=request.user
        serializer= UserSerializerWithToken(user,many=False)
        data =request.data

        user.first_name=data['name']
        user.username=data['email']
        user.email=data['email']

        if data['password'] != '':
                user.password= make_password(data['password'])
        user.save()
        
        return Response(serializer.data)  


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
        users=User.objects.all()
        serializer= UserSerializer(users,many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserThroughID(request,pk):
        user=User.objects.get(id=pk)
        serializer= UserSerializer(user,many=False)
        return Response(serializer.data)     

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request,pk):
        user=User.objects.get(id=pk)
        
        data =request.data

        user.first_name= data['name']
        user.username= data['email']
        user.email= data['email']
        user.is_staff =data['is_Admin']
        user.save()

        serializer= UserSerializer(user,many=False)
        return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delUser(request,pk):
        userToDel=User.objects.get(id=pk)
        userToDel.delete()
        return Response("User Deleted...")


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCampaign(request):
    data = request.data
    user = request.user

    campaign = Campaign.objects.create(
            user =user,
            projectName= data['projectName'],
            platform= data['platform'],
            integration= data['integration'],
            assign= data['assign'],
            gaId= data['gaId'],
            fbId= data['fbId'],
            name= data['name'],
            accountName= data['accountName'],
            password= data['password'],
            )
    serializer= CampaignSerializer(campaign,many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getCampaign(request, pk):
        try:
                campaign=Campaign.objects.get(assign=pk)
                serializer= CampaignSerializer(campaign,many=False)
                return Response(serializer.data) 
        except:
                return Response({'detail':'You have not been assigned any campaign'})       


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCampaigns(request):
        campaigns=Campaign.objects.all()
        serializer= CampaignSerializer(campaigns,many=True)
        print("idher")
        print(connections['default'].queries)
        return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delCampaign(request,pk):
        campaignToDel=Campaign.objects.get(_id=pk)
        campaignToDel.delete()
        return Response("Campaign Deleted...")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCampaignByID(request, pk):
        campaign=Campaign.objects.get(_id=pk)
        serializer= CampaignSerializer(campaign,many=False)
        return Response(serializer.data)

@api_view(['GET'])
def getClientID(request):
        c=ClientId.objects.get(_id=1)
        serializer= ClientSerializer(c,many=False)
        return Response(serializer.data)
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateClientID(request,pk):
        data = request.data
        user = request.user
        #print("pkkkkkk",pk)
        c=ClientId.objects.get(_id=pk)
        c.cl = data['cl']
        print("cccccc",c.cl)
        #print("object",c)
        serializer= ClientSerializer(c,many=False)

        return Response(serializer.data)                


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editCampaign(request,pk):
    data = request.data
    user = request.user

    campaign = Campaign.objects.get(_id=pk)
    campaign.user =user
    campaign.projectName= data['projectName']
    campaign.platform= data['platform']
    campaign.integration= data['integration']
    campaign.assign= data['assign']
    campaign.gaId= data['gaId']
    campaign.fbId= data['fbId']
    campaign.name= data['name']
    campaign.accountName= data['accountName']
    campaign.password= data['password']
    
    campaign.save()
    serializer= CampaignSerializer(campaign,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editCampaignAccountName(request,pk):
        data = request.data
        campaigns = Campaign.objects.all()
        c=0
        for i in campaigns:
                if i.accountName == pk:
                        i.accountName = data['accountName']
                        i.save()
                        c=c+1
        serializer= CampaignSerializer(campaigns,many=True)
        if (c==0):
                return Response({'detail':'Your old account name does not match with any'})       
        else:        
                return Response({'detail':'Successfully updated the account name'})

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editCampaignName(request,pk):
        data = request.data
        campaigns = Campaign.objects.all()
        c=0
        for i in campaigns:
                if i.name == pk:
                        i.name = data['name']
                        i.save()
                        c=c+1
        serializer= CampaignSerializer(campaigns,many=True)
        if (c==0):
                return Response({'detail':'Your old campaign name does not match with any'})       
        else:        
                return Response({'detail':'Successfully updated the campaign name'})

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editCampaignPassword(request,pk):
        data = request.data
        campaigns = Campaign.objects.all()
        c=0
        for i in campaigns:
                if i.password == pk:
                        i.password = data['password']
                        i.save()
                        c=c+1
        serializer= CampaignSerializer(campaigns,many=True)
        if (c==0):
                return Response({'detail':'Your old password does not match with any'})       
        else:        
                return Response({'detail':'Successfully updated the account password'})


def getIndiegogoData():


        campaigns = Campaign.objects.all()

        for x in campaigns:
                if x.platform=="Indiegogo":
                        name = x.name
                        account = x.accountName
                        pas = x.password
                        ass = x.assign
                        print("yesaddddddd")
                        print(pas,account,name,"assign->",x.assign)
                        try:
                                #campaign=Campaign.objects.get(assign=pk)

                                chromedriver_autoinstaller.install()

                                options = webdriver.ChromeOptions()
                                # options.add_argument('--headless')
                                # options.add_argument('--disable-gpu')
                                p = os.getcwd()+"\\"
                                #print(p)       
                                prefs = {"download.default_directory" :p}
                                options.add_experimental_option("prefs",prefs)
                                driver = webdriver.Chrome(options = options)
                                # nam = campaign.name
                                # print(nam)
                                # s="https://www.indiegogo.com/command_center/{}/insights".format(nam)
                                # driver.get(s)
                                driver.get(f"https://www.indiegogo.com/command_center/{name}/insights")
                                time.sleep(7)
                                el = driver.find_element_by_xpath('/html/body/div[3]/div/div/div[3]/div/div/div[3]/form/input[3]').send_keys(account)
                                el = driver.find_element_by_xpath("/html/body/div[3]/div/div/div[3]/div/div/div[3]/form/input[4]").send_keys(pas)

                                # time.sleep(2)


                                el = driver.find_element_by_xpath("/html/body/div[3]/div/div/div[3]/div/div/div[3]/form/input[5]").click()
                                time.sleep(10)
                                driver.find_element_by_xpath('//*[@id="CybotCookiebotDialogBodyButtonAccept"]').click()
                                time.sleep(6)
                                driver.execute_script("window.scrollTo(0, 1080)") 
                                time.sleep(6)
                                visits = driver.find_element_by_xpath('//*[@id="stats_bar_experiment"]/div/div[2]/div/div[3]/div[1]').text
                                backers = driver.find_element_by_xpath('//*[@id="stats_bar_experiment"]/div/div[2]/div/div[2]/div[1]').text
                                funs = driver.find_element_by_xpath('//*[@id="stats_bar_experiment"]/div/div[1]/div[2]/div/div[1]/span').text

                                x = {"vists":visits, "backers":backers,"funs":funs}

                                # print(visits)
                                # print(backers)
                                # print(funs)

                                #print(x)

                                l = []

                                driver.find_element_by_xpath('//*[@id="sources-region-experiment"]/div/div[2]/a').click()
                                driver.find_element_by_xpath('//*[@id="iggAppLayout"]/div/div[2]/div[2]/command-center/div/div/div/insights-tab/div/div[4]/div/div[2]/a').click()
                                time.sleep(7)

                                c = pd.read_csv(p+"\\countries.csv")
                                c.to_json(p+"\\countries.json")

                                c = pd.read_csv(p+"\\domains.csv")
                                c.to_json(p+"\\domains.json")
                                driver.close()


                                f = open(p+"\\countries.json","r")
                                f1 = open(p+"\\domains.json","r")

                                # print(json.load(f))
                                # driver.find_element_by_class_name('cta-4 cta-4--small cta-4--purple pull-right ng-binding').click()


                                # print("json.load(f)     ",json.load(f))
                                # print("json.load(f1)     ",json.load(f1))

                                l.append(json.load(f))
                                l.append(json.load(f1))
                                l.append({"misc":x})

                                #print(l)
                        
                                # with open("data.json","w") as f:
                                #     json.dump(l, f,indent=4)
                                # print(driver.find_element_by_class_name("value ng-binding").text)

                                os.remove(p+"\\countries.csv")
                                os.remove(p+"\\domains.csv")
                                
                                # with open("data.json","w") as f:
                                #         json.dump(l, f,indent=4)
                                # # print(driver.find_element_by_class_name("value ng-binding").text)
                                # serializer= CampaignSerializer(l,many=False)
                                #print("l",l,sep='\n')
                                indiegogoScrapper = Indiegogo.objects.create(
                                        jsondata  =  l,
                                        unique = ass,
                                        createdAt =  datetime.now()
                                                                )
                                print("indiegogoScrapper.json vala",indiegogoScrapper.jsondata,sep='\n')                                
                                #return Response(indiegogoScrapper.jsondata) 

                                
                        except Exception as e:
                                print(e)
                                print("Could not fetch the data")
                                #return Response({'detail':'Could not fetch the data'})   
 

def getKickData():
        campaigns = Campaign.objects.all()

        print(list(campaigns))
        for x in campaigns:
                if x.platform=="kickstarter":
                        name = x.name
                        account = x.accountName
                        pas = x.password
                        ass = x.assign

                        try:
                                browser = mechanicalsoup.StatefulBrowser(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36")
                                browser.open("https://www.kickstarter.com")
                                browser.open("https://www.kickstarter.com/login?ref=nav")

                                sleep(randint(1,2))
                                browser.select_form('form[action="/user_sessions"]')
                                browser["user_session[email]"] = account
                                browser["user_session[password]"] = pas

                                after_login = browser.submit_selected()

                                campaign_page = browser.open(f"https://www.kickstarter.com/projects/imag1/{name}/dashboard?ref=creator_nav")

                                soup = BeautifulSoup(campaign_page.text, 'html.parser')

                                all_money = soup.find_all("span", class_="money")
                                pleged, avg_pleged, pleged_via_kickstarter, pleged_via_external, pleged_via_custom = (money.text for money in all_money)

                                top_page_stats = soup.find("div", class_="stats-numbers").find_all("h1")[1:]
                                funded, backers, sec_to_go = (stat.text for stat in top_page_stats)

                                project_followers_div = soup.find("div", class_="flex mr2").find_all("span",class_="block type-38 soft-black bold")
                                proj_followers, converted_followers, conversion_rate = (follower.text for follower in project_followers_div)

                                proj_video_plays = soup.find("h5", class_="stats_num").text

                                project_id = json.loads(soup.find_all("div", attrs={'data-attrs' : True})[0]['data-attrs'])["projectId"]

                                # refrerrers = browser.open(f"https://www.kickstarter.com/project_referrers/refs/stats?page=1&project_id={project_id}").json()
                                
                                l=[]
                                l.append({
                                        "Pleged" : pleged,
                                        "average_Pleged" : avg_pleged,
                                        "pleged_via_kickstarter" : pleged_via_kickstarter,
                                        "pleged_via_external" : pleged_via_external,
                                        "pleged_via_custom" : pleged_via_custom,
                                        "funded" : funded,
                                        "backers" : backers,
                                        "sec_to_go" : sec_to_go,
                                        "proj_followers" : proj_followers,
                                        "converted_followers" : converted_followers,
                                        "conversion_rate" : conversion_rate,
                                        "proj_video_plays" : proj_video_plays,
                                        "project_id" : project_id
                                        # "Referrers" : refrerrers
                                })
                                kickstarterScrapper = Kickstarter.objects.create(
                                        jsondata  =  l,
                                        unique = ass,
                                        createdAt =  datetime.now()
                                                                )
                                print("KickstarterScrapper.json vala",kickstarterScrapper.jsondata,sep='\n')    
                        except Exception as e:
                                print({"error" : e})
                                return 

@api_view(['GET'])
def getIndiegogoDaily(request,pk):
        tog=Indiegogo.objects.all()
        lis = []
        for i in tog:
                if i.unique==int(pk):
                        lis.append(i)
        print(lis[0])
        daily=lis[-1]
        serializer= IndiegogoSerializer(daily,many=False)
        return Response(serializer.data)

@api_view(['GET'])
def getIndiegogoAll(request,pk):
        tog=Indiegogo.objects.all()
        lis = []
        for i in tog:
                if i.unique==int(pk):
                        lis.append(i)
        alll = lis
        serializer= IndiegogoSerializer(alll,many=True)
        return Response(serializer.data)

@api_view(['GET'])
def getKickstarterDaily(request,pk):
        tog=Kickstarter.objects.all()
        lis = []
        for i in tog:
                if i.unique==int(pk):
                        lis.append(i)
        # print(lis[0])
        daily=lis[-1]
        serializer= KickstarterSerializer(daily,many=False)
        return Response(serializer.data)

@api_view(['GET'])
def getKickstarterAll(request,pk):
        tog=Kickstarter.objects.all()
        lis = []
        for i in tog:
                if i.unique==int(pk):
                        lis.append(i)
        alll = lis
        serializer= KickstarterSerializer(alll,many=True)
        return Response(serializer.data)

@api_view(['GET'])
def getToken(request,pk):
        token=Token.objects.get(_id=pk)
        serializer= TokenSerializer(token,many=False)
        return Response(serializer.data)

@api_view(['PUT'])
def updateToken(request,pk):
        data = request.data
        token=Token.objects.get(_id=pk)
        token.fbToken = data['fbToken']
        token.save() 
        serializer= TokenSerializer(token,many=False)
        return Response(serializer.data)


def job():
        print("time")

def callAll():
        getIndiegogoData()
        getKickData()

def start():
        dd=datetime.now()
        scheduler= BackgroundScheduler()
        scheduler.add_job(callAll,'date', run_date=f'{dd.year}-{dd.month}-{dd.day} 23:37:05')
        scheduler.start()


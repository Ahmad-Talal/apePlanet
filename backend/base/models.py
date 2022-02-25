from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Kickstarter(models.Model):
    jsondata=models.JSONField(blank=True,null=True)
    unique = models.IntegerField(default=0,null=True,blank=True)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.AutoField(primary_key=True,editable=False)
    def __str__(self):
        return str(self.createdAt)


class Indiegogo(models.Model):
    jsondata=models.JSONField(blank=True,null=True)
    unique = models.IntegerField(default=0,null=True,blank=True)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.AutoField(primary_key=True,editable=False)
    def __str__(self):
        return str(self.createdAt)

class ClientId(models.Model):
    user=models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    cl= models.CharField(max_length=200,null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.cl

class Campaign(models.Model):
    user=models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    projectName=models.CharField(max_length=200,null=True,blank=True)
    
    platform= models.CharField(max_length=200,null=True,blank=True)
    integration=models.CharField(max_length=200,null=True,blank=True)
    createdAt=models.DateTimeField(auto_now_add=True)
    assign= models.IntegerField(default=0,null=True,blank=True)
    gaId= models.IntegerField(default=0,null=True,blank=True)
    fbId= models.IntegerField(default=0,null=True,blank=True)
    name= models.CharField(max_length=200,null=True,blank=True)
    accountName= models.CharField(max_length=200,null=True,blank=True)
    password= models.CharField(max_length=200,null=True,blank=True)
    
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.projectName


class Patient(models.Model):
    user=models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    name=models.CharField(max_length=200,null=True,blank=True)
    date=models.DateTimeField(auto_now_add=True)
    sex=models.CharField(max_length=200,null=True,blank=True)
    age = models.IntegerField(default=0,null=True,blank=True)
    referred_by=models.CharField(max_length=200,null=True,blank=True)
    assistant= models.CharField(max_length=200,null=True,blank=True)
    endoscopist= models.CharField(max_length=200,null=True,blank=True)
    indications = models.CharField(max_length=200,null=True,blank=True)
    medications = models.CharField(max_length=200,null=True,blank=True)
    findings = models.TextField(null=True,blank=True)
    diagnosis=models.CharField(max_length=200,null=True,blank=True)
    recommendations= models.CharField(max_length=200,null=True,blank=True)
    
    
    pic1=models.ImageField(null=True,blank=True,default='/def.jpg')
    pic2=models.ImageField(null=True,blank=True,default='/def.jpg')
    pic3=models.ImageField(null=True,blank=True,default='/def.jpg')
    pic4=models.ImageField(null=True,blank=True,default='/def.jpg')
    _id=models.AutoField(primary_key=True,editable=False)   
    def __str__(self):
        return self.name

class Token(models.Model):
    user=models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    fbToken= models.TextField(null=True,blank=True)
    googleToken= models.TextField(null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.fbToken
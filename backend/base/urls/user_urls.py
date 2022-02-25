from django.urls import path
from base.views import user_views as views
# from rest_framework_simplejwt.views import(
#     TokenObtainPairView,
#)


urlpatterns=[
    path('login/', views.MyTokenObtainPairView.as_view(),
    name='token_obtain_pair'),
    
    path('register/',views.registerUser, name='register'),
    path('profile/',views.getUserProfile, name='users-profile'),
    path('',views.getUsers, name='users-list'),
    
    path('profile/update/',views.updateUserProfile, name='user-profile-update'),
    path('',views.getUsers, name='users'), 
    path('create/',views.createCampaign, name='create-campaign'),
    path('campaigns/',views.getCampaigns,name='campaigns-all'),
    
    path('clientid/',views.getClientID,name='client-id'),
    
    
    

    # path('kickstarter/',views.getKickData,name='kickstarter'), 

    path('campaign/<str:pk>/',views.getCampaign,name='campaign'),

    path('clientid/change/<str:pk>/',views.updateClientID,name='update-clientid'),

    path('indiegogo/daily/<str:pk>/',views.getIndiegogoDaily,name='indiegogo-daily'),
    path('indiegogo/all/<str:pk>/',views.getIndiegogoAll,name='indiegogo-all'),

    path('kickstarter/daily/<str:pk>/',views.getKickstarterDaily,name='kickstarter-daily'),
    path('kickstarter/all/<str:pk>/',views.getKickstarterAll,name='kickstarter-all'),

    path('campaign/account/name/<str:pk>/',views.editCampaignAccountName,name='campaign-account-name'),
    path('campaign/name/<str:pk>/',views.editCampaignName,name='campaign-name'),
    path('campaign/password/<str:pk>/',views.editCampaignPassword,name='campaign-password'),

    path('campaign/edit/<str:pk>/',views.editCampaign,name='edit-campaign'), 
    path('<str:pk>/',views.getUserThroughID, name='user'),
    
    
     

    path('update/<str:pk>/',views.updateUser, name='user-update'), 
    path('delete/<str:pk>/',views.delUser, name='user-delete'),
    path('campaign/delete/<str:pk>/',views.delCampaign, name='campaign-delete'),
    path('campaign/<str:pk>/id/',views.getCampaignByID,name='get-campaign'),

    path('token/<str:pk>/',views.getToken,name='get-token'),
    path('token/send/<str:pk>/',views.updateToken,name='update-token'),

    # path('google/token/<str:pk>/',views.getGoogleToken,name='get-google-token'),
    path('google/token/send/<str:pk>/',views.updateGoogleToken,name='update-google-token'),
    
]
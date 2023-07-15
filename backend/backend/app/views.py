import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from backend.backend.app.models import Company, Student

# Create your views here.

@csrf_exempt
def test(request):
    
    data = {
        'success' : True,
        'message' : 'Vanakkam Bruh!!'
    }
    
    return JsonResponse(data)


@csrf_exempt
def register(request):
    formdata = json.loads(request.body)
    
    user_role = formdata['user_role']
    
    try:
        if(user_role=='company'):
            username=formdata['username']
            password=formdata['password']
            mail=formdata['mail']
            phone=formdata['phone']
            category=formdata['category']
            company = formdata['company']
            
            if(Company.objects.filter(username = username).exists):
                data = {
                    'success' : False,
                    'message' : 'Username Already Exists!!'
                }
                
            else:
                
                company = Company.objects.create(
                    
                )
        
        else:
            username = formdata['username']
            password = formdata['password']
            mail = formdata['mail']
            phone = formdata['phone']
            college = formdata['college']
            cgpa = formdata['cgpa']
            batch = formdata['batch']
            degree = formdata['degree']
            stream = formdata['stream']
            
            if(Student.objects.filter(username = username).exists):
                data = {
                    'success' : False,
                    'message' : 'Username Already Exists!!'
                }
                
            else:
            
                student = Student.objects.create(
                    username = username,
                    password = password,
                    mail = mail,
                    phone = phone,
                    college = college,
                    cgpa = batch,
                    degree = degree,
                    stream = stream
                )
                
                student.save()
                
                data = {
                    'success' : True,
                    'message' : 'Registration Successfull!!'
                }
        
            return JsonResponse(data) 
    
    except Exception as e:
        print(e)
        data = {
            'success' : False,
            'message' : 'Registration Failed!!'
        }
        
        return JsonResponse(data) 
                
    
    
       
    

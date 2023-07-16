import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Company, Job, Student

# from backend.backend.app.models import Company, Student

# Create your views here.

@csrf_exempt
def test(request):
    
    data = {
        'success' : True,
        'message' : 'Vanakkam Bruh...'
    }
    
    # return JsonResponse(data)

@csrf_exempt
def home(request):
    
    data = {
        'success' : True,
        'message' : 'Home Bruh...'
    }
    
    return JsonResponse(data)

@csrf_exempt
def register(request):
    formdata = json.loads(request.body)
    
    user_role = formdata['user_role']
    
    try:
        if(user_role=='Company'):
            username=formdata['username']
            password=formdata['password']
            mail=formdata['mail']
            phone=formdata['phone']
            category=formdata['category']
            company = formdata['company']
            type = formdata['type']
            hr_name = formdata['hr_name']
            
            print(formdata)
            
            if(len(Company.objects.filter(username = username))>0):
                data = {
                    'success' : False,
                    'message' : 'Username Already Exists!!'
                }
                return JsonResponse(data)
                
            else:
                company = Company.objects.create(
                    username = username,
                    company = company,
                    password = password,
                    mail = mail,
                    phone = phone,
                    category = category,
                    type = type,
                    hr_name = hr_name
                )
                
                company.save()
                
                data = {
                    'success' : True,
                    'message' : 'Registration Successfull!!'
                }
                return JsonResponse(data)
        
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
            name = formdata['name']
            
            
            if(len(Student.objects.filter(username = username))>0):
                data = {
                    'success' : False,
                    'message' : 'Username Already Exists!!'
                }
                return JsonResponse(data)
                
            else:
            
                student = Student.objects.create(
                    username = username,
                    password = password,
                    mail = mail,
                    phone = phone,
                    college = college,
                    cgpa = cgpa,
                    batch = batch,
                    degree = degree,
                    stream = stream,
                    name = name
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

@csrf_exempt
def login(request):
    username = request.GET['username']
    password = request.GET['password']
    user_role = request.GET['user_role']
    
    if(user_role=='Student'):
        if(Student.objects.filter(username = username, password = password).exists()):
            name = Student.objects.get(username = username).name
            student = Student.objects.get(username = username)
            data = {
                'success' : True,
                'message' : f'Welcome {name}',
                'user_data' : {
                    'name' : student.name,
                    'mail' : student.mail,
                    'phone' : student.phone,
                    'college' : student.college,
                    'cgpa' : student.cgpa,
                    'batch' : student.batch,
                    'degree' : student.degree,
                    'stream' : student.stream
                }
            }
            
        else:
            data = {
                'success' : False,
                'message' : 'User Not Found!!',
                'user_data' : ''
            }
        return JsonResponse(data)
    
    else:
        if(Company.objects.filter(username = username, password = password).exists()):
            company = Company.objects.get(username = username)
            data = {
                'success' : True,
                'message' : f'Welcome {company.hr_name}',
                'user_data' : {
                    'company' : company.company,
                    'type' : company.type,
                    'category' : company.category,
                    'hr_name' : company.hr_name,
                    'mail' : company.mail,
                    'phone' : company.phone,
                }
            }
        else:
            data = {
                'success' : False,
                'message' : 'User Not Found!!'
            }
        return JsonResponse(data)

@csrf_exempt
def publish_job(request):
    try:
        formdata = json.loads(request.body)
    
        company = formdata['company']
        role = formdata['role']
        job_desc = formdata['job_desc']
        salary = formdata['salary']
        # salary_unit = formdata['salary_unit']
        location = formdata['location']
        duration = formdata['duration']
        # date_unit = formdata['date_unit']
        job_type = formdata['job_type']
        
        
        job = Job.objects.create(
            company = company,
            role = role,
            job_desc = job_desc,
            job_type = job_type,
            salary = salary,
            location = location,
            duration = duration,
        )
        
        job.save()
        
        data = {
            'success' : True,
            'message' : 'Job Published Successfully!!'
        }
    
    except Exception as e:
        print(e)
        data = {
            'success' : False,
            'message' : 'Job Publish Failed!!'
        }
    
    return JsonResponse(data)

@csrf_exempt
def apply_job(request):
    pass

@csrf_exempt
def save_job(request):
    pass

@csrf_exempt
def view_applicants(request):
    pass

def change_status(request):
    pass

@csrf_exempt
def get_jobs(request):
    jobs = []
    
    # try:
    formdata = request.GET
    
    job_type = formdata['job_type_filter']
    category = formdata['job_category_filter']  
    
    print(formdata)
    companies = Company.objects.all()
    
    if(category!='All'):
        companies = companies.filter(category = category)
    
    company_lst = companies.values('company')
    
    # jobs = Job.objects.all()
    jobs_lst = []
    
    if(job_type!='All'):
        jobs_lst = Job.objects.filter(job_type = job_type, company__in=company_lst).values(
            'job_id',
            'company',
            'role',
            'job_desc',
            'job_type',
            'salary',
            'duration',
            'date',
        )
        print(jobs_lst)
    else:
        jobs_lst = Job.objects.filter(company__in=company_lst).values(
            'job_id',
            'company',
            'role',
            'job_desc',
            'job_type',
            'salary',
            'duration',
            'date',
        )
    
    jobs = list(jobs_lst)
    
    data = {
        'success' : True,
        'jobs' : jobs
    }
    return JsonResponse(data)
           
    
    # except Exception as e:
        
    #     print('Exception : '+e)
        
    #     data = {
    #         'success' : False,
    #         'message' : e,
    #         'jobs' : jobs
    #     }
        
    #     return JsonResponse(data)
    
    
    
       
    

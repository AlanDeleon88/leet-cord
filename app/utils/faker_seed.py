from faker import Faker
fake = Faker()

#TODO add a generator for profile_pictures
def generate_first_name():
    firstName = fake.first_name()
    return firstName

def generate_last_name():
    lastName = fake.last_name()
    return lastName

def generate_username():
    username = fake.user_name()
    return username

def generate_email():
    email = fake.ascii_company_email()
    return email

def generate_server_name():
    server_name = fake.text(max_nb_chars=13).replace('.','')
    return server_name

def generate_server_desc():
    description = fake.text(max_nb_chars=20).replace('.','')
    return description

def generate_server_icon():
    icon = fake.image_url(width = 80, height= 80)
    return icon

def generate_server_message():
    message = fake.text(max_nb_chars = 80)
    return message

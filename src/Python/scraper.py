# scraper.py
import requests
from bs4 import BeautifulSoup
import json

def scrape_internships():
    url = 'https://www.example.com/internships'  # Replace with the target URL
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    internships = []

    for internship in soup.find_all('div', class_='internship-listing'):  # Adjust the selectors as needed
        company_name = internship.find('h3', class_='company-name').text
        location = internship.find('p', class_='location').text
        email = internship.find('a', class_='email').get('href')
        phone = internship.find('p', class_='phone').text
        description = internship.find('p', class_='description').text
        salary = internship.find('p', class_='salary').text
        
        internships.append({
            'companyName': company_name,
            'location': location,
            'email': email,
            'phone': phone,
            'description': description,
            'salary': salary,
        })
    
    with open('internships.json', 'w') as f:
        json.dump(internships, f, indent=2)

    print('Scraping completed and data saved to internships.json')

if __name__ == '__main__':
    scrape_internships()

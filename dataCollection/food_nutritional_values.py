from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time
###################################
# Data taken from Türkomp at 21.01.2024
###################################
driver = webdriver.Chrome()
url_meyve = 'https://turkomp.tarimorman.gov.tr/database?type=foods&group=9type=foods&group=9'
url_sebze = 'https://turkomp.tarimorman.gov.tr/database?type=foods&group=8'
# Open the website
driver.get(url_meyve)
wait = WebDriverWait(driver, 10)

table_data = []
#All foods table
allTable = driver.find_element(By.ID, 'mydatalist')
allRows = allTable.find_elements(By.TAG_NAME,'tr')
rowIndex=1
while(rowIndex<len(allRows)):
    time.sleep(1)
    link=driver.find_element(By.XPATH,f"/html[1]/body[1]/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/div[2]/table[1]/tbody[1]/tr[{rowIndex}]/td[1]/a[1]")
    gida=link.text
    grup = driver.find_element(By.XPATH, f"/html[1]/body[1]/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/div[2]/table[1]/tbody[1]/tr[{rowIndex}]/td[3]/a[1]").text
    grup = grup.replace("» ", "")
    link.click()
    table = wait.until(EC.presence_of_element_located((By.ID, 'foodResultlist')))
    rows = table.find_elements(By.TAG_NAME, 'tr')
    for row in rows:
        cells = row.find_elements(By.TAG_NAME, 'td')
        row_data = [gida, grup]+[cell.text for cell in cells]
        table_data.append(row_data)
    driver.back()
    rowIndex+=1

driver.get(url_sebze)
allTable = driver.find_element(By.ID, 'mydatalist')
allRows = allTable.find_elements(By.TAG_NAME,'tr')
rowIndex=1
while(rowIndex<len(allRows)):
    time.sleep(1)
    link=driver.find_element(By.XPATH,f"/html[1]/body[1]/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/div[2]/table[1]/tbody[1]/tr[{rowIndex}]/td[1]/a[1]")
    gida=link.text
    grup = driver.find_element(By.XPATH, f"/html[1]/body[1]/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/div[2]/table[1]/tbody[1]/tr[{rowIndex}]/td[3]/a[1]").text
    grup = grup.replace("» ", "")
    link.click()
    table = wait.until(EC.presence_of_element_located((By.ID, 'foodResultlist')))
    rows = table.find_elements(By.TAG_NAME, 'tr')
    for row in rows:
        cells = row.find_elements(By.TAG_NAME, 'td')
        row_data = [gida, grup]+[cell.text for cell in cells]
        table_data.append(row_data)
    driver.back()
    rowIndex+=1

driver.quit()
columns = ["gida","grup","bilesen","birim","ortalama","minimum","maksimin"]
data = table_data[1:]
df = pd.DataFrame(data, columns=columns)
df.to_json("food_nutritional_values.json", orient="records", indent=2)
filtered_data = [row for row in table_data if any("vitamini" in cell.lower() for cell in row)]
df2 = pd.DataFrame(filtered_data, columns=columns)
df2.to_json("food_vitamin_values.json", orient="records", indent=2)

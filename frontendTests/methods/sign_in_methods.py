from constants.sign_in_page_constants import Constants as c
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import logging
from time import sleep

def sign_in(driver, email, password, timeout=10):
    try:
        # Navigate to the login page
        driver.get(c.url)
        
        # Find elements
        email_locator, email_message = c.email_textbox
        password_locator, password_message = c.password_textbox
        sign_in_locator, sign_in_message = c.sign_in_btn
        email_textbox = WebDriverWait(driver, timeout).until(
            EC.visibility_of_element_located(email_locator)
        )
        password_textbox = WebDriverWait(driver, timeout).until(
            EC.visibility_of_element_located(password_locator)
        )
        sign_in_btn = WebDriverWait(driver, timeout).until(
            EC.element_to_be_clickable(sign_in_locator)
        )
        
        # Input email and password
        email_textbox.send_keys(email)
        logging.info(f"'{email}' entered into {email_message}")
        password_textbox.send_keys(password)
        logging.info(f"'{password}' entered into {password_message}")
        
        # Click sign in button
        sign_in_btn.click()
        logging.info(f"{sign_in_message} clicked")
        sleep(2)
        try:
            assert driver.current_url == c.expected_url
            logging.info("Expected Page URL Confirmed")
        except AssertionError as e:
            logging.error(e)
    except Exception as e:
        logging.error(f"Login failed with error: {e}")
    

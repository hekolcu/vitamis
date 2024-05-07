from selenium import webdriver
import methods.sign_in_methods as sign_in_methods
import logging
from time import sleep

class Test_Sign_In:
    def setup_method(self):
        self.driver= webdriver.Chrome()
        self.driver.maximize_window()
    
    def teardown_method(self):
        self.driver.quit()

    def test_sign_in(self):
        try:
            sign_in_methods.login(self.driver, "example@email.com", "password")
            logging.info("Sign In Succesfull")
        except Exception as e:
            logging.error(f"Sign In Failed with Error: {e}")


from selenium import webdriver
import methods.update_password_methods as update
import logging
from time import sleep

class Test_Update_Password:
    def setup_method(self):
        self.driver= webdriver.Chrome()
        self.driver.maximize_window()
    
    def teardown_method(self):
        self.driver.quit()

    def test_update_password(self):
        update.update_password(self.driver, "example@email.com", "password", "password123")
        logging.info("//////////////////////////////////////////////////////////////")
        

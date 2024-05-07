from constants.update_password_constants import Constants as c
from methods.sign_in_methods import sign_in
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from time import sleep
import logging

def update_password(driver, email, password_before, password_new, timeout=10):
    try:
        sign_in(driver, email, password_before)
        logging.info("Signed in successfully before updating password.")
        
        sidebar_locator, sidebar_message = c.sidebar
        try:
            sidebar = WebDriverWait(driver, timeout).until(
                EC.visibility_of_element_located(sidebar_locator)
            )
            sidebar.click()
            logging.info(f"{sidebar_message} clicked")
        except Exception as e:
            logging.error(f"Failed to locate sidebar: {e}")

        user_locator, user_message = c.user_logo
        signout_locator, signout_message = c.sign_out
        old_locator, old_message = c.old_pass_textbox
        new_locator, new_message = c.new_pass_textbox
        confirm_locator, confirm_message = c.confirm_pass_textbox
        submit_locator, submit_message = c.submit

        try:
            user_logo = WebDriverWait(driver, timeout).until(
                EC.visibility_of_element_located(user_locator)
            )
            logging.info(f"{user_message} found")
        except Exception as e:
            logging.error(f"Failed to locate user logo: {e}")

        

        try:
            old_pass_textbox = WebDriverWait(driver, timeout).until(
                EC.visibility_of_element_located(old_locator)
            )
            logging.info(f"{old_message} found")
        except Exception as e:
            logging.error(f"Failed to locate old password textbox: {e}")

        try:
            new_pass_textbox = WebDriverWait(driver, timeout).until(
                EC.visibility_of_element_located(new_locator)
            )
            logging.info(f"{new_message} found")
        except Exception as e:
            logging.error(f"Failed to locate new password textbox: {e}")

        try:
            confirm_pass_textbox = WebDriverWait(driver, timeout).until(
                EC.visibility_of_element_located(confirm_locator)
            )
            logging.info(f"{confirm_message} found")
        except Exception as e:
            logging.error(f"Failed to locate confirm password textbox: {e}")

        try:
            submit_btn = WebDriverWait(driver, timeout).until(
                EC.element_to_be_clickable(submit_locator)
            )
            logging.info(f"{submit_message} found")
        except Exception as e:
            logging.error(f"Failed to locate submit button: {e}")

        old_pass_textbox.send_keys(password_before)
        logging.info(f"'{password_before}' entered into {old_message}")

        new_pass_textbox.send_keys(password_new)
        logging.info(f"'{password_new}' entered into {new_message}")

        confirm_pass_textbox.send_keys(password_new)
        logging.info(f"'{password_new}' entered into {confirm_message}")

        submit_btn.click()
        logging.info(f"{submit_message} clicked")
        user_logo.click()
        logging.info(f"{user_message} clicked")
        try:
            signout = WebDriverWait(driver, timeout).until(
                EC.element_to_be_clickable(signout_locator)
            )
            logging.info(f"{signout_message} found")
        except Exception as e:
            logging.error(f"Failed to locate sign out button: {e}")

        signout.click()
        logging.info(f"{signout_message} clicked")

        sign_in(driver, email, password_new)
        logging.info("Password updated successfully.")

    except Exception as e:
        logging.error(f"Update Password Failed: {e}")


    


from selenium.webdriver.common.by import By
class Constants:
    url = "https://www.vitamis.hekolcu.com/auth/sign-in"
    email_textbox = ((By.XPATH, "(//input[@name='email'])[1]"), "Email Textbox")
    password_textbox = ((By.XPATH, "(//input[@name='password'])[1]"), "Password Textbox")
    sign_in_btn = ((By.XPATH, "//button[@type='submit']"), "Sign In Button")
    expected_url = "https://www.vitamis.hekolcu.com/dashboard"
from selenium.webdriver.common.by import By
class Constants:
    url_sign_in = "https://www.vitamis.hekolcu.com/auth/sign-in"
    email_textbox = ((By.XPATH, "(//input[@name='email'])[1]"), "Email Textbox")
    password_textbox = ((By.XPATH, "(//input[@name='password'])[1]"), "Password Textbox")
    sign_in_btn = ((By.XPATH, "//button[@type='submit']"), "Sign In Button")
    expected_url = "https://www.vitamis.hekolcu.com/dashboard/account"
    sidebar = ((By.XPATH, "//a[@href='/dashboard/settings']"), "Ayarlarım Sidebar")
    old_pass_textbox = ((By.XPATH, "//input[@name='password']"), "Old Password Textbox")
    new_pass_textbox = ((By.XPATH, "//input[@name='newPassword']"), "New Password Textbox")
    confirm_pass_textbox = ((By.XPATH, "//input[@name='confirmPassword']"), "Confirm Password Textbox")
    submit = ((By.XPATH, "//button[normalize-space()='Güncelle']"), "Submit Button")
    user_logo = ((By.XPATH, "/html[1]/body[1]/div[1]/div[2]/header[1]/div[1]/div[2]"), "User Img")
    sign_out = ((By.XPATH, "(//li[@role='menuitem'])[1]"), "Sign Out")


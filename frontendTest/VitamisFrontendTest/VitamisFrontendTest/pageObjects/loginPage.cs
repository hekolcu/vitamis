using OpenQA.Selenium;
using SeleniumExtras.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace frontendTest.pageObjects
{
    public class loginPage
    {
        private IWebDriver driver;
        public loginPage(IWebDriver driver)
        {
            this.driver = driver;
            PageFactory.InitElements(driver, this);
        }



        //Pageobject Factory
        [FindsBy(How = How.XPath, Using = "(//h1[normalize-space()='VITAMIS SIGN IN'])[1]")]
        private IWebElement vitamisSignInText;

        [FindsBy(How = How.CssSelector, Using = "#email")]
        private IWebElement email;

        [FindsBy(How = How.CssSelector, Using = "#password")]
        private IWebElement password;

        [FindsBy(How = How.XPath, Using = "(//a[normalize-space()='Forgot password?'])[1]")]
        private IWebElement forgotPass;

        [FindsBy(How = How.CssSelector, Using = "a[href='/register']")]
        private IWebElement signUp;

        [FindsBy(How = How.CssSelector, Using = "button[type='submit']")]
        private IWebElement signInBtn;

        public IWebElement getVitamisSignInText()
        {
            return vitamisSignInText;
        }
        public IWebElement getEmail()
        {
            return email;
        }
        public IWebElement getPassword()
        {
            return password;
        }
        public IWebElement getForgotPass()
        {
            return forgotPass;
        }
        public IWebElement getSignUp()
        {
            return signUp;
        }
        public IWebElement getSignInBtn()
        {
            return signInBtn;
        }
    }
}
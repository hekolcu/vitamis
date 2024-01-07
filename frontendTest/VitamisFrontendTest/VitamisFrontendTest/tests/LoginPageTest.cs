using VitamisFrontendTest.utilities;
using NUnit.Framework;
using OpenQA.Selenium;
using System;
using OpenQA.Selenium.Chrome;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDriverManager.DriverConfigs.Impl;
using System.Threading;
using OpenQA.Selenium.Interactions;
using VitamisFrontendTest.pageObjects;

namespace VitamisFrontendTest.tests
{
    public class LoginPageTest : Base
    {
        [Test]
        public void loginPageTest()
        {
            landingPage landingPage = new landingPage(getDriver());
            loginPage loginPage = new loginPage(getDriver());
            landingPage.getLoginBtn().Click();
            string loginUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/login", loginUrl);
            String forgotPassText=loginPage.getForgotPass().Text;
            String signInText = loginPage.getVitamisSignInText().Text;
            String signUpText = loginPage.getSignUp().Text;
            Assert.AreEqual("Forgot password?", forgotPassText);
            Assert.AreEqual("VITAMIS SIGN IN", signInText);
            Assert.AreEqual("Don't have an account? Sign Up", signUpText);
            loginPage.getForgotPass().Click();
            String forgotUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/login#", forgotUrl);
            driver.Navigate().Back();
            loginPage.getSignUp().Click();
            string signUpUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/register", signUpUrl);
            driver.Navigate().Back();
            loginPage.getEmail().SendKeys("example@email.com");
            loginPage.getPassword().SendKeys("password");
            loginPage.getSignInBtn().Click();
            string signInUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/createProfile", signInUrl);


        }

    }
}
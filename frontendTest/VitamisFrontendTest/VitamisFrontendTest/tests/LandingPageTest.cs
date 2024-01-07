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
    public class LandingPageTest : Base
    {
        [Test]
        public void landingPageTest()
        {
            landingPage landingPage = new landingPage(getDriver());

            String logoText=landingPage.getVitamisText().Text;
            String loginText = landingPage.getLoginBtn().Text;
            String registerText = landingPage.getRegisterBtn().Text;
            Assert.AreEqual("VITAMIS", logoText);
            Assert.AreEqual("LOGIN", loginText);
            Assert.AreEqual("REGISTER", registerText);
            landingPage.getLoginBtn().Click();
            string loginUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/login", loginUrl);
            driver.Navigate().Back();
            landingPage.getRegisterBtn().Click();
            string registerUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/register", registerUrl);
            driver.Navigate().Back();
            landingPage.getVitamisText().Click();
            string currentUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/", currentUrl);
            driver.Navigate().Back();


        }

    }
}

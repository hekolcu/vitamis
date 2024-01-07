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
    public class RegisterPageTest : Base
    {
        [Test]
        public void registerPageTest()
        {
            landingPage landingPage = new landingPage(getDriver());
            registerPage registerPage = new registerPage(getDriver());
            landingPage.getRegisterBtn().Click();
            string registerUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/register", registerUrl);
            String vitamisRegisterText = registerPage.getVitamisRegisterText().Text;
            Assert.AreEqual("VITAMIS REGISTER", vitamisRegisterText);
            registerPage.getSignIn().Click();
            string signInUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/login", signInUrl);
            driver.Navigate().Back();
            registerPage.getDietitianTab().Click();
            registerPage.getAdviseeTab().Click();

            // Dietitian
            registerPage.getDietitianTab().Click();
            registerPage.getDietitianName().SendKeys("DName");
            registerPage.getDietitianSurname().SendKeys("DSurname");
            registerPage.getDietitianEmail().SendKeys("dietitian@email.com");
            registerPage.getDietitianPass().SendKeys("dpass");
            registerPage.getDietitianPass2().SendKeys("dpass");
            registerPage.getUpload().SendKeys(getImage());
            registerPage.getRegisterBtn().Click();
            string confUrl = driver.Url;
            string thankTxt = registerPage.getThanksTxt().Text;
            string confTxt = registerPage.getConfTxt().Text;
            Assert.AreEqual("http://localhost:3000/confirmation", confUrl);
            Assert.AreEqual("Thank you for your registration", thankTxt);
            Assert.AreEqual("We will keep you posted when the confirmation is done in 48 hours", confTxt);
            registerPage.getBackBtn().Click();
            // Advisee
            landingPage.getRegisterBtn().Click();
            registerPage.getAdviseeName().SendKeys("AName");
            registerPage.getAdviseeSurname().SendKeys("ASurname");
            registerPage.getAdviseeEmail().SendKeys("advisee@email.com");
            registerPage.getAdviseePass().SendKeys("apass");
            registerPage.getAdviseePass2().SendKeys("apass");
            registerPage.getRegisterBtn().Click();
            //




        }

    }
}

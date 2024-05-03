using frontendTest.utilities;
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
using frontendTest.pageObjects;

namespace frontendTest.tests
{
    public class DashboardPageTest : Base
    {
        [Test]
        public void profileCreationPageTest()
        {
            Random random = new Random();
            landingPage landingPage = new landingPage(getDriver());
            loginPage loginPage = new loginPage(getDriver());
            dashboardPage dashboardPage = new dashboardPage(getDriver());
            profileCreationPage profileCreationPage = new profileCreationPage(getDriver());
            landingPage.getLoginBtn().Click();
            loginPage.getSignInBtn().Click();
            string profileUrl = driver.Url;
            Assert.AreEqual("https://vitamis.hekolcu.com/createProfile", profileUrl);
            profileCreationPage.getCreateBtn().Click();
            string dashboardUrl = driver.Url;
            Assert.AreEqual("https://vitamis.hekolcu.com/dashboard", dashboardUrl);
            dashboardPage.getSignOutBtn().Click();
            string logoutUrl = driver.Url;
            Assert.AreEqual("https://vitamis.hekolcu.com/logout", logoutUrl);
            string logoutText = "You successfully signing out !";
            Assert.AreEqual(dashboardPage.getLogoutText().Text, logoutText);
            dashboardPage.getDashboardBtn().Click();
            string mainUrl = driver.Url;
            Assert.AreEqual("https://vitamis.hekolcu.com/", mainUrl);
        }

    }
}

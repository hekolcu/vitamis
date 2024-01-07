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
    public class ProfileCreationPageTest : Base
    {
        [Test]
        public void profileCreationPageTest()
        {
            Random random = new Random();
            landingPage landingPage = new landingPage(getDriver());
            loginPage loginPage = new loginPage(getDriver());
            profileCreationPage profileCreationPage = new profileCreationPage(getDriver());
            landingPage.getLoginBtn().Click();
            loginPage.getSignInBtn().Click();
            string profileUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/createProfile", profileUrl);
            String vitamisProfileCreationText = profileCreationPage.getVitamisProfileCreationText().Text;
            Assert.AreEqual("PROFILE CREATION", vitamisProfileCreationText);
            profileCreationPage.getHeight().SendKeys("180");
            profileCreationPage.getWeight().SendKeys("90");
            profileCreationPage.getDisease().SendKeys("Diabetes");
            profileCreationPage.getDob().SendKeys("04.04.2002");
            profileCreationPage.getSunEx().Click();
            int sunEx = random.Next(0, 3);
            switch (sunEx)
            {
                case 0:
                    profileCreationPage.getLowSun().Click();
                    break;
                case 1:
                    profileCreationPage.getModerateSun().Click();
                    break;
                case 2:
                    profileCreationPage.getHighSun().Click();
                    break;
                default:
                    break;
            }
            profileCreationPage.getSmoking().Click();
            int smoke = random.Next(0, 2);
            switch (smoke)
            {
                case 0:
                    profileCreationPage.getYesSmoke().Click();
                    break;
                case 1:
                    profileCreationPage.getNoSmoke().Click();
                    break;
                default:
                    break;
            }

            profileCreationPage.getGender().Click();
            int gender = random.Next(0, 2);
            switch (gender)
            {
                case 0:
                    profileCreationPage.getMale().Click();
                    break;
                case 1:
                    profileCreationPage.getFemale().Click();
                    break;
                default:
                    break;
            }
            profileCreationPage.getCreateBtn().Click();
            string dashboardUrl = driver.Url;
            Assert.AreEqual("http://localhost:3000/dashboard", dashboardUrl);





        }

    }
}

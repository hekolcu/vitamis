using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VitamisFrontendTest.pageObjects
{
    public class profileCreationPage
    {
        private IWebDriver driver;
        public profileCreationPage(IWebDriver driver)
        {
            this.driver = driver;
            PageFactory.InitElements(driver, this);
        }



        //Pageobject Factory
        [FindsBy(How = How.XPath, Using = "(//h1[normalize-space()='PROFILE CREATION'])[1]")]
        private IWebElement vitamisProfileCreationText;

        [FindsBy(How = How.CssSelector, Using = "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > input:nth-child(1)")]
        private IWebElement height;

        [FindsBy(How = How.CssSelector, Using = "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > input:nth-child(1)")]
        private IWebElement weight;

        [FindsBy(How = How.CssSelector, Using = "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > input:nth-child(1)")]
        private IWebElement disease;

        [FindsBy(How = How.CssSelector, Using = "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > input:nth-child(1)")]
        private IWebElement dob;

        [FindsBy(How = How.CssSelector, Using = "#sunExp-select")]
        private IWebElement sunEx;

        [FindsBy(How = How.CssSelector, Using = "#smoking-select")]
        private IWebElement smoking;

        [FindsBy(How = How.CssSelector, Using = "#gender-select")]
        private IWebElement gender;

        [FindsBy(How = How.CssSelector, Using = "button[type='button']")]
        private IWebElement createBtn;

        [FindsBy(How = How.XPath, Using = "//li[normalize-space()='Low']")]
        private IWebElement lowSun;

        [FindsBy(How = How.XPath, Using = "//li[normalize-space()='Moderate']")]
        private IWebElement moderateSun;

        [FindsBy(How = How.XPath, Using = "//li[normalize-space()='High']")]
        private IWebElement highSun;

        [FindsBy(How = How.XPath, Using = "//li[normalize-space()='Yes']")]
        private IWebElement yesSmoke;

        [FindsBy(How = How.XPath, Using = "//li[normalize-space()='No']")]
        private IWebElement noSmoke;

        [FindsBy(How = How.XPath, Using = "//li[normalize-space()='Male']")]
        private IWebElement male;

        [FindsBy(How = How.XPath, Using = "//li[normalize-space()='Female']")]
        private IWebElement female;

        public IWebElement getLowSun()
        {
            return lowSun;
        }
        public IWebElement getModerateSun()
        {
            return moderateSun;
        }
        public IWebElement getHighSun()
        {
            return highSun;
        }
        public IWebElement getYesSmoke()
        {
            return yesSmoke;
        }
        public IWebElement getNoSmoke()
        {
            return noSmoke;
        }
        public IWebElement getMale()
        {
            return male;
        }
        public IWebElement getFemale()
        {
            return female;
        }
        public IWebElement getVitamisProfileCreationText()
        {
            return vitamisProfileCreationText;
        }
        public IWebElement getHeight()
        {
            return height;
        }
        public IWebElement getWeight()
        {
            return weight;
        }
        public IWebElement getDisease()
        {
            return disease;
        }
        public IWebElement getDob()
        {
            return dob;
        }
        public IWebElement getSunEx()
        {
            return sunEx;
        }

        public IWebElement getSmoking()
        {
            return smoking;
        }
        public IWebElement getGender()
        {
            return gender;
        }
        public IWebElement getCreateBtn()
        {
            return createBtn;
        }
        /*
        public SelectElement sunExDropdown()
        {
            SelectElement sunExDropdown = new SelectElement(sunEx);
            return sunExDropdown;
        }
        public SelectElement smokingDropdown()
        {
            SelectElement smokingDropdown = new SelectElement(smoking);
            return smokingDropdown;
        }
        public SelectElement genderDropdown()
        {
            SelectElement genderDropdown = new SelectElement(gender);
            return genderDropdown;
        }
        */
    }
}

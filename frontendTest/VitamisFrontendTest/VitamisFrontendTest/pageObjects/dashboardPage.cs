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
    public class dashboardPage
    {
        private IWebDriver driver;
        public dashboardPage(IWebDriver driver)
        {
            this.driver = driver;
            PageFactory.InitElements(driver, this);
        }

        //Pageobject Factory
        [FindsBy(How = How.XPath, Using = "(//button[normalize-space()='SIGN OUT'])[1]")]
        private IWebElement signOutBtn;

        [FindsBy(How = How.XPath, Using = "(//button[normalize-space()='Go to Dashboard'])[1]")]
        private IWebElement dashboardBtn;

        [FindsBy(How = How.XPath, Using = "(//h1[normalize-space()='You successfully signing out !'])[1]")]
        private IWebElement logoutText;

        public IWebElement getSignOutBtn()
        {
            return signOutBtn;
        }

        public IWebElement getDashboardBtn()
        {
            return dashboardBtn;
        }

        public IWebElement getLogoutText()
        {
            return logoutText;
        }
    }
}

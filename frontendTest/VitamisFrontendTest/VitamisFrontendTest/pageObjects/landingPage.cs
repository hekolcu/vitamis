using OpenQA.Selenium;
using SeleniumExtras.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace frontendTest.pageObjects
{
    public class landingPage
    {
        private IWebDriver driver;
        public landingPage(IWebDriver driver)
        {
            this.driver = driver;
            PageFactory.InitElements(driver, this);
        }



        //Pageobject Factory
        [FindsBy(How = How.XPath, Using = "(//a[normalize-space()='VITAMIS'])[1]")]
        private IWebElement vitamisText;

        [FindsBy(How = How.XPath, Using = "(//button[normalize-space()='LOGIN'])[1]")]
        private IWebElement loginBtn;

        [FindsBy(How = How.XPath, Using = "(//button[normalize-space()='REGISTER'])[1]")]
        private IWebElement registerBtn;


        public IWebElement getVitamisText()
        {
            return vitamisText;
        }
        public IWebElement getLoginBtn()
        {
            return loginBtn;
        }
        public IWebElement getRegisterBtn()
        {
            return registerBtn;
        }
    }
}

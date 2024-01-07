using OpenQA.Selenium;
using SeleniumExtras.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VitamisFrontendTest.pageObjects
{
    public class registerPage
    {
        private IWebDriver driver;
        public registerPage(IWebDriver driver)
        {
            this.driver = driver;
            PageFactory.InitElements(driver, this);
        }



        //Pageobject Factory
        [FindsBy(How = How.XPath, Using = "//h1[normalize-space()='VITAMIS REGISTER']")]
        private IWebElement vitamisRegisterText;

        [FindsBy(How = How.XPath, Using = "/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[1]/div[1]/input[1]")]
        private IWebElement adviseeName;

        [FindsBy(How = How.XPath, Using = "/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[2]/div[1]/input[1]")]
        private IWebElement adviseeSurname;

        [FindsBy(How = How.XPath, Using = "/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[3]/div[1]/input[1]")]
        private IWebElement adviseeEmail;

        [FindsBy(How = How.XPath, Using = "/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[4]/div[1]/input[1]")]
        private IWebElement adviseePass;

        [FindsBy(How = How.XPath, Using = "/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[5]/div[1]/input[1]")]
        private IWebElement adviseePass2;

        [FindsBy(How = How.CssSelector, Using = "#simple-tab-1")]
        private IWebElement dietitianTab;

        [FindsBy(How = How.CssSelector, Using = "#simple-tab-0")]
        private IWebElement adviseeTab;

        [FindsBy(How = How.XPath, Using = "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/form[1]/div[1]/div[1]/input[1]")]
        private IWebElement dietitianName;

        [FindsBy(How = How.XPath, Using = "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/form[1]/div[2]/div[1]/input[1]")]
        private IWebElement dietitianSurname;

        [FindsBy(How = How.XPath, Using = "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/form[1]/div[3]/div[1]/input[1]")]
        private IWebElement dietitianEmail;

        [FindsBy(How = How.XPath, Using = "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/form[1]/div[4]/div[1]/input[1]")]
        private IWebElement dietitianPass;

        [FindsBy(How = How.XPath, Using = "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/form[1]/div[5]/div[1]/input[1]")]
        private IWebElement dietitianPass2;

        [FindsBy(How = How.CssSelector, Using = "span[role='button']")]
        private IWebElement upload;

        [FindsBy(How = How.CssSelector, Using = "button[type='submit']")]
        private IWebElement registerBtn;

        [FindsBy(How = How.XPath, Using = "(//button[normalize-space()='Go Back'])[1]")]
        private IWebElement backBtn;

        [FindsBy(How = How.XPath, Using = "(//h1[normalize-space()='Thank you for your registration'])[1]")]
        private IWebElement thanksTxt;

        [FindsBy(How = How.XPath, Using = "(//p[@class='MuiTypography-root MuiTypography-body1 css-1pnmrwp-MuiTypography-root'])[1]")]
        private IWebElement confTxt;

        [FindsBy(How = How.XPath, Using = "(//a[normalize-space()='Already have an account? Sign in'])[1]")]
        private IWebElement signIn;

        public IWebElement getSignIn()
        {
            return signIn;
        }
        public IWebElement getThanksTxt()
        {
            return thanksTxt;
        }
        public IWebElement getConfTxt()
        {
            return confTxt;
        }

        public IWebElement getBackBtn()
        {
            return backBtn;
        }
        public IWebElement getRegisterBtn()
        {
            return registerBtn;
        }
        public IWebElement getUpload()
        {
            return upload;
        }
        public IWebElement getVitamisRegisterText()
        {
            return vitamisRegisterText;
        }
        public IWebElement getAdviseeEmail()
        {
            return adviseeEmail;
        }
        public IWebElement getAdviseePass()
        {
            return adviseePass;
        }
        public IWebElement getAdviseePass2()
        {
            return adviseePass2;
        }
        public IWebElement getAdviseeName()
        {
            return adviseeName;
        }
        public IWebElement getAdviseeSurname()
        {
            return adviseeSurname;
        }

        public IWebElement getDietitianEmail()
        {
            return dietitianEmail;
        }
        public IWebElement getDietitianPass()
        {
            return dietitianPass;
        }
        public IWebElement getDietitianPass2()
        {
            return dietitianPass2;
        }
        public IWebElement getDietitianName()
        {
            return dietitianName;
        }
        public IWebElement getDietitianSurname()
        {
            return dietitianSurname;
        }

        public IWebElement getDietitianTab()
        {
            return dietitianTab;
        }
        public IWebElement getAdviseeTab()
        {
            return adviseeTab;
        }
    }
}
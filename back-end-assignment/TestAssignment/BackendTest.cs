namespace TestAssignment
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }

        [Test]
        public void TestAddition()
        {
            int result = 1 + 1;
            if (result == 2) 
                { Assert.Pass(); }
            else { Assert.Fail(); }
        }
    }
}
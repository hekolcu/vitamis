using VitamisAPI;

namespace VitamisAPITest;

[TestFixture]
public class RecommendationEndpointsTests
{
    [TestCase(3, "Male", "Çocuk 3")]
    [TestCase(2, "Female", "Çocuk 2")]
    [TestCase(16, "Female", "Kadın 16")]
    [TestCase(15, "Male", "Erkek 15")]
    [TestCase(45, "Female", "Kadın 19-50")]
    [TestCase(19, "Male", "Erkek 19-50")]
    [TestCase(80, "Male", "Erkek \u226570")]
    public void DetermineGroupName_ReturnsCorrectGroupName(int age, string gender, string expectedGroupName)
    {
        var result = RecommendationEndpoints.DetermineGroupName(age, gender);
        Assert.That(result, Is.EqualTo(expectedGroupName));
    }
}

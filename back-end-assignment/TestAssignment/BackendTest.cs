using Microsoft.EntityFrameworkCore;
using Assignment.Data;
using System.Xml.Linq;

namespace TestAssignment
{
    public class Tests
    {

        private DBWebAPIRepo _dbWebApiRepo;
        [SetUp]
        public void Setup()
        {

            var options = new DbContextOptionsBuilder<WebAPIDBContext>()
            .UseInMemoryDatabase("MemoryTesting").Options;

            var context = new WebAPIDBContext(options);
            _dbWebApiRepo = new DBWebAPIRepo(context);

            _dbWebApiRepo.AddPlayer(new Player
            {
                Name = "Owen",
                Xp = 0,
                NumOfCorrect = 0
            });
        }


        [Test]
        public void TestAddition()
        {
            int result = 1 + 1;
            if (result == 2)
            { Assert.Pass(); }
            else { Assert.Fail(); }
        }

        [Test]
        public void TestOwenExist()
        {
            var players = _dbWebApiRepo.GetPlayers();
            Assert.That(players.Count(), Is.Not.EqualTo(0));
        }

        [Test]
        public void TestGetOwen()
        {
            var player = _dbWebApiRepo.GetPlayerByName("Owen");
            Assert.That(player.Name, Is.EqualTo("Owen"));
        }

        [Test]
        public void TestGetById()
        {
            var player = _dbWebApiRepo.GetPlayerById(1);
            Assert.That(player.Name, Is.EqualTo("Owen"));
        }

        [Test]
        public void TestGetRandom()
        {
            var player = _dbWebApiRepo.GetPlayerByName("Yukai");
            try
            {
                Console.WriteLine(player.Name);
                // Should throw exception since Terry does not exist
            } catch (NullReferenceException ex)
            {
                Assert.Pass();
            }
            Assert.Fail();
        }

        [Test]
        public void TestOwenAnswerCorrect()
        {

            var player = _dbWebApiRepo.GetPlayerByName("Owen");
            player.Xp = player.Xp + 50;
            player.NumOfCorrect = player.NumOfCorrect + 1;
            _dbWebApiRepo.UpdatePlayer(player);

            var p = _dbWebApiRepo.GetPlayerByName("Owen");
            Assert.That(p.Name, Is.EqualTo("Owen"));
            Assert.That(p.Xp, Is.EqualTo(50));
            Assert.That(p.NumOfCorrect, Is.EqualTo(1));
        }

        [Test]
        public void TestOwenAnswerWrong()
        {
            var player = _dbWebApiRepo.GetPlayerByName("Owen");
            player.Xp = player.Xp + 10;
            _dbWebApiRepo.UpdatePlayer(player);

            var p = _dbWebApiRepo.GetPlayerByName("Owen");
            Assert.That(p.Name, Is.EqualTo("Owen"));
            Assert.That(p.Xp, Is.EqualTo(60));
            Assert.That(p.NumOfCorrect, Is.EqualTo(1));
        }

        [Test]
        public void TestAddingNewPlayer()
        {
            _dbWebApiRepo.AddPlayer(new Player
            {
                Name = "Terry",
                Xp = 0,
                NumOfCorrect = 0
            });

            var p = _dbWebApiRepo.GetPlayerByName("Terry");
            Assert.That(p.Name, Is.EqualTo("Terry"));
            Assert.That(p.Xp, Is.EqualTo(0));
            Assert.That(p.NumOfCorrect, Is.EqualTo(0));

        }

        [Test]
        public void TestAddingNewPlayerAndAnswerCorrect()
        {
            _dbWebApiRepo.AddPlayer(new Player
            {
                Name = "Thomas",
                Xp = 0,
                NumOfCorrect = 0
            });

            var player = _dbWebApiRepo.GetPlayerByName("Thomas");
            player.Xp = player.Xp + 50;
            player.NumOfCorrect = player.NumOfCorrect + 1;
            _dbWebApiRepo.UpdatePlayer(player);

            var p = _dbWebApiRepo.GetPlayerByName("Thomas");
            Assert.That(p.Name, Is.EqualTo("Thomas"));
            Assert.That(p.Xp, Is.EqualTo(50));
            Assert.That(p.NumOfCorrect, Is.EqualTo(1));
        }

        [Test]
        public void TestListAllPlayers()
        {
            var players = _dbWebApiRepo.GetPlayers();
            Assert.That(players.Count(), Is.GreaterThan(1));
        }

    }
}
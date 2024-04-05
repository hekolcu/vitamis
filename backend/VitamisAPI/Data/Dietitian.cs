namespace VitamisAPI.Data
{
    public class Dietitian : User
    {
        public string  DietitianFileName { get; set; }
        public bool IsUploaded { get; set; }
        public List<User> Users { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}

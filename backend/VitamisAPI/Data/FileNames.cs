using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace VitamisAPI.Data
{
    public class FileNames 
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public bool IsUploaded { get; set; }

    }
}

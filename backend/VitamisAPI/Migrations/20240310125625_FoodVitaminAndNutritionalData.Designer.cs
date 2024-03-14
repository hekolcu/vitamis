﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VitamisAPI.Data;

#nullable disable

namespace VitamisAPI.Migrations
{
    [DbContext(typeof(VitamisDbContext))]
    [Migration("20240310125625_FoodVitaminAndNutritionalData")]
    partial class FoodVitaminAndNutritionalData
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("VitamisAPI.Data.Food", b =>
                {
                    b.Property<int>("FoodID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("FoodID");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Foods");
                });

            modelBuilder.Entity("VitamisAPI.Data.FoodNutrition", b =>
                {
                    b.Property<int>("FoodNutritionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Average")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("FoodID")
                        .HasColumnType("int");

                    b.Property<string>("Maximum")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Minimum")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("NutrientID")
                        .HasColumnType("int");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("FoodNutritionID");

                    b.HasIndex("FoodID");

                    b.HasIndex("NutrientID");

                    b.ToTable("FoodNutritions");
                });

            modelBuilder.Entity("VitamisAPI.Data.FoodVitamin", b =>
                {
                    b.Property<int>("FoodVitaminID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Average")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("FoodID")
                        .HasColumnType("int");

                    b.Property<string>("Maximum")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Minimum")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("VitaminID")
                        .HasColumnType("int");

                    b.HasKey("FoodVitaminID");

                    b.HasIndex("FoodID");

                    b.HasIndex("VitaminID");

                    b.ToTable("FoodVitamins");
                });

            modelBuilder.Entity("VitamisAPI.Data.Nutrient", b =>
                {
                    b.Property<int>("NutrientID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("NutrientID");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Nutrients");
                });

            modelBuilder.Entity("VitamisAPI.Data.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Disease")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int?>("Gender")
                        .HasColumnType("int");

                    b.Property<double?>("Height")
                        .HasColumnType("double");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("varchar(64)");

                    b.Property<bool?>("Smoking")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("SunExposure")
                        .HasColumnType("int");

                    b.Property<int>("UserType")
                        .HasColumnType("int");

                    b.Property<double?>("Weight")
                        .HasColumnType("double");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("VitamisAPI.Data.Vitamin", b =>
                {
                    b.Property<int>("VitaminID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("VitaminID");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Vitamins");
                });

            modelBuilder.Entity("VitamisAPI.Data.VitaminReferenceGroup", b =>
                {
                    b.Property<int>("GroupID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("GroupName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("GroupID");

                    b.ToTable("VitaminReferenceGroups");
                });

            modelBuilder.Entity("VitamisAPI.Data.VitaminReferenceValue", b =>
                {
                    b.Property<int>("ValueID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Amount")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("GroupID")
                        .HasColumnType("int");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("VitaminID")
                        .HasColumnType("int");

                    b.HasKey("ValueID");

                    b.HasIndex("GroupID");

                    b.HasIndex("VitaminID");

                    b.ToTable("VitaminReferenceValues");
                });

            modelBuilder.Entity("VitamisAPI.Data.FoodNutrition", b =>
                {
                    b.HasOne("VitamisAPI.Data.Food", "Food")
                        .WithMany("FoodNutritions")
                        .HasForeignKey("FoodID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VitamisAPI.Data.Nutrient", "Nutrient")
                        .WithMany()
                        .HasForeignKey("NutrientID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Food");

                    b.Navigation("Nutrient");
                });

            modelBuilder.Entity("VitamisAPI.Data.FoodVitamin", b =>
                {
                    b.HasOne("VitamisAPI.Data.Food", "Food")
                        .WithMany("FoodVitamins")
                        .HasForeignKey("FoodID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VitamisAPI.Data.Vitamin", "Vitamin")
                        .WithMany()
                        .HasForeignKey("VitaminID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Food");

                    b.Navigation("Vitamin");
                });

            modelBuilder.Entity("VitamisAPI.Data.VitaminReferenceValue", b =>
                {
                    b.HasOne("VitamisAPI.Data.VitaminReferenceGroup", "VitaminReferenceGroup")
                        .WithMany()
                        .HasForeignKey("GroupID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VitamisAPI.Data.Vitamin", "Vitamin")
                        .WithMany()
                        .HasForeignKey("VitaminID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vitamin");

                    b.Navigation("VitaminReferenceGroup");
                });

            modelBuilder.Entity("VitamisAPI.Data.Food", b =>
                {
                    b.Navigation("FoodNutritions");

                    b.Navigation("FoodVitamins");
                });
#pragma warning restore 612, 618
        }
    }
}

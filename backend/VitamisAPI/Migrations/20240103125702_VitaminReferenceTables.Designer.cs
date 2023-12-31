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
    [Migration("20240103125702_VitaminReferenceTables")]
    partial class VitaminReferenceTables
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("VitamisAPI.Data.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<int?>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("varchar(64)");

                    b.Property<int>("UserType")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

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

                    b.Property<double>("Amount")
                        .HasColumnType("double");

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
#pragma warning restore 612, 618
        }
    }
}

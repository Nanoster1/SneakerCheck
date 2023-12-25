﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SneakerCheck.WebApi.Data;

#nullable disable

namespace SneakerCheck.WebApi.Migrations
{
    [DbContext(typeof(SneakerCheckDbContext))]
    [Migration("20231225163404_Init")]
    partial class Init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.0");

            modelBuilder.Entity("SneakerCheck.WebApi.Models.ImageModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("Bytes")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<string>("Format")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ImageModels");
                });

            modelBuilder.Entity("SneakerCheck.WebApi.Models.Instruction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("Category")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Dislikes")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Likes")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("PreviewImageId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ShopId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("PreviewImageId")
                        .IsUnique();

                    b.HasIndex("ProductId");

                    b.HasIndex("ShopId");

                    b.ToTable("Instructions");
                });

            modelBuilder.Entity("SneakerCheck.WebApi.Models.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ImageId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ImageId")
                        .IsUnique();

                    b.ToTable("Products");
                });

            modelBuilder.Entity("SneakerCheck.WebApi.Models.Shop", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("IconId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Rate")
                        .HasColumnType("REAL");

                    b.Property<Guid>("SellerId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("IconId")
                        .IsUnique();

                    b.HasIndex("SellerId");

                    b.ToTable("Shops");
                });

            modelBuilder.Entity("SneakerCheck.WebApi.Models.ShopUrl", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("ShopId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Name");

                    b.HasIndex("ShopId");

                    b.ToTable("ShopUrl");
                });

            modelBuilder.Entity("SneakerCheck.WebApi.Models.UserModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("GoogleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Role")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("GoogleId")
                        .IsUnique();

                    b.ToTable("UserModels");
                });

            modelBuilder.Entity("SneakerCheck.WebApi.Models.Instruction", b =>
                {
                    b.HasOne("SneakerCheck.WebApi.Models.ImageModel", null)
                        .WithOne()
                        .HasForeignKey("SneakerCheck.WebApi.Models.Instruction", "PreviewImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SneakerCheck.WebApi.Models.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SneakerCheck.WebApi.Models.Shop", null)
                        .WithMany()
                        .HasForeignKey("ShopId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsMany("SneakerCheck.WebApi.Models.InstructionContent", "Content", b1 =>
                        {
                            b1.Property<Guid>("InstructionId")
                                .HasColumnType("TEXT");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("INTEGER");

                            b1.Property<Guid>("FakeImageId")
                                .HasColumnType("TEXT");

                            b1.Property<string>("ImageDescription")
                                .IsRequired()
                                .HasColumnType("TEXT");

                            b1.Property<Guid>("OriginalImageId")
                                .HasColumnType("TEXT");

                            b1.HasKey("InstructionId", "Id");

                            b1.ToTable("InstructionContent");

                            b1.WithOwner()
                                .HasForeignKey("InstructionId");
                        });

                    b.Navigation("Content");
                });

            modelBuilder.Entity("SneakerCheck.WebApi.Models.Product", b =>
                {
                    b.HasOne("SneakerCheck.WebApi.Models.ImageModel", null)
                        .WithOne()
                        .HasForeignKey("SneakerCheck.WebApi.Models.Product", "ImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SneakerCheck.WebApi.Models.Shop", b =>
                {
                    b.HasOne("SneakerCheck.WebApi.Models.ImageModel", null)
                        .WithOne()
                        .HasForeignKey("SneakerCheck.WebApi.Models.Shop", "IconId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SneakerCheck.WebApi.Models.UserModel", null)
                        .WithMany()
                        .HasForeignKey("SellerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SneakerCheck.WebApi.Models.ShopUrl", b =>
                {
                    b.HasOne("SneakerCheck.WebApi.Models.Shop", null)
                        .WithMany("ShopUrls")
                        .HasForeignKey("ShopId");
                });

            modelBuilder.Entity("SneakerCheck.WebApi.Models.Shop", b =>
                {
                    b.Navigation("ShopUrls");
                });
#pragma warning restore 612, 618
        }
    }
}
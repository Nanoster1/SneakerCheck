namespace SneakerCheck.WebApi.Models;

public class Shop
{
    public required Guid Id { get; set; }
    public required string SellerId { get; set; }
    public required string Name { get; set; }
    public required string City { get; set; }
    public required string Address { get; set; }
    public required string Description { get; set; }
    public required Guid IconId { get; set; }
    public required List<ShopUrl> ShopUrls { get; set; }
    public required double Rate { get; set; }
}

// Так рейтинг считается крч
// public void AddRating(double newRating)
// {
//     // Предположим, что новая оценка имеет вес 0.6, а предыдущие оценки — 0.4
//     double weightNew = 0.6;
//     double weightOld = 0.4;

//     // Обновляем средний рейтинг, учитывая веса
//     TotalRating = (TotalRating * weightOld) + (newRating * weightNew);
//     NumberOfRatings++;

//     // Если нужно, чтобы среднее отражало количество голосов, делим на взвешенное количество
//     TotalRating /= (weightOld * (NumberOfRatings - 1) + weightNew);
// }
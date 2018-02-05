namespace JobFinder.Application.Api.Common
{
  public static class DispatcherActorsNames
  {
    public const string UserCommandActor = nameof(UserCommandActor);
    public const string UserQueryActor = nameof(UserQueryActor);
    public const string OfferCommandActor = nameof(OfferCommandActor);
    public const string OfferQueryActor = nameof(OfferQueryActor);
    public const string JobApplicationCommandActor = nameof(JobApplicationCommandActor);
    public const string JobApplicationQueryActor = nameof(JobApplicationQueryActor);
    public const string ProfessionQueryActor = nameof(ProfessionQueryActor);
    public const string JobApplicationsRecommendationQueryActor = nameof(JobApplicationsRecommendationQueryActor);
  }
}

namespace Core.Application.Exceptions
{
  public class NotFoundApplicationException : AppException
  {
    public NotFoundApplicationException(string message) : base(message)
    {
    }
  }
}

export class Endpoints {
  public static getFilms = () => '/films';

  public static getFilm = (id: string) => `/films/${id}`;

  public static checkAuth = () => '/login';

  public static login = () => '/login';

  public static logout = () => '/logout';

  public static getPromo = () => '/promo';

  public static getSimilarFilms = (id: string) => `/films/${id}/similar`;

  public static getReviewsFilm = (id: string) => `/comments/${id}`;
}

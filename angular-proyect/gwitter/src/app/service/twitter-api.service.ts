import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tweet } from "../model/tweet.model";
import { Trend } from "../model/trend.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TrendDetail } from "../model/trend-detail.model";

@Injectable({
  providedIn: "root"
})
export class TwitterAPIService {
  urlRecentTweets = "http://localhost:8080/timeline";
  urlArgentinaTrends = "http://localhost:8080/trends?id=23424747";
  urlSearchTweets = `http://localhost:8080/search?q=angular`;
  urlShowTweet = `http://localhost:8080/show?id=1011417658833551361`;

  constructor(private http: HttpClient) {}

  getRecentTweets() {
    return this.http.get<Tweet[]>(this.urlRecentTweets);
  }

  getArgentinaTrends(): Observable<TrendDetail> {
    return this.http.get<Trend>(this.urlArgentinaTrends).pipe(
      map(data => {
        return data[0].trends.map(
          ({ name, url, tweet_volume }: TrendDetail) => ({
            name,
            url,
            tweet_volume
          })
        );
      })
    );
  }
}